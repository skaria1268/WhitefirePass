/**
 * Main game board component - orchestrates the entire game UI
 */

'use client';

import { useGameStore } from '@/stores/game-store';
import { PlayerCard } from './PlayerCard';
import { MessageFlow } from './MessageFlow';
import { ControlPanel } from './ControlPanel';
import { Dog, Gamepad2 } from 'lucide-react';

export function GameBoard() {
  const { gameState } = useGameStore();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-3">
            <Dog className="w-10 h-10" />
            AI 狼人杀
          </h1>
          <p className="text-muted-foreground">
            观看 AI 玩家在经典社交推理游戏中辩论、欺骗和推理
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Players */}
          <div className="lg:col-span-1 space-y-4">
            <div className="rounded-lg bg-card border border-border p-4">
              <h2 className="text-xl font-bold text-card-foreground mb-4">玩家列表</h2>
              {gameState ? (
                <div className="space-y-3">
                  {gameState.players.map((player) => (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      showRole={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <p>暂无进行中的游戏</p>
                  <p className="text-sm mt-2">开始新游戏以开始</p>
                </div>
              )}
            </div>

            {/* Control Panel */}
            <ControlPanel />
          </div>

          {/* Right Column - Message Flow */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-card border border-border p-4 h-[calc(100vh-180px)]">
              <h2 className="text-xl font-bold text-card-foreground mb-4">游戏日志</h2>
              <div className="h-[calc(100%-3rem)]">
                {gameState ? (
                  <MessageFlow messages={gameState.messages} />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <p className="text-lg mb-2 flex items-center justify-center gap-2">
                        <Gamepad2 className="w-6 h-6" />
                        准备好开始了吗？
                      </p>
                      <p className="text-sm">
                        输入你的 Gemini API 密钥并开始新游戏
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
