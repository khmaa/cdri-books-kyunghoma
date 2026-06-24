import type { KakaoBook } from '../types/book';
import { BookListItem } from './BookListItem';

type BookListProps = {
  books: KakaoBook[];
};

export function BookList({ books }: BookListProps) {
  return (
    <ul className="flex flex-col">
      {books.map((book) => (
        <BookListItem key={book.isbn} book={book} />
      ))}
    </ul>
  );
}
