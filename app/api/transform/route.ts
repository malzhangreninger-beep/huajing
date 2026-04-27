import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL,
});

type TransformMessage = {
  role?: string;
  content?: unknown;
  parts?: Array<{
    type?: string;
    text?: string;
  }>;
};

function getMessageContent(message: TransformMessage | undefined) {
  if (!message) {
    return "";
  }

  if (typeof message.content === "string") {
    return message.content;
  }

  if (Array.isArray(message.parts)) {
    return message.parts
      .filter((part) => part.type === "text" && typeof part.text === "string")
      .map((part) => part.text)
      .join("\n");
  }

  return "";
}

export async function POST(req: NextRequest) {
  try {
    const { messages, inputType } = await req.json();

  const systemPrompt = `你是「画境」的 AI 艺术顾问，专门帮助艺术创作者将跨媒介的灵感转化为可执行的绘画创作方案。

你的角色是一位兼具艺术史素养和创作经验的导师。你的回应应该：
- 专业但不学究，有深度但易懂
- 给出具体可执行的建议，而不是泛泛而谈
- 尊重创作者的主体性，最终决定权留给他们
- 使用温暖但不油腻的语气

根据用户输入的类型（${inputType}），按以下结构给出建议：

## 核心意象提取
从输入中识别出核心的情绪、意象、或概念，用 2-3 句话概括。

## 构图建议
给出 2-3 个可能的构图方向（用文字描述，不是生成图片），每个配上简短说明。例如：
- 中心聚焦式：将主体置于画面中央...
- 对角线构图：利用视觉张力...

## 色调方案
推荐 3 个不同的色彩方案，每个用：
- 主色调 + 辅助色 + 点缀色的组合
- 一句话说明这个色调传达的情绪

## 美术史参考
推荐 3-5 位可能相关的艺术家或作品，说明为什么这些参考对当前创作有价值。例如：
- 莫兰迪的静物画：观察他如何用灰色调表达宁静...

## 情绪关键词
给出 5-8 个可以进一步探索的情绪/概念关键词。

## 留白提问
最后问创作者 2-3 个问题，帮助他们进一步明确自己的创作方向。这些问题应该：
- 帮助创作者连接自己的真实感受
- 引导他们做出创作决定
- 留出创作的空间`;

    const lastUserMessage = Array.isArray(messages)
      ? [...messages].reverse().find((message: TransformMessage) => message.role === "user")
      : undefined;
    const userContent = getMessageContent(lastUserMessage);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: journals } = await supabase
      .from("journals")
      .select("content, created_at, journal_feedbacks(content)")
      .order("created_at", { ascending: false })
      .limit(30);

    const { data: feedbacks } = await supabase
      .from("journal_feedbacks")
      .select("content, metadata")
      .eq("type", "word_frequency")
      .order("created_at", { ascending: false })
      .limit(50);

    const journalSummary =
      journals && journals.length > 0
        ? journals
            .map(
              (journal, index) =>
                `${index + 1}. ${journal.content.slice(0, 100)}${
                  journal.content.length > 100 ? "..." : ""
                }`
            )
            .join("\n")
        : "暂无日志记录";

    const imageWords =
      feedbacks && feedbacks.length > 0
        ? feedbacks
            .map((feedback) => feedback.metadata?.word)
            .filter(Boolean)
            .slice(0, 20)
            .join("、")
        : "暂无记录";

    const userContext =
      journals && journals.length > 0
        ? `【这位创作者的背景】
最近 ${journals.length} 条创作日志摘要：
${journalSummary}

AI 已识别出的高频意象词：${imageWords || "暂无"}

请结合以上背景，给出专属于这位创作者的方案。不要泛泛而谈，要引用他的具体日志内容和意象词。`
        : "";

    const fullSystemPrompt = systemPrompt + (userContext ? "\n\n" + userContext : "");

    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: fullSystemPrompt,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const content = completion.choices[0]?.message.content ?? "";

    return NextResponse.json({ reply: content });
  } catch (error) {
    console.error("Transform API 调用出错:", error);
    return NextResponse.json(
      { error: "AI 服务暂时不可用,请稍后再试" },
      { status: 500 }
    );
  }
}
