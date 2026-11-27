import { AnimatePresence, motion } from 'framer-motion';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'error';
  onDismiss?: () => void;
}

export function Toast({ message, type = 'success', onDismiss }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          role="status"
          onClick={onDismiss}
          className={`fixed bottom-6 right-6 z-50 cursor-pointer rounded-md px-md py-sm font-body text-body-sm shadow-lg border ${
            type === 'error'
              ? 'bg-terracotta text-light-on-primary border-terracotta-dark'
              : 'bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary border-light-outline dark:border-dark-outline'
          }`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
