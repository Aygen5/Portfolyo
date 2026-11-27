import { CreatePostInput, PostEntity } from '../../domain/entities/Post';
import { IPostRepository } from '../../domain/repositories/IPostRepository';
import { prisma } from '../db/prisma';
import { PostMapper } from '../mappers/PostMapper';

export class PrismaPostRepository implements IPostRepository {
  async findAll(): Promise<PostEntity[]> {
    const rows = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(PostMapper.toDomain);
  }

  async findById(id: string): Promise<PostEntity | null> {
    const row = await prisma.post.findUnique({ where: { id } });
    return row ? PostMapper.toDomain(row) : null;
  }

  async create(input: CreatePostInput): Promise<PostEntity> {
    const row = await prisma.post.create({
      data: PostMapper.toPersistence(input),
    });
    return PostMapper.toDomain(row);
  }

  async incrementLikes(id: string): Promise<PostEntity> {
    const row = await prisma.post.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });
    return PostMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await prisma.post.delete({ where: { id } });
  }
}
