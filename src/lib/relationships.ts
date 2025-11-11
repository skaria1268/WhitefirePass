/**
 * Character relationships configuration
 * Defines how characters react to each other's deaths
 */

import type { CharacterRelationship } from '@/types/game';

/**
 * Relationship graph
 * virtueOnDeath: true = 触发美德（变得更理智强大）, false = 触发罪恶（被压垮）
 */
export const CHARACTER_RELATIONSHIPS: CharacterRelationship[] = [
  // 兄妹关系：托马斯 ⟷ 莉迪亚
  {
    character: '莉迪亚·克劳利',
    target: '托马斯·克劳利',
    type: 'sibling',
    virtueOnDeath: false, // 哥哥死亡 → 莉迪亚崩溃（她的存在意义消失）
  },
  {
    character: '托马斯·克劳利',
    target: '莉迪亚·克劳利',
    type: 'sibling',
    virtueOnDeath: true, // 妹妹死亡 → 托马斯觉醒（最后的救赎机会）
  },

  // 旧识：诺拉 ⟷ 马库斯
  {
    character: '诺拉·格雷',
    target: '马库斯·霍克',
    type: 'acquaintance',
    virtueOnDeath: true, // 马库斯死亡 → 诺拉更冷静理性（学者本能）
  },
  {
    character: '马库斯·霍克',
    target: '诺拉·格雷',
    type: 'acquaintance',
    virtueOnDeath: true, // 诺拉死亡 → 马库斯更警觉（猎人本能）
  },

  // 前恋人：维克多 ⟷ 艾米莉
  {
    character: '维克多·斯通',
    target: '艾米莉·卡特',
    type: 'lover',
    virtueOnDeath: true, // 艾米莉死亡 → 维克多觉醒（最后的救赎）
  },
  {
    character: '艾米莉·卡特',
    target: '维克多·斯通',
    type: 'lover',
    virtueOnDeath: false, // 维克多死亡 → 艾米莉崩溃（救赎失败）
  },

  // 单恋：奥利弗 → 索菲亚
  {
    character: '奥利弗·佩恩',
    target: '索菲亚·阿什福德',
    type: 'crush',
    virtueOnDeath: false, // 索菲亚死亡 → 奥利弗崩溃（失去意义）
  },
  {
    character: '索菲亚·阿什福德',
    target: '奥利弗·佩恩',
    type: 'crush',
    virtueOnDeath: true, // 奥利弗死亡 → 索菲亚更冷酷（失去可利用的人）
  },

  // 债务关系：本杰明 ⟷ 亚历山大
  {
    character: '本杰明·怀特',
    target: '亚历山大·莫里斯',
    type: 'debtor',
    virtueOnDeath: true, // 亚历山大死亡 → 本杰明解脱（监视者消失）
  },
  {
    character: '亚历山大·莫里斯',
    target: '本杰明·怀特',
    type: 'debtor',
    virtueOnDeath: true, // 本杰明死亡 → 亚历山大更冷静（生意失败）
  },

  // 情敌：伊莎贝拉 ⟷ 夏洛特
  {
    character: '伊莎贝拉·费尔法克斯',
    target: '夏洛特·温特斯',
    type: 'rival',
    virtueOnDeath: true, // 夏洛特死亡 → 伊莎贝拉更强势（竞争对手消失）
  },
  {
    character: '夏洛特·温特斯',
    target: '伊莎贝拉·费尔法克斯',
    type: 'rival',
    virtueOnDeath: true, // 伊莎贝拉死亡 → 夏洛特更自信（竞争对手消失）
  },
];

/**
 * Get relationships for a character
 */
export function getRelationshipsForCharacter(characterName: string): CharacterRelationship[] {
  return CHARACTER_RELATIONSHIPS.filter(rel => rel.character === characterName);
}

/**
 * Check if character death triggers state changes
 */
export function getTriggeredStateChanges(
  deadCharacterName: string,
): CharacterRelationship[] {
  return CHARACTER_RELATIONSHIPS.filter(rel => rel.target === deadCharacterName);
}

/**
 * Get relationship type label in Chinese
 */
export function getRelationshipLabel(type: CharacterRelationship['type']): string {
  const labels: Record<CharacterRelationship['type'], string> = {
    sibling: '兄妹',
    lover: '前恋人',
    crush: '暗恋对象',
    rival: '宿敌',
    debtor: '债务关系',
    acquaintance: '旧识',
  };
  return labels[type];
}
