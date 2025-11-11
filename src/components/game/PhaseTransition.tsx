/**
 * Phase transition animation component
 * 阶段过渡动画 - 显示1-2秒的全屏动画
 */

'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon, Vote, Mountain, Users, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PHASE_LABELS } from '@/lib/latin-text';
import type { GamePhase } from '@/types/game';

interface PhaseTransitionProps {
  phase: GamePhase;
  round: number;
  onComplete: () => void;
}

const phaseConfig: Record<GamePhase, {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  latin: string;
  subtitle: string;
  gradient: string;
  iconColor: string;
}> = {
  prologue: {
    icon: Mountain,
    label: '序章',
    latin: PHASE_LABELS.prologue.latin,
    subtitle: PHASE_LABELS.prologue.subtitle,
    gradient: 'from-slate-900 via-slate-800 to-slate-900',
    iconColor: 'text-slate-300',
  },
  setup: {
    icon: Mountain,
    label: '序章',
    latin: PHASE_LABELS.setup.latin,
    subtitle: PHASE_LABELS.setup.subtitle,
    gradient: 'from-slate-900 via-slate-800 to-slate-900',
    iconColor: 'text-slate-300',
  },
  day: {
    icon: Sun,
    label: '白天',
    latin: PHASE_LABELS.day.latin,
    subtitle: PHASE_LABELS.day.subtitle,
    gradient: 'from-amber-900 via-orange-800 to-amber-900',
    iconColor: 'text-amber-300',
  },
  voting: {
    icon: Vote,
    label: '投票',
    latin: PHASE_LABELS.voting.latin,
    subtitle: PHASE_LABELS.voting.subtitle,
    gradient: 'from-orange-900 via-red-800 to-orange-900',
    iconColor: 'text-orange-300',
  },
  secret_meeting: {
    icon: Users,
    label: '密会',
    latin: PHASE_LABELS.secret_meeting.latin,
    subtitle: PHASE_LABELS.secret_meeting.subtitle,
    gradient: 'from-purple-900 via-violet-800 to-purple-900',
    iconColor: 'text-purple-300',
  },
  event: {
    icon: Sparkles,
    label: '事件',
    latin: PHASE_LABELS.event.latin,
    subtitle: PHASE_LABELS.event.subtitle,
    gradient: 'from-teal-900 via-cyan-800 to-teal-900',
    iconColor: 'text-teal-300',
  },
  night: {
    icon: Moon,
    label: '夜晚',
    latin: PHASE_LABELS.night.latin,
    subtitle: PHASE_LABELS.night.subtitle,
    gradient: 'from-blue-950 via-indigo-900 to-blue-950',
    iconColor: 'text-blue-300',
  },
  end: {
    icon: Mountain,
    label: '游戏结束',
    latin: PHASE_LABELS.end.latin,
    subtitle: PHASE_LABELS.end.subtitle,
    gradient: 'from-slate-900 via-cyan-900 to-slate-900',
    iconColor: 'text-cyan-300',
  },
};

export function PhaseTransition({ phase, round, onComplete }: PhaseTransitionProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [animationStage, setAnimationStage] = useState<'enter' | 'show' | 'exit'>('enter');

  const config = phaseConfig[phase];
  const Icon = config.icon;

  useEffect(() => {
    // Enter animation (0-300ms)
    const enterTimer = setTimeout(() => {
      setAnimationStage('show');
    }, 300);

    // Show phase (300-1800ms)
    const showTimer = setTimeout(() => {
      setAnimationStage('exit');
    }, 1800);

    // Exit animation (1800-2000ms)
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(showTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-black/60 backdrop-blur-sm',
        'transition-opacity duration-300',
        animationStage === 'enter' ? 'opacity-0' : '',
        animationStage === 'show' ? 'opacity-100' : '',
        animationStage === 'exit' ? 'opacity-0' : '',
      )}
    >
      {/* Modal card */}
      <div
        className={cn(
          'relative',
          'rounded-2xl border-2 shadow-2xl',
          'bg-gradient-to-br',
          config.gradient,
          config.iconColor.replace('text-', 'border-'),
          'px-12 py-10',
          'flex flex-col items-center gap-5',
          'transition-all duration-500 ease-out',
          animationStage === 'enter' ? 'scale-90 opacity-0' : '',
          animationStage === 'show' ? 'scale-100 opacity-100' : '',
          animationStage === 'exit' ? 'scale-90 opacity-0' : '',
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            'relative',
            animationStage === 'show' && 'animate-pulse',
          )}
        >
          <Icon
            className={cn(
              'w-20 h-20 drop-shadow-xl',
              config.iconColor,
            )}
          />
          {/* Subtle glow */}
          <div
            className={cn(
              'absolute inset-0 blur-2xl opacity-30',
              config.iconColor,
            )}
          />
        </div>

        {/* Phase label */}
        <div className="text-center space-y-1">
          <h2
            className={cn(
              'text-4xl font-bold font-cinzel tracking-wider text-white drop-shadow-md',
            )}
          >
            {config.label}
          </h2>
          <p
            className={cn(
              'text-lg font-cinzel tracking-widest text-white/70 uppercase',
            )}
          >
            {config.latin}
          </p>
          <p
            className={cn(
              'text-xs font-serif tracking-wide text-white/40 italic',
            )}
          >
            {config.subtitle}
          </p>
        </div>

        {/* Round number */}
        {round > 0 && (
          <div
            className={cn(
              'px-5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20',
            )}
          >
            <span className="text-sm font-cinzel text-white/90 tracking-wider">
              第 {round} 回合
            </span>
          </div>
        )}

        {/* Decorative corner elements */}
        <div className="absolute top-3 left-3 w-3 h-3 border-l-2 border-t-2 border-white/30 rounded-tl" />
        <div className="absolute top-3 right-3 w-3 h-3 border-r-2 border-t-2 border-white/30 rounded-tr" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-l-2 border-b-2 border-white/30 rounded-bl" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-r-2 border-b-2 border-white/30 rounded-br" />
      </div>
    </div>
  );
}
