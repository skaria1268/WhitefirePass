/**
 * Emotional State Change Dialog
 * Shows when a character's emotional state changes due to another character's death
 */

'use client';

import { useEffect, useState } from 'react';
import type { EmotionalStateChange } from '@/types/game';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, Flame, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getStateChangeDescription } from '@/lib/emotional-prompts';
import { getRelationshipLabel } from '@/lib/relationships';

interface EmotionalStateDialogProps {
  stateChanges: EmotionalStateChange[];
  onComplete: () => void;
}

// eslint-disable-next-line complexity
export function EmotionalStateDialog({ stateChanges, onComplete }: EmotionalStateDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(stateChanges.length > 0);

  // Update when stateChanges prop changes
  useEffect(() => {
    if (stateChanges.length > 0) {
      setCurrentIndex(0);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [stateChanges]);

  if (stateChanges.length === 0) return null;

  const currentChange = stateChanges[currentIndex];
  if (!currentChange) return null;

  const relationshipLabel = getRelationshipLabel(currentChange.relationshipType);
  const { title, description } = getStateChangeDescription(
    currentChange.character,
    currentChange.triggerCharacter,
    currentChange.newState,
    relationshipLabel,
  );

  const isVirtue = currentChange.newState === 'virtue';
  const isLast = currentIndex === stateChanges.length - 1;

  const handleNext = (): void => {
    if (isLast) {
      setIsOpen(false);
      onComplete();
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open && isLast) {
        onComplete();
      }
    }}>
      <DialogContent className="max-w-2xl overflow-hidden border-2"
        style={{
          borderColor: isVirtue ? 'rgba(59, 130, 246, 0.5)' : 'rgba(239, 68, 68, 0.5)',
        }}
      >
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className={cn(
            'text-2xl font-cinzel tracking-wide flex items-center gap-3',
            isVirtue ? 'text-blue-400' : 'text-red-400',
          )}>
            {isVirtue ? (
              <>
                <Heart className="w-7 h-7" />
                心理状态变化
              </>
            ) : (
              <>
                <Flame className="w-7 h-7" />
                心理状态变化
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground flex items-center gap-2">
            <Users className="w-4 h-4" />
            {currentChange.character} 的 {relationshipLabel} {currentChange.triggerCharacter} 已死亡
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* State change title */}
          <div className={cn(
            'text-xl font-bold text-center py-3 rounded-lg border-2',
            isVirtue
              ? 'bg-blue-950/30 border-blue-500/50 text-blue-300'
              : 'bg-red-950/30 border-red-500/50 text-red-300',
          )}>
            {title}
          </div>

          {/* State change description */}
          <div className={cn(
            'text-base leading-relaxed p-4 rounded-lg border',
            isVirtue
              ? 'bg-blue-950/20 border-blue-500/30 text-blue-100'
              : 'bg-red-950/20 border-red-500/30 text-red-100',
          )}>
            {description}
          </div>

          {/* Progress indicator */}
          {stateChanges.length > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              {stateChanges.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    idx === currentIndex
                      ? 'bg-foreground scale-125'
                      : 'bg-muted-foreground/30',
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            onClick={handleNext}
            className={cn(
              'font-semibold',
              isVirtue
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-red-600 hover:bg-red-700',
            )}
          >
            {isLast ? '确认' : `下一个 (${currentIndex + 1}/${stateChanges.length})`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
