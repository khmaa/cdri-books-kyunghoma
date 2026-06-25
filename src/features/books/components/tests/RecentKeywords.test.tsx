import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useRecentKeywordsStore } from '../../store/recentKeywordsStore';
import { RecentKeywords } from '../RecentKeywords';

describe('RecentKeywords', () => {
  beforeEach(() => {
    useRecentKeywordsStore.setState({ keywords: ['노르웨이', '무라카미'] });
    localStorage.clear();
  });

  it('최근 검색어 목록을 렌더한다', () => {
    render(<RecentKeywords onSelect={() => {}} />);
    expect(screen.getByText('노르웨이')).toBeInTheDocument();
    expect(screen.getByText('무라카미')).toBeInTheDocument();
  });

  it('항목 클릭 시 onSelect 를 호출한다', async () => {
    const onSelect = vi.fn();
    render(<RecentKeywords onSelect={onSelect} />);
    await userEvent.click(screen.getByText('노르웨이'));
    expect(onSelect).toHaveBeenCalledWith('노르웨이');
  });

  it('X 클릭 시 해당 검색어를 삭제한다', async () => {
    render(<RecentKeywords onSelect={() => {}} />);
    const removeButtons = screen.getAllByRole('button', { name: '삭제' });
    await userEvent.click(removeButtons[0]);
    expect(useRecentKeywordsStore.getState().keywords).not.toContain('노르웨이');
  });

  it('검색어가 없으면 아무것도 렌더하지 않는다', () => {
    useRecentKeywordsStore.setState({ keywords: [] });
    const { container } = render(<RecentKeywords onSelect={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });
});
