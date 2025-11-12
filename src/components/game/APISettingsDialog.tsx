'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/stores/game-store';
import { testOpenAIKey } from '@/lib/gemini';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';

interface APISettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * API Settings Dialog Component
 * Allows users to configure OpenAI compatible APIs
 */
export function APISettingsDialog({ open, onOpenChange }: APISettingsDialogProps) {
  const [isTesting, setIsTesting] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showCustomModel, setShowCustomModel] = useState(false);

  const {
    apiType,
    apiKey,
    apiUrl,
    model,
    availableModels,
    setApiType,
    setApiKey,
    setApiUrl,
    setModel,
    setAvailableModels,
  } = useGameStore();

  const [localApiType, setLocalApiType] = useState(apiType);
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [localApiUrl, setLocalApiUrl] = useState(apiUrl);
  const [localModel, setLocalModel] = useState(model);
  const [localAvailableModels, setLocalAvailableModels] = useState(availableModels);

  const handleSave = () => {
    setApiType(localApiType);
    setApiKey(localApiKey);
    setApiUrl(localApiUrl);
    setModel(localModel);
    setAvailableModels(localAvailableModels);
    onOpenChange(false);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const success = await testOpenAIKey(localApiKey, localApiUrl, localModel);

      setTestResult({
        success,
        message: success ? '连接成功！' : '连接失败，请检查配置',
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: `错误: ${error instanceof Error ? error.message : '未知错误'}`,
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleFetchModels = async () => {
    if (localApiType !== 'openai' || !localApiUrl || !localApiKey) {
      setTestResult({
        success: false,
        message: '请先填写 API URL 和 API Key',
      });
      return;
    }

    setIsLoadingModels(true);
    setTestResult(null);

    try {
      const response = await fetch(
        `/api/models?apiUrl=${encodeURIComponent(localApiUrl)}&apiKey=${encodeURIComponent(localApiKey)}`
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || error.error);
      }

      const data = (await response.json()) as { models: string[] };
      setLocalAvailableModels(data.models);
      setTestResult({
        success: true,
        message: `成功获取 ${data.models.length} 个模型`,
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: `获取模型列表失败: ${error instanceof Error ? error.message : '未知错误'}`,
      });
    } finally {
      setIsLoadingModels(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>API 配置</DialogTitle>
          <DialogDescription>
            配置 OpenAI 兼容 API 服务。
          </DialogDescription>
        </DialogHeader>

        <Tabs value={localApiType} onValueChange={(value) => {
          setLocalApiType(value as 'openai');
          setShowCustomModel(false);
        }}>
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="openai">OpenAI 兼容</TabsTrigger>
          </TabsList>

          <TabsContent value="openai" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="openai-url">API Base URL</Label>
              <Input
                id="openai-url"
                placeholder="https://api.openai.com/v1 或其他兼容 API 的地址"
                value={localApiType === 'openai' ? localApiUrl : ''}
                onChange={(e) => {
                  if (localApiType === 'openai') {
                    setLocalApiUrl(e.target.value);
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">
                例如: https://api.openai.com/v1 或其他 OpenAI 兼容 API 的基础 URL
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="openai-key">API Key</Label>
              <Input
                id="openai-key"
                type="password"
                placeholder="输入你的 API Key"
                value={localApiType === 'openai' ? localApiKey : ''}
                onChange={(e) => {
                  if (localApiType === 'openai') {
                    setLocalApiKey(e.target.value);
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">
                输入 Bearer token（不需要 'Bearer ' 前缀）
              </p>
            </div>

            {/* Model Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="openai-model">模型名称</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFetchModels}
                  disabled={isLoadingModels || !localApiUrl || !localApiKey || localApiType !== 'openai'}
                >
                  {isLoadingModels ? (
                    <>
                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                      加载中...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-3 w-3" />
                      获取列表
                    </>
                  )}
                </Button>
              </div>

              {localAvailableModels.length > 0 && !showCustomModel ? (
                <>
                  <select
                    id="openai-model"
                    value={localModel}
                    onChange={(e) => setLocalModel(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="">选择模型...</option>
                    {localAvailableModels.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCustomModel(true)}
                  >
                    自定义输入
                  </Button>
                </>
              ) : (
                <>
                  <Input
                    id="openai-model"
                    placeholder="例如: gpt-4 或 gpt-3.5-turbo"
                    value={localApiType === 'openai' ? localModel : ''}
                    onChange={(e) => {
                      if (localApiType === 'openai') {
                        setLocalModel(e.target.value);
                      }
                    }}
                  />
                  {localAvailableModels.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowCustomModel(false)}
                    >
                      选择已获取的模型
                    </Button>
                  )}
                </>
              )}

              <p className="text-xs text-muted-foreground">
                点击"获取列表"从 API 获取可用模型，或手动输入模型名称
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Test Result */}
        {testResult && (
          <div className={`flex items-center gap-2 rounded-md p-3 ${
            testResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {testResult.success ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span className="text-sm">{testResult.message}</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            取消
          </Button>
          <Button
            variant="outline"
            onClick={handleTestConnection}
            disabled={isTesting || !localApiKey || !localApiUrl}
          >
            {isTesting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                测试中...
              </>
            ) : (
              '测试连接'
            )}
          </Button>
          <Button
            onClick={handleSave}
            disabled={!localApiKey || !localApiUrl || !localModel}
          >
            保存配置
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
