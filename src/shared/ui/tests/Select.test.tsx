import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Select, type SelectOption } from '../Select';

const OPTIONS: SelectOption<string>[] = [
  { value: 'title', label: '제목' },
  { value: 'person', label: '저자명' },
  { value: 'publisher', label: '출판사' },
];

describe('Select', () => {
  it('현재 선택된 라벨을 표시한다', () => {
    render(<Select value="title" onChange={() => {}} options={OPTIONS} />);
    expect(screen.getByRole('button', { name: '제목' })).toBeInTheDocument();
  });

  it('클릭하면 옵션 목록을 연다', async () => {
    render(<Select value="title" onChange={() => {}} options={OPTIONS} />);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('저자명')).toBeInTheDocument();
  });

  it('옵션 클릭 시 해당 값으로 onChange 를 호출한다', async () => {
    const onChange = vi.fn();
    render(<Select value="title" onChange={onChange} options={OPTIONS} />);
    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(screen.getByText('저자명'));
    expect(onChange).toHaveBeenCalledWith('person');
  });

  it('키보드 화살표/Enter 로 선택할 수 있다', async () => {
    const onChange = vi.fn();
    render(<Select value="title" onChange={onChange} options={OPTIONS} />);
    const trigger = screen.getByRole('button');
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}'); // 열기
    await userEvent.keyboard('{ArrowDown}'); // title -> person
    await userEvent.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith('person');
  });
});
