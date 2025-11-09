/**
 * Game state management using Zustand
 */

import { create } from 'zustand';
import type { GameState, GameConfig, Message } from '@/types/game';
import {
  createGame,
  checkWinCondition,
  processNightPhase,
  processVoting,
  addMessage,
  getAlivePlayers,
  getPlayerByName,
} from '@/lib/game-engine';
import { getAIResponse } from '@/lib/gemini';

/**
 * Game store state
 */
interface GameStore {
  gameState: GameState | null;
  isProcessing: boolean;
  apiKey: string;
  lastError: string | null;

  // Actions
  setApiKey: (key: string) => void;
  startGame: (config: GameConfig) => void;
  resetGame: () => void;
  executeNextStep: () => Promise<void>;
  retryCurrentStep: () => Promise<void>;
  clearError: () => void;

  // Internal actions
  advanceToNextPhase: () => void;
  executeCurrentPlayerAction: () => Promise<void>;
}

/**
 * Create game store
 */
export const useGameStore = create<GameStore>((set, get) => ({
  gameState: null,
  isProcessing: false,
  apiKey: '',
  lastError: null,

  /**
   * Set Gemini API key
   */
  setApiKey: (key: string) => {
    set({ apiKey: key });
  },

  /**
   * Start new game
   */
  startGame: (config: GameConfig) => {
    const gameState = createGame(config);
    set({ gameState, isProcessing: false });
  },

  /**
   * Reset game
   */
  resetGame: () => {
    set({ gameState: null, isProcessing: false, lastError: null });
  },

  /**
   * Clear error message
   */
  clearError: () => {
    set({ lastError: null });
  },

  /**
   * Retry current step after error
   */
  retryCurrentStep: async () => {
    set({ lastError: null });
    await get().executeCurrentPlayerAction();
  },

  /**
   * Execute next step in the game
   */
  executeNextStep: async () => {
    const { gameState, isProcessing } = get();

    if (!gameState || isProcessing || gameState.phase === 'end') return;

    set({ isProcessing: true });

    try {
      // Handle setup phase - game starts with day phase
      if (gameState.phase === 'setup') {
        gameState.phase = 'day';
        gameState.round = 1;
        gameState.currentPlayerIndex = 0;
        gameState.messages.push(
          addMessage(gameState, 'system', '第 1 回合开始。天亮了，请大家发言！', 'system', 'all'),
        );
        set({ gameState: { ...gameState }, isProcessing: false });
        return;
      }

      // Check win condition
      const winner = checkWinCondition(gameState);
      if (winner) {
        gameState.winner = winner;
        gameState.phase = 'end';
        gameState.messages.push(
          addMessage(
            gameState,
            'system',
            `游戏结束！${winner === 'werewolf' ? '狼人阵营' : '村民阵营'}获胜！`,
            'system',
          ),
        );
        set({ gameState: { ...gameState }, isProcessing: false });
        return;
      }

      await get().executeCurrentPlayerAction();
    } catch (error) {
      console.error('Execute step error:', error);
      set({ isProcessing: false });
    }
  },

  /**
   * Advance to next phase
   */
  advanceToNextPhase: () => {
    const { gameState } = get();
    if (!gameState) return;

    if (gameState.phase === 'day') {
      // Day phase ended, go to voting
      gameState.phase = 'voting';
      gameState.currentPlayerIndex = 0;
      gameState.votes = [];
      gameState.messages.push(
        addMessage(gameState, 'system', '讨论结束。现在开始投票！', 'system', 'all'),
      );
    } else if (gameState.phase === 'voting') {
      // Voting phase ended, process votes and go to night
      const { eliminated, message } = processVoting(gameState);
      if (eliminated) {
        const player = gameState.players.find((p) => p.id === eliminated.id);
        if (player) {
          player.isAlive = false;
        }
      }
      gameState.messages.push(message);
      gameState.phase = 'night';
      gameState.currentPlayerIndex = 0;
      gameState.messages.push(
        addMessage(gameState, 'system', '夜幕降临... 狼人请睁眼', 'system', 'all'),
      );
    } else if (gameState.phase === 'night') {
      // Night phase ended, process night actions and go to day
      const { killedPlayer, message } = processNightPhase(gameState);
      if (killedPlayer) {
        const player = gameState.players.find((p) => p.id === killedPlayer.id);
        if (player) {
          player.isAlive = false;
        }
      }
      gameState.messages.push(message);
      gameState.round += 1;
      gameState.phase = 'day';
      gameState.currentPlayerIndex = 0;
      gameState.messages.push(
        addMessage(gameState, 'system', `第 ${gameState.round} 回合。天亮了！`, 'system', 'all'),
      );
    }

    set({ gameState: { ...gameState } });
  },

  /**
   * Execute current player's action
   */
  executeCurrentPlayerAction: async () => {
    const { gameState, apiKey } = get();
    if (!gameState) return;

    const alivePlayers = getAlivePlayers(gameState).filter(
      (p) => gameState.phase !== 'night' || p.role === 'werewolf',
    );

    // If all players in current phase have acted, advance to next phase
    if (gameState.currentPlayerIndex >= alivePlayers.length) {
      get().advanceToNextPhase();
      set({ isProcessing: false });
      return;
    }

    const currentPlayer = alivePlayers[gameState.currentPlayerIndex];

    try {
      // Determine message visibility based on phase and role
      let visibility: Message['visibility'] = 'all';
      if (gameState.phase === 'night' && currentPlayer.role === 'werewolf') {
        visibility = 'werewolf'; // Only werewolves can see night discussion
      }

      // Get prompt for display
      const prompt = getPromptForDisplay(currentPlayer, gameState);

      // Add prompt message with same visibility as response
      gameState.messages.push({
        id: `prompt-${Date.now()}`,
        type: 'prompt',
        from: currentPlayer.name,
        content: prompt,
        timestamp: Date.now(),
        round: gameState.round,
        phase: gameState.phase,
        visibility,
      });

      set({ gameState: { ...gameState } });

      // Get AI response
      const response = await getAIResponse(currentPlayer, gameState, { apiKey });

      // Add thinking/response message
      const messageType = gameState.phase === 'voting' ? 'vote' : 'speech';
      gameState.messages.push(
        addMessage(gameState, currentPlayer.name, response, messageType, visibility),
      );

      // Record vote if in voting phase
      if (gameState.phase === 'voting') {
        const votedName = response.trim();
        const targetPlayer = getPlayerByName(gameState, votedName);
        if (targetPlayer?.isAlive) {
          gameState.votes.push({ from: currentPlayer.name, target: votedName });
        }
      }

      // Move to next player only on success
      gameState.currentPlayerIndex += 1;

      set({ gameState: { ...gameState }, isProcessing: false, lastError: null });
    } catch (error) {
      console.error(`Error executing action for ${currentPlayer.name}:`, error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({
        isProcessing: false,
        lastError: `${currentPlayer.name} 的 AI 请求失败: ${errorMessage}`,
      });
    }
  },
}));

/**
 * Get prompt text for display
 */
function getPromptForDisplay(
  player: { name: string; role: string },
  gameState: GameState,
): string {
  const { phase, round, messages } = gameState;
  const alivePlayers = getAlivePlayers(gameState);

  // Filter messages based on visibility
  const visibleMessages = messages.filter((m) => {
    if (m.visibility === 'all') return true;
    if (m.visibility === 'werewolf' && player.role === 'werewolf') return true;
    if (m.visibility === 'seer' && player.role === 'seer') return true;
    if (typeof m.visibility === 'object' && m.visibility.player === player.name) return true;
    return false;
  });

  const recentMessages = visibleMessages
    .filter((m) => m.type === 'speech' || m.type === 'vote' || m.type === 'system')
    .slice(-10);

  const roleNames: Record<string, string> = {
    werewolf: '狼人',
    villager: '村民',
    seer: '预言家',
    witch: '女巫',
    hunter: '猎人',
  };

  const phaseNames: Record<string, string> = {
    setup: '准备',
    night: '夜晚',
    day: '白天',
    voting: '投票',
    end: '结束',
  };

  const roleInstructions = getRoleInstructionsForDisplay(player.role, phase);

  return `【AI Prompt】
玩家：${player.name}
身份：${roleNames[player.role]}
阶段：${phaseNames[phase]}
回合：${round}
存活玩家：${alivePlayers.map((p) => p.name).join('、')}

${roleInstructions}

最近的对话：
${recentMessages.map((m) => `${m.from}: ${m.content}`).join('\n')}

${phase === 'day' ? '请发表你的看法（1-2句话）' : phase === 'voting' ? '请投票选择一个玩家（只回复名字）' : ''}`;
}

/**
 * Get role instructions for display in prompt
 */
function getRoleInstructionsForDisplay(role: string, phase: string): string {
  if (role === 'werewolf') {
    if (phase === 'night') {
      return `【狼人身份 - 夜晚阶段】
你是狼人。现在是夜晚，只有狼人在讨论。
- 你可以和其他狼人商量要杀谁
- 讨论策略和白天如何伪装
- 这些讨论其他玩家听不到`;
    }
    return `【狼人身份 - ${phase === 'day' ? '白天' : '投票'}阶段】
你是狼人，但必须伪装成村民。
⚠️ 重要规则：
- 绝不暴露自己是狼人
- 绝不暴露其他狼人的身份
- 像村民一样说话和投票
- 可以指控真正的村民，转移注意力`;
  }
  if (role === 'seer') {
    return '你是预言家。每晚可以查验一名玩家的身份。谨慎使用你的知识。';
  }
  if (role === 'villager') {
    return '你是村民。通过讨论和投票找出狼人。';
  }
  return '';
}
