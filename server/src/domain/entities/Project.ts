export type ProjectCategory = 'fullstack' | 'backend' | 'mobile';

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

export interface ProjectEntity {
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
  createdAt: Date;
}

export interface CreateProjectInput {
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
  architecture?: ProjectArchitecture;
  features?: LabeledItem[];
  challenges?: LabeledItem[];
  learned?: string[];
  imageUrl: string;
  secondaryImageUrl?: string | null;
  liveUrl?: string | null;
  repoUrl: string;
  sortOrder?: number;
}
