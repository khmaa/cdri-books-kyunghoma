import { Button } from '@/shared/ui/Button';
import { SearchIcon } from '@/shared/ui/Icons';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRecentKeywordsStore } from '../store/recentKeywordsStore';
import type { SearchTarget } from '../types/book';
import { AdvancedSearchPopover } from './AdvancedSearchPopover';
import { RecentKeywords } from './RecentKeywords';

type SearchBarProps = {
  onSubmit: (query: string) => void;
  isFetching: boolean;
  onAdvancedSearch: (params: { query: string; target: SearchTarget }) => void;
};

export function SearchBar({ onSubmit, isFetching, onAdvancedSearch }: SearchBarProps) {
  const [keyword, setKeyword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const pushRecentKeyword = useRecentKeywordsStore((state) => state.push);

  const submitSearch = () => {
    if (isFetching) return; // 검색 진행 중에는 중복 호출 잠금
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return;
    pushRecentKeyword(trimmedKeyword);
    onSubmit(trimmedKeyword);
    setIsFocused(false);
    setIsAdvancedOpen(false); // 메인 검색 실행 시 상세검색 popup 닫고 전체 검색 모드로
  };

  // 최근 검색어 클릭 — input 에 채우기만 하고 검색은 사용자가 직접 트리거
  const handleSelectRecent = (selectedKeyword: string) => {
    setKeyword(selectedKeyword);
    setIsFocused(false);
  };

  return (
    <div className="relative flex items-center gap-4">
      <div className="relative w-full max-w-[480px]">
        <div className="flex h-[50px] items-center gap-2 rounded-full bg-light-gray px-6">
          <button type="button" onClick={submitSearch} aria-label="검색">
            <SearchIcon className="text-text-primary" />
          </button>
          <input
            type="text"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && submitSearch()}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="검색어를 입력하세요"
            className="w-full bg-transparent text-body1 text-text-primary placeholder:text-text-subtitle focus:outline-none"
          />
        </div>

        {isFocused ? <RecentKeywords onSelect={handleSelectRecent} /> : null}
      </div>

      {isFetching ? (
        <div className="flex h-12 w-[115px] items-center justify-center">
          <Loader2 className="animate-spin text-primary" aria-label="검색 중" />
        </div>
      ) : (
        <div className="relative">
          <Button variant="outline" onClick={() => setIsAdvancedOpen(true)} className="w-[115px]">
            상세검색
          </Button>

          {/* 상세검색 popup — 피그마 노트 "버튼 하단에 노출". dim/scroll lock 없음 */}
          <AdvancedSearchPopover
            open={isAdvancedOpen}
            onClose={() => setIsAdvancedOpen(false)}
            onSearch={onAdvancedSearch}
            className="absolute right-0 top-full z-30 mt-2 w-[360px] max-w-[calc(100vw-2rem)] rounded-button bg-white p-6 shadow-lg ring-1 ring-gray"
          />
        </div>
      )}
    </div>
  );
}
