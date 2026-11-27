import { Project as PrismaProject } from '@prisma/client';
import {
  CreateProjectInput,
  LabeledItem,
  ProjectArchitecture,
  ProjectCategory,
  ProjectEntity,
} from '../../domain/entities/Project';

function safeParseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export class ProjectMapper {
  static toDomain(row: PrismaProject): ProjectEntity {
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      subtitle: row.subtitle,
      category: row.category as ProjectCategory,
      summary: row.summary,
      overview: row.overview,
      problem: row.problem,
      goal: row.goal,
      solution: row.solution,
      techStack: safeParseJson<string[]>(row.techStackJson, []),
      highlights: safeParseJson<string[]>(row.highlightsJson, []),
      architecture: safeParseJson<ProjectArchitecture>(row.architectureJson, {
        layers: [],
        note: '',
      }),
      features: safeParseJson<LabeledItem[]>(row.featuresJson, []),
      challenges: safeParseJson<LabeledItem[]>(row.challengesJson, []),
      learned: safeParseJson<string[]>(row.learnedJson, []),
      imageUrl: row.imageUrl,
      secondaryImageUrl: row.secondaryImageUrl,
      liveUrl: row.liveUrl,
      repoUrl: row.repoUrl,
      likes: row.likes,
      sortOrder: row.sortOrder,
      createdAt: row.createdAt,
    };
  }

  static toPersistence(input: CreateProjectInput) {
    return {
      slug: input.slug,
      title: input.title,
      subtitle: input.subtitle,
      category: input.category,
      summary: input.summary,
      overview: input.overview,
      problem: input.problem,
      goal: input.goal,
      solution: input.solution,
      techStackJson: JSON.stringify(input.techStack ?? []),
      highlightsJson: JSON.stringify(input.highlights ?? []),
      architectureJson: JSON.stringify(
        input.architecture ?? { layers: [], note: '' }
      ),
      featuresJson: JSON.stringify(input.features ?? []),
      challengesJson: JSON.stringify(input.challenges ?? []),
      learnedJson: JSON.stringify(input.learned ?? []),
      imageUrl: input.imageUrl,
      secondaryImageUrl: input.secondaryImageUrl ?? null,
      liveUrl: input.liveUrl ?? null,
      repoUrl: input.repoUrl,
      sortOrder: input.sortOrder ?? 0,
    };
  }
}
