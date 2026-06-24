import { cn } from '@/shared/lib/cn';
import { useState } from 'react';

type BookCoverProps = {
  src: string;
  alt: string;
  className?: string;
};

export function BookCover({ src, alt, className }: BookCoverProps) {
  const [hasError, setHasError] = useState(false);
  const showPlaceholder = !src || hasError;

  if (showPlaceholder) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          'flex items-center justify-center bg-light-gray text-text-subtitle',
          className,
        )}
      >
        <span className="text-small">이미지 없음</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
      className={cn('bg-light-gray object-cover', className)}
    />
  );
}
