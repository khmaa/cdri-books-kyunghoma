import { useEffect, useRef, type ReactNode } from 'react';

type PopoverProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string; // 위치/폭은 부모가 결정
};

export function Popover({ open, onClose, children, className }: PopoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const handleMouseDown = (event: MouseEvent) => {
      // popup 외부 클릭 시 닫기 — 메인 검색 input 클릭도 외부로 간주 (동시 진행 불가)
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    // 첫 input 에 autofocus
    const firstInput = containerRef.current?.querySelector<HTMLElement>('input, textarea');
    firstInput?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={containerRef} role="dialog" aria-modal="false" className={className}>
      {children}
    </div>
  );
}
