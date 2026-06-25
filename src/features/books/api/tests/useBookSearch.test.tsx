import { createBook } from '@/test/factories';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { searchBooks } from '../kakaoBookApi';
import { useBookSearch } from '../useBookSearch';

vi.mock('../kakaoBookApi', () => ({
  searchBooks: vi.fn(),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useBookSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('빈 query 면 API 를 호출하지 않는다 (enabled)', () => {
    renderHook(() => useBookSearch(''), { wrapper: createWrapper() });
    expect(searchBooks).not.toHaveBeenCalled();
  });

  it('검색어가 있으면 결과를 반환한다', async () => {
    (searchBooks as Mock).mockResolvedValue({
      meta: { total_count: 1, pageable_count: 1, is_end: true },
      documents: [createBook()],
    });

    const { result } = renderHook(() => useBookSearch('노르웨이'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.pages[0].documents).toHaveLength(1);
    expect(searchBooks).toHaveBeenCalledWith(
      expect.objectContaining({ query: '노르웨이', page: 1, size: 10 }),
    );
  });
});
