import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { PROFILE_DATA, TECH_STACK_CATEGORIES } from '../../data/portfolioData';
import { TechBadgeItem } from '../../domain/models';

export function TechStackTab() {
  const [activeNotes, setActiveNotes] = useState<Record<string, TechBadgeItem>>(
    () => {
      const initial: Record<string, TechBadgeItem> = {};
      for (const cat of TECH_STACK_CATEGORIES) {
        if (cat.items[0]) {
          initial[cat.title] = cat.items[0];
        }
      }
      return initial;
    }
  );

  const handleSelectBadge = (categoryTitle: string, item: TechBadgeItem) => {
    setActiveNotes((prev) => ({
      ...prev,
      [categoryTitle]: item,
    }));
  };

  return (
    <div className="flex flex-col gap-md">
      {/* Intro Quote Banner */}
      <div className="rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md flex items-center justify-between gap-md">
        <div>
          <span className="font-label text-label-sm text-terracotta uppercase tracking-wider">
            No Arbitrary &ldquo;85% React&rdquo; Bars
          </span>
          <p className="font-body text-body-sm text-light-on-surface dark:text-dark-on-surface mt-0.5">
            {PROFILE_DATA.signatureQuotes[1].body} Hover or tap any badge below to see how I use it in real builds.
          </p>
        </div>
      </div>

      {/* Categorized Tech Badges */}
      <div className="grid grid-cols-1 gap-md">
        {TECH_STACK_CATEGORIES.map((category) => {
          const selected = activeNotes[category.title] ?? category.items[0];
          return (
            <section
              key={category.title}
              className="rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md sm:p-lg flex flex-col gap-md"
            >
              <div>
                <h3 className="font-headline text-headline-md text-light-on-surface dark:text-dark-on-surface">
                  {category.title}
                </h3>
                <p className="font-body text-body-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
                  {category.subtitle}
                </p>
              </div>

              {/* Badges Grid */}
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => {
                  const isSelected = selected?.name === item.name;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onMouseEnter={() => handleSelectBadge(category.title, item)}
                      onFocus={() => handleSelectBadge(category.title, item)}
                      onClick={() => handleSelectBadge(category.title, item)}
                      className={`px-sm py-1.5 rounded font-label text-label-sm border transition-all duration-state-change ${
                        isSelected
                          ? 'bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary border-light-primary dark:border-dark-primary -translate-y-0.5 shadow-xs'
                          : 'bg-light-surface dark:bg-dark-surface text-light-on-surface dark:text-dark-on-surface border-light-outline dark:border-dark-outline hover:border-terracotta'
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>

              {/* Live Experience Note Callout */}
              {selected && (
                <div className="rounded bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline px-md py-sm flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                  <div className="font-body text-body-sm">
                    <strong className="font-label text-light-primary dark:text-dark-primary">
                      {selected.name}:
                    </strong>{' '}
                    <span className="text-light-on-surface dark:text-dark-on-surface">
                      {selected.note}
                    </span>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
