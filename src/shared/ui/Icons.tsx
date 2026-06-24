import ChevronDownSvg from '@/assets/icons/chevron-down.svg?react';
import ChevronUpSvg from '@/assets/icons/chevron-up.svg?react';
import Close12Svg from '@/assets/icons/close-12.svg?react';
import Close16Svg from '@/assets/icons/close-16.svg?react';
import emptyBookUrl from '@/assets/icons/empty-book.svg';
import HeartEmptySvg from '@/assets/icons/heart-empty.svg?react';
import HeartFilledSvg from '@/assets/icons/heart-filled.svg?react';
import SearchSvg from '@/assets/icons/search.svg?react';
import SelectChevronSvg from '@/assets/icons/select-chevron-down.svg?react';

type IconProps = { className?: string };

export const SearchIcon = (p: IconProps) => <SearchSvg aria-hidden {...p} />;
export const CloseIcon = (p: IconProps) => <Close16Svg aria-hidden {...p} />;
export const ModalCloseIcon = (p: IconProps) => <Close12Svg aria-hidden {...p} />;
export const ChevronDownIcon = (p: IconProps) => <ChevronDownSvg aria-hidden {...p} />;
export const ChevronUpIcon = (p: IconProps) => <ChevronUpSvg aria-hidden {...p} />;
export const SelectChevronIcon = (p: IconProps) => <SelectChevronSvg aria-hidden {...p} />;

export function HeartIcon({ filled, className }: { filled: boolean; className?: string }) {
  const Cmp = filled ? HeartFilledSvg : HeartEmptySvg;
  return <Cmp aria-hidden className={className} />;
}

export function BookEmptyIcon({ className }: IconProps) {
  return <img src={emptyBookUrl} alt="" width={80} height={80} className={className} />;
}
