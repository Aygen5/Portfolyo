import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { PROFILE_DATA } from '../../data/portfolioData';
import { DeskIllustration } from './DeskIllustration';

interface HeroSectionProps {
  onViewProjects: () => void;
  onGetInTouch: () => void;
}

export function HeroSection({ onViewProjects, onGetInTouch }: HeroSectionProps) {
  return (
    <section
      aria-label="Introduction"
      className="grid grid-cols-1 md:grid-cols-12 gap-lg items-center"
    >
      {/* Left: Introduction */}
      <div className="md:col-span-7 flex flex-col gap-md">
        <div className="flex items-center gap-sm">
          <Badge variant="status">
            <span
              className="w-2 h-2 rounded-full bg-light-primary dark:bg-dark-primary animate-pulse"
              aria-hidden="true"
            />
            <span>{PROFILE_DATA.statusBadge}</span>
          </Badge>
        </div>

        <div className="flex flex-col gap-xs">
          <h1 className="font-display text-display-lg-mobile md:text-display-lg text-light-on-surface dark:text-dark-on-surface">
            Hi, I&apos;m Aygen!
          </h1>
          <p className="font-headline text-headline-md text-light-primary dark:text-dark-primary">
            {PROFILE_DATA.headline}
          </p>
        </div>

        <p className="font-body text-body-md text-light-on-surface-muted dark:text-dark-on-surface-muted max-w-prose">
          {PROFILE_DATA.heroIntro}
        </p>

        <div className="flex flex-wrap items-center gap-sm pt-xs">
          <Button variant="primary" onClick={onViewProjects}>
            View Projects
          </Button>
          <Button variant="secondary" onClick={onGetInTouch}>
            Get in Touch
          </Button>
        </div>
      </div>

      {/* Right: Living Editorial Female Developer Desk Illustration */}
      <div className="md:col-span-5 flex justify-center">
        <DeskIllustration />
      </div>
    </section>
  );
}
