import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import {
  CreatePostPayload,
  CreateProjectPayload,
  Post,
  Project,
  ProjectCategory,
} from '../../domain/models';

interface AdminContentSectionProps {
  projects: Project[];
  posts: Post[];
  onCreatePost: (payload: CreatePostPayload) => Promise<void>;
  onDeletePost: (id: string) => Promise<void>;
  onCreateProject: (payload: CreateProjectPayload) => Promise<void>;
  onDeleteProject: (id: string) => Promise<void>;
}

const POST_MOODS = ['✨', '🏗️', '🎨', '🚀', '☕', '💡'];

export function AdminContentSection({
  projects,
  posts,
  onCreatePost,
  onDeletePost,
  onCreateProject,
  onDeleteProject,
}: AdminContentSectionProps) {
  // Dev Note (Post) form state
  const [postMood, setPostMood] = useState('✨');
  const [postContent, setPostContent] = useState('');
  const [savingPost, setSavingPost] = useState(false);

  // New Project form state
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('fullstack');
  const [summary, setSummary] = useState('');
  const [problem, setProblem] = useState('');
  const [goal, setGoal] = useState('');
  const [solution, setSolution] = useState('');
  const [techInput, setTechInput] = useState('C#, .NET Core, React, TypeScript');
  const [imageUrl, setImageUrl] = useState('/assets/projects/financefocus-dashboard.png');
  const [repoUrl, setRepoUrl] = useState('https://github.com/Aygen5/');
  const [liveUrl, setLiveUrl] = useState('');
  const [savingProject, setSavingProject] = useState(false);

  const handlePostSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!postContent.trim()) return;
    setSavingPost(true);
    try {
      await onCreatePost({
        content: postContent.trim(),
        mood: postMood,
      });
      setPostContent('');
    } finally {
      setSavingPost(false);
    }
  };

  const handleProjectSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSavingProject(true);
    try {
      const techStack = techInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      await onCreateProject({
        title: title.trim(),
        slug:
          slug.trim() ||
          title
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-'),
        subtitle: subtitle.trim(),
        category,
        summary: summary.trim(),
        overview: summary.trim(),
        problem: problem.trim() || summary.trim(),
        goal: goal.trim() || summary.trim(),
        solution: solution.trim() || summary.trim(),
        techStack: techStack.length > 0 ? techStack : ['TypeScript'],
        imageUrl: imageUrl.trim() || '/assets/projects/financefocus-dashboard.png',
        repoUrl: repoUrl.trim(),
        liveUrl: liveUrl.trim() ? liveUrl.trim() : null,
        sortOrder: projects.length + 1,
      });

      setTitle('');
      setSlug('');
      setSubtitle('');
      setSummary('');
      setProblem('');
      setGoal('');
      setSolution('');
      setLiveUrl('');
      setShowProjectForm(false);
    } finally {
      setSavingProject(false);
    }
  };

  return (
    <div className="flex flex-col gap-lg">
      {/* 1. Quick Developer Note (Mini Tweet) Publisher */}
      <section className="rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md flex flex-col gap-sm">
        <h3 className="font-headline text-headline-md text-light-on-surface dark:text-dark-on-surface">
          Publish Developer Note (Mini Post)
        </h3>

        <form onSubmit={handlePostSubmit} className="flex flex-col gap-sm">
          <div className="flex items-center gap-1.5">
            <span className="font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted mr-1">
              Mood:
            </span>
            {POST_MOODS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setPostMood(m)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  postMood === m
                    ? 'bg-terracotta/25 border border-terracotta scale-110'
                    : 'bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="flex gap-sm">
            <input
              type="text"
              required
              minLength={3}
              maxLength={500}
              placeholder="Share a quick engineering thought or status update..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="flex-1 rounded bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline px-sm py-xs font-body text-body-sm text-light-on-surface dark:text-dark-on-surface"
            />
            <Button type="submit" variant="primary" size="sm" disabled={savingPost}>
              <Plus className="w-3.5 h-3.5" />
              <span>{savingPost ? 'Publishing...' : 'Publish Note'}</span>
            </Button>
          </div>
        </form>

        {/* Existing Notes List */}
        <div className="flex flex-col gap-xs pt-xs border-t border-light-outline dark:border-dark-outline">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between gap-sm rounded bg-light-surface dark:bg-dark-surface px-sm py-xs border border-light-outline/60 dark:border-dark-outline/60"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span>{post.mood}</span>
                <p className="font-body text-body-sm text-light-on-surface dark:text-dark-on-surface truncate">
                  {post.content}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeletePost(post.id)}
                aria-label="Delete developer note"
              >
                <Trash2 className="w-3.5 h-3.5 text-terracotta" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Projects Management */}
      <section className="rounded-md bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline p-md flex flex-col gap-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline text-headline-md text-light-on-surface dark:text-dark-on-surface">
              Portfolio Projects ({projects.length})
            </h3>
            <p className="font-body text-body-sm text-light-on-surface-muted dark:text-dark-on-surface-muted">
              Add a new project to the SQLite feed or remove existing ones.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowProjectForm((prev) => !prev)}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showProjectForm ? 'Close Form' : 'New Project'}</span>
          </Button>
        </div>

        {showProjectForm && (
          <form
            onSubmit={handleProjectSubmit}
            className="rounded bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline p-md grid grid-cols-1 sm:grid-cols-2 gap-sm"
          >
            <div>
              <label className="block font-label text-label-sm mb-1">Project Title</label>
              <input
                type="text"
                required
                placeholder="e.g. SAP Order Bridge"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline px-sm py-xs font-body text-body-sm"
              />
            </div>

            <div>
              <label className="block font-label text-label-sm mb-1">URL Slug</label>
              <input
                type="text"
                placeholder="e.g. sap-order-bridge"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full rounded bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline px-sm py-xs font-label text-body-sm"
              />
            </div>

            <div>
              <label className="block font-label text-label-sm mb-1">Subtitle</label>
              <input
                type="text"
                required
                placeholder="Short subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full rounded bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline px-sm py-xs font-body text-body-sm"
              />
            </div>

            <div>
              <label className="block font-label text-label-sm mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                className="w-full rounded bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline px-sm py-xs font-body text-body-sm"
              >
                <option value="fullstack">Full-Stack</option>
                <option value="backend">Backend</option>
                <option value="mobile">Mobile</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-label text-label-sm mb-1">Summary</label>
              <textarea
                required
                rows={2}
                placeholder="Concise feed summary..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full rounded bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline px-sm py-xs font-body text-body-sm"
              />
            </div>

            <div>
              <label className="block font-label text-label-sm mb-1">Problem</label>
              <input
                type="text"
                required
                placeholder="What problem does it solve?"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="w-full rounded bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline px-sm py-xs font-body text-body-sm"
              />
            </div>

            <div>
              <label className="block font-label text-label-sm mb-1">Solution</label>
              <input
                type="text"
                required
                placeholder="How was it architected?"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                className="w-full rounded bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline px-sm py-xs font-body text-body-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-label text-label-sm mb-1">
                Tech Stack (comma-separated)
              </label>
              <input
                type="text"
                required
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="w-full rounded bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline px-sm py-xs font-label text-body-sm"
              />
            </div>

            <div>
              <label className="block font-label text-label-sm mb-1">GitHub Repo URL</label>
              <input
                type="url"
                required
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full rounded bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline px-sm py-xs font-label text-body-sm"
              />
            </div>

            <div>
              <label className="block font-label text-label-sm mb-1">
                Image Path or URL
              </label>
              <input
                type="text"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full rounded bg-light-surface-container dark:bg-dark-surface-container border border-light-outline dark:border-dark-outline px-sm py-xs font-label text-body-sm"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end gap-sm pt-xs">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowProjectForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" disabled={savingProject}>
                {savingProject ? 'Saving Project...' : 'Save Project to Database'}
              </Button>
            </div>
          </form>
        )}

        <div className="flex flex-col gap-xs">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="flex items-center justify-between gap-sm rounded bg-light-surface dark:bg-dark-surface px-sm py-sm border border-light-outline/60 dark:border-dark-outline/60"
            >
              <div className="flex items-center gap-sm min-w-0">
                <Badge variant="category">{proj.category}</Badge>
                <div className="truncate">
                  <span className="font-body text-body-sm font-semibold text-light-on-surface dark:text-dark-on-surface">
                    {proj.title}
                  </span>
                  <span className="font-label text-label-sm text-light-on-surface-muted dark:text-dark-on-surface-muted ml-2">
                    ❤️ {proj.likes}
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteProject(proj.id)}
                aria-label={`Delete ${proj.title}`}
              >
                <Trash2 className="w-3.5 h-3.5 text-terracotta" />
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
