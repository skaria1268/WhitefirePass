/**
 * Save and retrieve prompt configurations
 */

import { NextRequest, NextResponse } from 'next/server';
import type { PromptConfig } from '@/types/game';

// In-memory storage (replace with database in production)
const promptConfigs = new Map<string, PromptConfig>();

/**
 * GET handler for retrieving prompt configurations
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const configId = searchParams.get('id');

    if (configId) {
      // Get specific config
      const config = promptConfigs.get(configId);
      if (!config) {
        return NextResponse.json(
          { error: 'Configuration not found' },
          { status: 404 },
        );
      }
      return NextResponse.json(config);
    }

    // Get all configs
    const configs = Array.from(promptConfigs.values());
    return NextResponse.json({ configs });
  } catch (error) {
    console.error('Failed to retrieve prompt config:', error);
    return NextResponse.json(
      {
        error: 'Failed to retrieve prompt config',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

/**
 * POST handler for saving prompt configurations
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PromptConfig;

    if (!body.id || !body.name || !body.items) {
      return NextResponse.json(
        { error: 'Missing required fields: id, name, items' },
        { status: 400 },
      );
    }

    // Validate items
    if (!Array.isArray(body.items)) {
      return NextResponse.json(
        { error: 'items must be an array' },
        { status: 400 },
      );
    }

    // Save configuration
    const config: PromptConfig = {
      id: body.id,
      name: body.name,
      description: body.description,
      items: body.items.sort((a, b) => a.order - b.order),
      createdAt: body.createdAt || Date.now(),
      updatedAt: Date.now(),
    };

    promptConfigs.set(config.id, config);

    return NextResponse.json(
      {
        success: true,
        config,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Failed to save prompt config:', error);
    return NextResponse.json(
      {
        error: 'Failed to save prompt config',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

/**
 * DELETE handler for removing prompt configurations
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const configId = searchParams.get('id');

    if (!configId) {
      return NextResponse.json(
        { error: 'Missing configId' },
        { status: 400 },
      );
    }

    if (!promptConfigs.has(configId)) {
      return NextResponse.json(
        { error: 'Configuration not found' },
        { status: 404 },
      );
    }

    promptConfigs.delete(configId);

    return NextResponse.json({
      success: true,
      message: 'Configuration deleted',
    });
  } catch (error) {
    console.error('Failed to delete prompt config:', error);
    return NextResponse.json(
      {
        error: 'Failed to delete prompt config',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
