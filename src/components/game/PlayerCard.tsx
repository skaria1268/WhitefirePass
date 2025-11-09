/**
 * Player card component
 */

'use client';

import { useState } from 'react';
import type { Player } from '@/types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/stores/game-store';
import {
  Dog,
  User,
  Eye,
  Sparkles,
  Target,
  Bot,
  Skull,
} from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  showRole?: boolean;
  isCurrent?: boolean;  // Whether this player is currently speaking
}

/**
 * Role color mapping for badges
 */
const roleColors: Record<string, string> = {
  werewolf: 'bg-red-600 hover:bg-red-700',
  villager: 'bg-blue-600 hover:bg-blue-700',
  seer: 'bg-purple-600 hover:bg-purple-700',
  witch: 'bg-green-600 hover:bg-green-700',
  hunter: 'bg-orange-600 hover:bg-orange-700',
};

/**
 * Role border colors for cards
 */
const roleBorderColors: Record<string, string> = {
  werewolf: 'border-red-500/50',
  villager: 'border-blue-500/50',
  seer: 'border-purple-500/50',
  witch: 'border-green-500/50',
  hunter: 'border-orange-500/50',
};

/**
 * Role gradient colors for avatars
 */
const roleGradients: Record<string, string> = {
  werewolf: 'from-red-600 to-red-800',
  villager: 'from-blue-600 to-blue-800',
  seer: 'from-purple-600 to-purple-800',
  witch: 'from-green-600 to-green-800',
  hunter: 'from-orange-600 to-orange-800',
};

/**
 * Role icon components
 */
const roleIconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  werewolf: Dog,
  villager: User,
  seer: Eye,
  witch: Sparkles,
  hunter: Target,
};

/**
 * Role names in Chinese
 */
const roleNames: Record<string, string> = {
  werewolf: '狼人',
  villager: '村民',
  seer: '预言家',
  witch: '女巫',
  hunter: '猎人',
};

/**
 * Player Avatar Component with gradient background
 */
function PlayerAvatar({
  name,
  role,
  isAlive,
}: {
  name: string;
  role: string;
  isAlive: boolean;
}) {
  const RoleIcon = roleIconComponents[role];
  const gradient = roleGradients[role];
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg',
        `bg-gradient-to-br ${gradient}`,
        !isAlive && 'grayscale opacity-50',
      )}
    >
      {RoleIcon ? <RoleIcon className="w-6 h-6" /> : initial}
    </div>
  );
}

function PersonalityEditor({
  player,
  isEditing,
  onToggleEdit,
}: {
  player: { id: string; personality?: string };
  isEditing: boolean;
  onToggleEdit: () => void;
}) {
  const [text, setText] = useState(player.personality || '');
  const { updatePlayerPersonality } = useGameStore();

  const handleSave = () => {
    updatePlayerPersonality(player.id, text);
    onToggleEdit();
  };

  return (
    <div className="mt-3 border-t pt-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-foreground">人设设定</span>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 px-2 text-xs"
          onClick={onToggleEdit}
        >
          {isEditing ? '取消' : '编辑'}
        </Button>
      </div>
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            className="w-full min-h-[80px] p-2 text-xs bg-background border rounded resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入 AI 玩家的性格设定..."
          />
          <Button size="sm" className="w-full h-7 text-xs" onClick={handleSave}>
            保存
          </Button>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground line-clamp-2">
          {player.personality || '暂无人设'}
        </p>
      )}
    </div>
  );
}

export function PlayerCard({ player, showRole = false, isCurrent = false }: PlayerCardProps) {
  const [isEditingPersonality, setIsEditingPersonality] = useState(false);
  const borderColor = roleBorderColors[player.role];

  return (
    <Card
      className={cn(
        'transition-all duration-300 relative',
        player.isAlive
          ? cn(
              'border-2',
              showRole ? borderColor : 'border-border',
              isCurrent && 'ring-4 ring-yellow-500/50 shadow-2xl shadow-yellow-500/20 animate-pulse',
            )
          : 'opacity-50 grayscale border-gray-400',
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          {showRole && (
            <PlayerAvatar
              name={player.name}
              role={player.role}
              isAlive={player.isAlive}
            />
          )}
          <div className="flex-1">
            <CardTitle className="flex items-center justify-between text-lg">
              <span className="flex items-center gap-2">
                {player.name}
              </span>
              {!player.isAlive && (
                <Badge variant="destructive" className="text-xs flex items-center gap-1">
                  <Skull className="w-3 h-3" />
                  已死亡
                </Badge>
              )}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {showRole && (
          <Badge className={cn('w-full justify-center', roleColors[player.role])}>
            {roleNames[player.role]}
          </Badge>
        )}
        <div className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
          {player.isAI ? (
            <>
              <Bot className="w-3 h-3" />
              AI 玩家
            </>
          ) : (
            <>
              <User className="w-3 h-3" />
              人类玩家
            </>
          )}
        </div>

        <PersonalityEditor
          player={player}
          isEditing={isEditingPersonality}
          onToggleEdit={() => setIsEditingPersonality(!isEditingPersonality)}
        />
      </CardContent>
    </Card>
  );
}
