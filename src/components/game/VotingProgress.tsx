/**
 * Voting progress indicator component
 */

'use client';

import type { GameState } from '@/types/game';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Vote, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VotingProgressProps {
  gameState: GameState;
}

export function VotingProgress({ gameState }: VotingProgressProps) {
  const { phase, votes, players } = gameState;

  // Only show during voting phase
  if (phase !== 'voting') return null;

  const alivePlayers = players.filter((p) => p.isAlive);
  const votedPlayers = new Set(votes.map((v) => v.from));
  const totalVoters = alivePlayers.length;
  const votedCount = votedPlayers.size;
  const progress = totalVoters > 0 ? (votedCount / totalVoters) * 100 : 0;
  const allVoted = votedCount === totalVoters;

  return (
    <Card className="bg-gradient-to-br from-orange-950/50 to-orange-900/30 border-orange-500/30 shadow-inner-glow">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Vote className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-semibold text-orange-400 font-cinzel tracking-wide">投票进度</span>
          </div>
          {allVoted && (
            <CheckCircle2 className="w-4 h-4 text-green-400 animate-pulse" />
          )}
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              已投票: {votedCount} / {totalVoters}
            </span>
            <span className={cn(
              "font-semibold",
              allVoted ? "text-green-400" : "text-orange-400"
            )}>
              {progress.toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Show who hasn't voted */}
        {!allVoted && alivePlayers.length <= 8 && (
          <div className="pt-2 border-t border-orange-500/20">
            <div className="text-xs text-muted-foreground mb-1">待投票:</div>
            <div className="flex flex-wrap gap-1">
              {alivePlayers
                .filter((p) => !votedPlayers.has(p.name))
                .map((p) => (
                  <span
                    key={p.id}
                    className="px-2 py-0.5 rounded-full bg-orange-950/50 text-orange-300 text-xs"
                  >
                    {p.name}
                  </span>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
