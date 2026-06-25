import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useRecentKeywordsStore } from '../../store/recentKeywordsStore';
import { SearchBar } from '../SearchBar';

const noop = () => {};

describe('SearchBar', () => {
  beforeEach(() => {
    useRecentKeywordsStore.setState({ keywords: [] });
    localStorage.clear();
  });

  it('입력 후 Enter 시 onSubmit 을 호출한다', async () => {
    const onSubmit = vi.fn();
    render(<SearchBar onSubmit={onSubmit} isFetching={false} onAdvancedSearch={noop} />);

    await userEvent.type(screen.getByPlaceholderText('검색어를 입력하세요'), '노르웨이{Enter}');

    expect(onSubmit).toHaveBeenCalledWith('노르웨이');
  });

  it('검색 시 최근 검색어에 저장한다', async () => {
    render(<SearchBar onSubmit={noop} isFetching={false} onAdvancedSearch={noop} />);
    await userEvent.type(screen.getByPlaceholderText('검색어를 입력하세요'), '무라카미{Enter}');
    expect(useRecentKeywordsStore.getState().keywords).toContain('무라카미');
  });

  it('상세검색 버튼 클릭 시 popup 이 열린다', async () => {
    render(<SearchBar onSubmit={noop} isFetching={false} onAdvancedSearch={noop} />);
    await userEvent.click(screen.getByRole('button', { name: '상세검색' }));
    expect(screen.getByRole('button', { name: '검색하기' })).toBeInTheDocument();
  });

  it('isFetching 이면 로딩 스피너를 표시한다', () => {
    render(<SearchBar onSubmit={noop} isFetching onAdvancedSearch={noop} />);
    expect(screen.getByLabelText('검색 중')).toBeInTheDocument();
  });
});
