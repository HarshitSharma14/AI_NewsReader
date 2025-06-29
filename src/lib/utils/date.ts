// src/lib/utils/date.ts
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export const formatArticleDate = (dateString: string): string => {
    const date = new Date(dateString);

    if (isToday(date)) {
        return `Today at ${format(date, 'HH:mm')}`;
    }

    if (isYesterday(date)) {
        return `Yesterday at ${format(date, 'HH:mm')}`;
    }

    return format(date, 'MMM dd, yyyy');
};

export const getRelativeTime = (dateString: string): string => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};