import { cn } from '@/shared/lib/cn';
import type { InputHTMLAttributes } from 'react';

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ className, type = 'text', ...restProps }: TextInputProps) {
  return (
    <input
      {...restProps}
      type={type}
      className={cn(
        'h-10 w-full rounded-button bg-light-gray px-4 text-body2 text-text-primary placeholder:text-text-subtitle focus:outline-none',
        className,
      )}
    />
  );
}

export type { TextInputProps };
