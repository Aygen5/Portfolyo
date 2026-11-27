import { Post } from '../domain/models';
import { apiRequest } from './apiClient';

export const postService = {
  getAll(): Promise<Post[]> {
    return apiRequest<Post[]>('/posts');
  },

  like(id: string): Promise<Post> {
    return apiRequest<Post>(`/posts/${encodeURIComponent(id)}/like`, {
      method: 'POST',
    });
  },
};
