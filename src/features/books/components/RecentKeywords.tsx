import { CloseIcon } from '@/shared/ui/Icons';
import { useRecentKeywordsStore } from '../store/recentKeywordsStore';

type RecentKeywordsProps = {
  onSelect: (keyword: string) => void;
};

export function RecentKeywords({ onSelect }: RecentKeywordsProps) {
  const keywords = useRecentKeywordsStore((state) => state.keywords);
  const remove = useRecentKeywordsStore((state) => state.remove);

  if (keywords.length === 0) return null;

  return (
    <ul className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-gray bg-white py-2 shadow-md">
      {keywords.map((keyword) => (
        <li key={keyword} className="flex items-center justify-between px-5 hover:bg-light-gray">
          {/* onMouseDown 으로 input 의 blur 보다 먼저 실행 → 클릭 무시 방지 */}
          <button
            type="button"
            onMouseDown={(event) => {
              event.preventDefault();
              onSelect(keyword);
            }}
            className="flex-1 py-2 text-left text-body2 text-text-secondary"
          >
            {keyword}
          </button>
          <button
            type="button"
            aria-label="삭제"
            onMouseDown={(event) => {
              event.preventDefault();
              remove(keyword);
            }}
            className="p-1 text-black"
          >
            <CloseIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}
