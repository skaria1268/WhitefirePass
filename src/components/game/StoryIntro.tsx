/**
 * Story introduction component with diary/journal format
 * Displays the story of the "16th person" through diary entries
 */

'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Skull } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface StoryIntroProps {
  open: boolean;
  onComplete: () => void;
}

/**
 * Diary entries with special keyword markers
 * Format: {keyword:type}text{/keyword}
 */
const DIARY_ENTRIES = [
  {
    date: '11月13日 下午',
    text: `我们一行十六人，原本只是路过{place:white}白烬山口{/place}。

导游说这里有座废弃的{place:lodge}山庄{/place}，可以暂时避避风雪。

山路蜿蜒，积雪很深。我注意到路旁有些{warning:strange}奇怪的石堆{/warning}——像是某种祭坛。

当地向导的脸色很难看，一直在低声念叨着什么。

天色暗得太快了。`,
  },
  {
    date: '11月13日 傍晚',
    text: `山庄比想象中大得多。

大厅里有个{cold:fire}巨大的壁炉{/cold}，但火焰是{cold:white}白色的{/cold}，不知为何让我感到{fear:fear}不安{/fear}。

墙上挂着一幅褪色的画，画的是十五个人{sacrifice:blood}围着篝火{/sacrifice}，表情扭曲。

向导说这里曾经住过一个{cult:hunter}猎人团体{/cult}，后来全都神秘失踪了。

他警告我们：{warning:warning}"不要在夜里离开房间，不要触碰白色的火焰，不要..."{/warning}

话还没说完，{curse:storm}暴风雪骤然加剧{/curse}。大门被风吹得{warning:close}轰然关闭{/warning}。

再也打不开了。`,
  },
  {
    date: '11月13日 深夜',
    text: `睡不着。

总觉得走廊里有{fear:footsteps}脚步声{/fear}。

我起身想去看看，走到大厅时，发现白色的篝火{cold:burning}还在燃烧{/cold}。

火焰中似乎有{fear:shadow}影子在舞动{/fear}。

我伸手想要触碰——

{warning:warning}那一刻，我听到了低语。{/warning}

"{contract:contract}第十六人，打破了平衡...{/contract}"

"{sacrifice:price}必须付出代价...{/sacrifice}"

手指碰到火焰的瞬间，{pain:burn}剧痛传来{/pain}，但不是灼烧——是{cold:ice}冰冷刺骨的寒意{/cold}。

{evil:mark}烙印{/evil}，在我手上浮现。`,
  },
  {
    date: '11月14日 凌晨',
    text: `他们发现我了。

十五双眼睛，在黑暗中{fear:stare}盯着我{/fear}。

不，不对...他们的眼神不一样了。有些人眼中带着{evil:hunger}饥饿{/evil}，有些人眼中充满{fear:terror}恐惧{/fear}。

向导颤抖着说："{contract:pact}契约已成...山灵的规则启动了...{/contract}"

"{warning:warning}十五个人，必须献祭一半以上，才能离开...{/warning}"

"{sacrifice:first}第一个祭品，必须是打破平衡的第十六人...{/sacrifice}"

我终于明白了墙上那幅画的含义。

{warning:warning}不是十五个人围着篝火。{/warning}

{evil:truth}是十五个人，正在献祭第十六个人。{/evil}`,
  },
  {
    date: '日记残页',
    text: `如果有人读到这篇日记...

{warning:warning}逃。{/warning}

如果来不及逃，记住：

不要相信任何人的话语，{evil:lie}每个人都可能在说谎{/evil}。

{lamb:observe}仔细观察他们的行为{/lamb}，{evil:marked}被烙印的人{/evil}会在夜晚{evil:hunt}露出真面目{/hunt}。

{contract:rule}山灵的契约规定：献祭过半数，幸存者方可离开。{/contract}

但我怀疑...{fear:doubt}即使献祭成功，真的能活着离开吗？{/doubt}

{cold:fire}白色的火焰，永不熄灭。{/cold}

{warning:warning}篝火在等待，下一个祭品。{/warning}

——第十六人的{dead:last}最后遗言{/dead}`,
  },
];

/**
 * Parse story text and identify keywords
 */
function parseStoryText(text: string) {
  const segments: Array<{ text: string; type?: string }> = [];
  let currentIndex = 0;
  const regex = /\{(\w+):(\w+)\}(.*?)\{\/\1\}/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > currentIndex) {
      segments.push({ text: text.slice(currentIndex, match.index) });
    }
    // Add the keyword with its type
    segments.push({ text: match[3], type: match[2] });
    currentIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (currentIndex < text.length) {
    segments.push({ text: text.slice(currentIndex) });
  }

  return segments;
}

/**
 * Get CSS classes for keyword types (diary theme)
 */
