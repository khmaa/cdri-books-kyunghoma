import type { KakaoBook } from '@/features/books/types/book';

/** 테스트용 KakaoBook 생성기 — 필요한 필드만 overrides 로 덮어쓴다 */
export const createBook = (overrides: Partial<KakaoBook> = {}): KakaoBook => ({
  title: '노르웨이의 숲',
  contents: '책 소개 내용입니다.',
  url: 'https://example.com/book',
  isbn: '111',
  datetime: '2024-01-01T00:00:00.000+09:00',
  authors: ['무라카미 하루키'],
  publisher: '민음사',
  translators: [],
  price: 15000,
  sale_price: 13500,
  thumbnail: 'https://example.com/cover.jpg',
  status: '정상판매',
  ...overrides,
});
