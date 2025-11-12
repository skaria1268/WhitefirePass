/**
 * OpenAI compatible API proxy route
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * Validate request body
 */
function validateRequest(body: { apiKey?: string; apiUrl?: string; prompt?: string; apiType?: string }) {
  if (!body.apiKey) {
    return NextResponse.json({ error: '缺少 API Key' }, { status: 400 });
  }
  if (!body.prompt) {
    return NextResponse.json({ error: '缺少 prompt' }, { status: 400 });
  }
  return null;
}

/**
 * POST handler for OpenAI API requests
 */
export async function POST(request: NextRequest) {
  try {
    // Ensure we can parse the request body
    let body;
    try {
      body = (await request.json()) as {
        apiKey?: string;
        apiUrl?: string;
        model?: string;
        prompt?: string;
        apiType?: 'openai';
      };
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json(
        {
          error: '无效的请求格式',
          details: parseError instanceof Error ? parseError.message : 'JSON parse error',
        },
        { status: 400 }
      );
    }

    const { apiKey, apiUrl, model, prompt, apiType = 'openai' } = body;

    const validationError = validateRequest(body);
    if (validationError) return validationError;

    if (apiType === 'openai') {
      return handleOpenAIRequest(apiKey as string, apiUrl, model, prompt as string);
    }

    return NextResponse.json(
      { error: '不支持的 API 类型，仅支持 OpenAI 兼容 API' },
      { status: 400 }
    );
  } catch (error) {
    console.error('代理请求失败:', error);
    // Ensure we always return valid JSON even in error cases
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

  // Build completions endpoint URL
  // If URL already ends with /v1, add /chat/completions directly
  // Otherwise, add /v1/chat/completions
  const completionsUrl = apiUrl.endsWith('/v1')
    ? `${apiUrl}/chat/completions`
    : `${apiUrl}/v1/chat/completions`;

  // Determine temperature based on model
  // Claude thinking models require temperature: 1
  const isThinkingModel = model?.includes('thinking') ?? false;
  const temperature = isThinkingModel ? 1 : 0.9;

  let response;
  try {
    response = await fetch(completionsUrl, {
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
        temperature,
      }),
    });
  } catch (fetchError) {
    console.error('网络请求失败:', fetchError);
    return NextResponse.json(
      {
        error: '网络请求失败',
        details: fetchError instanceof Error ? fetchError.message : 'Network error',
      },
      { status: 500 }
    );
  }

  if (!response.ok) {
    let errorText;
    try {
      errorText = await response.text();
    } catch (textError) {
      errorText = 'Unable to read error response';
    }

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

  let data;
  try {
    const responseText = await response.text();
    if (!responseText || responseText.trim() === '') {
      console.error('OpenAI API 返回空响应');
      return NextResponse.json(
        {
          error: 'OpenAI API 返回空响应',
          details: 'Empty response body',
        },
        { status: 500 }
      );
    }

    data = JSON.parse(responseText) as {
      choices?: Array<{
        message?: {
          content?: string;
        };
      }>;
      content?: Array<{
        type: string;
        text?: string;
      }>;
      usage?: {
        prompt_tokens?: number;
        completion_tokens?: number;
        total_tokens?: number;
      };
    };
  } catch (jsonError) {
    console.error('JSON 解析失败:', jsonError);
    return NextResponse.json(
      {
        error: 'JSON 解析失败',
        details: jsonError instanceof Error ? jsonError.message : 'JSON parse error',
      },
      { status: 500 }
    );
  }

  // Extract text from response
  // Try standard OpenAI format first
  let text = data.choices?.[0]?.message?.content || '';

  // If no text, try Claude's native response format
  if (!text && data.content) {
    const textContent = data.content.find((item: any) => item.type === 'text');
    text = textContent?.text || '';
  }

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
