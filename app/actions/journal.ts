'use server';

import OpenAI from 'openai';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL,
});

const WORD_FREQUENCY_SYSTEM_PROMPT = `你是"画境"产品中的一个观察者,服务的是中文艺术创作者(主要为艺术院校学生)。
你的角色是"温和的观察者",不是评论家,不是导师,不是赞美者。

你的任务:阅读用户的【最新日志】和【过往所有日志】,找出最新日志里出现的、但过往日志中从未出现过的、有创作潜力的词或短语。

**寻找标准(宽松,优先高频触发):**

必须满足:
1. 在过往日志中**完全没出现过**(包括变体形式)
2. 是用户日志中**真实出现的词或短语**(不是你引申的)

优先选择以下任一类(按优先级排序):
A. **具体物象**:物品、材料、颜色、形状、纹理(例:"滑轮"、"靠背"、"白搪瓷"、"防盗网"、"蓝色胶带"、"紧绷")
B. **具体场景细节**:地点、动作、时间(例:"窗台"、"凌晨三点"、"画室"、"楼下")
C. **感官词**:声音、气味、触感、温度(例:"嗡嗡"、"潮湿"、"冰凉")
D. **创作相关动词**:与画画、看、画材有关的具体动作

**排除:**
- 纯情绪词("开心"、"难过"、"烦躁")
- 纯抽象概念("意义"、"本质"、"思考")
- 通用时间副词("今天"、"每天"、"昨天")
- 通用代词、连接词、助词

**判断原则:** 
- 宁可宽松,不要漏报。如果有 2-3 个候选词都符合,选最有创作可能性的(能联想到画面的优先)。
- 如果最新日志只有抽象感受、没有任何具体词语,才返回 found: false

输出格式(必须是合法 JSON,不要 markdown 包裹):

如果找到:
{
  "found": true,
  "word": "找到的词或短语",
  "message": "一句温和的观察(30 字以内)",
  "reasoning": "30 字以内,为什么选这个词,不暴露给用户"
}

如果找不到:
{
  "found": false,
  "reasoning": "30 字以内,为什么没找到"
}

**message 写法要求:**
- 控制在 30 字以内
- 用陈述句,不用感叹号
- 不评价好坏(不说"很美""特别")
- 不给建议(不说"可以画""试试看")
- 只陈述"这是第一次出现"这个事实

好的 message 例子:
- "'白搪瓷'是你第一次写下的意象。"
- "'滑轮'之前没有出现在你的记录里。"
- "你今天第一次用了'紧绷'这个词。"
- "'凌晨三点'是你第一次提到的时间。"

不好的 message 例子:
- "'白搪瓷'是个很美的意象,可以画!"(评价 + 建议)
- "好的!我注意到你写了'白搪瓷'。"(口语化)
- "'白搪瓷'让我想起莫兰迪..."(引申)`;

type WordFrequencyFeedback = {
  found?: boolean;
  word?: string;
  message?: string;
  reasoning?: string;
};

async function generateWordFrequencyFeedback(
  newJournalId: string,
  newContent: string,
  userId: string
) {
  try {
    const supabase = await createClient();

    const { data: pastJournals, error: journalsError } = await supabase
      .from('journals')
      .select('content')
      .eq('user_id', userId)
      .neq('id', newJournalId)
      .order('created_at', { ascending: true });

    if (journalsError || !pastJournals || pastJournals.length < 1) {
      return;
    }

    const pastContents = pastJournals
      .map((journal) => journal.content)
      .filter((content): content is string => typeof content === 'string')
      .join('\n---\n');

    const completion = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: WORD_FREQUENCY_SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: `【最新日志】
${newContent}

【过往所有日志】
${pastContents}`,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const responseContent = completion.choices[0]?.message.content;

    if (!responseContent) {
      return;
    }

    const feedback = JSON.parse(responseContent) as WordFrequencyFeedback;

    if (feedback.found === false) {
      console.log(`[微反馈跳过]${feedback.reasoning ?? ''}`);
      return;
    }

    if (!feedback.found || !feedback.word || !feedback.message) {
      return;
    }

    await supabase.from('journal_feedbacks').insert({
      journal_id: newJournalId,
      user_id: userId,
      type: 'word_frequency',
      content: feedback.message,
      metadata: { word: feedback.word, reasoning: feedback.reasoning },
    });
  } catch {
    return;
  }
}

export async function createJournal(content: string) {
  const trimmedContent = content.trim();

  if (!trimmedContent) {
    throw new Error('请写点什么');
  }

  if (trimmedContent.length > 5000) {
    throw new Error('内容过长');
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('未登录');
  }

  const { data: newJournal, error } = await supabase
    .from('journals')
    .insert({
      user_id: user.id,
      content: trimmedContent,
    })
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  await generateWordFrequencyFeedback(newJournal.id, trimmedContent, user.id);
  revalidatePath('/');

  return { success: true };
}
