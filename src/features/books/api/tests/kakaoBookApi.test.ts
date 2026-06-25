import { kakaoApi } from '@/shared/api/apiClient';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { searchBooks } from '../kakaoBookApi';

vi.mock('@/shared/api/apiClient', () => ({
  kakaoApi: { get: vi.fn() },
}));

describe('searchBooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('도서 검색 엔드포인트에 params 를 그대로 전달한다', async () => {
    (kakaoApi.get as Mock).mockResolvedValue({
      data: { meta: { total_count: 0, pageable_count: 0, is_end: true }, documents: [] },
    });

    await searchBooks({ query: '노르웨이', page: 1, size: 10, target: 'title' });

    expect(kakaoApi.get).toHaveBeenCalledWith('/v3/search/book', {
      params: { query: '노르웨이', page: 1, size: 10, target: 'title' },
    });
  });

  it('응답 본문(data)을 반환한다', async () => {
    const responseData = {
      meta: { total_count: 1, pageable_count: 1, is_end: true },
      documents: [],
    };
    (kakaoApi.get as Mock).mockResolvedValue({ data: responseData });

    const result = await searchBooks({ query: '책', page: 1, size: 10 });

    expect(result).toBe(responseData);
  });
});
