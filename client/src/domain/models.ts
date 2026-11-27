export type ProjectCategory = 'fullstack' | 'backend' | 'mobile';

export type ProfileTabId = 'feed' | 'about' | 'stack' | 'guestbook';

export interface LabeledItem {
  label: string;
  text: string;
}

export interface ArchitectureLayer {
  name: string;
  text: string;
}

export interface ProjectArchitecture {
  layers: ArchitectureLayer[];
  note: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  summary: string;
  overview: string;
  problem: string;
  goal: string;
  solution: string;
  techStack: string[];
  highlights: string[];
  architecture: ProjectArchitecture;
  features: LabeledItem[];
  challenges: LabeledItem[];
  learned: string[];
  imageUrl: string;
  secondaryImageUrl: string | null;
  liveUrl: string | null;
  repoUrl: string;
  likes: number;
  sortOrder: number;
  createdAt: string;
}

export interface CreateProjectPayload {
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  summary: string;
  overview: string;
  problem: string;
  goal: string;
  solution: string;
  techStack: string[];
  highlights?: string[];
  imageUrl: string;
  liveUrl?: string | null;
  repoUrl: string;
  sortOrder?: number;
}

export interface Post {
  id: string;
  content: string;
  mood: string;
  likes: number;
  createdAt: string;
}

export interface CreatePostPayload {
  content: string;
  mood?: string;
}

export interface GuestbookEntry {
  id: string;
  authorName: string;
  emoji: string;
  message: string;
  createdAt: string;
}

export interface CreateGuestbookPayload {
  authorName: string;
  emoji?: string;
  message: string;
}

export interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

export interface CreateMessagePayload {
  senderName: string;
  senderEmail: string;
  subject: string;
  body: string;
}

export interface FocusArea {
  icon: string;
  title: string;
  bullets: string[];
}

export interface EducationItem {
  period: string;
  institution: string;
  role: string;
  location: string;
  description: string;
  tags: string[];
  certificateUrl?: string;
  certificateLabel?: string;
}

export interface TechBadgeItem {
  name: string;
  note: string;
}

export interface TechCategory {
  title: string;
  subtitle: string;
  items: TechBadgeItem[];
}
