import { createBook } from '@/test/factories';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useFavoritesStore } from '../../store/favoritesStore';
import { BookList } from '../BookList';

describe('BookList', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ items: [] });
  });

  it('전달한 책 목록을 렌더한다', () => {
    render(
      <BookList
        books={[
          createBook({ isbn: '1', title: '책 하나' }),
          createBook({ isbn: '2', title: '책 둘' }),
        ]}
      />,
    );
    expect(screen.getByText('책 하나')).toBeInTheDocument();
    expect(screen.getByText('책 둘')).toBeInTheDocument();
  });

  it('다음 페이지가 있으면 하단 로딩 스피너 자리를 노출한다', () => {
    render(
      <BookList
        books={[createBook()]}
        hasNextPage
        isFetchingNextPage={false}
        onLoadMore={() => {}}
      />,
    );
    expect(screen.getByLabelText('더 불러오는 중')).toBeInTheDocument();
  });

  it('onLoadMore 가 없으면(찜 목록) 스피너를 렌더하지 않는다', () => {
    render(<BookList books={[createBook()]} />);
    expect(screen.queryByLabelText('더 불러오는 중')).not.toBeInTheDocument();
  });
});
