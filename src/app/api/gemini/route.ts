/**
 * Gemini and OpenAI compatible API proxy route with proxy support
 */

import { NextRequest, NextResponse } from 'next/server';
import { ProxyAgent, fetch as undiciFetch } from 'undici';

const PROXY_URL = 'http://127.0.0.1:7897';
const proxyAgent = new ProxyAgent(PROXY_URL);

/**
 * Validate request body
 */
function validateRequest(body: { apiKey?: string; prompt?: string; apiType?: string }) {
  if (!body.apiKey) {
    return NextResponse.json({ error: '缺少 API Key' }, { status: 400 });
  }
  if (!body.prompt) {
    return NextResponse.json({ error: '缺少 prompt' }, { status: 400 });
  }
  return null;
}

/**
 * POST handler for Gemini and OpenAI API requests
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      apiKey?: string;
      apiUrl?: string;
      model?: string;
      prompt?: string;
      apiType?: 'gemini' | 'openai';
    };
    const { apiKey, apiUrl, model, prompt, apiType = 'gemini' } = body;

    const validationError = validateRequest(body);
    if (validationError) return validationError;

    if (apiType === 'openai') {
      return handleOpenAIRequest(apiKey, apiUrl, model, prompt);
    }

    return handleGeminiRequest(apiKey, apiUrl, model, prompt);
  } catch (error) {
    console.error('代理请求失败:', error);
    return NextResponse.json(
      {
        error: '代理请求失败',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

/**
 * Handle Gemini API requests
 */
async function handleGeminiRequest(
  apiKey: string,
  apiUrl: string | undefined,
  model: string | undefined,
  prompt: string,
): Promise<NextResponse> {
  const baseUrl = apiUrl || 'https://generativelanguage.googleapis.com';
  const response = await undiciFetch(
    `${baseUrl}/v1beta/models/${model ?? 'gemini-2.5-pro'}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.9,
          // No maxOutputTokens limit - let AI think freely
        },
      }),
      dispatcher: proxyAgent,
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API 错误:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    });

    return NextResponse.json(
      {
        error: `Gemini API 错误 (${response.status})`,
        details: errorText.slice(0, 200),
      },
      { status: response.status },
    );
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
        role?: string;
      };
      finishReason?: string;
    }>;
    usageMetadata?: {
      promptTokenCount?: number;
      totalTokenCount?: number;
      thoughtsTokenCount?: number;
    };
  };

  // Extract text from parts
  const parts = data.candidates?.[0]?.content?.parts;
  const text = parts?.map((part) => part.text).filter(Boolean).join('') || '';

  if (!text) {
    console.error('Gemini API 响应无文本:', data);
    return NextResponse.json(
      {
        error: 'AI 响应为空',
        details: `finishReason: ${data.candidates?.[0]?.finishReason || 'unknown'}`,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    text,
    usage: data.usageMetadata,
  });
}

/**
 * Handle OpenAI compatible API requests
 */
async function handleOpenAIRequest(
  apiKey: string,
  apiUrl: string | undefined,
  model: string | undefined,
  prompt: string,
): Promise<NextResponse> {
  if (!apiUrl) {
    return NextResponse.json(
      {
        error: 'OpenAI API URL 不能为空',
      },
      { status: 400 },
    );
  }

  const response = await undiciFetch(
    `${apiUrl}/v1/chat/completions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model ?? 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.9,
      }),
      dispatcher: proxyAgent,
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI API 错误:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    });

    return NextResponse.json(
      {
        error: `OpenAI API 错误 (${response.status})`,
        details: errorText.slice(0, 200),
      },
      { status: response.status },
    );
  }

  const data = (await response.json()) as {
    choices?: Array<{
      message?: {
        content?: string;
      };
    }>;
    usage?: {
      prompt_tokens?: number;
      completion_tokens?: number;
      total_tokens?: number;
    };
  };

  // Extract text from response
  const text = data.choices?.[0]?.message?.content || '';

  if (!text) {
    console.error('OpenAI API 响应无文本:', data);
    return NextResponse.json(
      {
        error: 'AI 响应为空',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    text,
    usage: data.usage,
  });
}
