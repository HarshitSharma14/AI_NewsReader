 
// src/lib/constants.ts
export const NEWS_CATEGORIES = [
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ] as const;
  
  export const SORT_OPTIONS = [
    { value: 'publishedAt', label: 'Latest' },
    { value: 'relevancy', label: 'Relevance' },
    { value: 'popularity', label: 'Popular' },
  ] as const;
  
  export const READING_DIFFICULTY = {
    easy: { label: 'Easy', color: 'green' },
    medium: { label: 'Medium', color: 'yellow' },
    hard: { label: 'Hard', color: 'red' },
  } as const;
  
  export const SENTIMENT_COLORS = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600',
  } as const;
  
  export const API_ENDPOINTS = {
    NEWS: '/api/news',
    SUMMARIZE: '/api/summarize',
    ANALYZE: '/api/analyze',
  } as const;