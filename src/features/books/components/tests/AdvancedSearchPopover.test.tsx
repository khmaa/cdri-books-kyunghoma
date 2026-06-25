import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AdvancedSearchPopover } from '../AdvancedSearchPopover';

describe('AdvancedSearchPopover', () => {
  it('검색어 입력 후 검색하기 클릭 시 기본 target(title)으로 onSearch 호출', async () => {
    const onSearch = vi.fn();
    const onClose = vi.fn();
    render(<AdvancedSearchPopover open onClose={onClose} onSearch={onSearch} />);

    await userEvent.type(screen.getByPlaceholderText('검색어 입력'), '무라카미');
    await userEvent.click(screen.getByRole('button', { name: '검색하기' }));

    expect(onSearch).toHaveBeenCalledWith({ query: '무라카미', target: 'title' });
    expect(onClose).toHaveBeenCalled();
  });

  it('필드를 저자명으로 바꾸면 target=person 으로 검색한다', async () => {
    const onSearch = vi.fn();
    render(<AdvancedSearchPopover open onClose={() => {}} onSearch={onSearch} />);

    await userEvent.click(screen.getByRole('button', { name: '제목' }));
    await userEvent.click(screen.getByText('저자명'));
    await userEvent.type(screen.getByPlaceholderText('검색어 입력'), '하루키');
    await userEvent.click(screen.getByRole('button', { name: '검색하기' }));

    expect(onSearch).toHaveBeenCalledWith({ query: '하루키', target: 'person' });
  });

  it('빈 검색어면 onSearch 를 호출하지 않는다', async () => {
    const onSearch = vi.fn();
    render(<AdvancedSearchPopover open onClose={() => {}} onSearch={onSearch} />);
    await userEvent.click(screen.getByRole('button', { name: '검색하기' }));
    expect(onSearch).not.toHaveBeenCalled();
  });
});
