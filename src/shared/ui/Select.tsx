import { cn } from '@/shared/lib/cn';
import { SelectChevronIcon } from '@/shared/ui/Icons';
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';

type SelectOption<TValue extends string> = { value: TValue; label: string };

type SelectProps<TValue extends string> = {
  value: TValue;
  onChange: (value: TValue) => void;
  options: SelectOption<TValue>[];
  className?: string;
};

export function Select<TValue extends string>({
  value,
  onChange,
  options,
  className,
}: SelectProps<TValue>) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value);

  // 외부 클릭 시 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // 열 때 현재 선택 항목에 하이라이트 위치를 맞춰서 연다
  const openDropdown = () => {
    const selectedIndex = options.findIndex((option) => option.value === value);
    setActiveIndex(selectedIndex < 0 ? 0 : selectedIndex);
    setIsOpen(true);
  };

  const toggleDropdown = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      openDropdown();
    }
  };

  const selectOption = (option: SelectOption<TValue>) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      return;
    }
    if (!isOpen) {
      if (event.key === 'ArrowDown' || event.key === 'Enter') {
        event.preventDefault();
        openDropdown();
      }
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((previous) => (previous + 1) % options.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((previous) => (previous - 1 + options.length) % options.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      selectOption(options[activeIndex]);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-button border border-gray bg-white px-3 text-body2 font-medium text-text-primary',
          className,
        )}
      >
        <span>{selectedOption?.label}</span>
        <SelectChevronIcon className="text-icon-tertiary" />
      </button>

      {isOpen ? (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-button border border-gray bg-white shadow-md"
        >
          {options.map((option, optionIndex) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              onClick={() => selectOption(option)}
              onMouseEnter={() => setActiveIndex(optionIndex)}
              className={cn(
                'cursor-pointer px-3 py-2 text-body2 font-medium text-text-primary',
                optionIndex === activeIndex && 'bg-light-gray',
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export type { SelectOption, SelectProps };
