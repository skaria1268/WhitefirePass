/**
 * Tarot Card Component - 1913 Vintage Style
 * Ornate card design for player/traveler details
 */

'use client';

import { cn } from '@/lib/utils';
import type { Player } from '@/types/game';

interface TarotCardProps {
  player: Player;
  className?: string;
  isFlipped?: boolean;
}

/**
 * Ornate border pattern - SVG decorative elements
 */
function CardBorder() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 200 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer border */}
      <rect
        x="5"
        y="5"
        width="190"
        height="310"
        stroke="currentColor"
        strokeWidth="1"
        className="text-amber-600/80"
      />
      <rect
        x="8"
        y="8"
        width="184"
        height="304"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-amber-500/60"
      />

      {/* Corner ornaments - Top Left */}
      <g className="text-amber-600">
        <path
          d="M15 15 L15 35 M15 15 L35 15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="15" cy="15" r="3" fill="currentColor" />
        <path
          d="M20 20 Q25 15 30 20 T40 20"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M20 20 Q15 25 20 30 T20 40"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
      </g>

      {/* Corner ornaments - Top Right */}
      <g className="text-amber-600">
        <path
          d="M185 15 L185 35 M185 15 L165 15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="185" cy="15" r="3" fill="currentColor" />
        <path
          d="M180 20 Q175 15 170 20 T160 20"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M180 20 Q185 25 180 30 T180 40"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
      </g>

      {/* Corner ornaments - Bottom Left */}
      <g className="text-amber-600">
        <path
          d="M15 305 L15 285 M15 305 L35 305"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="15" cy="305" r="3" fill="currentColor" />
        <path
          d="M20 300 Q25 305 30 300 T40 300"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M20 300 Q15 295 20 290 T20 280"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
      </g>

      {/* Corner ornaments - Bottom Right */}
      <g className="text-amber-600">
        <path
          d="M185 305 L185 285 M185 305 L165 305"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="185" cy="305" r="3" fill="currentColor" />
        <path
          d="M180 300 Q175 305 170 300 T160 300"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M180 300 Q185 295 180 290 T180 280"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
      </g>

      {/* Top center ornament */}
      <g className="text-amber-600">
        <path
          d="M100 15 Q90 20 100 25 Q110 20 100 15 Z"
          fill="currentColor"
          opacity="0.6"
        />
        <circle cx="100" cy="20" r="2" fill="currentColor" />
        <path
          d="M85 18 Q100 12 115 18"
          stroke="currentColor"
          strokeWidth="0.6"
          fill="none"
        />
      </g>

      {/* Bottom center ornament */}
      <g className="text-amber-600">
        <path
          d="M100 305 Q90 300 100 295 Q110 300 100 305 Z"
          fill="currentColor"
          opacity="0.6"
        />
        <circle cx="100" cy="300" r="2" fill="currentColor" />
        <path
          d="M85 302 Q100 308 115 302"
          stroke="currentColor"
          strokeWidth="0.6"
          fill="none"
        />
      </g>

      {/* Decorative side patterns */}
      <g className="text-amber-500/40">
        {/* Left side flourishes */}
        <path
          d="M12 80 Q18 85 12 90 M12 100 Q18 105 12 110 M12 120 Q18 125 12 130"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M12 190 Q18 195 12 200 M12 210 Q18 215 12 220 M12 230 Q18 235 12 240"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />

        {/* Right side flourishes */}
        <path
          d="M188 80 Q182 85 188 90 M188 100 Q182 105 188 110 M188 120 Q182 125 188 130"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M188 190 Q182 195 188 200 M188 210 Q182 215 188 220 M188 230 Q182 235 188 240"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
      </g>
    </svg>
  );
}

/**
 * Card back pattern - intricate vintage design
 */
function CardBackPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background texture */}
      <defs>
        <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="0.5" fill="currentColor" className="text-amber-900/20" />
        </pattern>
        <pattern id="lines" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="0.3" className="text-amber-800/15" />
        </pattern>
      </defs>

      <rect width="200" height="320" fill="url(#dots)" />
      <rect width="200" height="320" fill="url(#lines)" />

      {/* Central mandala design */}
      <g className="text-amber-600" transform="translate(100, 160)">
        {/* Outer circle */}
        <circle r="60" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
        <circle r="55" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
        <circle r="50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />

        {/* Inner decorative rings */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 360) / 12;
          const rad = (angle * Math.PI) / 180;
          const x1 = Math.cos(rad) * 45;
          const y1 = Math.sin(rad) * 45;
          const x2 = Math.cos(rad) * 60;
          const y2 = Math.sin(rad) * 60;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.5"
            />
          );
        })}

        {/* Petals pattern */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 360) / 8;
          return (
            <g key={i} transform={`rotate(${angle})`}>
              <ellipse
                rx="8"
                ry="20"
                cy="-35"
                fill="currentColor"
                opacity="0.3"
              />
              <ellipse
                rx="6"
                ry="15"
                cy="-35"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.6"
              />
            </g>
          );
        })}

        {/* Center ornament */}
        <circle r="12" fill="currentColor" opacity="0.2" />
        <circle r="8" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle r="4" fill="currentColor" opacity="0.4" />

        {/* Small decorative dots */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 360) / 8 + 22.5;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * 25;
          const y = Math.sin(rad) * 25;
          return (
            <circle
              key={`dot-${i}`}
              cx={x}
              cy={y}
              r="2"
              fill="currentColor"
              opacity="0.5"
            />
          );
        })}
      </g>

      {/* Corner flourishes */}
      <g className="text-amber-700/40">
        {/* Top corners */}
        <path d="M30 40 Q40 30 50 40 T70 40" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M170 40 Q160 30 150 40 T130 40" stroke="currentColor" strokeWidth="1" fill="none" />

        {/* Bottom corners */}
        <path d="M30 280 Q40 290 50 280 T70 280" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M170 280 Q160 290 150 280 T130 280" stroke="currentColor" strokeWidth="1" fill="none" />
      </g>

      {/* Top and bottom text areas */}
      <g className="text-amber-700/60">
        <rect x="60" y="50" width="80" height="20" rx="2" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <rect x="60" y="250" width="80" height="20" rx="2" stroke="currentColor" strokeWidth="0.8" fill="none" />
      </g>
    </svg>
  );
}

/**
 * Role-specific decorative symbols
 */
function RoleSymbol({ role }: { role: string }) {
  const symbols: Record<string, string> = {
    marked: '✦', // 烙印者 - 火焰符号
    heretic: '☽', // 背誓者 - 月亮
    listener: '◈', // 聆心者 - 钻石
    coroner: '✟', // 食灰者 - 十字
    twin: '◐◑', // 共誓者 - 阴阳
    guard: '◆', // 设闩者 - 盾牌
    innocent: '○', // 无知者 - 圆
  };

  return (
    <div className="text-4xl text-amber-600/80 font-serif">
      {symbols[role] || '○'}
    </div>
  );
}

export function TarotCard({ player, className, isFlipped = false }: TarotCardProps) {
  const roleNames: Record<string, { name: string; subtitle: string }> = {
    marked: { name: '烙印者', subtitle: 'The Marked' },
    heretic: { name: '背誓者', subtitle: 'The Heretic' },
    listener: { name: '聆心者', subtitle: 'The Listener' },
    coroner: { name: '食灰者', subtitle: 'Ash-Walker' },
    twin: { name: '共誓者', subtitle: 'The Twin' },
    guard: { name: '设闩者', subtitle: 'Guardian' },
    innocent: { name: '无知者', subtitle: 'The Innocent' },
  };

  return (
    <div
      className={cn(
        'relative w-64 h-96 cursor-pointer transition-transform duration-500 preserve-3d',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}
    >
      {/* Card Back */}
      <div
        className="absolute inset-0 backface-hidden rounded-lg overflow-hidden shadow-2xl"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <div className="relative w-full h-full bg-gradient-to-br from-amber-900 via-amber-950 to-black">
          <CardBackPattern />
          <CardBorder />
        </div>
      </div>

      {/* Card Front */}
      <div
        className="absolute inset-0 backface-hidden rounded-lg overflow-hidden shadow-2xl"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}
      >
        <div className="relative w-full h-full bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200">
          <CardBorder />

          {/* Card content */}
          <div className="relative z-10 flex flex-col items-center justify-between h-full p-8">
            {/* Top section - Name */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-amber-900 font-cinzel tracking-wider">
                {player.name}
              </h3>
              <div className="text-xs text-amber-700 font-serif tracking-widest mt-1 opacity-70">
                TRAVELER
              </div>
            </div>

            {/* Middle section - Role symbol */}
            <div className="flex flex-col items-center gap-4">
              <RoleSymbol role={player.role} />

              <div className="text-center">
                <div className="text-lg font-bold text-amber-900 font-cinzel">
                  {roleNames[player.role]?.name}
                </div>
                <div className="text-xs text-amber-700 font-serif tracking-widest mt-1">
                  {roleNames[player.role]?.subtitle}
                </div>
              </div>
            </div>

            {/* Bottom section - Status */}
            <div className="text-center">
              <div className={cn(
                'text-sm font-semibold font-serif tracking-wide',
                player.isAlive ? 'text-amber-800' : 'text-red-900'
              )}>
                {player.isAlive ? '存活' : '已死亡'}
              </div>
            </div>
          </div>

          {/* Decorative corner marks */}
          <div className="absolute top-4 left-4 text-xs text-amber-600/40 font-cinzel">
            {player.id.slice(-4).toUpperCase()}
          </div>
          <div className="absolute bottom-4 right-4 text-xs text-amber-600/40 font-cinzel">
            1913
          </div>
        </div>
      </div>
    </div>
  );
}
