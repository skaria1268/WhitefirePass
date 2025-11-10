/**
 * Tarot Card Demo Component
 * Shows the tarot card with flip animation
 */

'use client';

import { useState } from 'react';
import { TarotCard } from './TarotCard';
import type { Player } from '@/types/game';

const demoPlayer: Player = {
  id: 'demo-1',
  name: '爱丽丝',
  role: 'marked',
  isAlive: true,
  isAI: true,
  personality: '神秘而危险的旅者',
};

export function TarotCardDemo() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-8">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="cursor-pointer"
        >
          <TarotCard player={demoPlayer} isFlipped={isFlipped} />
        </div>

        <div className="text-center text-slate-300">
          <p className="text-sm font-serif">点击卡片翻转</p>
          <p className="text-xs text-slate-500 mt-2">1913 复古塔罗牌设计</p>
        </div>
      </div>
    </div>
  );
}
