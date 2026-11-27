import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../app/ThemeProvider';
import { Button } from '../../components/Button';
import { ProfileTabId } from '../../domain/models';

interface NavbarProps {
  activeTab: ProfileTabId;
  onSelectTab: (tab: ProfileTabId, scrollToTabs?: boolean) => void;
  onHireMeClick: () => void;
}

const NAV_ITEMS: { label: string; tab: ProfileTabId }[] = [
  { label: 'Projects', tab: 'feed' },
  { label: 'About', tab: 'about' },
  { label: 'Stack', tab: 'stack' },
  { label: 'Notes', tab: 'guestbook' },
];

export function Navbar({
  activeTab,
  onSelectTab,
  onHireMeClick,
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-light-outline dark:border-dark-outline bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-sm transition-colors duration-tab-switch">
      <div className="max-w-3xl mx-auto px-md sm:px-lg h-16 flex items-center justify-between gap-md">
        {/* Left: Handwritten A.Y Signature */}
        <a
          href="#top"
          className="signature-link shrink-0 flex items-center gap-xs group focus-visible:outline focus-visible:outline-2 focus-visible:outline-light-primary rounded"
          aria-label="Aygen Yıldırım home"
        >
          <svg
            width="56"
            height="30"
            viewBox="0 0 96 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-light-on-surface dark:text-dark-on-surface"
          >
            <path
              className="signature-path"
              d="M12 38 C16 22, 22 10, 26 8 C29 18, 31 28, 33 38 M15 27 C21 25, 28 24, 34 24 M43 34 C43 35, 44 35, 44 34 M52 12 C56 20, 60 24, 64 25 C69 18, 74 11, 76 8 C72 22, 68 35, 65 44 C64 46, 60 44, 62 39 C65 34, 75 29, 86 27"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* Center: Nav Links */}
        <nav aria-label="Primary sections" className="hidden sm:flex items-center gap-lg">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                type="button"
                onClick={() => onSelectTab(item.tab, true)}
                className={`whitespace-nowrap font-body text-body-sm font-medium transition-colors duration-state-change ${
                  isActive
                    ? 'text-light-primary dark:text-dark-primary font-semibold'
                    : 'text-light-on-surface-muted dark:text-dark-on-surface-muted hover:text-light-on-surface dark:hover:text-dark-on-surface'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Theme Toggle & Hire Me */}
        <div className="flex items-center gap-sm shrink-0">
          <Button
            variant="icon"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark' ? 'Switch to warm light theme' : 'Switch to warm dark theme'
            }
            title={theme === 'dark' ? 'Warm Light Mode' : 'Warm Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-terracotta" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          <Button variant="primary" onClick={onHireMeClick}>
            Hire Me
          </Button>
        </div>
      </div>
    </header>
  );
}
