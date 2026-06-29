import { beforeEach, describe, expect, it } from 'vitest';
import { useRecentKeywordsStore } from '../recentKeywordsStore';

describe('useRecentKeywordsStore', () => {
  beforeEach(() => {
    useRecentKeywordsStore.setState({ keywords: [] });
    localStorage.clear();
  });

  it('push 로 검색어를 맨 앞에 추가한다', () => {
    const { push } = useRecentKeywordsStore.getState();
    push('노르웨이');
    push('무라카미');

    expect(useRecentKeywordsStore.getState().keywords).toEqual(['무라카미', '노르웨이']);
  });

  it('중복 검색어는 제거하고 맨 앞으로 끌어올린다', () => {
    const { push } = useRecentKeywordsStore.getState();
    push('A');
    push('B');
    push('A');

    expect(useRecentKeywordsStore.getState().keywords).toEqual(['A', 'B']);
  });

  it('최대 MAX_RECENT(8)개만 유지한다', () => {
    const { push } = useRecentKeywordsStore.getState();
    for (let index = 1; index <= 10; index += 1) push(`k${index}`);

    const { keywords } = useRecentKeywordsStore.getState();
    expect(keywords).toHaveLength(8);
    expect(keywords[0]).toBe('k10');
  });

  it('remove 로 특정 검색어를 제거한다', () => {
    const { push, remove } = useRecentKeywordsStore.getState();
    push('A');
    push('B');
    remove('A');

    expect(useRecentKeywordsStore.getState().keywords).toEqual(['B']);
  });

  it('localStorage 에 영속한다', () => {
    useRecentKeywordsStore.getState().push('노르웨이');
    expect(localStorage.getItem('kakao-books:recent-keywords')).toContain('노르웨이');
  });
});
