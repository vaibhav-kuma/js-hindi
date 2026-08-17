'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TweetProps {
  id: string;
  conversation?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  className?: string;
}

export function Tweet({ id, conversation, align = 'center', theme = 'dark', className }: TweetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadTwitterWidgets = () => {
      if (!window.twttr) {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.onload = () => {
          if (window.twttr) {
            window.twttr.widgets.load(containerRef.current ?? undefined);
          }
        };
        document.body.appendChild(script);
      } else {
        window.twttr.widgets.load(containerRef.current ?? undefined);
      }
    };

    loadTwitterWidgets();
  }, []);

  useEffect(() => {
    if (window.twttr && containerRef.current) {
      window.twttr.widgets.load(containerRef.current);
    }
  }, [id, conversation]);

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      data-align={align}
      data-theme={theme}
    >
      <blockquote className="twitter-tweet" data-align={align} data-theme={theme} data-conversation={conversation ? 'none' : undefined}>
        <a href={`https://twitter.com/user/status/${id}`}></a>
      </blockquote>
      {!rendered && (
        <div className="flex items-center justify-center gap-2 p-4 rounded-xl border border-line/50 bg-void/50">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
          <span className="font-mono text-sm text-slate-400">Loading tweet...</span>
        </div>
      )}
    </div>
  );
}

declare global {
  interface Window {
    twttr: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}