'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  filename?: string;
  language?: string;
  highlightLines?: number[];
}

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ children, className, filename, language, highlightLines }, ref) => {
    return (
      <div className={cn('relative overflow-x-auto rounded-xl border border-line/50 bg-void/80', className)}>
        {(filename || language) && (
          <div className="flex items-center justify-between border-b border-line/50 px-3 py-1.5 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              {filename && (
                <span className="font-mono text-[11px] text-slate-400">{filename}</span>
              )}
              {language && (
                <span className="rounded bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] uppercase text-slate-500">
                  {language}
                </span>
              )}
            </div>
          </div>
        )}
        <pre
          ref={ref}
          className="p-4 font-mono text-sm leading-relaxed"
          data-language={language}
          data-line-numbers
          data-highlight-lines={highlightLines?.join(',')}
        >
          {children}
        </pre>
      </div>
    );
  }
);

CodeBlock.displayName = 'CodeBlock';