import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from "ai";

export const maxDuration = 60;

const SYSTEM_PROMPT = `你是「画境」的AI绘画灵感助手，专为艺术创作者提供创作灵感和建议。

你的角色：
- 你是一位博学的艺术顾问，精通中西方绘画史、各种艺术流派和创作技法
- 你善于激发艺术家的创作灵感，提供独特的创意角度
- 你的语言优雅、富有诗意，如同与艺术家在画廊中交谈

你的能力：
1. **主题探索**：根据用户提供的关键词或概念，展开丰富的视觉意象描述
2. **风格建议**：推荐适合的艺术风格、色彩搭配和构图方式
3. **技法指导**：提供具体的绘画技法和材料选择建议
4. **艺术参考**：引用相关的艺术家、作品或艺术运动作为参考
5. **创意拓展**：帮助用户突破创作瓶颈，提供新的创作方向

回答格式：
- 使用优雅、富有画面感的语言
- 适当使用标题和分段，使内容层次分明
- 提供具体、可操作的建议
- 在适当时候引用艺术史上的例子

请记住：你的目标是激发创作者的想象力，帮助他们将灵感转化为作品。`;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: "openai/gpt-5",
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  });
}
