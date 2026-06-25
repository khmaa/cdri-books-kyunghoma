import { createBook } from '@/test/factories';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { useFavoritesStore } from '../../store/favoritesStore';
import { FavoriteHeartButton } from '../FavoriteHeartButton';

describe('FavoriteHeartButton', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ items: [] });
    localStorage.clear();
  });

  it('찜 안 한 책은 "찜하기" 라벨을 가진다', () => {
    render(<FavoriteHeartButton book={createBook({ isbn: '111' })} />);
    expect(screen.getByRole('button', { name: '찜하기' })).toBeInTheDocument();
  });

  it('클릭하면 찜 상태가 토글되고 라벨이 바뀐다', async () => {
    const book = createBook({ isbn: '111' });
    render(<FavoriteHeartButton book={book} />);

    await userEvent.click(screen.getByRole('button', { name: '찜하기' }));

    expect(useFavoritesStore.getState().isFavorite('111')).toBe(true);
    expect(screen.getByRole('button', { name: '찜 해제' })).toBeInTheDocument();
  });
});
