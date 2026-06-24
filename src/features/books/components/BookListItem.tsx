import { formatPrice } from '@/shared/lib/formatPrice';
import { joinAuthors } from '@/shared/lib/joinAuthors';
import { Button } from '@/shared/ui/Button';
import { ChevronDownIcon } from '@/shared/ui/Icons';
import type { KakaoBook } from '../types/book';
import { BookDetailPanel } from './BookDetailPanel';

type BookListItemProps = {
  book: KakaoBook;
  isExpanded: boolean;
  onToggle: () => void;
};

export function BookListItem({ book, isExpanded, onToggle }: BookListItemProps) {
  const openBuyPage = () => window.open(book.url, '_blank', 'noopener,noreferrer');

  // 접힌 행은 실제 판매가 하나만 노출 — 할인가가 있으면 할인가, 없으면 정가
  const sellingPrice = book.sale_price >= 0 ? book.sale_price : book.price;

  return (
    <li className="border-b border-light-gray">
      {isExpanded ? (
        <BookDetailPanel book={book} onCollapse={onToggle} />
      ) : (
        <div className="flex items-center gap-6 px-4 py-4">
          <img
            src={book.thumbnail}
            alt={book.title}
            loading="lazy"
            className="h-[68px] w-12 shrink-0 rounded-sm bg-light-gray object-cover"
          />

          <div className="flex min-w-0 flex-1 items-center gap-4">
            <h3 className="truncate text-body1 font-bold text-text-primary">{book.title}</h3>
            <span className="truncate text-caption font-medium text-text-subtitle">
              {joinAuthors(book.authors)}
            </span>
          </div>

          <span className="whitespace-nowrap text-title3 font-bold text-text-primary">
            {formatPrice(sellingPrice)}
          </span>

          <Button variant="primary" onClick={openBuyPage} className="w-[115px] shrink-0">
            구매하기
          </Button>

          <Button variant="outline" onClick={onToggle} className="w-[115px] shrink-0">
            상세보기
            <ChevronDownIcon className="text-icon-tertiary" />
          </Button>
        </div>
      )}
    </li>
  );
}
