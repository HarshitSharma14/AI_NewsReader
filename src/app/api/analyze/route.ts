

// src/app/api/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/api/ai-service';

export async function POST(request: NextRequest) {
    try {
        const { content, type } = await request.json();

        if (!content) {
            return NextResponse.json(
                { success: false, error: 'Content is required' },
                { status: 400 }
            );
        }

        let result;

        switch (type) {
            case 'keywords':
                result = await aiService.extractKeywords(content);
                break;
            case 'sentiment':
                result = await aiService.analyzeSentiment(content);
                break;
            default:
                return NextResponse.json(
                    { success: false, error: 'Invalid analysis type' },
                    { status: 400 }
                );
        }

        return NextResponse.json({
            success: true,
            data: result,
        });

    } catch (error) {
        console.error('AI analysis error:', error);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to analyze content',
            },
            { status: 500 }
        );
    }
}