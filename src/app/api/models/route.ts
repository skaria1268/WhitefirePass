/**
 * List available models from OpenAI-compatible API
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * GET handler for listing models
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const apiUrl = searchParams.get('apiUrl');
    const apiKey = searchParams.get('apiKey');

    if (!apiUrl || !apiKey) {
      return NextResponse.json(
        { error: 'Missing apiUrl or apiKey' },
        { status: 400 },
      );
    }

    // Build models endpoint URL
    // If URL already ends with /v1, add /models directly
    // Otherwise, add /v1/models
    const modelsUrl = apiUrl.endsWith('/v1')
      ? `${apiUrl}/models`
      : `${apiUrl}/v1/models`;

    // Call OpenAI-compatible /v1/models endpoint
    const response = await fetch(modelsUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Models API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });

      return NextResponse.json(
        {
          error: `Failed to fetch models (${response.status})`,
          details: errorText.slice(0, 200),
        },
        { status: response.status },
      );
    }

    const data = (await response.json()) as {
      data?: Array<{
        id: string;
        object?: string;
        created?: number;
        owned_by?: string;
      }>;
    };

    // Extract model IDs from response
    const models = data.data?.map((model) => model.id) || [];

    return NextResponse.json({
      models,
      total: models.length,
    });
  } catch (error) {
    console.error('Models request failed:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch models',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
