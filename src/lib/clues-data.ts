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

天气预报说有{curse:storm}暴风雪{/curse}，但导游说问题不大。我们准备充分，有足够的补给。

下午四点，我们抵达半山腰的{place:lodge}避难山庄{/place}。这是一座很古老的木屋，据说以前是{cult:hunter}猎人的驻地{/cult}。

导游说我们会在这里过夜，明天继续上山。

现在是晚上八点。风雪突然{warning:warning}大得可怕{/warning}。

导游的脸色{fear:strange}很难看{/fear}。他一直在看手机，但{warning:signal}已经没有信号了{/warning}。`,
    },
    {
      date: '10月25日',
      text: `暴风雪还没停。

更糟的是，{warning:door}门打不开了{/warning}。

我们所有人都试过。窗户也是。就像有{warning:seal}什么东西把我们封在里面{/warning}。

导游说这很不正常。他说自己来过这里{warning:times}很多次{/warning}，从来没遇到过这种情况。

大厅里有个{cold:fire}壁炉{/cold}，火焰是{cold:white}白色的{/cold}。我问导游这是什么，他说不知道，{warning:strange}这火昨晚就在这里燃烧{/warning}，也不知道是谁点的。

{cold:cold}火焰散发的是寒意，不是温暖{/cold}。

墙上有一幅画。十五个人围成一圈，中间是{sacrifice:blood}一滩血{/sacrifice}。画很旧，很模糊，但让人{fear:fear}不安{/fear}。

晚上，我听到{fear:whisper}低语{/fear}。

不是风声，也不是人声。

是从{cold:fire}白色的火焰{/cold}里传来的。`,
    },
    {
      date: '10月26日',
      text: `今天早上，{warning:change}有些人变了{/warning}。

我说不清是哪里不对，但我能{fear:feel}感觉到{/fear}。

他们的眼神，说话的方式，看彼此的表情...都{fear:strange}不太一样了{/fear}。

导游把大家召集起来。他的声音在{fear:tremble}颤抖{/fear}。

"昨晚，"他说，"昨晚我听到了声音。"

"{contract:contract}山灵的契约。{/contract}"

他说这座山庄是{warning:cursed}被诅咒的{/warning}。据说很久以前，这里的{cult:hunter}猎人违背了山灵的禁忌{/cult}，屠杀了山中的生灵。

{warning:punishment}山灵降下了惩罚。{/warning}

任何{warning:fifteen}十五人一同进入这座山庄{/warning}的群体，都会触发{contract:contract}契约{/contract}。

{contract:pact}必须献祭过半数，幸存者才能离开。{/contract}

{evil:marked}其中三人会被山灵标记{/evil}，成为{evil:hunter}收割者{/evil}。

{lamb:innocent}剩下的人是羔羊{/lamb}，必须找出收割者，否则会被一个个{evil:kill}杀死{/evil}。

我以为他疯了。

但{cold:fire}白色的火焰{/cold}还在燃烧。

{warning:door}门还是打不开{/warning}。

而且...{fear:eyes}有些人的眼神确实变了{/fear}。`,
    },
    {
      date: '10月27日',
      text: `{warning:warning}仪式开始了。{/warning}

昨晚有人死了。

是团里的{sacrifice:first}一个年轻人{/sacrifice}。我们早上发现他的时候，他躺在走廊里，{dead:dead}已经没有呼吸{/dead}。

身上{sacrifice:wound}没有伤口{/sacrifice}，但表情{fear:terror}极度恐惧{/fear}。

就像被{cold:freeze}冻死的{/cold}。

{evil:marked}被标记的三个人{/evil}在夜里做了这件事。

但我们不知道是谁。

白天，我们要{lamb:vote}投票决定献祭谁{/lamb}。

这是{contract:rule}契约的规则{/contract}：白天投票，晚上猎杀。直到一方全灭，或者{sacrifice:half}献祭过半{/sacrifice}。

