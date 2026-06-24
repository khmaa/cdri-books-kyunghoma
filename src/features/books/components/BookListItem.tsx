import { formatPrice } from '@/shared/lib/formatPrice';
import { joinAuthors } from '@/shared/lib/joinAuthors';
import { Button } from '@/shared/ui/Button';
import { ChevronDownIcon } from '@/shared/ui/Icons';
import type { KakaoBook } from '../types/book';

type BookListItemProps = {
  book: KakaoBook;
};

export function BookListItem({ book }: BookListItemProps) {
  const openBuyPage = () => window.open(book.url, '_blank', 'noopener,noreferrer');

  return (
    <li className="flex items-center gap-6 border-b border-light-gray px-4 py-4">
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
        {formatPrice(book.price)}
      </span>

      <Button variant="primary" onClick={openBuyPage} className="w-[115px] shrink-0">
        구매하기
      </Button>

      <Button variant="outline" className="w-[115px] shrink-0">
        상세보기
        <ChevronDownIcon className="text-icon-tertiary" />
      </Button>
    </li>
  );
}
