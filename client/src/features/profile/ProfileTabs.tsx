import { ProfileTabId } from '../../domain/models';

interface ProfileTabsProps {
  activeTab: ProfileTabId;
  onSelectTab: (tab: ProfileTabId) => void;
  projectCount?: number;
}

const TABS: { id: ProfileTabId; label: string }[] = [
  { id: 'feed', label: 'Feed (Projects)' },
  { id: 'about', label: 'About & Journey' },
  { id: 'stack', label: 'Tech Stack' },
  { id: 'guestbook', label: 'Guestbook / DM' },
];

export function ProfileTabs({
  activeTab,
  onSelectTab,
  projectCount,
}: ProfileTabsProps) {
  return (
    <div
      id="profile-tabs"
      className="border-t border-light-outline dark:border-dark-outline"
    >
      <div
        role="tablist"
        aria-label="Profile sections"
        className="flex items-center gap-lg px-md sm:px-lg overflow-x-auto border-b border-light-outline dark:border-dark-outline"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={`relative py-md px-xs whitespace-nowrap font-body text-label-lg border-b-2 transition-colors duration-state-change ${
                isActive
                  ? 'text-light-primary dark:text-dark-primary border-light-primary dark:border-dark-primary'
                  : 'text-light-on-surface-muted dark:text-dark-on-surface-muted border-transparent hover:text-light-on-surface dark:hover:text-dark-on-surface'
              }`}
            >
              <span>{tab.label}</span>
              {tab.id === 'feed' && typeof projectCount === 'number' && (
                <span className="ml-1.5 rounded-full bg-light-surface-muted dark:bg-dark-surface-muted px-1.5 py-0.5 font-label text-[11px]">
                  {projectCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
