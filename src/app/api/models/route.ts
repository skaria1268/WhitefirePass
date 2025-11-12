/**
 * List available models from OpenAI-compatible API
 */

import { NextRequest, NextResponse } from 'next/server';
import { ProxyAgent, fetch as undiciFetch } from 'undici';

const PROXY_URL = 'http://127.0.0.1:7897';
const proxyAgent = new ProxyAgent(PROXY_URL);

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

    // Call OpenAI-compatible /v1/models endpoint
    const response = await undiciFetch(
      `${apiUrl}/v1/models`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
        dispatcher: proxyAgent,
      },
    );

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