function getKeywordClasses(type: string): string {
  const classes: Record<string, string> = {
    // Places
    white: 'text-cyan-300 font-bold animate-pulse drop-shadow-[0_0_8px_rgba(165,243,252,0.8)]',
    lodge: 'text-amber-200 font-semibold tracking-wider',
    place: 'text-amber-200 font-semibold',

    // Evil/Danger
    evil: 'text-red-500 font-bold drop-shadow-[0_0_10px_rgba(239,68,68,1)]',
    hunger: 'text-red-500 font-bold animate-pulse drop-shadow-[0_0_10px_rgba(239,68,68,1)]',
    marked: 'text-red-500 font-bold underline decoration-wavy',
    mark: 'text-red-400 font-bold animate-pulse drop-shadow-[0_0_10px_rgba(248,113,113,1)]',
    hunt: 'text-red-600 font-semibold',
    lie: 'text-red-400 font-semibold italic line-through',
    truth: 'text-red-500 font-bold drop-shadow-[0_0_12px_rgba(239,68,68,1)]',

    // Sacrifice/Death
    sacrifice: 'text-red-700 font-bold drop-shadow-[0_0_8px_rgba(127,29,29,0.9)]',
    blood: 'text-red-700 font-bold',
    first: 'text-red-600 font-bold underline',
    price: 'text-amber-600 font-bold',
    dead: 'text-slate-500 font-bold line-through decoration-double',
    last: 'text-slate-400 italic',

    // Contract/Rule
    contract: 'text-amber-400 font-bold tracking-wide drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]',
    pact: 'text-amber-400 font-bold italic',
    rule: 'text-amber-300 font-semibold underline decoration-dotted',

    // Fear/Terror
    fear: 'text-slate-400 font-semibold italic',
    terror: 'text-slate-300 font-bold animate-pulse',
    doubt: 'text-slate-400 italic',
    footsteps: 'text-slate-400 italic underline decoration-wavy',
    shadow: 'text-slate-500 font-semibold italic',
    stare: 'text-slate-300 font-bold',

    // Cold/Ice
    cold: 'text-cyan-300 font-semibold drop-shadow-[0_0_6px_rgba(165,243,252,0.6)]',
    ice: 'text-cyan-400 font-bold animate-pulse drop-shadow-[0_0_8px_rgba(165,243,252,0.8)]',
    fire: 'text-cyan-300 font-semibold drop-shadow-[0_0_6px_rgba(165,243,252,0.5)]',
    burning: 'text-cyan-300 italic',

    // Warning/Danger
    warning: 'text-red-400 font-bold drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]',
    strange: 'text-amber-400 font-semibold underline decoration-wavy',
    close: 'text-red-500 font-bold',

    // Curse/Storm
    curse: 'text-amber-500 font-semibold drop-shadow-[0_0_8px_rgba(245,158,11,0.7)]',
    storm: 'text-slate-400 font-semibold drop-shadow-[0_0_6px_rgba(148,163,184,0.6)]',

    // Good/Observation
    lamb: 'text-blue-400 font-semibold drop-shadow-[0_0_6px_rgba(96,165,250,0.6)]',
    observe: 'text-blue-400 font-semibold underline decoration-dotted',

    // Cult/Mystery
    cult: 'text-purple-400 font-semibold italic',
    hunter: 'text-slate-400 font-semibold',

    // Pain
    pain: 'text-red-500 font-bold animate-pulse',
    burn: 'text-red-500 font-bold',
  };
  return classes[type] || '';
}

