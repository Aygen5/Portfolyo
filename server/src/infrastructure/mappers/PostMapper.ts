import { Post as PrismaPost } from '@prisma/client';
import { CreatePostInput, PostEntity } from '../../domain/entities/Post';

export class PostMapper {
  static toDomain(row: PrismaPost): PostEntity {
    return {
      id: row.id,
      content: row.content,
      mood: row.mood,
      likes: row.likes,
      createdAt: row.createdAt,
    };
  }

  static toPersistence(input: CreatePostInput) {
    return {
      content: input.content,
      mood: input.mood ?? '✨',
    };
  }
}
