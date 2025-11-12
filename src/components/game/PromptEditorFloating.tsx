'use client';

import { useState, useRef, useEffect } from 'react';
import { useGameStore } from '@/stores/game-store';
import type { PromptConfig, PromptItem } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { PenTool, ChevronUp, ChevronDown, Trash2, Plus, Check, X } from 'lucide-react';

/**
 * Simple UUID generator
 */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Floating Prompt Editor Component
 * Allows users to view and edit the prompt configuration being sent to AI
 */
export function PromptEditorFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<HTMLDivElement>(null);

  const [editingItems, setEditingItems] = useState<PromptItem[]>([]);
  const [newItemContent, setNewItemContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const {
    promptConfigs,
    currentPromptConfigId,
    addPromptConfig,
    updatePromptConfig,
    setCurrentPromptConfig,
  } = useGameStore();

  // Get current config
  const currentConfig = currentPromptConfigId
    ? promptConfigs.find((c) => c.id === currentPromptConfigId)
    : null;

  // Initialize editing items when dialog opens or config changes
  useEffect(() => {
    if (isOpen && currentConfig) {
      setEditingItems([...currentConfig.items]);
    }
  }, [isOpen, currentConfig]);

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('[data-no-drag]')) return;

    setIsDragging(true);
    if (dragRef.current) {
      const rect = dragRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const moveItemUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...editingItems];
    [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    // Update order numbers
    newItems.forEach((item, i) => {
      item.order = i;
    });
    setEditingItems(newItems);
  };

  const moveItemDown = (index: number) => {
    if (index === editingItems.length - 1) return;
    const newItems = [...editingItems];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    // Update order numbers
    newItems.forEach((item, i) => {
      item.order = i;
    });
    setEditingItems(newItems);
  };

  const deleteItem = (index: number) => {
    const newItems = editingItems.filter((_, i) => i !== index);
    // Update order numbers
    newItems.forEach((item, i) => {
      item.order = i;
    });
    setEditingItems(newItems);
  };

  const toggleItemEnabled = (index: number) => {
    const newItems = [...editingItems];
    newItems[index].enabled = !newItems[index].enabled;
    setEditingItems(newItems);
  };

  const updateItemContent = (index: number, content: string) => {
    const newItems = [...editingItems];
    newItems[index].content = content;
    setEditingItems(newItems);
  };

  const addNewItem = () => {
    if (!newItemContent.trim()) return;

    const newItem: PromptItem = {
      id: generateId(),
      type: 'user',
      label: `自定义消息 ${editingItems.length + 1}`,
      content: newItemContent,
      order: editingItems.length,
      enabled: true,
    };

    setEditingItems([...editingItems, newItem]);
    setNewItemContent('');
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      if (currentConfig) {
        // Update existing config
        const updated: PromptConfig = {
          ...currentConfig,
          items: editingItems,
          updatedAt: Date.now(),
        };
        updatePromptConfig(updated);

        // Save to backend
        await fetch('/api/prompt-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        });
      } else {
        // Create new config
        const newConfig: PromptConfig = {
          id: generateId(),
          name: '自定义 Prompt 配置',
          description: '用户编辑的 prompt 配置',
          items: editingItems,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        addPromptConfig(newConfig);
        setCurrentPromptConfig(newConfig.id);

        // Save to backend
        await fetch('/api/prompt-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newConfig),
        });
      }

      setIsOpen(false);
    } catch (error) {
      console.error('Failed to save prompt config:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all hover:scale-110"
        title="编辑 Prompt (点击打开)"
      >
        <PenTool className="h-5 w-5" />
      </button>

      {/* Editor Window */}
      {isOpen && (
        <div
          ref={dragRef}
          className="fixed z-50 bg-white rounded-lg shadow-2xl border border-gray-200"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: '500px',
            maxHeight: '80vh',
            cursor: isDragging ? 'grabbing' : 'default',
          }}
        >
          {/* Title Bar */}
          <div
            onMouseDown={handleMouseDown}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-t-lg cursor-grab active:cursor-grabbing flex items-center justify-between"
          >
            <h2 className="font-semibold">Prompt 编辑器</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded transition-colors"
              data-no-drag
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 120px)' }}>
            {editingItems.length === 0 ? (
              <p className="text-gray-500 text-sm">暂无 Prompt 项目</p>
            ) : (
              <div className="space-y-3">
                {editingItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      {/* Checkbox */}
                      <Checkbox
                        checked={item.enabled}
                        onCheckedChange={() => toggleItemEnabled(index)}
                        className="mt-1"
                        data-no-drag
                      />

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-gray-600 mb-1">
                          {item.type === 'system' ? '系统' : item.type === 'user' ? '用户' : '占位符'}
                          {' - '} {item.label}
                        </div>
                        <textarea
                          value={item.content}
                          onChange={(e) => updateItemContent(index, e.target.value)}
                          className="w-full text-xs p-2 border border-gray-300 rounded bg-white resize-none"
                          rows={3}
                          data-no-drag
                        />
                      </div>

                      {/* Controls */}
                      <div className="flex flex-col gap-1" data-no-drag>
                        <button
                          onClick={() => moveItemUp(index)}
                          disabled={index === 0}
                          className="p-1 hover:bg-gray-300 disabled:opacity-50 disabled:hover:bg-gray-100 rounded transition-colors"
                          title="向上移动"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveItemDown(index)}
                          disabled={index === editingItems.length - 1}
                          className="p-1 hover:bg-gray-300 disabled:opacity-50 disabled:hover:bg-gray-100 rounded transition-colors"
                          title="向下移动"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteItem(index)}
                          className="p-1 hover:bg-red-200 text-red-600 rounded transition-colors"
                          title="删除"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Item */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-600 mb-2">添加自定义消息</p>
              <div className="flex gap-2">
                <Input
                  value={newItemContent}
                  onChange={(e) => setNewItemContent(e.target.value)}
                  placeholder="输入新的 prompt 内容..."
                  className="text-xs"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') addNewItem();
                  }}
                  data-no-drag
                />
                <Button
                  onClick={addNewItem}
                  size="sm"
                  variant="outline"
                  data-no-drag
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 rounded-b-lg flex gap-2 justify-end">
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              size="sm"
              data-no-drag
            >
              <X className="mr-1 h-4 w-4" />
              取消
            </Button>
            <Button
              onClick={handleSave}
              size="sm"
              disabled={isSaving}
              data-no-drag
            >
              {isSaving ? (
                <>
                  <span className="animate-spin mr-1">⏳</span>
                  保存中...
                </>
              ) : (
                <>
                  <Check className="mr-1 h-4 w-4" />
                  保存配置
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
