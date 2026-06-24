import { useBookSearch } from '@/features/books/api/useBookSearch';
import { AdvancedSearchModal } from '@/features/books/components/AdvancedSearchModal';
import { BookList } from '@/features/books/components/BookList';
import { SearchBar } from '@/features/books/components/SearchBar';
import type { SearchTarget } from '@/features/books/types/book';
import { BookEmptyIcon } from '@/shared/ui/Icons';
import { useMemo, useState } from 'react';

export default function BookSearchPage() {
  const [query, setQuery] = useState('');
  const [target, setTarget] = useState<SearchTarget | undefined>(undefined);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const { data, isFetching, isError } = useBookSearch(query, target);

  const books = useMemo(() => data?.pages.flatMap((page) => page.documents) ?? [], [data]);
  const totalCount = data?.pages[0]?.meta.total_count ?? 0;

  // 기본 검색 — 필드 제한 없이 전체 검색
  const handleBasicSearch = (nextQuery: string) => {
    setTarget(undefined);
    setQuery(nextQuery);
  };

  // 상세 검색 — target 필드 제한 검색
  const handleAdvancedSearch = ({
    query: nextQuery,
    target: nextTarget,
  }: {
    query: string;
    target: SearchTarget;
  }) => {
    setTarget(nextTarget);
    setQuery(nextQuery);
  };

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-title2 font-bold text-text-primary">도서 검색</h2>

      <SearchBar
        onSubmit={handleBasicSearch}
        isFetching={isFetching}
        onOpenAdvanced={() => setIsAdvancedOpen(true)}
      />

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

      <AdvancedSearchModal
        open={isAdvancedOpen}
        onClose={() => setIsAdvancedOpen(false)}
        onSearch={handleAdvancedSearch}
      />
    </section>
  );
}
