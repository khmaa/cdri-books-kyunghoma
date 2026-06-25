import { Button } from '@/shared/ui/Button';
import { ModalCloseIcon } from '@/shared/ui/Icons';
import { Popover } from '@/shared/ui/Popover';
import { Select, type SelectOption } from '@/shared/ui/Select';
import { TextInput } from '@/shared/ui/TextInput';
import { useState } from 'react';
import type { SearchTarget } from '../types/book';

// 상세검색에서 노출하는 필드 — 제목 / 저자명 / 출판사
type AdvancedSearchTarget = Extract<SearchTarget, 'title' | 'person' | 'publisher'>;

const TARGET_OPTIONS: SelectOption<AdvancedSearchTarget>[] = [
  { value: 'title', label: '제목' },
  { value: 'person', label: '저자명' },
  { value: 'publisher', label: '출판사' },
];

type AdvancedSearchPopoverProps = {
  open: boolean;
  onClose: () => void;
  onSearch: (params: { query: string; target: SearchTarget }) => void;
  className?: string; // 위치/폭/배경/패딩은 부모(SearchBar)가 제어
};

export function AdvancedSearchPopover({
  open,
  onClose,
  onSearch,
  className,
}: AdvancedSearchPopoverProps) {
  const [target, setTarget] = useState<AdvancedSearchTarget>('title');
  const [keyword, setKeyword] = useState('');

  const submitSearch = () => {
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return;
    onSearch({ query: trimmedKeyword, target });
    onClose();
  };

  return (
    <Popover open={open} onClose={onClose} className={className}>
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        className="absolute right-4 top-4 text-icon-tertiary"
      >
        <ModalCloseIcon />
      </button>

      <div className="flex min-h-32 flex-col gap-6 pt-6">
        <div className="flex items-center gap-3">
          <div className="w-20 shrink-0">
            <Select
              value={target}
              onChange={setTarget}
              options={TARGET_OPTIONS}
              className="rounded-none border-0 border-b border-gray bg-transparent px-0"
            />
          </div>
          <TextInput
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && submitSearch()}
            placeholder="검색어 입력"
            className="rounded-none border-b border-gray bg-transparent px-0 focus:border-primary"
          />
        </div>

        <Button variant="primary" onClick={submitSearch} className="w-full">
          검색하기
        </Button>
      </div>
    </Popover>
  );
}
