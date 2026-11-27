import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, Inbox, Layers, LogOut, MessageSquareHeart, ShieldCheck } from 'lucide-react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import {
  ContactMessage,
  CreatePostPayload,
  CreateProjectPayload,
  GuestbookEntry,
  Post,
  Project,
} from '../../domain/models';
import { adminService } from '../../services/adminService';
import { AdminContentSection } from './AdminContentSection';
import { AdminGuestbookSection } from './AdminGuestbookSection';
import { AdminInboxSection } from './AdminInboxSection';
import { AdminLoginCard } from './AdminLoginCard';

interface AdminDashboardProps {
  projects: Project[];
  posts: Post[];
  guestbook: GuestbookEntry[];
  onRefreshPublicStream: () => Promise<void>;
  onBackToPortfolio: () => void;
  onNotify: (message: string, type?: 'success' | 'error') => void;
}

type AdminSectionId = 'inbox' | 'content' | 'guestbook';

const SESSION_KEY = 'aygen-admin-secret';

export function AdminDashboard({
  projects,
  posts,
  guestbook,
  onRefreshPublicStream,
  onBackToPortfolio,
  onNotify,
}: AdminDashboardProps) {
  const [adminSecret, setAdminSecret] = useState<string | null>(() =>
    sessionStorage.getItem(SESSION_KEY)
  );
  const [activeSection, setActiveSection] = useState<AdminSectionId>('inbox');
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const loadMessages = useCallback(
    async (secret: string) => {
      try {
        const list = await adminService.getMessages(secret);
        setMessages(list);
      } catch {
        sessionStorage.removeItem(SESSION_KEY);
        setAdminSecret(null);
      }
    },
    []
  );

  useEffect(() => {
    if (adminSecret) {
      void loadMessages(adminSecret);
    }
  }, [adminSecret, loadMessages]);

  const handleLogin = async (secret: string) => {
    await adminService.verify(secret);
    sessionStorage.setItem(SESSION_KEY, secret);
    setAdminSecret(secret);
    await loadMessages(secret);
    onNotify('Admin console unlocked.');
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAdminSecret(null);
    setMessages([]);
    onNotify('Logged out of admin console.');
  };

  if (!adminSecret) {
    return (
      <AdminLoginCard
        onLogin={handleLogin}
        onBackToPortfolio={onBackToPortfolio}
      />
    );
  }

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="flex flex-col gap-lg">
      {/* Top Admin Header */}
      <div className="rounded-lg bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md sm:p-lg flex flex-wrap items-center justify-between gap-md">
        <div className="flex items-center gap-sm">
          <ShieldCheck className="w-6 h-6 text-light-primary dark:text-dark-primary" />
          <div>
            <h1 className="font-display text-headline-md text-light-on-surface dark:text-dark-on-surface">
              Aygen&apos;s Studio Admin
            </h1>
            <p className="font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
              Connected to SQLite via Clean Architecture Use Cases
            </p>
          </div>
        </div>

        <div className="flex items-center gap-xs">
          <Button variant="secondary" size="sm" onClick={onBackToPortfolio}>
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock</span>
          </Button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-xs">
        <button
          type="button"
          onClick={() => setActiveSection('inbox')}
          className={`inline-flex items-center gap-2 px-md py-sm rounded font-body text-label-lg transition-colors ${
            activeSection === 'inbox'
              ? 'bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary'
              : 'bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline text-light-on-surface dark:text-dark-on-surface'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>DM Inbox ({messages.length})</span>
          {unreadCount > 0 && <Badge variant="warm">{unreadCount} new</Badge>}
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('content')}
          className={`inline-flex items-center gap-2 px-md py-sm rounded font-body text-label-lg transition-colors ${
            activeSection === 'content'
              ? 'bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary'
              : 'bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline text-light-on-surface dark:text-dark-on-surface'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Projects &amp; Dev Notes</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('guestbook')}
          className={`inline-flex items-center gap-2 px-md py-sm rounded font-body text-label-lg transition-colors ${
            activeSection === 'guestbook'
              ? 'bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary'
              : 'bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline text-light-on-surface dark:text-dark-on-surface'
          }`}
        >
          <MessageSquareHeart className="w-4 h-4" />
          <span>Guestbook ({guestbook.length})</span>
        </button>
      </div>

      {/* Active Admin Section */}
      {activeSection === 'inbox' && (
        <AdminInboxSection
          messages={messages}
          onMarkRead={async (id) => {
            const updated = await adminService.markMessageRead(adminSecret, id);
            setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
            onNotify('Message marked as read.');
          }}
          onDeleteMessage={async (id) => {
            await adminService.deleteMessage(adminSecret, id);
            setMessages((prev) => prev.filter((m) => m.id !== id));
            onNotify('Message deleted.');
          }}
        />
      )}

      {activeSection === 'content' && (
        <AdminContentSection
          projects={projects}
          posts={posts}
          onCreatePost={async (payload: CreatePostPayload) => {
            await adminService.createPost(adminSecret, payload);
            await onRefreshPublicStream();
            onNotify('Developer note published to feed!');
          }}
          onDeletePost={async (id: string) => {
            await adminService.deletePost(adminSecret, id);
            await onRefreshPublicStream();
            onNotify('Developer note removed.');
          }}
          onCreateProject={async (payload: CreateProjectPayload) => {
            await adminService.createProject(adminSecret, payload);
            await onRefreshPublicStream();
            onNotify('New project added to portfolio feed!');
          }}
          onDeleteProject={async (id: string) => {
            await adminService.deleteProject(adminSecret, id);
            await onRefreshPublicStream();
            onNotify('Project removed.');
          }}
        />
      )}

      {activeSection === 'guestbook' && (
        <AdminGuestbookSection
          entries={guestbook}
          onDeleteEntry={async (id) => {
            await adminService.deleteGuestbookEntry(adminSecret, id);
            await onRefreshPublicStream();
            onNotify('Guestbook entry removed.');
          }}
        />
      )}
    </div>
  );
}
