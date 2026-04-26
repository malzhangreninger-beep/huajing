import { streamText, convertToModelMessages } from "ai";

export async function POST(req: Request) {
  const { messages, journalEntries } = await req.json();

  const systemPrompt = `你是「画境」的母题分析师，专门帮助艺术创作者发现自己反复出现的创作母题和艺术语言。

你的任务是分析用户提供的创作日志，识别出其中的模式和规律。

分析时请关注：

## 反复出现的意象
- 具体的物象（窗、树、背影、光...）
- 场景类型（黄昏、室内、街角...）
- 人物关系（孤独的人、群像、对话...）

## 情绪基调
- 主导情绪（忧郁、宁静、躁动、温暖...）
- 情绪的变化规律
- 隐藏的情绪线索

## 色彩倾向
- 常用的色调（冷色/暖色、高明度/低明度）
- 色彩组合的偏好
- 色彩与情绪的关联

## 哲学命题
- 反复思考的问题（时间、存在、记忆、关系...）
- 潜在的创作母题
- 可以进一步探索的方向

## 艺术语言特征
- 构图偏好
- 表现手法
- 与哪些艺术家/流派可能有共鸣

请用温暖但专业的语气进行分析，帮助创作者「看见自己」。
避免下结论式的判断，多用「也许」「可能」「我注意到」这样的表达。
最后给出 2-3 个可以进一步探索的创作方向建议。`;

  const entriesContext = journalEntries
    ? `\n\n以下是用户的创作日志记录：\n${JSON.stringify(journalEntries, null, 2)}`
    : "";

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: "openai/gpt-4o",
    system: systemPrompt + entriesContext,
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}
