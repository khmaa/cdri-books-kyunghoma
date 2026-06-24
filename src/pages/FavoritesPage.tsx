import { BookList } from '@/features/books/components/BookList';
import { EmptyState } from '@/features/books/components/EmptyState';
import { useFavoritesStore } from '@/features/books/store/favoritesStore';

export default function FavoritesPage() {
  const items = useFavoritesStore((state) => state.items);

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-title2 font-bold text-text-primary">내가 찜한 책</h2>

      <p className="text-caption font-medium text-text-primary">
        찜한 책 총 <span className="text-primary">{items.length}</span>건
      </p>

      {items.length === 0 ? (
        <EmptyState message="찜한 책이 없습니다." />
      ) : (
        <BookList books={items} />
      )}
    </section>
  );
}
