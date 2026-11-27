import { CreatePostInput, PostEntity } from '../../domain/entities/Post';
import { NotFoundError } from '../../domain/errors/DomainError';
import { IPostRepository } from '../../domain/repositories/IPostRepository';

export class GetPostsUseCase {
  constructor(private readonly postRepo: IPostRepository) {}

  async execute(): Promise<PostEntity[]> {
    return this.postRepo.findAll();
  }
}

export class LikePostUseCase {
  constructor(private readonly postRepo: IPostRepository) {}

  async execute(id: string): Promise<PostEntity> {
    const existing = await this.postRepo.findById(id);
    if (!existing) {
      throw new NotFoundError('Post');
    }
    return this.postRepo.incrementLikes(id);
  }
}

export class CreatePostUseCase {
  constructor(private readonly postRepo: IPostRepository) {}

  async execute(input: CreatePostInput): Promise<PostEntity> {
    return this.postRepo.create(input);
  }
}

export class DeletePostUseCase {
  constructor(private readonly postRepo: IPostRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.postRepo.findById(id);
    if (!existing) {
      throw new NotFoundError('Post');
    }
    await this.postRepo.delete(id);
  }
}
