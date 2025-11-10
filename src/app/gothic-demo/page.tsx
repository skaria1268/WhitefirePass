/**
 * Gothic Design Demo Page
 * Showcasing ornate gothic-style buttons and containers
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
            Ornate buttons and containers with intricate patterns
          </p>
        </div>

        {/* Gothic Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-cinzel text-slate-300 mb-8">Gothic Buttons</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Button 1: Primary Gothic */}
            <GothicButton
              variant="primary"
              icon={<Flame className="w-5 h-5" />}
              onClick={() => setActiveButton('primary')}
              active={activeButton === 'primary'}
            >
              Primary Action
            </GothicButton>

            {/* Button 2: Danger Gothic */}
            <GothicButton
              variant="danger"
              icon={<Skull className="w-5 h-5" />}
              onClick={() => setActiveButton('danger')}
              active={activeButton === 'danger'}
            >
              Danger Action
            </GothicButton>

            {/* Button 3: Royal Gothic */}
            <GothicButton
              variant="royal"
              icon={<Crown className="w-5 h-5" />}
              onClick={() => setActiveButton('royal')}
              active={activeButton === 'royal'}
            >
              Royal Action
            </GothicButton>

            {/* Button 4: Shadow Gothic */}
            <GothicButton
              variant="shadow"
              icon={<Moon className="w-5 h-5" />}
              onClick={() => setActiveButton('shadow')}
              active={activeButton === 'shadow'}
            >
              Shadow Action
            </GothicButton>

            {/* Button 5: Battle Gothic */}
            <GothicButton
              variant="battle"
              icon={<Sword className="w-5 h-5" />}
              onClick={() => setActiveButton('battle')}
              active={activeButton === 'battle'}
            >
              Battle Action
            </GothicButton>

            {/* Button 6: Mountain Gothic */}
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
          <h2 className="text-3xl font-cinzel text-slate-300 mb-8">Gothic Containers</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Container 1: Ornate Panel */}
            <GothicContainer variant="ornate">
              <div className="space-y-4">
                <h3 className="text-2xl font-cinzel text-amber-300 flex items-center gap-2">
                  <Crown className="w-6 h-6" />
                  Ornate Panel
                </h3>
                <p className="text-slate-300 font-serif leading-relaxed">
                  This container features intricate gothic patterns with golden accents.
                  The border design mimics medieval manuscript illuminations with symmetrical
                  flourishes and corner ornaments.
                </p>
                <div className="flex gap-3 pt-4">
                  <div className="flex-1 h-2 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent rounded-full" />
                </div>
              </div>
            </GothicContainer>

            {/* Container 2: Shadow Panel */}
            <GothicContainer variant="shadow">
              <div className="space-y-4">
                <h3 className="text-2xl font-cinzel text-purple-300 flex items-center gap-2">
                  <Moon className="w-6 h-6" />
                  Shadow Panel
                </h3>
                <p className="text-slate-300 font-serif leading-relaxed">
                  A darker variant with purple undertones and moonlight-inspired decorative
                  elements. Perfect for mysterious or nocturnal content with deep shadows
                  and ethereal glows.
                </p>
                <div className="flex gap-3 pt-4">
                  <div className="flex-1 h-2 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent rounded-full" />
                </div>
              </div>
            </GothicContainer>

            {/* Container 3: Blood Panel */}
            <GothicContainer variant="blood">
              <div className="space-y-4">
                <h3 className="text-2xl font-cinzel text-red-300 flex items-center gap-2">
                  <Flame className="w-6 h-6" />
                  Blood Panel
                </h3>
                <p className="text-slate-300 font-serif leading-relaxed">
                  Crimson-themed container with flame motifs and aggressive angular patterns.
                  The deep red accents create a sense of danger and intensity, ideal for
                  warning messages or dramatic reveals.
                </p>
                <div className="flex gap-3 pt-4">
                  <div className="flex-1 h-2 bg-gradient-to-r from-transparent via-red-500/30 to-transparent rounded-full" />
                </div>
              </div>
            </GothicContainer>

            {/* Container 4: Frost Panel */}
            <GothicContainer variant="frost">
              <div className="space-y-4">
                <h3 className="text-2xl font-cinzel text-cyan-300 flex items-center gap-2">
                  <Mountain className="w-6 h-6" />
                  Frost Panel
                </h3>
                <p className="text-slate-300 font-serif leading-relaxed">
                  Ice-inspired design with crystalline patterns and cool blue tones.
                  The frosted borders suggest winter landscapes and mountain peaks,
                  complementing the Whitefire Pass aesthetic.
                </p>
                <div className="flex gap-3 pt-4">
                  <div className="flex-1 h-2 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent rounded-full" />
                </div>
              </div>
            </GothicContainer>
          </div>
        </section>

        {/* Large Feature Container */}
        <section className="space-y-6">
          <h2 className="text-3xl font-cinzel text-slate-300 mb-8">Featured Container</h2>

          <GothicContainer variant="ornate" size="large">
            <div className="space-y-6">
              <div className="text-center space-y-3">
                <Crown className="w-16 h-16 mx-auto text-amber-400" />
                <h3 className="text-4xl font-cinzel text-amber-300">
                  The Whitefire Covenant
                </h3>
                <p className="text-sm font-cinzel tracking-widest text-slate-400 uppercase">
                  A Sacred Contract Written in Snow and Ash
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-lg font-cinzel text-slate-200">The Harvest</h4>
                  <p className="text-slate-400 font-serif text-sm leading-relaxed">
                    Three marked souls, bound by hunger and shadow, must hunt beneath the moon's
                    cold gaze. Their covenant is written in blood and silence.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-lg font-cinzel text-slate-200">The Lamb</h4>
                  <p className="text-slate-400 font-serif text-sm leading-relaxed">
                    Twelve innocent travelers, armed only with reason and faith, must expose
                    the darkness before the storm consumes all hope.
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-4 pt-6">
                <GothicButton variant="primary" icon={<Flame className="w-4 h-4" />}>
                  Join the Hunt
                </GothicButton>
                <GothicButton variant="shadow" icon={<Moon className="w-4 h-4" />}>
                  Seek the Truth
                </GothicButton>
              </div>
            </div>
          </GothicContainer>
        </section>
      </div>
    </div>
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
    primary: {
      base: 'from-amber-600 to-amber-800 border-amber-400/50',
      hover: 'hover:from-amber-500 hover:to-amber-700',
      shadow: 'shadow-amber-500/25',
      active: 'ring-amber-400/50',
    },
    danger: {
      base: 'from-red-700 to-red-900 border-red-400/50',
      hover: 'hover:from-red-600 hover:to-red-800',
      shadow: 'shadow-red-500/25',
      active: 'ring-red-400/50',
    },
    royal: {
      base: 'from-purple-700 to-purple-900 border-purple-400/50',
      hover: 'hover:from-purple-600 hover:to-purple-800',
      shadow: 'shadow-purple-500/25',
      active: 'ring-purple-400/50',
    },
    shadow: {
      base: 'from-slate-700 to-slate-900 border-slate-400/50',
      hover: 'hover:from-slate-600 hover:to-slate-800',
      shadow: 'shadow-slate-500/25',
      active: 'ring-slate-400/50',
    },
    battle: {
      base: 'from-orange-700 to-orange-900 border-orange-400/50',
      hover: 'hover:from-orange-600 hover:to-orange-800',
      shadow: 'shadow-orange-500/25',
      active: 'ring-orange-400/50',
    },
    mountain: {
      base: 'from-cyan-700 to-cyan-900 border-cyan-400/50',
      hover: 'hover:from-cyan-600 hover:to-cyan-800',
      shadow: 'shadow-cyan-500/25',
      active: 'ring-cyan-400/50',
    },
  };

  const v = variants[variant];

  return (
    <button
      onClick={onClick}
      className={`
        relative group
        px-6 py-3
        bg-gradient-to-br ${v.base}
        border-2 ${active ? `ring-4 ${v.active}` : ''}
        rounded-none
        font-cinzel tracking-wider text-sm
        text-slate-100
        transition-all duration-300
        ${v.hover}
        shadow-lg ${v.shadow}
        overflow-hidden

        before:absolute before:inset-0
        before:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgMjAgMTAgTSAxMCAwIEwgMTAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWdpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]
        before:opacity-50

        after:absolute after:inset-0
        after:border-2 after:border-white/10
        after:rounded-none
        after:pointer-events-none

        clip-path-gothic
      `}
    >
      {/* Corner ornaments */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/30" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/30" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/30" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/30" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon}
        {children}
      </span>

      {/* Hover glow */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
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
      bg: 'from-amber-950/40 via-slate-900/60 to-amber-950/40',
      border: 'border-amber-500/30',
      glow: 'shadow-amber-500/10',
      accent: 'bg-amber-500/20',
    },
    shadow: {
      bg: 'from-purple-950/40 via-slate-900/60 to-purple-950/40',
      border: 'border-purple-500/30',
      glow: 'shadow-purple-500/10',
      accent: 'bg-purple-500/20',
    },
    blood: {
      bg: 'from-red-950/40 via-slate-900/60 to-red-950/40',
      border: 'border-red-500/30',
      glow: 'shadow-red-500/10',
      accent: 'bg-red-500/20',
    },
    frost: {
      bg: 'from-cyan-950/40 via-slate-900/60 to-cyan-950/40',
      border: 'border-cyan-500/30',
      glow: 'shadow-cyan-500/10',
      accent: 'bg-cyan-500/20',
    },
  };

  const v = variants[variant];
  const padding = size === 'large' ? 'p-10' : 'p-6';

  return (
    <div className="relative group">
      {/* Main container */}
      <div
        className={`
          relative
          ${padding}
          bg-gradient-to-br ${v.bg}
          border-2 ${v.border}
          rounded-none
          shadow-2xl ${v.glow}
          backdrop-blur-sm
          overflow-hidden
          transition-all duration-500
          hover:${v.border.replace('/30', '/50')}
        `}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Corner decorations */}
        <svg className="absolute top-0 left-0 w-16 h-16 text-white/10" viewBox="0 0 100 100">
          <path
            d="M 0,0 L 0,30 Q 0,0 30,0 Z M 0,0 L 20,0 L 0,20 Z"
            fill="currentColor"
          />
        </svg>
        <svg className="absolute top-0 right-0 w-16 h-16 text-white/10 transform scale-x-[-1]" viewBox="0 0 100 100">
          <path
            d="M 0,0 L 0,30 Q 0,0 30,0 Z M 0,0 L 20,0 L 0,20 Z"
            fill="currentColor"
          />
        </svg>
        <svg className="absolute bottom-0 left-0 w-16 h-16 text-white/10 transform scale-y-[-1]" viewBox="0 0 100 100">
          <path
            d="M 0,0 L 0,30 Q 0,0 30,0 Z M 0,0 L 20,0 L 0,20 Z"
            fill="currentColor"
          />
        </svg>
        <svg className="absolute bottom-0 right-0 w-16 h-16 text-white/10 transform scale-[-1]" viewBox="0 0 100 100">
          <path
            d="M 0,0 L 0,30 Q 0,0 30,0 Z M 0,0 L 20,0 L 0,20 Z"
            fill="currentColor"
          />
        </svg>

        {/* Inner border accent */}
        <div className="absolute inset-2 border border-white/5 rounded-none pointer-events-none" />

        {/* Side ornaments */}
        <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 ${v.accent}`} />
        <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-12 ${v.accent}`} />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 pointer-events-none" />
      </div>

      {/* Outer glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${v.border.replace('border-', 'from-').replace('/30', '/5')} to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
    </div>
  );
}
