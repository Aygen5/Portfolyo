import { useMemo, useState } from 'react';
import { Heart, MessageSquareQuote } from 'lucide-react';
import { PROFILE_DATA } from '../../data/portfolioData';
import { Post, Project, ProjectCategory } from '../../domain/models';
import { CaseStudyModal } from './CaseStudyModal';
import { ProjectFeedCard } from './ProjectFeedCard';

interface FeedTabProps {
  projects: Project[];
  posts: Post[];
  isLoading: boolean;
  isProjectLiked: (id: string) => boolean;
  isPostLiked: (id: string) => boolean;
  onLikeProject: (id: string) => void;
  onLikePost: (id: string) => void;
}

type CategoryFilter = 'all' | ProjectCategory;

const FILTERS: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All Stream' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'backend', label: 'Backend (.NET)' },
  { id: 'mobile', label: 'Mobile (Flutter)' },
];

export function FeedTab({
  projects,
  posts,
  isLoading,
  isProjectLiked,
  isPostLiked,
  onLikeProject,
  onLikePost,
}: FeedTabProps) {
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter((p) => p.category === filter);
  }, [projects, filter]);

  const activeCaseStudyProject = useMemo(
    () => projects.find((p) => p.id === activeCaseStudyId) ?? null,
    [projects, activeCaseStudyId]
  );

  return (
    <div className="flex flex-col gap-md">
      {/* Engineering Manifesto / Signature Quote Banner */}
      <div className="rounded-md bg-light-surface-container dark:bg-dark-surface-container border-l-4 border-l-light-primary dark:border-l-dark-primary border border-light-outline dark:border-dark-outline p-md flex items-start gap-sm">
        <MessageSquareQuote className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5">
          <div className="font-headline text-title-md text-light-on-surface dark:text-dark-on-surface">
            “{PROFILE_DATA.signatureQuotes[0].title}”
          </div>
          <p className="font-body text-body-sm text-light-on-surface-muted dark:text-dark-on-surface-muted italic">
            {PROFILE_DATA.signatureQuotes[0].body}
          </p>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-sm">
        <div className="flex flex-wrap items-center gap-xs">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`px-sm py-1 rounded-full font-label text-label-sm transition-colors ${
                  active
                    ? 'bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary'
                    : 'bg-light-surface-container dark:bg-dark-surface-container text-light-on-surface-muted dark:text-dark-on-surface-muted border border-light-outline dark:border-dark-outline hover:text-light-on-surface dark:hover:text-dark-on-surface'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <span className="font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
          Showing {filteredProjects.length} of {projects.length} builds
        </span>
      </div>

      {/* Loading Skeleton */}
      {isLoading && projects.length === 0 && (
        <div className="rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-lg text-center font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted animate-pulse">
          Loading Aygen&apos;s project stream from SQLite database...
        </div>
      )}

      {/* Projects Stream */}
      <div className="flex flex-col gap-md">
        {filteredProjects.map((project) => (
          <ProjectFeedCard
            key={project.id}
            project={project}
            isLiked={isProjectLiked(project.id)}
            onLike={onLikeProject}
            onOpenCaseStudy={(proj) => setActiveCaseStudyId(proj.id)}
          />
        ))}
      </div>

      {/* Developer Mini Notes (Posts from Database) */}
      {posts.length > 0 && (
        <div className="pt-sm flex flex-col gap-sm">
          <div className="font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted uppercase tracking-wider">
            Developer Notes &amp; Micro-Updates
          </div>
          {posts.map((post) => {
            const liked = isPostLiked(post.id);
            return (
              <div
                key={post.id}
                className="rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md flex items-start justify-between gap-md"
              >
                <div className="flex items-start gap-sm">
                  <span className="text-lg select-none" aria-hidden="true">
                    {post.mood}
                  </span>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 font-label text-[11px] text-light-on-surface-muted dark:text-dark-on-surface-muted">
                      <span className="font-semibold text-light-on-surface dark:text-dark-on-surface">
                        {PROFILE_DATA.name}
                      </span>
                      <span>{PROFILE_DATA.handle}</span>
                      <span>· Dev Note</span>
                    </div>
                    <p className="font-body text-body-sm text-light-on-surface dark:text-dark-on-surface">
                      {post.content}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onLikePost(post.id)}
                  className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full border font-label text-label-sm transition-colors ${
                    liked
                      ? 'border-terracotta/50 bg-terracotta/15 text-terracotta'
                      : 'border-light-outline dark:border-dark-outline bg-light-surface dark:bg-dark-surface text-light-on-surface-muted dark:text-dark-on-surface-muted hover:text-terracotta'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      liked ? 'fill-terracotta text-terracotta animate-heart' : ''
                    }`}
                  />
                  <span>{post.likes}</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Case Study Thread Modal */}
      <CaseStudyModal
        project={activeCaseStudyProject}
        onClose={() => setActiveCaseStudyId(null)}
        isLiked={
          activeCaseStudyProject ? isProjectLiked(activeCaseStudyProject.id) : false
        }
        onLike={onLikeProject}
      />
    </div>
  );
}
