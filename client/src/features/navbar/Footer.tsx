import { Lock } from 'lucide-react';
import { PROFILE_DATA } from '../../data/portfolioData';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export function Footer({ onOpenAdmin }: FooterProps) {
  return (
    <footer className="border-t border-light-outline dark:border-dark-outline bg-light-surface/60 dark:bg-dark-surface/60 mt-xl">
      <div className="max-w-3xl mx-auto px-md sm:px-lg py-lg flex flex-col sm:flex-row items-center justify-between gap-sm font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
        <p>
          © {new Date().getFullYear()} {PROFILE_DATA.name} · Crafted with Clean Architecture &amp; Warm UI
        </p>
        <div className="flex items-center gap-md">
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
