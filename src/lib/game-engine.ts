/**
 * Core game engine - pure functions for game logic
 */

import type {
  GameState,
  Player,
  Message,
  GamePhase,
  Role,
  GameConfig,
} from '@/types/game';

/**
 * Create initial game state
 */
export function createGame(config: GameConfig): GameState {
  const players = createPlayers(config.roles);

  return {
    phase: 'setup',
    round: 0,
    players,
    messages: [
      {
        id: generateId(),
        type: 'system',
        from: 'system',
        content: '游戏开始！正在分配角色...',
        timestamp: Date.now(),
        round: 0,
        phase: 'setup',
        visibility: 'all',
      },
    ],
    votes: [],
    nightVotes: [],
    nightActions: [],
    createdAt: Date.now(),
    lastUpdated: Date.now(),
    currentPlayerIndex: 0,
    waitingForNextStep: true,
  };
}

/**
 * Create players with assigned roles
 */
function createPlayers(roles: Role[]): Player[] {
  const names = [
    'Alice',
    'Bob',
    'Carol',
    'Dave',
    'Eve',
    'Frank',
    'Grace',
    'Henry',
  ];

  const personalities = [
    '你是一个逻辑清晰、善于分析的侦探型玩家，喜欢通过推理找出矛盾点。',
    '你是一个直觉敏锐、情绪化的玩家，经常凭第一感觉做判断。',
    '你是一个谨慎小心、不轻易表态的观察者，喜欢在关键时刻发言。',
    '你是一个热情主动、喜欢带节奏的领导型玩家，经常提出投票建议。',
    '你是一个幽默风趣、喜欢活跃气氛的玩家，但也会认真分析局势。',
    '你是一个冷静理性、数据导向的玩家，喜欢用概率和数据说话。',
    '你是一个新手玩家，比较容易被说服，但也会学习模仿高手的打法。',
    '你是一个老练的玩家，喜欢反向思维，经常提出不同寻常的观点。',
  ];

  const shuffledRoles = shuffle([...roles]);

  return shuffledRoles.map((role, index) => ({
    id: generateId(),
    name: names[index],
    role,
    isAlive: true,
    isAI: true,
    personality: personalities[index],
  }));
}

/**
 * Advance to next game phase
 */
export function advancePhase(state: GameState): GamePhase {
  const phaseOrder: GamePhase[] = ['setup', 'night', 'day', 'voting', 'end'];
  const currentIndex = phaseOrder.indexOf(state.phase);

  if (state.phase === 'voting') {
    return checkWinCondition(state) ? 'end' : 'night';
  }

  if (currentIndex === 0) {
    return 'night';
  }

  return phaseOrder[currentIndex + 1] || 'end';
}

/**
 * Check if game has ended
 */
export function checkWinCondition(
  state: GameState,
): 'werewolf' | 'villager' | null {
  const alivePlayers = state.players.filter((p) => p.isAlive);
  const aliveWerewolves = alivePlayers.filter((p) => p.role === 'werewolf');
  const aliveVillagers = alivePlayers.filter((p) => p.role !== 'werewolf');

  if (aliveWerewolves.length === 0) {
    return 'villager';
  }

  if (aliveWerewolves.length >= aliveVillagers.length) {
    return 'werewolf';
  }

  return null;
}

/**
 * Process night phase - werewolf kill based on votes
 */
export function processNightPhase(state: GameState): {
  killedPlayer: Player | null;
  message: Message;
} {
  if (state.nightVotes.length === 0) {
    return {
      killedPlayer: null,
      message: createMessage('system', '昨夜平安无事'),
    };
  }

  // Count votes
  const voteCounts = new Map<string, number>();
  state.nightVotes.forEach((vote) => {
    voteCounts.set(vote.target, (voteCounts.get(vote.target) ?? 0) + 1);
  });

  // Find player with most votes
  let maxVotes = 0;
  let killedName: string | null = null;

  voteCounts.forEach((count, target) => {
    if (count > maxVotes) {
      maxVotes = count;
      killedName = target;
    }
  });

  const player = state.players.find((p) => p.name === killedName);

  if (!player || !player.isAlive) {
    return {
      killedPlayer: null,
      message: createMessage('system', '昨夜平安无事'),
    };
  }

  return {
    killedPlayer: player,
    message: createMessage(
      'system',
      `昨夜 ${player.name} 被狼人杀害了`,
    ),
  };
}

/**
 * Process voting phase
 */
export function processVoting(state: GameState): {
  eliminated: Player | null;
  message: Message;
} {
  if (state.votes.length === 0) {
    return {
      eliminated: null,
      message: createMessage('system', '没有人投票'),
    };
  }

  const voteCounts = new Map<string, number>();
  state.votes.forEach((vote) => {
    voteCounts.set(vote.target, (voteCounts.get(vote.target) ?? 0) + 1);
  });

  let maxVotes = 0;
  let eliminated: string | null = null;

  voteCounts.forEach((count, target) => {
    if (count > maxVotes) {
      maxVotes = count;
      eliminated = target;
    }
  });

  const player = state.players.find((p) => p.name === eliminated);

  if (!player) {
    return {
      eliminated: null,
      message: createMessage('system', '没有人被淘汰'),
    };
  }

  return {
    eliminated: player,
    message: createMessage(
      'system',
      `${player.name} 被投票淘汰了。`,
    ),
  };
}

/**
 * Add message to game state
 */
export function addMessage(
  state: GameState,
  from: string,
  content: string,
  type: Message['type'] = 'speech',
  visibility: Message['visibility'] = 'all',
): Message {
  return {
    id: generateId(),
    type,
    from,
    content,
    timestamp: Date.now(),
    round: state.round,
    phase: state.phase,
    visibility,
  };
}

/**
 * Create system message
 */
function createMessage(from: string, content: string): Message {
  return {
    id: generateId(),
    type: 'system',
    from,
    content,
    timestamp: Date.now(),
    visibility: 'all',
  };
}

/**
 * Shuffle array
 */
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Generate unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get alive players
 */
export function getAlivePlayers(state: GameState): Player[] {
  return state.players.filter((p) => p.isAlive);
}

/**
 * Get player by name
 */
export function getPlayerByName(
  state: GameState,
  name: string,
): Player | undefined {
  return state.players.find((p) => p.name === name);
}
