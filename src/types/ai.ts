
// src/types/ai.ts
export interface AISummary {
    summary: string;
    keyPoints: string[];
    sentiment: 'positive' | 'negative' | 'neutral';
    readingTime: number;
    keywords: string[];
    difficulty: 'easy' | 'medium' | 'hard';
    credibilityScore?: number;
}

export interface KeywordAnalysis {
    keywords: string[];
    entities: string[];
    topics: string[];
}

export interface SentimentAnalysis {
    sentiment: 'positive' | 'negative' | 'neutral';
    confidence: number;
    emotions?: {
        joy: number;
        sadness: number;
        anger: number;
        fear: number;
        surprise: number;
    };
}