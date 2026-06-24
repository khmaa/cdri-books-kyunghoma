import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { PAGE_SIZE } from '../constants/search';
import type { SearchTarget } from '../types/book';
import { searchBooks } from './kakaoBookApi';
import { bookKeys } from './queryKeys';

export function useBookSearch(query: string, target?: SearchTarget) {
  return useInfiniteQuery({
    queryKey: bookKeys.search(query, target),
    queryFn: ({ pageParam }) => searchBooks({ query, page: pageParam, size: PAGE_SIZE, target }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.meta.is_end ? undefined : lastPageParam + 1,
    enabled: query.trim().length > 0,
    // 검색어 변경 시 새 결과가 올 때까지 이전 결과 유지 — 빈 상태 깜빡임 방지
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5분: 같은 검색 즉시 hit
    gcTime: 1000 * 60 * 30,
  });
}
