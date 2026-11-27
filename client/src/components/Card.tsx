import React from 'react';

interface CardProps {
  className?: string;
  as?: 'div' | 'article' | 'section';
  children: React.ReactNode;
}

export function Card({
  className = '',
  as: Tag = 'div',
  children,
}: CardProps) {
  return (
    <Tag
      className={`rounded-lg bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline transition-colors duration-tab-switch ${className}`}
    >
      {children}
    </Tag>
  );
}
