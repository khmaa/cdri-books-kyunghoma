import { Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { KakaoBook } from '../types/book';
import { BookListItem } from './BookListItem';

type BookListProps = {
  books: KakaoBook[];
  // 무한 스크롤 — 페이지네이션이 없는 곳(찜 목록)에서는 생략
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
};

export function BookList({ books, hasNextPage, isFetchingNextPage, onLoadMore }: BookListProps) {
  // 한 번에 하나만 펼침 — 펼쳐진 항목의 isbn 을 단일 상태로 관리
  const [expandedIsbn, setExpandedIsbn] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const toggleExpanded = (isbn: string) => {
    setExpandedIsbn((current) => (current === isbn ? null : isbn));
  };

  // sentinel 이 뷰포트 600px 전에 들어오면 다음 페이지 선행 로드
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !onLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          onLoadMore();
        }
      },
      { rootMargin: '600px 0px' },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [onLoadMore, hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex flex-col">
      <ul className="flex flex-col">
        {books.map((book) => (
          <BookListItem
            key={book.isbn}
            book={book}
            isExpanded={expandedIsbn === book.isbn}
            onToggle={() => toggleExpanded(book.isbn)}
          />
        ))}
      </ul>

      {/* 다음 페이지가 남아있는 동안 하단에 스피너 자리를 항상 확보 — 선행 로드는 그대로 유지 */}
      {onLoadMore && hasNextPage ? (
        <div ref={sentinelRef} className="flex justify-center py-6">
          <Loader2 className="animate-spin text-primary" aria-label="더 불러오는 중" />
        </div>
      ) : null}
    </div>
  );
}
