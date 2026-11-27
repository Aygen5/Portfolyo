import {
  Award,
  Blocks,
  Code2,
  Database,
  Download,
  ExternalLink,
  GraduationCap,
  Kanban,
  MapPin,
  Palette,
  Smartphone,
} from 'lucide-react';
import { Badge } from '../../components/Badge';
import {
  EDUCATION_TIMELINE,
  KEY_FOCUS_AREAS,
  PROFILE_DATA,
} from '../../data/portfolioData';

const VISUAL_HIGHLIGHTS = [
  {
    icon: Code2,
    title: 'Backend Core',
    tech: '.NET Core · C# · Node.js',
    accent: 'text-light-primary dark:text-dark-primary',
  },
  {
    icon: Palette,
    title: 'Frontend & UI/UX',
    tech: 'React · TypeScript · Tailwind',
    accent: 'text-terracotta',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    tech: 'Flutter · Dart · BLoC / Cubit',
    accent: 'text-light-primary dark:text-dark-primary',
  },
  {
    icon: Database,
    title: 'Data Layer',
    tech: 'PostgreSQL · MongoDB · PostGIS',
    accent: 'text-terracotta',
  },
  {
    icon: Blocks,
    title: 'Enterprise Tech',
    tech: 'SAP Business Processes',
    accent: 'text-light-primary dark:text-dark-primary',
  },
  {
    icon: Kanban,
    title: 'Architecture & PM',
    tech: 'Clean Arch · Roadmaps · Sprints',
    accent: 'text-terracotta',
  },
];

export function AboutTab() {
  return (
    <div className="flex flex-col gap-lg">
      {/* 1. Visual Identity & Concise Bold Highlights */}
      <section className="rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md sm:p-lg flex flex-col gap-md">
        <div className="flex flex-wrap items-center justify-between gap-sm pb-sm border-b border-light-outline dark:border-dark-outline">
          <div>
            <span className="font-label text-label-sm text-terracotta uppercase tracking-wider">
              Engineering Profile
            </span>
            <h3 className="font-headline text-headline-md text-light-on-surface dark:text-dark-on-surface">
              Clean Architecture, Multi-Disciplinary Craft &amp; Visual Care
            </h3>
          </div>

          <a
            href={PROFILE_DATA.cvUrl}
            target="_blank"
            rel="noreferrer"
            download="Aygen_Yildirim_CV_EN.pdf"
            className="inline-flex items-center gap-2 px-md py-sm rounded bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary font-body text-label-lg transition-transform duration-state-change hover:-translate-y-0.5 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download CV (PDF)</span>
          </a>
        </div>

        {/* Concise Scannable Paragraphs with Bold Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md font-body text-body-md text-light-on-surface dark:text-dark-on-surface">
          <p className="leading-relaxed rounded bg-light-surface dark:bg-dark-surface p-md border border-light-outline/70 dark:border-dark-outline/70">
            I build scalable backends with <strong>ASP.NET Core (.NET)</strong> and{' '}
            <strong>Node.js</strong>, pair them with dynamic <strong>React &amp; TypeScript</strong>{' '}
            frontends, and engineer cross-platform mobile apps using{' '}
            <strong>Flutter &amp; Dart</strong> — backed by <strong>PostgreSQL</strong> and{' '}
            <strong>MongoDB</strong>.
          </p>
          <p className="leading-relaxed rounded bg-light-surface dark:bg-dark-surface p-md border border-light-outline/70 dark:border-dark-outline/70">
            Beyond writing code, I love <strong>designing Clean Architecture</strong>,{' '}
            <strong>planning project roadmaps</strong>, crafting thoughtful{' '}
            <strong>UI/UX experiences</strong>, and expanding into enterprise solutions with{' '}
            <strong>SAP technologies</strong>.
          </p>
        </div>

        {/* 6 Visual Icon Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-sm pt-xs">
          {VISUAL_HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-md bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline p-sm flex items-start gap-2.5"
              >
                <div className="w-8 h-8 rounded bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline flex items-center justify-center shrink-0">
                  <Icon className={`w-4 h-4 ${item.accent}`} />
                </div>
                <div className="min-w-0">
                  <div className="font-body text-body-sm font-bold text-light-on-surface dark:text-dark-on-surface truncate">
                    {item.title}
                  </div>
                  <div className="font-label text-[11px] text-light-on-surface-muted dark:text-dark-on-surface-muted truncate">
                    {item.tech}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Key Focus Areas (4 Visual Pillars) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {KEY_FOCUS_AREAS.map((area) => (
          <div
            key={area.title}
            className="rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md flex flex-col gap-sm"
          >
            <div className="flex items-center gap-sm">
              <span className="w-8 h-8 rounded-full bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline flex items-center justify-center text-base select-none">
                {area.icon}
              </span>
              <h4 className="font-body text-title-md font-bold text-light-on-surface dark:text-dark-on-surface">
                {area.title}
              </h4>
            </div>

            <ul className="space-y-1.5 font-body text-body-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
              {area.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span className="text-terracotta font-bold mt-0.5">▸</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* 3. Education, Training & Certificates Timeline */}
      <section className="flex flex-col gap-sm">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-light-primary dark:text-dark-primary" />
          <h3 className="font-headline text-headline-md text-light-on-surface dark:text-dark-on-surface">
            Education &amp; Verified Certificates
          </h3>
        </div>

        <div className="relative pl-6 border-l-2 border-light-outline dark:border-dark-outline flex flex-col gap-md mt-xs">
          {EDUCATION_TIMELINE.map((item) => (
            <article
              key={item.institution}
              className="relative rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md flex flex-col gap-sm"
            >
              <span className="absolute -left-[31px] top-5 w-3.5 h-3.5 rounded-full bg-light-primary dark:bg-dark-primary border-2 border-light-surface-container dark:border-dark-surface-container" />

              <div className="flex flex-wrap items-start justify-between gap-xs">
                <div>
                  <span className="font-label text-label-sm font-semibold text-terracotta">
                    {item.period}
                  </span>
                  <h4 className="font-headline text-headline-md text-light-on-surface dark:text-dark-on-surface">
                    {item.institution}
                  </h4>
                  <div className="font-body text-body-sm font-bold text-light-primary dark:text-dark-primary">
                    {item.role}
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
                  <MapPin className="w-3.5 h-3.5 text-terracotta" />
                  {item.location}
                </span>
              </div>

              <p className="font-body text-body-sm text-light-on-surface dark:text-dark-on-surface">
                {item.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-sm pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="tech">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {item.certificateUrl && (
                  <a
                    href={item.certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-sm py-1 rounded bg-terracotta/15 border border-terracotta/40 font-label text-label-sm text-terracotta hover:bg-terracotta hover:text-light-on-primary transition-colors"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{item.certificateLabel || 'View Certificate'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
