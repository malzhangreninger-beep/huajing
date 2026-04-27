"use client";

import { Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface TransformResultProps {
  content: string;
  isStreaming?: boolean;
}

export function TransformResult({ content, isStreaming }: TransformResultProps) {
  return (
    <div className="bg-card border-2 border-foreground rounded overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3 border-b-2 border-foreground bg-secondary">
        <Sparkles className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium text-foreground">创作方案</span>
        {isStreaming && (
          <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            生成中...
          </span>
        )}
      </div>

      {/* Content */}
      <div className="px-5 py-4 prose prose-sm max-w-none">
        <ReactMarkdown
          components={{
            h2: ({ children }) => (
              <h2 className="text-lg font-semibold text-accent mt-6 mb-3 first:mt-0">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-base font-medium text-foreground mt-4 mb-2">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-foreground/90 leading-relaxed mb-3">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="space-y-2 mb-4 list-none pl-0">{children}</ul>
            ),
            li: ({ children }) => (
              <li className="flex gap-2 text-foreground/90">
                <span className="text-accent mt-1">•</span>
                <span>{children}</span>
              </li>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-foreground">
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
