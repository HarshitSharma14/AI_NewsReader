
// src/app/api/news/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { newsApi } from '@/lib/api/news-api';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const category = searchParams.get('category') || 'general';
        const page = parseInt(searchParams.get('page') || '1');
        const pageSize = parseInt(searchParams.get('pageSize') || '10');
        const query = searchParams.get('q');

        let result;

        if (query) {
            // Search articles
            const filters = {
                query,
                category,
                sortBy: (searchParams.get('sortBy') as any) || 'publishedAt',
                from: searchParams.get('from') || undefined,
                to: searchParams.get('to') || undefined,
                language: searchParams.get('language') || 'en',
            };

            result = await newsApi.searchArticles(filters, pageSize, page);
        } else {
            // Get top headlines
            result = await newsApi.getTopHeadlines(category, pageSize, page);
        }

        return NextResponse.json({
            success: true,
            data: result,
        });

    } catch (error) {
        console.error('News API error:', error);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch news',
            },
            { status: 500 }
        );
    }
}