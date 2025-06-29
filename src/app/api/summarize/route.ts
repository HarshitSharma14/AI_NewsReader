

// src/app/api/summarize/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/api/ai-service';

export async function POST(request: NextRequest) {
    try {
        const { content, title } = await request.json();

        if (!content || !title) {
            return NextResponse.json(
                { success: false, error: 'Content and title are required' },
                { status: 400 }
            );
        }

        const summary = await aiService.summarizeArticle(content, title);

        return NextResponse.json({
            success: true,
            data: summary,
        });

    } catch (error) {
        console.error('AI summarization error:', error);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to generate summary',
            },
            { status: 500 }
        );
    }
}
