'use client';

import { cn } from '@/lib/utils';
import { Info, AlertTriangle, CheckCircle, Lightbulb, XCircle } from 'lucide-react';

type CalloutType = 'info' | 'warn' | 'danger' | 'tip' | 'note';

interface CalloutProps {
  children: React.ReactNode;
  type?: CalloutType;
  title?: string;
  className?: string;
}

const ICONS: Record<CalloutType, React.ComponentType<{ className?: string }>> = {
  info: Info,
  warn: AlertTriangle,
  danger: XCircle,
  tip: Lightbulb,
  note: CheckCircle,
};

const BORDER_COLORS: Record<CalloutType, string> = {
  info: 'border-cyan-500/50',
  warn: 'border-amber-500/50',
  danger: 'border-red-500/50',
  tip: 'border-violet-500/50',
  note: 'border-emerald-500/50',
};

const BG_COLORS: Record<CalloutType, string> = {
  info: 'bg-cyan-500/10',
  warn: 'bg-amber-500/10',
  danger: 'bg-red-500/10',
  tip: 'bg-violet-500/10',
  note: 'bg-emerald-500/10',
};

const TITLES: Record<CalloutType, string> = {
  info: 'Information',
  warn: 'Warning',
  danger: 'Danger',
  tip: 'Tip',
  note: 'Note',
};

export function Callout({ children, type = 'info', title, className }: CalloutProps) {
  const Icon = ICONS[type];
  const borderColor = BORDER_COLORS[type];
  const bgColor = BG_COLORS[type];
  const defaultTitle = TITLES[type];

  return (
    <div
      className={cn(
        'relative rounded-xl border p-4',
        borderColor,
        bgColor,
        className
      )}
      role="note"
      aria-label={title || defaultTitle}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <Icon className={cn('h-5 w-5', `text-${type === 'info' ? 'cyan' : type === 'warn' ? 'amber' : type === 'danger' ? 'red' : type === 'tip' ? 'violet' : 'emerald'}-400`)} aria-hidden="true" />
        </div>
        <div className="flex-1">
          {title && (
            <p className={cn('font-semibold text-sm', `text-${type === 'info' ? 'cyan' : type === 'warn' ? 'amber' : type === 'danger' ? 'red' : type === 'tip' ? 'violet' : 'emerald'}-300`)}>
              {title}
            </p>
          )}
          <div className={cn('mt-1 text-sm leading-relaxed', title ? 'text-slate-300' : 'text-slate-400')}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}