import { beforeEach, describe, expect, it } from 'vitest';
import type { KakaoBook } from '../../types/book';
import { useFavoritesStore } from '../favoritesStore';

const makeBook = (isbn: string): KakaoBook => ({
  title: '책 제목',
  contents: '',
  url: '',
  isbn,
  datetime: '',
  authors: [],
  publisher: '',
  translators: [],
  price: 0,
  sale_price: 0,
  thumbnail: '',
  status: '',
});

describe('useFavoritesStore', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ items: [] });
    localStorage.clear();
  });

  it('toggle 로 책을 찜 목록에 추가한다', () => {
    useFavoritesStore.getState().toggle(makeBook('111'));

    expect(useFavoritesStore.getState().items).toHaveLength(1);
    expect(useFavoritesStore.getState().isFavorite('111')).toBe(true);
  });

  it('같은 책을 다시 toggle 하면 제거된다', () => {
    const book = makeBook('111');
    useFavoritesStore.getState().toggle(book);
    useFavoritesStore.getState().toggle(book);

    expect(useFavoritesStore.getState().items).toHaveLength(0);
    expect(useFavoritesStore.getState().isFavorite('111')).toBe(false);
  });

  it('remove 로 특정 책만 제거한다', () => {
    useFavoritesStore.getState().toggle(makeBook('111'));
    useFavoritesStore.getState().toggle(makeBook('222'));
    useFavoritesStore.getState().remove('111');

    const { items } = useFavoritesStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].isbn).toBe('222');
  });

  it('찜 목록을 localStorage 에 영속한다', () => {
    useFavoritesStore.getState().toggle(makeBook('111'));

    expect(localStorage.getItem('cdri-books:favorites')).toContain('111');
  });
});