export function StoryIntro({ open, onComplete }: StoryIntroProps) {
  const [currentEntryIndex, setCurrentEntryIndex] = useState(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isEntryComplete, setIsEntryComplete] = useState(false);
  const [canSkip, setCanSkip] = useState(false);

  const currentEntry = DIARY_ENTRIES[currentEntryIndex];
  const segments = parseStoryText(currentEntry.text.trim());
  const fullText = segments.map((s) => s.text).join('');

  // Reset when dialog opens or entry changes
  useEffect(() => {
    if (open) {
      setDisplayedChars(0);
      setIsEntryComplete(false);
      setCanSkip(false);
    }
  }, [open, currentEntryIndex]);

  // Typewriter effect with slower speed
  useEffect(() => {
    if (!open) return;

    // Allow skipping after 3 seconds
    const skipTimer = setTimeout(() => setCanSkip(true), 3000);

    if (displayedChars < fullText.length) {
      // Slower speed: spaces fast, punctuation pause, normal chars moderate
      const currentChar = fullText[displayedChars];
      const delay = currentChar === ' ' ? 30 :
                    currentChar === '\n' ? 400 :
                    currentChar.match(/[,。，、！!？?：:]/) ? 500 :
                    currentChar.match(/["'「」『』【】]/) ? 200 :
                    80;

      const timer = setTimeout(() => {
        setDisplayedChars((prev) => prev + 1);
      }, delay);

      return () => {
        clearTimeout(timer);
        clearTimeout(skipTimer);
      };
    } else {
      setIsEntryComplete(true);
      return () => clearTimeout(skipTimer);
    }
  }, [displayedChars, fullText, open]);

  const handleSkip = () => {
    if (canSkip) {
      setDisplayedChars(fullText.length);
      setIsEntryComplete(true);
    }
  };

  const handleNext = () => {
    if (currentEntryIndex < DIARY_ENTRIES.length - 1) {
      setCurrentEntryIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  // Build displayed text with keyword styling
  const renderText = () => {
    const result: JSX.Element[] = [];
    let charCount = 0;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const segmentLength = segment.text.length;
      const segmentEnd = charCount + segmentLength;

      if (charCount >= displayedChars) {
        break;
      }

      const displayedInSegment = Math.min(displayedChars - charCount, segmentLength);
      const displayedText = segment.text.slice(0, displayedInSegment);

      if (segment.type) {
        result.push(
          <span key={i} className={cn('transition-all duration-300', getKeywordClasses(segment.type))}>
            {displayedText}
          </span>
        );
      } else {
        result.push(<span key={i}>{displayedText}</span>);
      }

      charCount = segmentEnd;
    }

    return result;
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="max-w-4xl bg-amber-50/95 backdrop-blur-xl border-4 border-amber-900/50 shadow-2xl"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="relative" onClick={handleSkip}>
          {/* Diary header */}
          <div className="flex items-center justify-center gap-3 mb-6 pb-4 border-b-2 border-amber-800/30">
            <BookOpen className="w-8 h-8 text-amber-800" />
            <div className="text-center">
              <h3 className="text-2xl font-bold text-amber-900 font-serif tracking-wide">
                第十六人的日记
              </h3>
              <p className="text-xs text-amber-700 mt-1 font-cinzel tracking-widest opacity-60">
                THE 16TH TRAVELER'S DIARY
              </p>
            </div>
            <Skull className="w-8 h-8 text-red-800/70" />
          </div>

          {/* Date stamp */}
          <div className="text-center mb-6">
            <div className="inline-block px-4 py-2 bg-amber-900/10 border border-amber-800/30 rounded">
              <p className="text-sm font-semibold text-amber-900 font-serif tracking-wide">
                {currentEntry.date}
              </p>
            </div>
          </div>

          {/* Diary text - paper texture background */}
          <div className="relative min-h-[320px] flex items-start justify-center px-8 py-6 bg-amber-50/50 border-l-4 border-amber-800/20">
            {/* Paper lines effect */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="h-px bg-amber-800/20 mb-6"
                  style={{ marginTop: i === 0 ? '0' : '24px' }}
                />
              ))}
            </div>

            <div className="relative text-amber-950 text-base leading-loose whitespace-pre-wrap font-serif tracking-wide text-left w-full">
              {renderText()}
              {!isEntryComplete && (
                <span className="inline-block w-0.5 h-5 bg-amber-900 ml-1 animate-pulse" />
              )}
            </div>
          </div>

          {/* Blood stain effect on last entry */}
          {currentEntryIndex === DIARY_ENTRIES.length - 1 && isEntryComplete && (
            <div className="absolute top-4 right-4 w-20 h-20 bg-red-900/20 rounded-full blur-xl animate-pulse" />
          )}

          {/* Controls */}
          <div className="mt-8 flex flex-col items-center gap-4">
            {!isEntryComplete && canSkip && (
              <button
                onClick={handleSkip}
                className="text-sm text-amber-700 hover:text-amber-900 transition-colors font-serif"
              >
                点击任意处跳过当前页...
              </button>
            )}

            {isEntryComplete && (
              <Button
                onClick={handleNext}
                size="lg"
                className="bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-700 hover:to-amber-800 text-amber-50 font-cinzel tracking-wider border-2 border-amber-700 shadow-lg animate-fade-in"
              >
                {currentEntryIndex < DIARY_ENTRIES.length - 1 ? (
                  <>
                    <BookOpen className="w-5 h-5 mr-2" />
                    翻页
                  </>
                ) : (
                  <>
                    <Skull className="w-5 h-5 mr-2" />
                    合上日记
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Entry indicator */}
          <div className="mt-6 flex justify-center gap-2">
            {DIARY_ENTRIES.map((_, index) => (
              <div
                key={index}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  index === currentEntryIndex
                    ? 'bg-amber-800 w-8'
                    : index < currentEntryIndex
                    ? 'bg-amber-600'
                    : 'bg-amber-300'
                )}
              />
            ))}
          </div>
        </div>

        {/* Paper texture overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] rounded-lg" />
      </DialogContent>
    </Dialog>
  );
}
