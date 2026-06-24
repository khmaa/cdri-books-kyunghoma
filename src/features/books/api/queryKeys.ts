import type { SearchTarget } from '../types/book';

export const bookKeys = {
  all: ['books'] as const,
  search: (query: string, target?: SearchTarget) =>
    [...bookKeys.all, 'search', { query, target }] as const,
};
