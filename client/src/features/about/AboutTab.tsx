import { Award, Download, ExternalLink, GraduationCap, MapPin } from 'lucide-react';
import { Badge } from '../../components/Badge';
import {
  EDUCATION_TIMELINE,
  KEY_FOCUS_AREAS,
  PROFILE_DATA,
} from '../../data/portfolioData';

export function AboutTab() {
  return (
    <div className="flex flex-col gap-lg">
      {/* 1. About Me Summary + One-Click CV Download */}
      <section className="rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md sm:p-lg flex flex-col gap-md">
        <div className="flex flex-wrap items-center justify-between gap-sm pb-sm border-b border-light-outline dark:border-dark-outline">
          <div>
            <span className="font-label text-label-sm text-terracotta uppercase tracking-wider">
              Who is Aygen Yıldırım?
            </span>
            <h3 className="font-headline text-headline-md text-light-on-surface dark:text-dark-on-surface">
              Engineering with Clean Architecture &amp; Visual Sensitivity
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

        <div className="flex flex-col gap-sm font-body text-body-md text-light-on-surface dark:text-dark-on-surface">
          {PROFILE_DATA.aboutParagraphs.map((para, idx) => (
            <p key={idx} className="leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* 2. Key Focus Areas (4 Pillars) */}
      <section className="flex flex-col gap-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-headline-md text-light-on-surface dark:text-dark-on-surface">
            Key Focus Areas
          </h3>
          <span className="font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
            Backend · Full-Stack · Mobile · SAP &amp; Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {KEY_FOCUS_AREAS.map((area) => (
            <div
              key={area.title}
              className="rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md flex flex-col gap-sm"
            >
              <div className="flex items-center gap-sm">
                <span className="text-xl select-none" aria-hidden="true">
                  {area.icon}
                </span>
                <h4 className="font-body text-title-md text-light-on-surface dark:text-dark-on-surface">
                  {area.title}
                </h4>
              </div>

              <ul className="space-y-1.5 font-body text-body-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
                {area.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="text-terracotta mt-0.5">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Education, Training & Certificates Timeline */}
      <section className="flex flex-col gap-sm">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-light-primary dark:text-dark-primary" />
          <h3 className="font-headline text-headline-md text-light-on-surface dark:text-dark-on-surface">
            Education, Intensive Training &amp; Certificates
          </h3>
        </div>

        <div className="relative pl-6 border-l-2 border-light-outline dark:border-dark-outline flex flex-col gap-md mt-xs">
          {EDUCATION_TIMELINE.map((item) => (
            <article
              key={item.institution}
              className="relative rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md sm:p-lg flex flex-col gap-sm"
            >
              {/* Timeline Dot */}
              <span className="absolute -left-[31px] top-6 w-3.5 h-3.5 rounded-full bg-light-primary dark:bg-dark-primary border-2 border-light-surface-container dark:border-dark-surface-container" />

              <div className="flex flex-wrap items-start justify-between gap-xs">
                <div>
                  <span className="font-label text-label-sm text-terracotta">
                    {item.period}
                  </span>
                  <h4 className="font-headline text-headline-md text-light-on-surface dark:text-dark-on-surface mt-0.5">
                    {item.institution}
                  </h4>
                  <div className="font-body text-body-sm font-semibold text-light-primary dark:text-dark-primary">
                    {item.role}
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
                  <MapPin className="w-3.5 h-3.5 text-terracotta" />
                  {item.location}
                </span>
              </div>

              <p className="font-body text-body-sm text-light-on-surface dark:text-dark-on-surface leading-relaxed">
                {item.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-sm pt-xs">
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
