import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, ExternalLink, Github, Heart } from 'lucide-react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { PROFILE_DATA } from '../../data/portfolioData';
import { Project } from '../../domain/models';

interface ProjectFeedCardProps {
  project: Project;
  isLiked: boolean;
  onLike: (id: string) => void;
  onOpenCaseStudy: (project: Project) => void;
}

const CATEGORY_LABELS: Record<Project['category'], string> = {
  fullstack: 'FULL-STACK APPLICATION',
  backend: 'BACKEND ARCHITECTURE',
  mobile: 'MOBILE ENGINEERING',
};

export function ProjectFeedCard({
  project,
  isLiked,
  onLike,
  onOpenCaseStudy,
}: ProjectFeedCardProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <article className="rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md sm:p-lg flex flex-col gap-md transition-transform duration-state-change hover:-translate-y-0.5">
      {/* Author Row (Twitter/X Post Header) */}
      <div className="flex items-start justify-between gap-sm">
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-light-outline dark:border-dark-outline shrink-0">
            <img
              src={PROFILE_DATA.avatarUrl}
              alt={PROFILE_DATA.name}
              className="w-full h-full object-cover object-[54%_48%] scale-125"
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-body text-body-sm font-semibold text-light-on-surface dark:text-dark-on-surface">
                {PROFILE_DATA.name}
              </span>
              <span className="font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
                {PROFILE_DATA.handle}
              </span>
            </div>
            <div className="font-label text-[11px] text-light-on-surface-muted dark:text-dark-on-surface-muted">
              Shipped Project · {project.subtitle}
            </div>
          </div>
        </div>

        <Badge variant="category">{CATEGORY_LABELS[project.category]}</Badge>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-xs">
        <h3 className="font-headline text-headline-md text-light-on-surface dark:text-dark-on-surface">
          {project.title}
        </h3>
        <p className="font-body text-body-md text-light-on-surface dark:text-dark-on-surface">
          {project.summary}
        </p>
      </div>

      {/* Visual Screenshot Card */}
      <div
        onClick={() => onOpenCaseStudy(project)}
        className="group relative cursor-pointer rounded-md overflow-hidden border border-light-outline dark:border-dark-outline bg-light-surface dark:bg-dark-surface max-h-64"
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
          className={`w-full h-56 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-[1.02] ${
            project.category === 'mobile' ? 'object-top' : 'object-center'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-md">
          <span className="font-label text-label-sm text-white">
            Click to read full 6-part engineering case study →
          </span>
        </div>
      </div>

      {/* Highlights Chips */}
      {project.highlights.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.highlights.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 rounded bg-light-surface-muted/70 dark:bg-dark-surface-muted/70 px-2 py-0.5 font-label text-[11px] text-light-primary dark:text-dark-primary"
            >
              ✦ {item}
            </span>
          ))}
        </div>
      )}

      {/* Tech Stack Badges */}
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <Badge key={tech} variant="tech">
            {tech}
          </Badge>
        ))}
      </div>

      {/* Inline Case Study Drawer (Quick Thread Preview) */}
      {drawerOpen && (
        <div className="rounded-md bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline p-md flex flex-col gap-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
            <div>
              <span className="font-label text-label-sm text-terracotta uppercase">
                The Problem
              </span>
              <p className="font-body text-body-sm text-light-on-surface-muted dark:text-dark-on-surface-muted mt-0.5">
                {project.problem}
              </p>
            </div>
            <div>
              <span className="font-label text-label-sm text-light-primary dark:text-dark-primary uppercase">
                Architectural Solution
              </span>
              <p className="font-body text-body-sm text-light-on-surface-muted dark:text-dark-on-surface-muted mt-0.5">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-xs border-t border-light-outline dark:border-dark-outline">
            <span className="font-label text-[11px] text-light-on-surface-muted dark:text-dark-on-surface-muted">
              {project.architecture.layers.length} architecture layers · {project.features.length} core capabilities
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onOpenCaseStudy(project)}
            >
              Open Full Thread (1/6)
            </Button>
          </div>
        </div>
      )}

      {/* Action Footer (Like, Quick Preview, Full Case Study, GitHub, Live Demo) */}
      <div className="flex flex-wrap items-center justify-between gap-sm pt-xs border-t border-light-outline dark:border-dark-outline">
        <div className="flex items-center gap-xs">
          {/* Live Like Button */}
          <button
            type="button"
            onClick={() => onLike(project.id)}
            aria-label={`Like ${project.title}`}
            className={`inline-flex items-center gap-1.5 px-sm py-1 rounded-full border font-label text-label-sm transition-all ${
              isLiked
                ? 'border-terracotta/50 bg-terracotta/15 text-terracotta'
                : 'border-light-outline dark:border-dark-outline bg-light-surface dark:bg-dark-surface text-light-on-surface-muted dark:text-dark-on-surface-muted hover:text-terracotta hover:border-terracotta/50'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                isLiked ? 'fill-terracotta text-terracotta animate-heart' : ''
              }`}
            />
            <span>{project.likes}</span>
          </button>

          {/* Quick Thread Drawer Toggle */}
          <button
            type="button"
            onClick={() => setDrawerOpen((prev) => !prev)}
            className="inline-flex items-center gap-1 px-sm py-1 rounded border border-light-outline dark:border-dark-outline bg-light-surface dark:bg-dark-surface font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted hover:text-light-on-surface dark:hover:text-dark-on-surface transition-colors"
          >
            {drawerOpen ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Hide Summary</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Quick Summary</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-xs">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-sm py-1 rounded border border-light-outline dark:border-dark-outline bg-light-surface dark:bg-dark-surface font-label text-label-sm text-light-on-surface dark:text-dark-on-surface hover:bg-light-surface-muted dark:hover:bg-dark-surface-muted transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Repo</span>
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-sm py-1 rounded border border-terracotta/40 bg-terracotta/15 font-label text-label-sm text-terracotta hover:bg-terracotta/25 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          )}

          <Button
            variant="primary"
            size="sm"
            onClick={() => onOpenCaseStudy(project)}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>View Case Study</span>
          </Button>
        </div>
      </div>
    </article>
  );
}
