import { Check, FileText, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { PROFILE_DATA } from '../../data/portfolioData';

interface ProfileHeaderCardProps {
  onContactClick: () => void;
}

export function ProfileHeaderCard({ onContactClick }: ProfileHeaderCardProps) {
  return (
    <div>
      {/* Warm Organic Pastel Cover Banner */}
      <div className="relative h-36 sm:h-40 w-full overflow-hidden border-b border-light-outline dark:border-dark-outline bg-gradient-to-r from-sage/45 via-light-surface-muted to-terracotta/35 dark:from-dark-secondary dark:via-dark-surface-muted dark:to-terracotta/25">
        <svg
          viewBox="0 0 800 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover opacity-75"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 90 C180 30, 320 150, 520 80 C650 35, 740 95, 800 70 L800 180 L0 180 Z"
            className="fill-sage/35 dark:fill-dark-primary/25"
          />
          <path
            d="M0 130 C220 80, 410 165, 620 110 C710 85, 760 115, 800 105 L800 180 L0 180 Z"
            className="fill-terracotta/25 dark:fill-terracotta/20"
          />
          <circle cx="680" cy="48" r="34" className="fill-terracotta/25" />
          <circle cx="140" cy="52" r="52" className="fill-light-primary/10 dark:fill-dark-primary/15" />
        </svg>
      </div>

      {/* Profile Content */}
      <div className="px-md sm:px-lg pb-lg">
        <div className="flex flex-wrap items-end justify-between gap-sm -mt-12 mb-md">
          {/* Circular Avatar with Face Centered */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-light-surface-container dark:border-dark-surface-container bg-light-surface-muted shadow-md">
            <img
              src={PROFILE_DATA.avatarUrl}
              alt={`${PROFILE_DATA.name} portrait`}
              className="w-full h-full object-cover object-[54%_48%] scale-125"
            />
          </div>

          {/* Instant Activity Tag */}
          <div className="flex items-center gap-xs pt-2 sm:pt-14">
            <span className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline font-label text-label-sm text-light-on-surface dark:text-dark-on-surface">
              {PROFILE_DATA.currentActivity}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-xs">
          {/* Name & Verified Badge */}
          <div className="flex items-center gap-xs">
            <h2 className="font-headline text-headline-lg text-light-on-surface dark:text-dark-on-surface">
              {PROFILE_DATA.name}
            </h2>
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary"
              title="Verified developer profile"
              aria-label="Verified"
            >
              <Check className="w-3 h-3 stroke-[3]" />
            </span>
          </div>

          {/* Handle & Subtitle */}
          <div className="flex flex-wrap items-center gap-sm font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
            <span>{PROFILE_DATA.handle}</span>
            <span aria-hidden="true">·</span>
            <span>Software Engineering Student (3rd Year) · Full-Stack &amp; Backend Developer</span>
          </div>

          {/* Bio */}
          <p className="font-body text-body-md text-light-on-surface dark:text-dark-on-surface mt-xs max-w-prose">
            {PROFILE_DATA.bio}
          </p>

          {/* Location & Social Links */}
          <div className="flex flex-wrap items-center justify-between gap-md pt-sm">
            <div className="flex items-center gap-md font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                {PROFILE_DATA.location}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-xs sm:gap-sm">
              <a
                href={PROFILE_DATA.socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-sm py-xs rounded border border-light-outline dark:border-dark-outline bg-light-surface dark:bg-dark-surface font-label text-label-sm text-light-on-surface dark:text-dark-on-surface hover:bg-light-surface-muted dark:hover:bg-dark-surface-muted transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={PROFILE_DATA.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-sm py-xs rounded border border-light-outline dark:border-dark-outline bg-light-surface dark:bg-dark-surface font-label text-label-sm text-light-on-surface dark:text-dark-on-surface hover:bg-light-surface-muted dark:hover:bg-dark-surface-muted transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PROFILE_DATA.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-sm py-xs rounded border border-light-outline dark:border-dark-outline bg-light-surface dark:bg-dark-surface font-label text-label-sm text-light-on-surface dark:text-dark-on-surface hover:bg-light-surface-muted dark:hover:bg-dark-surface-muted transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-terracotta" />
                <span>CV (PDF)</span>
              </a>

              <button
                type="button"
                onClick={onContactClick}
                className="inline-flex items-center gap-1.5 px-sm py-xs rounded border border-light-outline dark:border-dark-outline bg-light-surface dark:bg-dark-surface font-label text-label-sm text-light-on-surface dark:text-dark-on-surface hover:bg-light-surface-muted dark:hover:bg-dark-surface-muted transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email / DM</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
