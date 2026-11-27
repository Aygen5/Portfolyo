import { Trash2 } from 'lucide-react';
import { Button } from '../../components/Button';
import { GuestbookEntry } from '../../domain/models';

interface AdminGuestbookSectionProps {
  entries: GuestbookEntry[];
  onDeleteEntry: (id: string) => Promise<void>;
}

export function AdminGuestbookSection({
  entries,
  onDeleteEntry,
}: AdminGuestbookSectionProps) {
  if (entries.length === 0) {
    return (
      <div className="rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-lg text-center font-body text-body-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
        No guestbook entries found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-sm">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md flex items-center justify-between gap-md"
        >
          <div className="flex items-start gap-sm min-w-0">
            <span className="text-lg">{entry.emoji}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-body text-body-sm font-semibold text-light-on-surface dark:text-dark-on-surface">
                  {entry.authorName}
                </span>
                <span className="font-label text-[11px] text-light-on-surface-muted dark:text-dark-on-surface-muted">
                  {new Date(entry.createdAt).toLocaleDateString('en-US')}
                </span>
              </div>
              <p className="font-body text-body-sm text-light-on-surface dark:text-dark-on-surface break-words">
                {entry.message}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteEntry(entry.id)}
            aria-label={`Delete guestbook entry by ${entry.authorName}`}
          >
            <Trash2 className="w-4 h-4 text-terracotta" />
          </Button>
        </div>
      ))}
    </div>
  );
}
