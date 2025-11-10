/**
 * Gothic Design Demo Page
 * Using classic medieval manuscript border decorations
 */

'use client';

import { useState } from 'react';
import { Mountain, Skull, Flame, Moon, Crown, Sword } from 'lucide-react';

export default function GothicDemoPage() {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl font-cinzel text-slate-200 tracking-wider">
            Gothic Design System
          </h1>
          <p className="text-slate-400 font-serif">
            Classic medieval manuscript border decorations
          </p>
        </div>

        {/* Gothic Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-cinzel text-slate-300 mb-8">Illuminated Buttons</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GothicButton
              variant="primary"
              icon={<Flame className="w-5 h-5" />}
              onClick={() => setActiveButton('primary')}
              active={activeButton === 'primary'}
            >
              Primary Action
            </GothicButton>

            <GothicButton
              variant="danger"
              icon={<Skull className="w-5 h-5" />}
              onClick={() => setActiveButton('danger')}
              active={activeButton === 'danger'}
            >
              Danger Action
            </GothicButton>

            <GothicButton
              variant="royal"
              icon={<Crown className="w-5 h-5" />}
              onClick={() => setActiveButton('royal')}
              active={activeButton === 'royal'}
            >
              Royal Action
            </GothicButton>

            <GothicButton
              variant="shadow"
              icon={<Moon className="w-5 h-5" />}
              onClick={() => setActiveButton('shadow')}
              active={activeButton === 'shadow'}
            >
              Shadow Action
            </GothicButton>

            <GothicButton
              variant="battle"
              icon={<Sword className="w-5 h-5" />}
              onClick={() => setActiveButton('battle')}
              active={activeButton === 'battle'}
            >
              Battle Action
            </GothicButton>

            <GothicButton
              variant="mountain"
              icon={<Mountain className="w-5 h-5" />}
              onClick={() => setActiveButton('mountain')}
              active={activeButton === 'mountain'}
            >
              Mountain Action
            </GothicButton>
          </div>
        </section>

        {/* Gothic Containers Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-cinzel text-slate-300 mb-8">Illuminated Panels</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GothicContainer variant="ornate">
              <div className="space-y-4">
                <h3 className="text-2xl font-cinzel text-amber-300 flex items-center gap-2">
                  <Crown className="w-6 h-6" />
                  Ornate Manuscript
                </h3>
                <p className="text-slate-300 font-serif leading-relaxed text-sm">
                  Inspired by the Book of Hours, featuring intricate gold leaf borders,
                  floral marginalia, and elaborate corner pieces typical of 14th century
                  illuminated manuscripts.
                </p>
              </div>
            </GothicContainer>

            <GothicContainer variant="shadow">
              <div className="space-y-4">
                <h3 className="text-2xl font-cinzel text-purple-300 flex items-center gap-2">
                  <Moon className="w-6 h-6" />
                  Shadow Codex
                </h3>
                <p className="text-slate-300 font-serif leading-relaxed text-sm">
                  Dark purple borders with silver accents, reminiscent of ecclesiastical
                  manuscripts from Gothic cathedrals. Features delicate filigree work.
                </p>
              </div>
            </GothicContainer>

            <GothicContainer variant="blood">
              <div className="space-y-4">
                <h3 className="text-2xl font-cinzel text-red-300 flex items-center gap-2">
                  <Flame className="w-6 h-6" />
                  Crimson Testament
                </h3>
                <p className="text-slate-300 font-serif leading-relaxed text-sm">
                  Red and gold borders inspired by royal manuscripts, featuring bold
                  geometric patterns mixed with organic vine motifs.
                </p>
              </div>
            </GothicContainer>

            <GothicContainer variant="frost">
              <div className="space-y-4">
                <h3 className="text-2xl font-cinzel text-cyan-300 flex items-center gap-2">
                  <Mountain className="w-6 h-6" />
                  Frost Psalter
                </h3>
                <p className="text-slate-300 font-serif leading-relaxed text-sm">
                  Cool blue illumination with silver details, evoking northern European
                  manuscripts with their crystalline precision.
                </p>
              </div>
            </GothicContainer>
          </div>
        </section>

        {/* Large Feature Container */}
        <section>
          <h2 className="text-3xl font-cinzel text-slate-300 mb-8">Featured Illumination</h2>

          <GothicContainer variant="ornate" size="large">
            <div className="space-y-6">
              <div className="text-center space-y-3">
                <Crown className="w-16 h-16 mx-auto text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                <h3 className="text-4xl font-cinzel text-amber-300 drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]">
                  The Whitefire Covenant
                </h3>
                <p className="text-sm font-cinzel tracking-widest text-slate-400 uppercase">
                  A Sacred Contract Written in Snow and Ash
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3 text-center">
                  <h4 className="text-lg font-cinzel text-amber-200">⚔ The Harvest ⚔</h4>
                  <p className="text-slate-400 font-serif text-sm leading-relaxed">
                    Three marked souls, bound by ancient hunger, hunt beneath the pale moon.
                    Their covenant written in shadow and flame, sealed by blood and darkness.
                  </p>
                </div>
                <div className="space-y-3 text-center">
                  <h4 className="text-lg font-cinzel text-amber-200">✟ The Lamb ✟</h4>
                  <p className="text-slate-400 font-serif text-sm leading-relaxed">
                    Twelve innocent travelers, armed with faith and reason, must pierce
                    the veil of deception before winter's mercy fades forever.
                  </p>
                </div>
              </div>
            </div>
          </GothicContainer>
        </section>
      </div>
    </div>
  );
}

