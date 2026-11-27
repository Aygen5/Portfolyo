import { CreatePostInput, PostEntity } from '../entities/Post';

export interface IPostRepository {
  findAll(): Promise<PostEntity[]>;
  findById(id: string): Promise<PostEntity | null>;
  create(input: CreatePostInput): Promise<PostEntity>;
  incrementLikes(id: string): Promise<PostEntity>;
  delete(id: string): Promise<void>;
}
