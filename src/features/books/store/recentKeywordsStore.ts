import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MAX_RECENT, STORAGE_KEY } from '../constants/search';

type RecentKeywordsState = {
  keywords: string[];
  push: (keyword: string) => void;
  remove: (keyword: string) => void;
};

export const useRecentKeywordsStore = create<RecentKeywordsState>()(
  persist(
    (set) => ({
      keywords: [],
      // 중복 제거 후 맨 앞에 삽입, 최대 MAX_RECENT 개 유지
      push: (keyword) =>
        set((state) => {
          const withoutDuplicate = state.keywords.filter((item) => item !== keyword);
          return { keywords: [keyword, ...withoutDuplicate].slice(0, MAX_RECENT) };
        }),
      remove: (keyword) =>
        set((state) => ({
          keywords: state.keywords.filter((item) => item !== keyword),
        })),
    }),
    { name: STORAGE_KEY.RECENT },
  ),
);
