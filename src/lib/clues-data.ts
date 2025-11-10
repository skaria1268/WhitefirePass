/**
 * Clue data - predefined documents and artifacts
 */

import type { Clue } from '@/types/game';

/**
 * The traveler's testament - first clue
 * This diary tells the story of the previous 15-person group
 */
export const TRAVELER_TESTAMENT: Clue = {
  id: 'testament-001',
  title: '迷路旅人的遗书',
  category: 'diary',
  description: '一本沾满灰尘的日记本，记录了前一批旅人的遭遇。最后几页带有暗红色的痕迹...',
  date: '10月24日 - 10月29日',
  unlockedAt: Date.now(),
  isRead: false,
  content: [
    {
      date: '10月24日',
      text: `我们一行{warning:fifteen}十五人{/warning}，是从城里来{place:white}白烬山口{/place}登山的旅行团。

导游说这条路线很经典，秋天的景色最美。大家都很兴奋。

天气预报说有暴风雪，但导游说问题不大。我们准备充分，有足够的补给。

下午四点，我们抵达半山腰的避难山庄。这是一座很古老的木屋，据说以前是猎人的驻地。

导游说我们会在这里过夜，明天继续上山。

现在是晚上八点。风雪突然大得可怕。

导游的脸色很难看。他一直在看手机，但{warning:signal}已经没有信号了{/warning}。`,
    },
    {
      date: '10月25日',
      text: `暴风雪还没停。

更糟的是，{warning:door}门打不开了{/warning}。

我们所有人都试过。窗户也是。就像有什么东西把我们封在里面。

导游说这很不正常。他说自己来过这里很多次，从来没遇到过这种情况。

大厅里有个壁炉，火焰是{cold:white}白色的{/cold}。我问导游这是什么，他说不知道，这火昨晚就在这里燃烧，也不知道是谁点的。

火焰散发的是寒意，不是温暖。

墙上有一幅画。十五个人围成一圈，中间是{sacrifice:blood}一滩血{/sacrifice}。画很旧，很模糊，但让人不安。

晚上，我听到低语。

不是风声，也不是人声。

是从白色的火焰里传来的。`,
    },
    {
      date: '10月26日',
      text: `今天早上，有些人变了。

我说不清是哪里不对，但我能感觉到。

他们的眼神，说话的方式，看彼此的表情...都不太一样了。

导游把大家召集起来。他的声音在颤抖。

"昨晚，"他说，"昨晚我听到了声音。"

"{contract:contract}山灵的契约{/contract}。"

他说这座山庄是{warning:cursed}被诅咒的{/warning}。据说很久以前，这里的猎人违背了山灵的禁忌，屠杀了山中的生灵。

山灵降下了惩罚。

任何{warning:fifteen}十五人一同进入这座山庄{/warning}的群体，都会触发契约。

{contract:pact}必须献祭过半数，幸存者才能离开{/contract}。

其中{evil:marked}三人会被山灵标记{/evil}，成为收割者。

剩下的人是羔羊，必须找出收割者，否则会被一个个杀死。

我以为他疯了。

但白色的火焰还在燃烧。

门还是打不开。

而且...有些人的眼神确实变了。`,
    },
    {
      date: '10月27日',
      text: `{warning:warning}仪式开始了{/warning}。

昨晚有人死了。

是团里的一个年轻人。我们早上发现他的时候，他躺在走廊里，已经没有呼吸。

身上没有伤口，但表情极度恐惧。

就像被冻死的。

被标记的三个人在夜里做了这件事。

但我们不知道是谁。

白天，我们要{lamb:vote}投票决定献祭谁{/lamb}。

这是{contract:rule}契约的规则{/contract}：白天投票，晚上猎杀。直到一方全灭，或者献祭过半。

团里有些人有特殊能力。聆心者说他昨晚看到了某人是"污秽"。两个共誓者认出了彼此。

但谁说的是真话？谁又在说谎？

所有人都在互相指责，互相怀疑。

最后，投票的结果是一个一直沉默的女孩。

而那个女孩，是我的朋友。

我也投了她。

因为我想活下来。`,
    },
    {
      date: '10月28日',
      text: `又过了一天。

又死了两个人。昨晚死了一个，今天白天被献祭了一个。

我们还剩{sacrifice:count}十一个人{/sacrifice}。

团队已经崩溃了。没有人相信任何人。声称能看穿真相的人可能在说谎。说自己是共誓者的人可能在伪装。

被烙印的三个人隐藏得很好。他们混在人群中，说谎、引导、制造混乱。

而我们这些羔羊，只能靠猜测和恐惧来做出判断。

我怀疑我会是下一个。

因为我一直在质疑，在提出不同意见。

收割者不会放过这样的人。

{fear:target}我成了他们的目标{/fear}。

今晚，如果设闩者不保护我...

我可能活不过明天。`,
    },
    {
      date: '10月29日 清晨',
      text: `如果有人读到这封遗书...

我今晚会死。

我能感觉到。他们的眼神已经锁定了我。

白天的投票也会指向我。因为他们成功地把我塑造成了威胁。

对不起，我想把真相记录下来。

{warning:warning}这座山庄不是避难所，是{sacrifice:altar}祭坛{/sacrifice}{/warning}。

{contract:contract}山灵的契约是真实的{/contract}。{warning:fifteen}每当有十五人进入这里{/warning}，诅咒就会启动。

如果你想活下来：

仔细观察每个人的行为。被烙印的人会在言语上露出破绽，会相互配合，会转移怀疑。

寻找可以信任的角色。聆心者能验人，食灰者能验尸，共誓者互相知晓，设闩者能保护。

但永远不要完全相信任何人。这场游戏的核心就是谎言和伪装。

我听到脚步声了。

白色的火焰在等待。

对不起。

——一个即将被献祭的羔羊的最后遗言

{contract:contract}仪式会继续{/contract}。

直到这座山庄被彻底摧毁。`,
    },
  ],
};

/**
 * Get initial clues that should be available at game start
 */
export function getInitialClues(): Clue[] {
  return [TRAVELER_TESTAMENT];
}
