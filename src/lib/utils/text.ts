import { Article } from '@/types';

// src/lib/utils/text.ts
export const calculateReadingTime = (text: string): number => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
};

export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
};

export const extractFirstParagraph = (content: string): string => {
    const paragraphs = content.split('\n').filter(p => p.trim().length > 0);
    return paragraphs[0] || content.slice(0, 200) + '...';
};

export const generateArticleId = (article: Partial<Article>): string => {
    // Create a unique ID from title and published date
    const titleSlug = article.title?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || 'article';

    const dateSlug = article.publishedAt
        ? new Date(article.publishedAt).toISOString().split('T')[0]
        : Date.now().toString();

    return `${titleSlug}-${dateSlug}`;
};
