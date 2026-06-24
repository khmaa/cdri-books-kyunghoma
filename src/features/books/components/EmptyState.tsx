import { BookEmptyIcon } from '@/shared/ui/Icons';

type EmptyStateProps = {
  message: string;
};

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-20">
      <BookEmptyIcon />
      <p className="text-body2 font-medium text-text-subtitle">{message}</p>
    </div>
  );
}
