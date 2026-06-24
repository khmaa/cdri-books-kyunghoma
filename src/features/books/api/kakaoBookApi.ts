import { kakaoApi } from '@/shared/api/apiClient';
import type { KakaoBookSearchResponse, SearchTarget } from '../types/book';

export type SearchBooksParams = {
  query: string;
  page: number;
  size: number;
  target?: SearchTarget;
};

export async function searchBooks(params: SearchBooksParams) {
  const { data } = await kakaoApi.get<KakaoBookSearchResponse>('/v3/search/book', {
    params,
  });
  return data;
}