/**
 * Medieval Manuscript Ornaments
 * Classic decorative elements from illuminated manuscripts
 */

// Border corner piece - complex geometric and floral pattern
function CornerOrnament({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className={className}>
      <defs>
        <radialGradient id={`corner-gradient-${color}`}>
          <stop offset="0%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <g fill={color} opacity="0.4">
        {/* Outer decorative frame */}
        <path d="M 10,10 L 10,50 Q 10,10 50,10 L 10,10 Z" stroke={color} strokeWidth="2" fill="none" />
        <path d="M 5,5 L 5,60 Q 5,5 60,5 L 5,5 Z" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />

        {/* Inner flourish */}
        <circle cx="30" cy="30" r="20" fill={`url(#corner-gradient-${color})`} />
        <circle cx="30" cy="30" r="15" fill="none" stroke={color} strokeWidth="1.5" />
        <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="1" />

        {/* Decorative petals */}
        <path d="M 30,15 Q 35,20 30,25 Q 25,20 30,15 Z" />
        <path d="M 45,30 Q 40,35 35,30 Q 40,25 45,30 Z" />
        <path d="M 30,45 Q 25,40 30,35 Q 35,40 30,45 Z" />
        <path d="M 15,30 Q 20,25 25,30 Q 20,35 15,30 Z" />

        {/* Diagonal decorative lines */}
        <path d="M 50,10 L 80,10 M 55,15 L 85,15 M 60,20 L 90,20" stroke={color} strokeWidth="1" opacity="0.3" />
        <path d="M 10,50 L 10,80 M 15,55 L 15,85 M 20,60 L 20,90" stroke={color} strokeWidth="1" opacity="0.3" />

        {/* Corner flourish extensions */}
        <path d="M 60,5 Q 70,8 80,5 T 100,5" stroke={color} strokeWidth="1.5" fill="none" />
        <path d="M 5,60 Q 8,70 5,80 T 5,100" stroke={color} strokeWidth="1.5" fill="none" />
      </g>
    </svg>
  );
}

// Elaborate border decoration - inspired by illuminated manuscript margins
function BorderDecoration({ className = '', color = 'currentColor', vertical = false }: { className?: string; color?: string; vertical?: boolean }) {
  return (
    <svg
      width={vertical ? "60" : "400"}
      height={vertical ? "400" : "60"}
      viewBox={vertical ? "0 0 60 400" : "0 0 400 60"}
      className={className}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id={`border-pattern-${color}-${vertical ? 'v' : 'h'}`} x="0" y="0" width="80" height="60" patternUnits="userSpaceOnUse">
          {/* Repeating decorative motif */}
          <circle cx="40" cy="30" r="8" fill={color} opacity="0.3" />
          <circle cx="40" cy="30" r="12" fill="none" stroke={color} strokeWidth="1" opacity="0.2" />
          <path d="M 30,30 Q 35,25 40,30 Q 35,35 30,30 Z" fill={color} opacity="0.25" />
          <path d="M 50,30 Q 45,25 40,30 Q 45,35 50,30 Z" fill={color} opacity="0.25" />
        </pattern>
      </defs>

      {vertical ? (
        <g>
          <rect width="60" height="400" fill={`url(#border-pattern-${color}-v)`} />
          <path d="M 30,0 Q 35,50 30,100 T 30,200 Q 25,250 30,300 T 30,400"
                stroke={color} strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M 20,20 L 25,25 L 20,30 M 40,20 L 35,25 L 40,30"
                stroke={color} strokeWidth="1" opacity="0.3" />
        </g>
      ) : (
        <g>
          <rect width="400" height="60" fill={`url(#border-pattern-${color}-h)`} />
          <path d="M 0,30 Q 50,35 100,30 T 200,30 Q 250,25 300,30 T 400,30"
                stroke={color} strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M 20,20 L 25,25 L 30,20 M 20,40 L 25,35 L 30,40"
                stroke={color} strokeWidth="1" opacity="0.3" />
        </g>
      )}
    </svg>
  );
}

