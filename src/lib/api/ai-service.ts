

// src/lib/api/ai-service.ts
import { AISummary, KeywordAnalysis, SentimentAnalysis } from '@/types';
import { calculateReadingTime } from '@/lib/utils/text';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    console.warn('OPENAI_API_KEY is not set in environment variables');
}

class AIServiceError extends Error {
    constructor(message: string, public status?: number) {
        super(message);
        this.name = 'AIServiceError';
    }
}

export const aiService = {
    async summarizeArticle(content: string, title: string): Promise<AISummary> {
        try {
            if (!OPENAI_API_KEY) {
                // Fallback to basic analysis when API key is not available
                return this.generateFallbackSummary(content, title);
            }

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant that summarizes news articles. Provide a concise summary, key points, sentiment analysis, and keywords.'
                        },
                        {
                            role: 'user',
                            content: `Please analyze this article:
              
Title: ${title}
Content: ${content}

Please provide:
1. A 2-3 sentence summary
2. 3-5 key points (bullet format)
3. Sentiment (positive, negative, or neutral)
4. 5-8 relevant keywords
5. Reading difficulty (easy, medium, hard)

Format your response as JSON with the following structure:
{
  "summary": "...",
  "keyPoints": ["...", "..."],
  "sentiment": "positive|negative|neutral",
  "keywords": ["...", "..."],
  "difficulty": "easy|medium|hard"
}`
                        }
                    ],
                    max_tokens: 500,
                    temperature: 0.3,
                }),
            });

            if (!response.ok) {
                throw new AIServiceError(
                    `OpenAI API error: ${response.status}`,
                    response.status
                );
            }

            const data = await response.json();
            const aiResponse = data.choices[0]?.message?.content;

            if (!aiResponse) {
                throw new AIServiceError('No response from AI service');
            }

            try {
                const parsed = JSON.parse(aiResponse);
                return {
                    summary: parsed.summary,
                    keyPoints: parsed.keyPoints || [],
                    sentiment: parsed.sentiment || 'neutral',
                    readingTime: calculateReadingTime(content),
                    keywords: parsed.keywords || [],
                    difficulty: parsed.difficulty || 'medium',
                };
            } catch (parseError) {
                // If JSON parsing fails, create summary from raw response
                return this.parseUnstructuredResponse(aiResponse, content);
            }

        } catch (error) {
            if (error instanceof AIServiceError) {
                throw error;
            }

            console.error('AI service error:', error);
            // Fallback to basic analysis
            return this.generateFallbackSummary(content, title);
        }
    },

    async extractKeywords(content: string): Promise<KeywordAnalysis> {
        try {
            if (!OPENAI_API_KEY) {
                return this.generateFallbackKeywords(content);
            }

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'Extract keywords, named entities, and topics from the given text.'
                        },
                        {
                            role: 'user',
                            content: `Extract keywords, entities, and topics from: ${content.slice(0, 1000)}`
                        }
                    ],
                    max_tokens: 200,
                    temperature: 0.1,
                }),
            });

            if (!response.ok) {
                throw new AIServiceError(`OpenAI API error: ${response.status}`);
            }

            const data = await response.json();
            const result = data.choices[0]?.message?.content || '';

            return this.parseKeywordsFromResponse(result, content);
        } catch (error) {
            console.error('Keyword extraction error:', error);
            return this.generateFallbackKeywords(content);
        }
    },

    async analyzeSentiment(content: string): Promise<SentimentAnalysis> {
        try {
            if (!OPENAI_API_KEY) {
                return this.generateFallbackSentiment(content);
            }

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'Analyze the sentiment of the given text. Return only: positive, negative, or neutral.'
                        },
                        {
                            role: 'user',
                            content: content.slice(0, 1000)
                        }
                    ],
                    max_tokens: 10,
                    temperature: 0.1,
                }),
            });

            if (!response.ok) {
                throw new AIServiceError(`OpenAI API error: ${response.status}`);
            }

            const data = await response.json();
            const sentiment = data.choices[0]?.message?.content?.toLowerCase().trim();

            return {
                sentiment: ['positive', 'negative', 'neutral'].includes(sentiment)
                    ? sentiment as 'positive' | 'negative' | 'neutral'
                    : 'neutral',
                confidence: 0.8,
            };
        } catch (error) {
            console.error('Sentiment analysis error:', error);
            return this.generateFallbackSentiment(content);
        }
    },

    // Fallback methods for when API is not available
    generateFallbackSummary(content: string, title: string): AISummary {
        const sentences = content.split('.').filter(s => s.trim().length > 20);
        const summary = sentences.slice(0, 2).join('.') + '.';

        const words = content.toLowerCase().split(/\W+/);
        const wordFreq = words.reduce((acc, word) => {
            if (word.length > 4) {
                acc[word] = (acc[word] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        const keywords = Object.entries(wordFreq)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 6)
            .map(([word]) => word);

        return {
            summary: summary || 'Summary not available.',
            keyPoints: sentences.slice(0, 3).map(s => s.trim()),
            sentiment: 'neutral',
            readingTime: calculateReadingTime(content),
            keywords,
            difficulty: content.length > 1000 ? 'medium' : 'easy',
        };
    },

    generateFallbackKeywords(content: string): KeywordAnalysis {
        const words = content.toLowerCase().split(/\W+/);
        const commonWords = new Set(['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'among', 'within', 'without', 'under', 'over']);

        const keywords = words
            .filter(word => word.length > 4 && !commonWords.has(word))
            .slice(0, 8);

        return {
            keywords,
            entities: [],
            topics: keywords.slice(0, 3),
        };
    },

    generateFallbackSentiment(content: string): SentimentAnalysis {
        const positiveWords = ['good', 'great', 'excellent', 'positive', 'success', 'win', 'best', 'amazing'];
        const negativeWords = ['bad', 'terrible', 'negative', 'fail', 'worst', 'crisis', 'problem', 'issue'];

        const words = content.toLowerCase().split(/\W+/);
        const positiveCount = words.filter(word => positiveWords.includes(word)).length;
        const negativeCount = words.filter(word => negativeWords.includes(word)).length;

        let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
        if (positiveCount > negativeCount) sentiment = 'positive';
        else if (negativeCount > positiveCount) sentiment = 'negative';

        return {
            sentiment,
            confidence: 0.6,
        };
    },

    parseUnstructuredResponse(response: string, content: string): AISummary {
        return {
            summary: response.slice(0, 200) + '...',
            keyPoints: [response.slice(0, 100) + '...'],
            sentiment: 'neutral',
            readingTime: calculateReadingTime(content),
            keywords: ['analysis', 'summary'],
            difficulty: 'medium',
        };
    },

    parseKeywordsFromResponse(response: string, content: string): KeywordAnalysis {
        const words = response.split(/\W+/).filter(w => w.length > 3);
        return {
            keywords: words.slice(0, 8),
            entities: words.slice(0, 5),
            topics: words.slice(0, 3),
        };
    },
};
