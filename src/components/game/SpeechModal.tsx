/**
 * Speech modal component - displays full speech message in a scrollable modal
 */

'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Message, Player } from '@/types/game';
import { TYPOGRAPHY, getBorderClass } from '@/lib/design-tokens';

interface SpeechModalProps {
  message?: Message;
  player?: Player;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Role names with English/Latin subtitles
 */
const roleNames: Record<string, { name: string; subtitle: string }> = {
  marked: { name: '烙印者', subtitle: 'The Marked' },
  heretic: { name: '背誓者', subtitle: 'The Heretic' },
  listener: { name: '聆心者', subtitle: 'The Listener' },
  coroner: { name: '食灰者', subtitle: 'Ash-Walker' },
  twin: { name: '共誓者', subtitle: 'The Twin' },
  guard: { name: '设闩者', subtitle: 'Guardian' },
  innocent: { name: '无知者', subtitle: 'The Innocent' },
};

/**
 * Message type display names
 */
const messageTypeNames: Record<string, string> = {
  system: '叙述者',
  speech: '发言',
  thinking: '思考',
  action: '行动',
  death: '死亡',
  secret: '密会',
};

export function SpeechModal({ message, player, isOpen, onClose }: SpeechModalProps) {
  if (!isOpen || !message) return null;

  const isSystemMessage = message.from === '叙述者' || message.type === 'system';
  const roleInfo = player ? roleNames[player.role] : null;
  const messageTypeName = messageTypeNames[message.type] || message.type;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Modal container */}
      <div className={cn(
        'relative w-[90%] max-w-2xl max-h-[80vh] bg-gradient-to-b from-slate-900/98 to-slate-950/98 backdrop-blur-sm rounded-lg overflow-hidden',
        getBorderClass('all', 'border-amber-600', 'divider', '2')
      )}>
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />

        {/* Header section */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-slate-900/95 to-slate-900/80 px-8 py-6 border-b border-amber-600/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-3">
              <h2 className={cn(TYPOGRAPHY.h2, 'text-amber-100')}>{message.from}</h2>
              {roleInfo && !isSystemMessage && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-amber-600/70 font-serif">{roleInfo.name}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-500 italic font-serif">{roleInfo.subtitle}</span>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-amber-600/60 hover:text-amber-400 hover:bg-amber-900/20 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded text-xs font-serif bg-amber-900/30 text-amber-500/80 border border-amber-600/30">
              {messageTypeName}
            </span>
            <span className="text-xs text-slate-500">
              {new Date(message.timestamp).toLocaleTimeString('zh-CN')}
            </span>
            {message.round !== undefined && (
              <span className="text-xs text-slate-500">
                · 第 {message.round} 回合
              </span>
            )}
          </div>
        </div>

        {/* Content section - scrollable */}
        <div className="overflow-y-auto px-8 py-6" style={{
          maxHeight: 'calc(80vh - 150px)',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgb(120 113 108) transparent'
        }}>
          <div className={cn(
            'text-slate-200 text-base leading-relaxed font-serif whitespace-pre-wrap break-words',
            message.type === 'thinking' && 'italic text-emerald-400/90',
            message.type === 'system' && 'text-amber-100/90'
          )}>
            {message.content}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-10 bg-gradient-to-t from-slate-950/95 to-slate-950/80 px-8 py-4 border-t border-amber-600/20 flex justify-end gap-3">
          <Button
            onClick={onClose}
            className="bg-amber-900/30 text-amber-400 hover:bg-amber-900/50 border border-amber-600/40"
          >
            关闭
          </Button>
        </div>

        {/* Decorative corners */}
        <svg className="absolute top-0 left-0 w-12 h-12 text-amber-600/20 pointer-events-none">
          <path d="M0 0 L12 0 M0 0 L0 12" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="3" fill="currentColor" />
        </svg>
        <svg className="absolute top-0 right-0 w-12 h-12 text-amber-600/20 pointer-events-none">
          <path d="M48 0 L36 0 M48 0 L48 12" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="48" cy="0" r="3" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
