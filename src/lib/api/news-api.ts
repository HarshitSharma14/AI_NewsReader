

// src/lib/api/news-api.ts
import { Article, NewsApiResponse, SearchFilters } from '@/types';
import { generateArticleId } from '@/lib/utils/text';

const BASE_URL = process.env.NEWS_API_URL || 'https://newsapi.org/v2';
const API_KEY = process.env.NEWS_API_KEY;

if (!API_KEY) {
    console.warn('NEWS_API_KEY is not set in environment variables');
}

class NewsApiError extends Error {
    constructor(message: string, public status?: number) {
        super(message);
        this.name = 'NewsApiError';
    }
}

const buildApiUrl = (endpoint: string, params: Record<string, string>) => {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    url.searchParams.append('apiKey', API_KEY || '');

    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            url.searchParams.append(key, value);
        }
    });

    return url.toString();
};

export const newsApi = {
    async getTopHeadlines(
        category: string = 'general',
        pageSize: number = 10,
        page: number = 1
    ): Promise<{ articles: Article[]; totalResults: number }> {
        try {
            const url = buildApiUrl('top-headlines', {
                category,
                country: 'us',
                pageSize: pageSize.toString(),
                page: page.toString(),
            });

            const response = await fetch(url);

            if (!response.ok) {
                throw new NewsApiError(
                    `Failed to fetch headlines: ${response.status}`,
                    response.status
                );
            }

            const data: NewsApiResponse = await response.json();

            if (data.status !== 'ok') {
                throw new NewsApiError('API returned error status');
            }

            const articlesWithIds = data.articles.map(article => ({
                ...article,
                id: generateArticleId(article),
                category,
            }));

            return {
                articles: articlesWithIds,
                totalResults: data.totalResults,
            };
        } catch (error) {
            if (error instanceof NewsApiError) {
                throw error;
            }
            throw new NewsApiError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    },

    async searchArticles(
        filters: SearchFilters,
        pageSize: number = 10,
        page: number = 1
    ): Promise<{ articles: Article[]; totalResults: number }> {
        try {
            const params: Record<string, string> = {
                pageSize: pageSize.toString(),
                page: page.toString(),
                sortBy: filters.sortBy,
            };

            if (filters.query) params.q = filters.query;
            if (filters.from) params.from = filters.from;
            if (filters.to) params.to = filters.to;
            if (filters.sources) params.sources = filters.sources;
            if (filters.language) params.language = filters.language;

            const url = buildApiUrl('everything', params);

            const response = await fetch(url);

            if (!response.ok) {
                throw new NewsApiError(
                    `Failed to search articles: ${response.status}`,
                    response.status
                );
            }

            const data: NewsApiResponse = await response.json();

            if (data.status !== 'ok') {
                throw new NewsApiError('API returned error status');
            }

            const articlesWithIds = data.articles.map(article => ({
                ...article,
                id: generateArticleId(article),
                category: filters.category,
            }));

            return {
                articles: articlesWithIds,
                totalResults: data.totalResults,
            };
        } catch (error) {
            if (error instanceof NewsApiError) {
                throw error;
            }
            throw new NewsApiError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    },

    async getArticleById(id: string): Promise<Article | null> {
        // Since NewsAPI doesn't provide direct article fetching by ID,
        // we'll implement this by searching and finding the matching article
        // This is a limitation we'll handle in the frontend
        return null;
    },
};
