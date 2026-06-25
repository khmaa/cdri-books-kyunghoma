import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TextInput } from '../TextInput';

describe('TextInput', () => {
  it('placeholder 를 렌더한다', () => {
    render(<TextInput placeholder="검색어 입력" />);
    expect(screen.getByPlaceholderText('검색어 입력')).toBeInTheDocument();
  });

  it('입력 시 onChange 를 호출한다', async () => {
    const onChange = vi.fn();
    render(<TextInput onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), '책');
    expect(onChange).toHaveBeenCalled();
  });

  it('전달한 className 을 병합한다', () => {
    render(<TextInput className="bg-transparent" />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-transparent');
  });
});
