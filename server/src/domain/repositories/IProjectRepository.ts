import { CreateProjectInput, ProjectEntity } from '../entities/Project';

export interface IProjectRepository {
  findAll(): Promise<ProjectEntity[]>;
  findById(id: string): Promise<ProjectEntity | null>;
  findBySlug(slug: string): Promise<ProjectEntity | null>;
  create(input: CreateProjectInput): Promise<ProjectEntity>;
  incrementLikes(id: string): Promise<ProjectEntity>;
  delete(id: string): Promise<void>;
}
