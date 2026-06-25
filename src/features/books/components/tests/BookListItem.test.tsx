import { createBook } from '@/test/factories';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useFavoritesStore } from '../../store/favoritesStore';
import { BookListItem } from '../BookListItem';

const renderItem = (props: Parameters<typeof BookListItem>[0]) =>
  render(
    <ul>
      <BookListItem {...props} />
    </ul>,
  );

describe('BookListItem', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ items: [] });
  });

  it('접힌 상태에서 제목·판매가·버튼을 렌더한다', () => {
    renderItem({ book: createBook(), isExpanded: false, onToggle: () => {} });
    expect(screen.getByText('노르웨이의 숲')).toBeInTheDocument();
    expect(screen.getByText('13,500원')).toBeInTheDocument(); // 할인가 우선
    expect(screen.getByRole('button', { name: '구매하기' })).toBeInTheDocument();
  });

  it('할인가가 없으면 접힌 행에 정가를 표시한다', () => {
    renderItem({
      book: createBook({ price: 15000, sale_price: -1 }),
      isExpanded: false,
      onToggle: () => {},
    });
    expect(screen.getByText('15,000원')).toBeInTheDocument();
  });

  it('상세보기 클릭 시 onToggle 을 호출한다', async () => {
    const onToggle = vi.fn();
    renderItem({ book: createBook(), isExpanded: false, onToggle });
    await userEvent.click(screen.getByRole('button', { name: /상세보기/ }));
    expect(onToggle).toHaveBeenCalled();
  });

  it('펼친 상태면 상세 패널(책 소개)을 렌더한다', () => {
    renderItem({ book: createBook(), isExpanded: true, onToggle: () => {} });
    expect(screen.getByText('책 소개')).toBeInTheDocument();
  });
});
