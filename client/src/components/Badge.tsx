import React from 'react';

type BadgeVariant = 'status' | 'category' | 'tech' | 'warm';

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  status:
    'rounded-full bg-light-surface-container dark:bg-dark-surface-container text-light-primary dark:text-dark-primary border border-light-outline dark:border-dark-outline font-label text-label-sm px-sm py-xs',
  category:
    'rounded bg-light-surface-muted dark:bg-dark-surface-muted text-light-primary dark:text-dark-primary font-label text-label-sm uppercase tracking-wider px-sm py-0.5',
  tech:
    'rounded bg-light-surface dark:bg-dark-surface text-light-on-surface-muted dark:text-dark-on-surface-muted border border-light-outline dark:border-dark-outline font-label text-label-sm px-sm py-0.5',
  warm:
    'rounded-full bg-terracotta/15 text-terracotta dark:text-terracotta border border-terracotta/30 font-label text-label-sm px-sm py-0.5',
};

export function Badge({
  variant = 'tech',
  className = '',
  children,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-xs ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
