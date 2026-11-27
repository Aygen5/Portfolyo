import { ExternalLink, Github, Heart, Layers, Sparkles, Terminal } from 'lucide-react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Project } from '../../domain/models';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  isLiked: boolean;
  onLike: (id: string) => void;
}

export function CaseStudyModal({
  project,
  onClose,
  isLiked,
  onLike,
}: CaseStudyModalProps) {
  if (!project) return null;

  return (
    <Modal
      isOpen={Boolean(project)}
      onClose={onClose}
      title={project.title}
      subtitle={`${project.subtitle} · Engineering Case Study Thread`}
    >
      <div className="flex flex-col gap-lg">
        {/* Top Action & Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-sm pb-md border-b border-light-outline dark:border-dark-outline">
          <div className="flex flex-wrap items-center gap-xs">
            <Badge variant="category">{project.category}</Badge>
            <Badge variant="warm">Thread · 6 Parts</Badge>
          </div>

          <div className="flex flex-wrap items-center gap-xs">
            <button
              type="button"
              onClick={() => onLike(project.id)}
              className={`inline-flex items-center gap-1.5 px-sm py-xs rounded border font-label text-label-sm transition-colors ${
                isLiked
                  ? 'border-terracotta/50 bg-terracotta/15 text-terracotta'
                  : 'border-light-outline dark:border-dark-outline bg-light-surface dark:bg-dark-surface text-light-on-surface dark:text-dark-on-surface hover:border-terracotta'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-terracotta text-terracotta animate-heart' : ''}`} />
              <span>{project.likes}</span>
            </button>

            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-sm py-xs rounded border border-light-outline dark:border-dark-outline bg-light-surface dark:bg-dark-surface font-label text-label-sm text-light-on-surface dark:text-dark-on-surface hover:bg-light-surface-muted dark:hover:bg-dark-surface-muted transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-sm py-xs rounded bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary font-label text-label-sm hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Project Visual Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
          <div className="rounded-md overflow-hidden border border-light-outline dark:border-dark-outline bg-light-surface dark:bg-dark-surface">
            <img
              src={project.imageUrl}
              alt={`${project.title} primary screenshot`}
              className={`w-full h-48 object-cover ${
                project.category === 'mobile' ? 'object-top' : 'object-center'
              }`}
            />
          </div>
          {project.secondaryImageUrl ? (
            <div className="rounded-md overflow-hidden border border-light-outline dark:border-dark-outline bg-light-surface dark:bg-dark-surface">
              <img
                src={project.secondaryImageUrl}
                alt={`${project.title} secondary screenshot`}
                className={`w-full h-48 object-cover ${
                  project.category === 'mobile' ? 'object-top' : 'object-center'
                }`}
              />
            </div>
          ) : (
            <div className="rounded-md border border-light-outline dark:border-dark-outline bg-light-surface dark:bg-dark-surface p-md flex flex-col justify-between">
              <span className="font-label text-label-sm text-terracotta uppercase">
                1/6 · Executive Overview
              </span>
              <p className="font-body text-body-sm text-light-on-surface dark:text-dark-on-surface">
                {project.overview}
              </p>
              <div className="flex flex-wrap gap-1 pt-xs">
                {project.highlights.slice(0, 3).map((h) => (
                  <Badge key={h} variant="tech">
                    ✓ {h}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Thread Items with Vertical Connector */}
        <div className="relative pl-6 border-l-2 border-light-outline dark:border-dark-outline flex flex-col gap-md">
          {/* 2/6 Problem & Goal */}
          <div className="relative rounded-md bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline p-md">
            <span className="absolute -left-[31px] top-4 w-3.5 h-3.5 rounded-full bg-terracotta border-2 border-light-surface-container dark:border-dark-surface-container" />
            <div className="font-label text-label-sm text-terracotta mb-xs">
              2/6 · The Problem &amp; Engineering Goal
            </div>
            <p className="font-body text-body-sm text-light-on-surface dark:text-dark-on-surface mb-sm">
              <strong>Problem:</strong> {project.problem}
            </p>
            <p className="font-body text-body-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
              <strong>Goal:</strong> {project.goal}
            </p>
          </div>

          {/* 3/6 Solution */}
          <div className="relative rounded-md bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline p-md">
            <span className="absolute -left-[31px] top-4 w-3.5 h-3.5 rounded-full bg-light-primary dark:bg-dark-primary border-2 border-light-surface-container dark:border-dark-surface-container" />
            <div className="font-label text-label-sm text-light-primary dark:text-dark-primary mb-xs">
              3/6 · Technical Solution
            </div>
            <p className="font-body text-body-sm text-light-on-surface dark:text-dark-on-surface">
              {project.solution}
            </p>
          </div>

          {/* 4/6 Clean Architecture Layers */}
          {project.architecture.layers.length > 0 && (
            <div className="relative rounded-md bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline p-md">
              <span className="absolute -left-[31px] top-4 w-3.5 h-3.5 rounded-full bg-sage border-2 border-light-surface-container dark:border-dark-surface-container" />
              <div className="flex items-center gap-1.5 font-label text-label-sm text-light-primary dark:text-dark-primary mb-sm">
                <Layers className="w-3.5 h-3.5" />
                <span>4/6 · Software Architecture &amp; Data Isolation</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-xs">
                {project.architecture.layers.map((layer) => (
                  <div
                    key={layer.name}
                    className="rounded bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-sm"
                  >
                    <div className="font-label text-label-sm text-light-on-surface dark:text-dark-on-surface font-semibold">
                      {layer.name}
                    </div>
                    <p className="font-body text-body-sm text-light-on-surface-muted dark:text-dark-on-surface-muted mt-0.5">
                      {layer.text}
                    </p>
                  </div>
                ))}
              </div>
              {project.architecture.note && (
                <p className="font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted mt-sm italic">
                  Note: {project.architecture.note}
                </p>
              )}
            </div>
          )}

          {/* 5/6 Core Features & Challenges */}
          <div className="relative rounded-md bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline p-md">
            <span className="absolute -left-[31px] top-4 w-3.5 h-3.5 rounded-full bg-terracotta border-2 border-light-surface-container dark:border-dark-surface-container" />
            <div className="flex items-center gap-1.5 font-label text-label-sm text-terracotta mb-sm">
              <Terminal className="w-3.5 h-3.5" />
              <span>5/6 · Key Capabilities &amp; Engineering Challenges</span>
            </div>
            <ul className="space-y-xs mb-sm">
              {project.features.map((feat) => (
                <li key={feat.label} className="font-body text-body-sm">
                  <strong className="text-light-on-surface dark:text-dark-on-surface">
                    • {feat.label}:
                  </strong>{' '}
                  <span className="text-light-on-surface-muted dark:text-dark-on-surface-muted">
                    {feat.text}
                  </span>
                </li>
              ))}
            </ul>
            {project.challenges.length > 0 && (
              <div className="pt-xs border-t border-light-outline dark:border-dark-outline space-y-xs">
                {project.challenges.map((ch) => (
                  <div key={ch.label} className="font-body text-body-sm">
                    <strong className="text-terracotta">Challenge ({ch.label}):</strong>{' '}
                    <span className="text-light-on-surface-muted dark:text-dark-on-surface-muted">
                      {ch.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 6/6 Key Takeaways & Stack */}
          <div className="relative rounded-md bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline p-md">
            <span className="absolute -left-[31px] top-4 w-3.5 h-3.5 rounded-full bg-light-primary dark:bg-dark-primary border-2 border-light-surface-container dark:border-dark-surface-container" />
            <div className="flex items-center gap-1.5 font-label text-label-sm text-light-primary dark:text-dark-primary mb-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>6/6 · Engineering Takeaways &amp; Full Stack</span>
            </div>
            <ul className="list-disc list-inside space-y-1 font-body text-body-sm text-light-on-surface dark:text-dark-on-surface mb-sm">
              {project.learned.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="tech">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-xs">
          <Button variant="secondary" onClick={onClose}>
            Close Thread
          </Button>
        </div>
      </div>
    </Modal>
  );
}
