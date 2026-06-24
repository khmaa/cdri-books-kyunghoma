import { cn } from '@/shared/lib/cn';
import { formatPrice } from '@/shared/lib/formatPrice';
import { joinAuthors } from '@/shared/lib/joinAuthors';
import { Button } from '@/shared/ui/Button';
import { ChevronUpIcon } from '@/shared/ui/Icons';
import { useEffect, useRef, useState } from 'react';
import type { KakaoBook } from '../types/book';

type BookDetailPanelProps = {
  book: KakaoBook;
  onCollapse: () => void;
};

export function BookDetailPanel({ book, onCollapse }: BookDetailPanelProps) {
  const contentsRef = useRef<HTMLParagraphElement>(null);
  const [isContentsOverflowing, setIsContentsOverflowing] = useState(false);
  const [isContentsExpanded, setIsContentsExpanded] = useState(false);

  // 마운트 시점(line-clamp 적용 상태)에서 실제 넘침 여부를 측정해 "더보기" 노출 결정
  useEffect(() => {
    const contentsElement = contentsRef.current;
    if (!contentsElement) return;
    setIsContentsOverflowing(contentsElement.scrollHeight > contentsElement.clientHeight);
  }, []);

  const hasSalePrice = book.sale_price >= 0;
  const openBuyPage = () => window.open(book.url, '_blank', 'noopener,noreferrer');

  return (
    <div className="flex min-h-[344px] gap-8 px-4 py-6">
      <img
        src={book.thumbnail}
        alt={book.title}
        loading="lazy"
        className="h-[280px] w-[210px] shrink-0 rounded-sm bg-light-gray object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-baseline gap-4">
          <h3 className="text-title3 font-bold text-text-primary">{book.title}</h3>
          <span className="truncate text-caption font-medium text-text-subtitle">
            {joinAuthors(book.authors)}
          </span>
        </div>

        <p className="mt-6 text-body2 font-bold text-text-primary">책 소개</p>
        <p
          ref={contentsRef}
          className={cn(
            'mt-3 text-body2 font-medium text-text-secondary',
            !isContentsExpanded && 'line-clamp-3',
          )}
        >
          {book.contents}
        </p>

        {isContentsOverflowing ? (
          <button
            type="button"
            onClick={() => setIsContentsExpanded((previous) => !previous)}
            className="mt-2 self-end text-body2 font-medium text-text-subtitle"
          >
            {isContentsExpanded ? '접기' : '더보기'}
          </button>
        ) : null}
      </div>

      <div className="flex shrink-0 flex-col items-end justify-between">
        <Button variant="outline" onClick={onCollapse} className="w-[115px]">
          상세보기
          <ChevronUpIcon className="text-icon-tertiary" />
        </Button>

        <div className="flex flex-col items-end gap-3">
          <div className="flex items-baseline gap-2">
            {hasSalePrice ? (
              <>
                <span className="text-price font-light text-text-primary line-through">
                  {formatPrice(book.price)}
                </span>
                <span className="text-price font-bold text-text-primary">
                  {formatPrice(book.sale_price)}
                </span>
              </>
            ) : (
              <span className="text-price font-bold text-text-primary">
                {formatPrice(book.price)}
              </span>
            )}
          </div>

          <Button variant="primary" onClick={openBuyPage} className="w-[240px]">
            구매하기
          </Button>
        </div>
      </div>
    </div>
  );
}
