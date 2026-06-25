import { createBook } from '@/test/factories';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useFavoritesStore } from '../../store/favoritesStore';
import { BookDetailPanel } from '../BookDetailPanel';

describe('BookDetailPanel', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ items: [] });
  });

  it('제목과 "책 소개" 라벨을 렌더한다', () => {
    render(<BookDetailPanel book={createBook()} onCollapse={() => {}} />);
    expect(screen.getByText('노르웨이의 숲')).toBeInTheDocument();
    expect(screen.getByText('책 소개')).toBeInTheDocument();
  });

  it('할인가가 있으면 정가와 할인가를 모두 표시한다', () => {
    render(
      <BookDetailPanel
        book={createBook({ price: 15000, sale_price: 13500 })}
        onCollapse={() => {}}
      />,
    );
    expect(screen.getByText('15,000원')).toBeInTheDocument();
    expect(screen.getByText('13,500원')).toBeInTheDocument();
  });

  it('할인가가 없으면(-1) 정가만 표시한다', () => {
    render(
      <BookDetailPanel book={createBook({ price: 15000, sale_price: -1 })} onCollapse={() => {}} />,
    );
    expect(screen.getByText('15,000원')).toBeInTheDocument();
    expect(screen.queryByText('-1원')).not.toBeInTheDocument();
  });

  it('상세보기(접기) 버튼 클릭 시 onCollapse 를 호출한다', async () => {
    const onCollapse = vi.fn();
    render(<BookDetailPanel book={createBook()} onCollapse={onCollapse} />);
    await userEvent.click(screen.getByRole('button', { name: /상세보기/ }));
    expect(onCollapse).toHaveBeenCalled();
  });
});
