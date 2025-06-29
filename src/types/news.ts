// src/types/news.ts
export interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    category?: string;
}

export interface NewsApiResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface SearchFilters {
    query: string;
    category: string;
    sortBy: 'publishedAt' | 'relevancy' | 'popularity';
    from?: string;
    to?: string;
    sources?: string;
    language?: string;
}