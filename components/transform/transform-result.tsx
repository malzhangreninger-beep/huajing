"use client";

import { Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface TransformResultProps {
  content: string;
  isStreaming?: boolean;
}

export function TransformResult({ content, isStreaming }: TransformResultProps) {
  return (
    <div className="canvas-card rounded-xl overflow-hidden text-[#2C2620]">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-secondary/30">
        <Sparkles className="w-4 h-4 text-purple-500" />
        <span className="text-base font-medium text-[#2C2620]">创作方案</span>
        {isStreaming && (
          <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            生成中...
          </span>
        )}
      </div>

      {/* Content */}
      <div className="px-5 py-4 prose prose-invert prose-sm max-w-none">
        <ReactMarkdown
          components={{
            h2: ({ children }) => (
              <h2 className="text-lg font-semibold text-[#2C2620] mt-6 mb-3 first:mt-0">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-base font-medium text-[#2C2620] mt-4 mb-2">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-base text-[#2C2620] leading-relaxed mb-3">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="space-y-2 mb-4 list-none pl-0">{children}</ul>
            ),
            li: ({ children }) => (
              <li className="flex gap-2 text-base text-[#2C2620]">
                <span className="text-primary mt-1">•</span>
                <span>{children}</span>
              </li>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-[#2C2620]">
                {children}
              </strong>
            ),
            em: ({ children }) => (
              <em className="italic text-muted-foreground">{children}</em>
            ),
            hr: () => <hr className="border-border my-6" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
