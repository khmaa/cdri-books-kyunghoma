import { searchBooks } from '@/features/books/api/kakaoBookApi';
import { useRecentKeywordsStore } from '@/features/books/store/recentKeywordsStore';
import { createBook } from '@/test/factories';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import BookSearchPage from '../BookSearchPage';

vi.mock('@/features/books/api/kakaoBookApi', () => ({
  searchBooks: vi.fn(),
}));

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return render(<BookSearchPage />, { wrapper });
}

describe('BookSearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useRecentKeywordsStore.setState({ keywords: [] });
    localStorage.clear();
  });

  it('초기 상태에서는 빈 상태를 보여준다', () => {
    renderPage();
    expect(screen.getByText('검색된 결과가 없습니다.')).toBeInTheDocument();
  });

  it('검색하면 결과 목록과 총 건수를 보여준다', async () => {
    (searchBooks as Mock).mockResolvedValue({
      meta: { total_count: 1, pageable_count: 1, is_end: true },
      documents: [createBook({ title: '검색된 책' })],
    });

    renderPage();
    await userEvent.type(screen.getByPlaceholderText('검색어를 입력하세요'), '노르웨이{Enter}');

    expect(await screen.findByText('검색된 책')).toBeInTheDocument();
  });
});
