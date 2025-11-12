'use client';

import { useState, useRef, useEffect } from 'react';
import { useGameStore } from '@/stores/game-store';
import type { PromptConfig, PromptItem } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PenTool, ChevronUp, ChevronDown, Trash2, Plus, Check, X, ArrowUp, ArrowDown, FileText, Clock, Edit2, History } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Simple UUID generator
 */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Floating Prompt Editor Component
 * Fully responsive - works on mobile and desktop
 */
export function PromptEditorFloating() {
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  const [editingItems, setEditingItems] = useState<PromptItem[]>([]);
  const [newItemContent, setNewItemContent] = useState('');
  const [newItemRole, setNewItemRole] = useState<'user' | 'assistant'>('user');
  const [isSaving, setIsSaving] = useState(false);

  const {
    promptConfigs,
    currentPromptConfigId,
    addPromptConfig,
    updatePromptConfig,
    setCurrentPromptConfig,
    gameState,
  } = useGameStore();

  // Get current config
  const currentConfig = currentPromptConfigId
    ? promptConfigs.find((c) => c.id === currentPromptConfigId)
    : null;

  // Detect mobile and screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize editing items when dialog opens or config changes
  useEffect(() => {
    if (isOpen && currentConfig) {
      setEditingItems([...currentConfig.items]);
    }
  }, [isOpen, currentConfig]);

  // Handle dragging (desktop only)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // Disable dragging on mobile
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

  const addNewItem = (position: 'top' | 'bottom') => {
    if (!newItemContent.trim()) return;

    const newItem: PromptItem = {
      id: generateId(),
      type: newItemRole,
      label: `自定义消息 ${editingItems.length + 1}`,
      content: newItemContent,
      order: position === 'top' ? 0 : editingItems.length,
      enabled: true,
    };

    if (position === 'top') {
      // Add to top and reorder
      const updatedItems = [newItem, ...editingItems];
      updatedItems.forEach((item, i) => {
        item.order = i;
      });
      setEditingItems(updatedItems);
    } else {
      // Add to bottom
      setEditingItems([...editingItems, newItem]);
    }

    setNewItemContent('');
    setNewItemRole('user');
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
        const res = await fetch('/api/prompt-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        });

        if (!res.ok) {
          throw new Error(`Failed to save: ${res.status} ${res.statusText}`);
        }
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
        const res = await fetch('/api/prompt-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newConfig),
        });

        if (!res.ok) {
          throw new Error(`Failed to save: ${res.status} ${res.statusText}`);
        }
      }

      setIsOpen(false);
    } catch (error) {
      console.error('Failed to save prompt config:', error);
      alert(`保存失败: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="fixed z-40 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all hover:scale-110"
        style={
          isMobile
            ? { bottom: '20px', right: '20px' }
            : { bottom: '24px', right: '24px' }
        }
        title="编辑 Prompt / 查看日志"
      >
        <PenTool className="h-5 w-5" />
      </button>

      {/* Menu Popup */}
      {showMenu && (
        <>
          {/* Backdrop to close menu */}
          <div
            className="fixed inset-0 z-35"
            onClick={() => setShowMenu(false)}
          />

          {/* Menu */}
          <div
            className="fixed z-40 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-max"
            style={
              isMobile
                ? { bottom: '80px', right: '20px' }
                : { bottom: '80px', right: '24px' }
            }
          >
            {/* Edit Prompt Option */}
            <button
              onClick={() => {
                setIsOpen(true);
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 flex items-center gap-2 transition-colors"
            >
              <Edit2 className="h-4 w-4 text-blue-500" />
              <span>编辑 Prompt</span>
            </button>

            {/* View Logs Option */}
            <button
              onClick={() => {
                setShowLogs(true);
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-purple-50 flex items-center gap-2 transition-colors"
            >
              <History className="h-4 w-4 text-purple-500" />
              <span>查看日志</span>
            </button>
          </div>
        </>
      )}

      {/* Editor Window - Responsive Modal */}
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          {isMobile && (
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Editor Container */}
          <div
            ref={dragRef}
            className="fixed z-50 bg-white shadow-2xl border border-gray-200 flex flex-col"
            style={
              isMobile
                ? {
                    inset: '0',
                    borderRadius: '0',
                    width: '100%',
                    height: '100%',
                    maxHeight: '100%',
                  }
                : {
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    width: '500px',
                    maxHeight: '80vh',
                    borderRadius: '8px',
                    cursor: isDragging ? 'grabbing' : 'default',
                  }
            }
          >
            {/* Title Bar */}
            <div
              onMouseDown={handleMouseDown}
              className={`flex items-center justify-between text-white px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 ${
                !isMobile && 'rounded-t-lg'
              } ${isMobile ? 'cursor-auto' : 'cursor-grab active:cursor-grabbing'}`}
            >
              <h2 className="font-semibold text-lg md:text-base">Prompt 编辑器</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
                data-no-drag
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 md:p-4">
              {editingItems.length === 0 ? (
                <p className="text-gray-500 text-sm">暂无 Prompt 项目</p>
              ) : (
                <div className="space-y-3">
                    {editingItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      {/* Header with Checkbox and Controls */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                      <Checkbox
                        checked={item.enabled}
                        onCheckedChange={() => toggleItemEnabled(index)}
                        data-no-drag
                      />

                      {/* Type Badge */}
                      <span className="text-xs font-medium text-gray-600 flex-1">
                        {item.type === 'system' ? '🔧 系统' :
                         item.type === 'user' ? '👤 用户' :
                         item.type === 'assistant' ? '🤖 助手' :
                         '📌 占位符'}
                      </span>

                      {/* Controls - Mobile: Compact, Desktop: Column */}
                      <div className={`flex gap-1`} data-no-drag>
                        <button
                          onClick={() => moveItemUp(index)}
                          disabled={index === 0}
                          className="p-1 hover:bg-gray-300 disabled:opacity-30 disabled:hover:bg-transparent rounded transition-colors flex-shrink-0"
                          title="向上移动"
                        >
                          <ChevronUp className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        </button>
                        <button
                          onClick={() => moveItemDown(index)}
                          disabled={index === editingItems.length - 1}
                          className="p-1 hover:bg-gray-300 disabled:opacity-30 disabled:hover:bg-transparent rounded transition-colors flex-shrink-0"
                          title="向下移动"
                        >
                          <ChevronDown className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        </button>
                        <button
                          onClick={() => deleteItem(index)}
                          className="p-1 hover:bg-red-200 text-red-600 rounded transition-colors flex-shrink-0"
                          title="删除"
                        >
                          <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Label */}
                    <div className="text-xs font-medium text-gray-500 mb-2 px-2">
                      {item.label}
                    </div>

                    {/* Content */}
                    <textarea
                      value={item.content}
                      onChange={(e) => updateItemContent(index, e.target.value)}
                      className="w-full text-xs p-2 border border-gray-300 rounded bg-white resize-none"
                      rows={isMobile ? 2 : 3}
                      data-no-drag
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Add New Item */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-600 mb-2">添加自定义消息</p>

              {/* Role Selector */}
              <div className="mb-2">
                <Select value={newItemRole} onValueChange={(value: 'user' | 'assistant') => setNewItemRole(value)}>
                  <SelectTrigger className="text-xs h-8" data-no-drag>
                    <SelectValue placeholder="选择角色" />
                  </SelectTrigger>
                  <SelectContent data-no-drag>
                    <SelectItem value="user" className="text-xs">👤 用户 (user)</SelectItem>
                    <SelectItem value="assistant" className="text-xs">🤖 助手 (assistant)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Content Input */}
              <div className="mb-2">
                <Input
                  value={newItemContent}
                  onChange={(e) => setNewItemContent(e.target.value)}
                  placeholder="输入新的 prompt 内容..."
                  className="text-xs"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isMobile) addNewItem('bottom');
                  }}
                  data-no-drag
                />
              </div>

              {/* Add Buttons */}
              <div className={`flex gap-2 ${isMobile ? 'flex-col' : ''}`}>
                <Button
                  onClick={() => addNewItem('top')}
                  size="sm"
                  variant="outline"
                  className={`${isMobile ? 'w-full' : 'flex-1'} text-xs`}
                  data-no-drag
                  disabled={!newItemContent.trim()}
                >
                  <ArrowUp className="h-3.5 w-3.5 mr-1" />
                  添加到顶部
                </Button>
                <Button
                  onClick={() => addNewItem('bottom')}
                  size="sm"
                  variant="outline"
                  className={`${isMobile ? 'w-full' : 'flex-1'} text-xs`}
                  data-no-drag
                  disabled={!newItemContent.trim()}
                >
                  <ArrowDown className="h-3.5 w-3.5 mr-1" />
                  添加到底部
                </Button>
              </div>
            </div>
            </div>

            {/* Footer - Responsive Buttons */}
            <div className={`border-t border-gray-200 px-4 py-3 bg-gray-50 ${!isMobile && 'rounded-b-lg'} flex gap-2 ${isMobile ? 'flex-col-reverse' : 'justify-end'}`}>
              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                size={isMobile ? 'default' : 'sm'}
                className={isMobile ? 'w-full' : ''}
                data-no-drag
              >
                <X className={`${isMobile ? '' : 'mr-1'} h-4 w-4`} />
                {isMobile && <span className="ml-2">取消</span>}
                {!isMobile && '取消'}
              </Button>
              <Button
                onClick={handleSave}
                size={isMobile ? 'default' : 'sm'}
                disabled={isSaving}
                className={isMobile ? 'w-full' : ''}
                data-no-drag
              >
                {isSaving ? (
                  <>
                    <span className="animate-spin mr-1">⏳</span>
                    {isMobile && '保存中...'}
                    {!isMobile && '保存中...'}
                  </>
                ) : (
                  <>
                    <Check className={`${isMobile ? '' : 'mr-1'} h-4 w-4`} />
                    {isMobile && <span className="ml-2">保存配置</span>}
                    {!isMobile && '保存配置'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Logs Viewer Modal */}
      {showLogs && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowLogs(false)}
          />

          {/* Logs Window */}
          <div
            ref={dragRef}
            className="fixed z-50 bg-white shadow-2xl border border-gray-200 flex flex-col"
            style={
              isMobile
                ? {
                    inset: '0',
                    borderRadius: '0',
                    width: '100%',
                    height: '100%',
                    maxHeight: '100%',
                  }
                : {
                    left: `${Math.max(20, position.x + 100)}px`,
                    top: `${Math.max(20, position.y + 50)}px`,
                    width: '550px',
                    maxHeight: '80vh',
                    borderRadius: '8px',
                    cursor: isDragging ? 'grabbing' : 'default',
                  }
            }
          >
            {/* Title Bar */}
            <div
              className={`flex items-center justify-between text-white px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 ${
                !isMobile && 'rounded-t-lg'
              } ${isMobile ? 'cursor-auto' : 'cursor-grab active:cursor-grabbing'}`}
            >
              <h2 className="font-semibold text-lg md:text-base">AI 交互日志</h2>
              <button
                onClick={() => setShowLogs(false)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
                data-no-drag
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 md:p-4">
              {!gameState || !gameState.apiLogs || gameState.apiLogs.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-8">暂无 AI 交互日志</p>
              ) : (
                <div className="space-y-4">
                  {[...gameState.apiLogs].reverse().map((log, index) => (
                    <div
                      key={`${log.id}-${index}`}
                      className="border border-gray-200 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      {/* Log Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: log.type === 'request' ? '#dbeafe' :
                                               log.type === 'response' ? '#dcfce7' :
                                               '#fee2e2',
                              color: log.type === 'request' ? '#0369a1' :
                                     log.type === 'response' ? '#166534' :
                                     '#991b1b'
                            }}
                          >
                            {log.type === 'request' && '📤 请求'}
                            {log.type === 'response' && '📥 响应'}
                            {log.type === 'error' && '❌ 错误'}
                          </span>
                          {log.playerName && (
                            <span className="text-xs text-gray-600 font-medium">
                              {log.playerName}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(log.timestamp).toLocaleTimeString('zh-CN')}
                        </span>
                      </div>

                      {/* Log Content */}
                      {log.type === 'request' && (
                        <div className="bg-blue-50 rounded p-2 text-xs text-gray-700 max-h-32 overflow-y-auto border border-blue-100">
                          <div className="font-semibold text-blue-700 mb-1">发送给 AI 的内容：</div>
                          <pre className="whitespace-pre-wrap break-words text-xs font-mono">
                            {log.prompt}
                          </pre>
                        </div>
                      )}

                      {log.type === 'response' && (
                        <div className="bg-green-50 rounded p-2 text-xs text-gray-700 max-h-32 overflow-y-auto border border-green-100">
                          <div className="font-semibold text-green-700 mb-1">AI 返回的内容：</div>
                          <pre className="whitespace-pre-wrap break-words text-xs font-mono">
                            {log.response || '（无内容）'}
                          </pre>
                          {log.duration && (
                            <div className="text-xs text-gray-500 mt-1">
                              耗时: {log.duration}ms
                            </div>
                          )}
                        </div>
                      )}

                      {log.type === 'error' && (
                        <div className="bg-red-50 rounded p-2 text-xs text-gray-700 max-h-32 overflow-y-auto border border-red-100">
                          <div className="font-semibold text-red-700 mb-1">错误信息：</div>
                          <pre className="whitespace-pre-wrap break-words text-xs font-mono">
                            {log.error || '未知错误'}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={`border-t border-gray-200 px-4 py-3 bg-gray-50 ${!isMobile && 'rounded-b-lg'}`}>
              <Button
                onClick={() => setShowLogs(false)}
                variant="outline"
                size={isMobile ? 'default' : 'sm'}
                className={isMobile ? 'w-full' : ''}
                data-no-drag
              >
                <X className={`${isMobile ? '' : 'mr-1'} h-4 w-4`} />
                {isMobile && <span className="ml-2">关闭</span>}
                {!isMobile && '关闭'}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
