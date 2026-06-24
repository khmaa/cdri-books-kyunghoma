import { Button } from '@/shared/ui/Button';
import { SearchIcon } from '@/shared/ui/Icons';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

type SearchBarProps = {
  onSubmit: (query: string) => void;
  isFetching: boolean;
  onOpenAdvanced?: () => void;
};

export function SearchBar({ onSubmit, isFetching, onOpenAdvanced }: SearchBarProps) {
  const [keyword, setKeyword] = useState('');

  const submitSearch = () => {
    if (isFetching) return; // 검색 진행 중에는 중복 호출 잠금
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return;
    onSubmit(trimmedKeyword);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-[50px] w-full max-w-[480px] items-center gap-2 rounded-full bg-light-gray px-6">
        <button type="button" onClick={submitSearch} aria-label="검색">
          <SearchIcon className="text-text-primary" />
        </button>
        <input
          type="text"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && submitSearch()}
          placeholder="검색어를 입력하세요"
          className="w-full bg-transparent text-body1 text-text-primary placeholder:text-text-subtitle focus:outline-none"
        />
      </div>

      {isFetching ? (
        <div className="flex h-12 w-[115px] items-center justify-center">
          <Loader2 className="animate-spin text-primary" aria-label="검색 중" />
        </div>
      ) : (
        <Button variant="outline" onClick={onOpenAdvanced} className="w-[115px]">
          상세검색
        </Button>
      )}
    </div>
  );
}
