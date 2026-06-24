import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEY } from '../constants/search';
import type { KakaoBook } from '../types/book';

type FavoritesState = {
  items: KakaoBook[];
  toggle: (book: KakaoBook) => void;
  isFavorite: (isbn: string) => boolean;
  remove: (isbn: string) => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (book) =>
        set((state) => ({
          items: state.items.some((item) => item.isbn === book.isbn)
            ? state.items.filter((item) => item.isbn !== book.isbn)
            : [book, ...state.items],
        })),
      isFavorite: (isbn) => get().items.some((item) => item.isbn === isbn),
      remove: (isbn) =>
        set((state) => ({ items: state.items.filter((item) => item.isbn !== isbn) })),
    }),
    { name: STORAGE_KEY.FAVORITES },
  ),
);