团里有些人有{lamb:special}特殊能力{/lamb}。{lamb:seer}聆心者说他昨晚看到了某人是"污秽"{/lamb}。{lamb:twin}两个共誓者认出了彼此{/lamb}。

但{evil:lie}谁说的是真话？谁又在说谎？{/evil}

{fear:chaos}所有人都在互相指责，互相怀疑{/fear}。

最后，投票的结果是{sacrifice:vote}一个一直沉默的女孩{/sacrifice}。

{warning:warning}而那个女孩，是我的朋友。{/warning}

{fear:guilt}我也投了她。{/fear}

因为{fear:survive}我想活下来{/fear}。`,
    },
    {
      date: '10月28日',
      text: `又过了一天。

又死了两个人。昨晚死了一个，今天白天被献祭了一个。

{sacrifice:count}我们还剩十一个人{/sacrifice}。

{fear:collapse}团队已经崩溃了{/fear}。没有人相信任何人。{lamb:seer}声称能看穿真相的人{/lamb}可能在{evil:lie}说谎{/evil}。{lamb:twin}说自己是共誓者的人{/lamb}可能在{evil:fake}伪装{/evil}。

{evil:marked}被烙印的三个人{/evil}隐藏得很好。他们{evil:blend}混在人群中{/evil}，{evil:lie}说谎、引导、制造混乱{/evil}。

而我们这些{lamb:innocent}羔羊{/lamb}，只能{fear:guess}靠猜测和恐惧{/fear}来做出判断。

{warning:warning}我怀疑我会是下一个。{/warning}

因为我{fear:vocal}一直在质疑，在提出不同意见{/fear}。

{evil:marked}收割者不会放过这样的人{/evil}。

{fear:target}我成了他们的目标。{/fear}

今晚，如果{lamb:guard}设闩者{/lamb}不保护我...

我可能{dead:die}活不过明天{/dead}。`,
    },
    {
      date: '10月29日 清晨',
      text: `{warning:warning}如果有人读到这封遗书...{/warning}

{fear:die}我今晚会死{/fear}。

我能感觉到。{evil:marked}他们的眼神已经锁定了我{/evil}。

白天的投票也会{sacrifice:vote}指向我{/sacrifice}。因为{evil:frame}他们成功地把我塑造成了威胁{/evil}。

{fear:sorry}对不起，我想把真相记录下来{/fear}。

{warning:warning}这座{place:lodge}山庄{/place}不是避难所，是{sacrifice:altar}祭坛{/sacrifice}。{/warning}

{contract:contract}山灵的契约是真实的。{/contract}{warning:fifteen}每当有十五人进入这里{/warning}，{evil:curse}诅咒就会启动{/evil}。

{lamb:survive}如果你想活下来：{/lamb}

{lamb:observe}仔细观察每个人的行为{/lamb}。{evil:marked}被烙印的人{/evil}会在{evil:lie}言语上露出破绽{/evil}，会{evil:coordinate}相互配合{/evil}，会{evil:deflect}转移怀疑{/evil}。

{lamb:trust}寻找可以信任的角色{/lamb}。{lamb:seer}聆心者能验人{/lamb}，{lamb:coroner}食灰者能验尸{/lamb}，{lamb:twin}共誓者互相知晓{/lamb}，{lamb:guard}设闩者能保护{/lamb}。

但{warning:warning}永远不要完全相信任何人{/warning}。{evil:lie}这场游戏的核心就是谎言和伪装{/evil}。

我听到{fear:footsteps}脚步声{/fear}了。

{cold:fire}白色的火焰在等待。{/cold}

{warning:warning}对不起。{/warning}

——{dead:last}一个即将被献祭的羔羊的最后遗言{/dead}

{contract:contract}仪式会继续。{/contract}

{evil:cycle}直到这座山庄被彻底摧毁。{/evil}`,
    },
  ],
};

/**
 * Get initial clues that should be available at game start
 */
export function getInitialClues(): Clue[] {
  return [TRAVELER_TESTAMENT];
}
