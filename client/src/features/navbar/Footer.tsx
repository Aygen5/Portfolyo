import { Lock, Mail } from 'lucide-react';
import { PROFILE_DATA } from '../../data/portfolioData';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export function Footer({ onOpenAdmin }: FooterProps) {
  return (
    <footer className="border-t border-light-outline dark:border-dark-outline bg-light-surface/60 dark:bg-dark-surface/60 mt-xl">
      <div className="max-w-5xl mx-auto px-md sm:px-lg py-lg flex flex-col sm:flex-row items-center justify-between gap-sm font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
        <p>© {new Date().getFullYear()} {PROFILE_DATA.name}</p>
        <div className="flex flex-wrap items-center gap-md">
          <a
            href={PROFILE_DATA.socials.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-light-on-surface dark:hover:text-dark-on-surface transition-colors"
          >
            GitHub
          </a>
          <a
            href={PROFILE_DATA.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-light-on-surface dark:hover:text-dark-on-surface transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={PROFILE_DATA.socials.email}
            className="inline-flex items-center gap-1 hover:text-terracotta transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{PROFILE_DATA.socials.emailAddress}</span>
          </a>
          {onOpenAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 hover:text-light-on-surface dark:hover:text-dark-on-surface transition-colors"
              aria-label="Open admin panel"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