// Central illumination - like a decorated initial letter
function CentralIllumination({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100" className={className}>
      <defs>
        <radialGradient id={`central-gradient-${color}`}>
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="70%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Central medallion */}
      <circle cx="50" cy="50" r="40" fill={`url(#central-gradient-${color})`} />
      <circle cx="50" cy="50" r="35" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      <circle cx="50" cy="50" r="30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="50" cy="50" r="25" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />

      {/* Decorative rays */}
      <g opacity="0.4">
        <path d="M 50,10 L 50,20 M 50,80 L 50,90" stroke={color} strokeWidth="2" />
        <path d="M 10,50 L 20,50 M 80,50 L 90,50" stroke={color} strokeWidth="2" />
        <path d="M 20,20 L 27,27 M 73,73 L 80,80" stroke={color} strokeWidth="1.5" />
        <path d="M 80,20 L 73,27 M 27,73 L 20,80" stroke={color} strokeWidth="1.5" />
      </g>

      {/* Inner flower pattern */}
      <g fill={color} opacity="0.5">
        <path d="M 50,35 Q 55,40 50,45 Q 45,40 50,35 Z" />
        <path d="M 65,50 Q 60,55 55,50 Q 60,45 65,50 Z" />
        <path d="M 50,65 Q 45,60 50,55 Q 55,60 50,65 Z" />
        <path d="M 35,50 Q 40,45 45,50 Q 40,55 35,50 Z" />
      </g>
    </svg>
  );
}

/**
 * Gothic Button Component
 */
interface GothicButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'danger' | 'royal' | 'shadow' | 'battle' | 'mountain';
  icon?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}

