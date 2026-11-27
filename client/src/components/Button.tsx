import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon' | 'terracotta';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary hover:-translate-y-0.5 shadow-sm',
  secondary:
    'bg-light-surface-container dark:bg-dark-surface-container text-light-on-surface dark:text-dark-on-surface border border-light-outline dark:border-dark-outline hover:bg-light-surface-muted dark:hover:bg-dark-surface-muted',
  ghost:
    'bg-transparent text-light-on-surface-muted dark:text-dark-on-surface-muted hover:text-light-on-surface dark:hover:text-dark-on-surface hover:bg-light-surface-muted/60 dark:hover:bg-dark-surface-muted/60',
  icon:
    'w-9 h-9 rounded-full bg-light-surface-container dark:bg-dark-surface-container text-light-on-surface dark:text-dark-on-surface border border-light-outline dark:border-dark-outline hover:bg-light-surface-muted dark:hover:bg-dark-surface-muted',
  terracotta:
    'bg-terracotta text-light-on-primary hover:bg-terracotta-dark hover:-translate-y-0.5 shadow-sm',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-sm py-xs text-label-sm rounded',
  md: 'px-md py-sm text-label-lg rounded',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  const baseClass =
    'inline-flex items-center justify-center gap-xs font-body whitespace-nowrap transition-all duration-state-change focus-visible:outline focus-visible:outline-2 focus-visible:outline-light-primary dark:focus-visible:outline-dark-primary disabled:opacity-50 disabled:pointer-events-none';

  const sizeClass = variant === 'icon' ? '' : SIZE_CLASSES[size];

  return (
    <button
      type={type}
      className={`${baseClass} ${VARIANT_CLASSES[variant]} ${sizeClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
