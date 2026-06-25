import { useFavoritesStore } from '@/features/books/store/favoritesStore';
import { createBook } from '@/test/factories';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import FavoritesPage from '../FavoritesPage';

describe('FavoritesPage', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ items: [] });
  });

  it('찜한 책이 없으면 빈 상태를 보여준다', () => {
    render(<FavoritesPage />);
    expect(screen.getByText('찜한 책이 없습니다.')).toBeInTheDocument();
  });

  it('찜한 책이 있으면 목록과 건수를 보여준다', () => {
    useFavoritesStore.setState({ items: [createBook({ title: '찜한 책' })] });
    render(<FavoritesPage />);
    expect(screen.getByText('찜한 책')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
