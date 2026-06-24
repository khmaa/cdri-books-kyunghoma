import { useBookSearch } from '@/features/books/api/useBookSearch';
import { BookList } from '@/features/books/components/BookList';
import { SearchBar } from '@/features/books/components/SearchBar';
import { BookEmptyIcon } from '@/shared/ui/Icons';
import { useMemo, useState } from 'react';

export default function BookSearchPage() {
  const [query, setQuery] = useState('');
  const { data, isFetching, isError } = useBookSearch(query);

  const books = useMemo(() => data?.pages.flatMap((page) => page.documents) ?? [], [data]);
  const totalCount = data?.pages[0]?.meta.total_count ?? 0;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-title2 font-bold text-text-primary">도서 검색</h2>

      <SearchBar onSubmit={setQuery} isFetching={isFetching} />

      <p className="text-caption font-medium text-text-primary">
        도서 검색 결과 총 <span className="text-primary">{totalCount}</span>건
      </p>

      {isError ? (
        <p className="py-20 text-center text-body2 font-medium text-text-subtitle">
          검색 결과를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
        </p>
      ) : books.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20">
          <BookEmptyIcon />
          <p className="text-body2 font-medium text-text-subtitle">검색된 결과가 없습니다.</p>
        </div>
      ) : (
        <BookList books={books} />
      )}
    </section>
  );
}
