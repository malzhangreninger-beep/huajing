import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

// 初始化 OpenAI 客户端,但指向 DeepSeek 的服务器
const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL,
});

// 当前端 POST 请求到 /api/chat 时,这个函数被调用
export async function POST(request: NextRequest) {
  try {
    // 1. 从前端请求中取出用户输入
    const body = await request.json();
    const userMessage = body.message;

    // 2. 检查用户输入是否为空
    if (!userMessage || typeof userMessage !== 'string') {
      return NextResponse.json(
        { error: '请输入内容' },
        { status: 400 }
      );
    }

    // 3. 调用 DeepSeek API
    const completion = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: '你是一位温和、博学的艺术顾问。用户会分享他们生活中的碎片——诗句、感受、记忆、意象。请用 3-4 句话,帮他们从中看到可能的绘画创作方向:比如构图的可能、色调的倾向、可探索的情绪。语气安静、有美术史厚度,不要给出标准答案,多用启发性的问句。',
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      temperature: 0.8,
    });

    // 4. 把 AI 的回复返回给前端
    const reply = completion.choices[0].message.content;
    return NextResponse.json({ reply });

  } catch (error) {
    console.error('API 调用出错:', error);
    return NextResponse.json(
      { error: 'AI 服务暂时不可用,请稍后再试' },
      { status: 500 }
    );
  }
}
