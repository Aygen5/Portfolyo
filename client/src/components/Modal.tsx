import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-md sm:p-lg bg-black/50 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[88vh] flex flex-col rounded-lg bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline shadow-xl overflow-hidden"
          >
            <div className="flex items-start justify-between gap-md p-md sm:p-lg border-b border-light-outline dark:border-dark-outline bg-light-surface/60 dark:bg-dark-surface/60">
              <div>
                <h2 className="font-display text-headline-md text-light-on-surface dark:text-dark-on-surface">
                  {title}
                </h2>
                {subtitle && (
                  <p className="font-body text-body-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
                    {subtitle}
                  </p>
                )}
              </div>
              <Button
                variant="icon"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-md sm:p-lg overflow-y-auto flex-1">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
