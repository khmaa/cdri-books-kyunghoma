import { useState } from 'react';
import type { KakaoBook } from '../types/book';
import { BookListItem } from './BookListItem';

type BookListProps = {
  books: KakaoBook[];
};

export function BookList({ books }: BookListProps) {
  // 한 번에 하나만 펼침 — 펼쳐진 항목의 isbn 을 단일 상태로 관리
  const [expandedIsbn, setExpandedIsbn] = useState<string | null>(null);

  const toggleExpanded = (isbn: string) => {
    setExpandedIsbn((current) => (current === isbn ? null : isbn));
  };

  return (
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
  );
}
