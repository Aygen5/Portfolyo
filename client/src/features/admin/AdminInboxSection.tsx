import { Check, Mail, MailOpen, Trash2 } from 'lucide-react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { ContactMessage } from '../../domain/models';

interface AdminInboxSectionProps {
  messages: ContactMessage[];
  onMarkRead: (id: string) => Promise<void>;
  onDeleteMessage: (id: string) => Promise<void>;
}

export function AdminInboxSection({
  messages,
  onMarkRead,
  onDeleteMessage,
}: AdminInboxSectionProps) {
  if (messages.length === 0) {
    return (
      <div className="rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-lg text-center font-body text-body-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
        No direct messages in your inbox yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-sm">
      {messages.map((msg) => (
        <article
          key={msg.id}
          className={`rounded-md border p-md flex flex-col gap-sm transition-colors ${
            msg.isRead
              ? 'bg-light-surface-container dark:bg-dark-surface-container border-light-outline dark:border-dark-outline'
              : 'bg-light-surface dark:bg-dark-surface border-terracotta/60'
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-sm">
            <div className="flex items-center gap-2">
              {msg.isRead ? (
                <MailOpen className="w-4 h-4 text-light-on-surface-muted dark:text-dark-on-surface-muted" />
              ) : (
                <Mail className="w-4 h-4 text-terracotta" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-body text-body-sm font-semibold text-light-on-surface dark:text-dark-on-surface">
                    {msg.senderName}
                  </span>
                  <a
                    href={`mailto:${msg.senderEmail}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    className="font-label text-label-sm text-terracotta hover:underline"
                  >
                    &lt;{msg.senderEmail}&gt;
                  </a>
                  {!msg.isRead && <Badge variant="warm">Unread</Badge>}
                </div>
                <div className="font-label text-[11px] text-light-on-surface-muted dark:text-dark-on-surface-muted">
                  Topic: {msg.subject} ·{' '}
                  {new Date(msg.createdAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-xs">
              {!msg.isRead && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onMarkRead(msg.id)}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark Read</span>
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteMessage(msg.id)}
                aria-label="Delete message"
              >
                <Trash2 className="w-3.5 h-3.5 text-terracotta" />
              </Button>
            </div>
          </div>

          <p className="font-body text-body-sm text-light-on-surface dark:text-dark-on-surface whitespace-pre-line bg-light-surface/60 dark:bg-dark-surface/60 rounded p-sm border border-light-outline/60 dark:border-dark-outline/60">
            {msg.body}
          </p>
        </article>
      ))}
    </div>
  );
}