function GothicButton({ children, variant, icon, onClick, active }: GothicButtonProps) {
  const variants = {
    primary: { gradient: 'from-amber-600 to-amber-800', color: 'rgb(251,191,36)', textColor: 'text-amber-200' },
    danger: { gradient: 'from-red-700 to-red-900', color: 'rgb(248,113,113)', textColor: 'text-red-200' },
    royal: { gradient: 'from-purple-700 to-purple-900', color: 'rgb(216,180,254)', textColor: 'text-purple-200' },
    shadow: { gradient: 'from-slate-700 to-slate-900', color: 'rgb(203,213,225)', textColor: 'text-slate-200' },
    battle: { gradient: 'from-orange-700 to-orange-900', color: 'rgb(251,146,60)', textColor: 'text-orange-200' },
    mountain: { gradient: 'from-cyan-700 to-cyan-900', color: 'rgb(103,232,249)', textColor: 'text-cyan-200' },
  };

  const v = variants[variant];

  return (
    <button
      onClick={onClick}
      className={`
        relative group
        px-10 py-5
        bg-gradient-to-br ${v.gradient}
        border-4 border-double border-opacity-60
        font-cinzel tracking-widest text-sm uppercase
        text-white
        transition-all duration-700
        shadow-2xl
        hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]
        hover:scale-[1.03]
        overflow-visible
        ${active ? 'ring-4 ring-offset-2 ring-offset-slate-950' : ''}
      `}
      style={{ borderColor: v.color }}
    >
      {/* Corner ornaments */}
      <CornerOrnament
        className="absolute -top-8 -left-8 transition-all duration-700 group-hover:scale-110 drop-shadow-2xl"
        color={v.color}
      />
      <CornerOrnament
        className="absolute -top-8 -right-8 scale-x-[-1] transition-all duration-700 group-hover:scale-110 drop-shadow-2xl"
        color={v.color}
      />
      <CornerOrnament
        className="absolute -bottom-8 -left-8 scale-y-[-1] transition-all duration-700 group-hover:scale-110 drop-shadow-2xl"
        color={v.color}
      />
      <CornerOrnament
        className="absolute -bottom-8 -right-8 scale-[-1] transition-all duration-700 group-hover:scale-110 drop-shadow-2xl"
        color={v.color}
      />

      {/* Border decorations */}
      <BorderDecoration
        className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none"
        color={v.color}
      />

      {/* Content */}
      <span className={`relative z-10 flex items-center justify-center gap-3 ${v.textColor} drop-shadow-lg`}>
        {icon}
        {children}
      </span>

      {/* Inner glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${v.color}, transparent)` }}
      />
    </button>
  );
}

/**
 * Gothic Container Component
 */
interface GothicContainerProps {
  children: React.ReactNode;
  variant: 'ornate' | 'shadow' | 'blood' | 'frost';
  size?: 'normal' | 'large';
}

function GothicContainer({ children, variant, size = 'normal' }: GothicContainerProps) {
  const variants = {
    ornate: {
      gradient: 'from-amber-950/80 via-slate-900/95 to-amber-950/80',
      color: 'rgb(251,191,36)',
      border: 'border-amber-500/60'
    },
    shadow: {
      gradient: 'from-purple-950/80 via-slate-900/95 to-purple-950/80',
      color: 'rgb(216,180,254)',
      border: 'border-purple-500/60'
    },
    blood: {
      gradient: 'from-red-950/80 via-slate-900/95 to-red-950/80',
      color: 'rgb(248,113,113)',
      border: 'border-red-500/60'
    },
    frost: {
      gradient: 'from-cyan-950/80 via-slate-900/95 to-cyan-950/80',
      color: 'rgb(103,232,249)',
      border: 'border-cyan-500/60'
    },
  };

  const v = variants[variant];
  const padding = size === 'large' ? 'p-20' : 'p-12';

  return (
    <div className="relative group">
      <div
        className={`
          relative
          ${padding}
          bg-gradient-to-br ${v.gradient}
          border-8 border-double ${v.border}
          shadow-2xl
          backdrop-blur-lg
          transition-all duration-1000
          hover:shadow-[0_0_50px_rgba(0,0,0,0.7)]
          overflow-visible
        `}
      >
        {/* Corner ornaments - larger and more elaborate */}
        <CornerOrnament
          className="absolute -top-12 -left-12 transition-all duration-1000 group-hover:scale-110 drop-shadow-2xl"
          color={v.color}
        />
        <CornerOrnament
          className="absolute -top-12 -right-12 scale-x-[-1] transition-all duration-1000 group-hover:scale-110 drop-shadow-2xl"
          color={v.color}
        />
        <CornerOrnament
          className="absolute -bottom-12 -left-12 scale-y-[-1] transition-all duration-1000 group-hover:scale-110 drop-shadow-2xl"
          color={v.color}
        />
        <CornerOrnament
          className="absolute -bottom-12 -right-12 scale-[-1] transition-all duration-1000 group-hover:scale-110 drop-shadow-2xl"
          color={v.color}
        />

        {/* Side center illuminations */}
        <CentralIllumination
          className="absolute top-1/2 -left-10 -translate-y-1/2 transition-all duration-1000 group-hover:scale-110 drop-shadow-2xl"
          color={v.color}
        />
        <CentralIllumination
          className="absolute top-1/2 -right-10 -translate-y-1/2 transition-all duration-1000 group-hover:scale-110 drop-shadow-2xl"
          color={v.color}
        />
        <CentralIllumination
          className="absolute -top-10 left-1/2 -translate-x-1/2 transition-all duration-1000 group-hover:scale-110 drop-shadow-2xl"
          color={v.color}
        />
        <CentralIllumination
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 group-hover:scale-110 drop-shadow-2xl"
          color={v.color}
        />

        {/* Border decorations */}
        <BorderDecoration
          className="absolute top-0 left-0 w-full opacity-40 pointer-events-none"
          color={v.color}
        />
        <BorderDecoration
          className="absolute bottom-0 left-0 w-full opacity-40 pointer-events-none scale-y-[-1]"
          color={v.color}
        />
        <BorderDecoration
          className="absolute left-0 top-0 h-full opacity-40 pointer-events-none"
          color={v.color}
          vertical
        />
        <BorderDecoration
          className="absolute right-0 top-0 h-full opacity-40 pointer-events-none scale-x-[-1]"
          color={v.color}
          vertical
        />

        {/* Multiple inner borders for manuscript effect */}
        <div className="absolute inset-6 border-4 border-double border-white/10 pointer-events-none" />
        <div className="absolute inset-10 border-2 border-white/5 pointer-events-none" />
        <div className="absolute inset-12 border border-white/5 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${v.color}, transparent 70%)` }}
        />
      </div>
    </div>
  );
}
