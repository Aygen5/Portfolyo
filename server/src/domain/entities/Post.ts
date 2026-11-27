export interface PostEntity {
  id: string;
  content: string;
  mood: string;
  likes: number;
  createdAt: Date;
}

export interface CreatePostInput {
  content: string;
  mood?: string;
}
