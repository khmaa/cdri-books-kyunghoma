import { cn } from '@/shared/lib/cn';
import { HeartIcon } from '@/shared/ui/Icons';
import { useFavoritesStore } from '../store/favoritesStore';
import type { KakaoBook } from '../types/book';

type FavoriteHeartButtonProps = {
  book: KakaoBook;
  className?: string;
};

export function FavoriteHeartButton({ book, className }: FavoriteHeartButtonProps) {
  const isFavorite = useFavoritesStore((state) =>
    state.items.some((item) => item.isbn === book.isbn),
  );
  const toggle = useFavoritesStore((state) => state.toggle);

  return (
    <button
      type="button"
      onClick={() => toggle(book)}
      aria-label={isFavorite ? '찜 해제' : '찜하기'}
      // 빈/채움 아이콘 viewBox 차이로 인한 점프 방지 — 24×24 고정 컨테이너
      className={cn(
        'flex h-6 w-6 items-center justify-center text-gray transition-colors hover:text-red',
        className,
      )}
    >
      <HeartIcon filled={isFavorite} className={isFavorite ? 'text-red' : ''} />
    </button>
  );
}
