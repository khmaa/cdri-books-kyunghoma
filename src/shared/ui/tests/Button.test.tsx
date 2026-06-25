import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../Button';

describe('Button', () => {
  it('children 을 렌더한다', () => {
    render(<Button>구매하기</Button>);
    expect(screen.getByRole('button', { name: '구매하기' })).toBeInTheDocument();
  });

  it('outline variant 클래스를 적용한다', () => {
    render(<Button variant="outline">상세보기</Button>);
    expect(screen.getByRole('button', { name: '상세보기' })).toHaveClass('border-gray');
  });

  it('전달한 className 을 병합한다', () => {
    render(<Button className="w-[115px]">검색</Button>);
    expect(screen.getByRole('button', { name: '검색' })).toHaveClass('w-[115px]');
  });

  it('loading 이면 비활성화되고 스피너를 표시한다', () => {
    render(<Button loading>검색하기</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('클릭 시 onClick 을 호출한다', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>클릭</Button>);
    await userEvent.click(screen.getByRole('button', { name: '클릭' }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
