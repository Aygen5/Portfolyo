import { CreateProjectInput, ProjectEntity } from '../../domain/entities/Project';
import { DomainError, NotFoundError } from '../../domain/errors/DomainError';
import { IProjectRepository } from '../../domain/repositories/IProjectRepository';

export class GetProjectsUseCase {
  constructor(private readonly projectRepo: IProjectRepository) {}

  async execute(): Promise<ProjectEntity[]> {
    return this.projectRepo.findAll();
  }
}

export class GetProjectBySlugUseCase {
  constructor(private readonly projectRepo: IProjectRepository) {}

  async execute(slug: string): Promise<ProjectEntity> {
    const project = await this.projectRepo.findBySlug(slug);
    if (!project) {
      throw new NotFoundError(`Project "${slug}"`);
    }
    return project;
  }
}

export class LikeProjectUseCase {
  constructor(private readonly projectRepo: IProjectRepository) {}

  async execute(id: string): Promise<ProjectEntity> {
    const existing = await this.projectRepo.findById(id);
    if (!existing) {
      throw new NotFoundError('Project');
    }
    return this.projectRepo.incrementLikes(id);
  }
}

export class CreateProjectUseCase {
  constructor(private readonly projectRepo: IProjectRepository) {}

  async execute(input: CreateProjectInput): Promise<ProjectEntity> {
    const duplicate = await this.projectRepo.findBySlug(input.slug);
    if (duplicate) {
      throw new DomainError(`A project with slug "${input.slug}" already exists.`, 409);
    }
    return this.projectRepo.create(input);
  }
}

export class DeleteProjectUseCase {
  constructor(private readonly projectRepo: IProjectRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.projectRepo.findById(id);
    if (!existing) {
      throw new NotFoundError('Project');
    }
    await this.projectRepo.delete(id);
  }
}
