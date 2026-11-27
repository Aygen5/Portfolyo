import { CreateProjectInput, ProjectEntity } from '../../domain/entities/Project';
import { IProjectRepository } from '../../domain/repositories/IProjectRepository';
import { prisma } from '../db/prisma';
import { ProjectMapper } from '../mappers/ProjectMapper';

export class PrismaProjectRepository implements IProjectRepository {
  async findAll(): Promise<ProjectEntity[]> {
    const rows = await prisma.project.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
    return rows.map(ProjectMapper.toDomain);
  }

  async findById(id: string): Promise<ProjectEntity | null> {
    const row = await prisma.project.findUnique({ where: { id } });
    return row ? ProjectMapper.toDomain(row) : null;
  }

  async findBySlug(slug: string): Promise<ProjectEntity | null> {
    const row = await prisma.project.findUnique({ where: { slug } });
    return row ? ProjectMapper.toDomain(row) : null;
  }

  async create(input: CreateProjectInput): Promise<ProjectEntity> {
    const row = await prisma.project.create({
      data: ProjectMapper.toPersistence(input),
    });
    return ProjectMapper.toDomain(row);
  }

  async incrementLikes(id: string): Promise<ProjectEntity> {
    const row = await prisma.project.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });
    return ProjectMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await prisma.project.delete({ where: { id } });
  }
}
