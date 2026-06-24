import { cn } from '@/shared/lib/cn';
import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

const buttonVariants = {
  primary: 'bg-primary text-white font-bold hover:bg-primary/90',
  outline: 'border border-gray text-text-secondary font-medium hover:bg-light-gray',
  ghost: 'bg-transparent text-text-secondary font-medium hover:bg-light-gray',
} as const;

type ButtonVariant = keyof typeof buttonVariants;

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: ButtonVariant;
  loading?: boolean;
};

export function Button({
  className,
  children,
  variant = 'primary',
  loading = false,
  disabled,
  type = 'button',
  ...restProps
}: ButtonProps) {
  return (
    <button
      {...restProps}
      type={type}
      disabled={disabled || loading}
      className={cn(
        'inline-flex h-12 items-center justify-center gap-1 whitespace-nowrap rounded-button px-5 text-body2 transition-colors disabled:cursor-not-allowed disabled:opacity-60',
        buttonVariants[variant],
        className,
      )}
    >
      {loading ? <Loader2 className="animate-spin" aria-label="로딩 중" /> : children}
    </button>
  );
}

export type { ButtonProps, ButtonVariant };
