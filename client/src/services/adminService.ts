import {
  ContactMessage,
  CreatePostPayload,
  CreateProjectPayload,
  Post,
  Project,
} from '../domain/models';
import { apiRequest } from './apiClient';

export const adminService = {
  verify(secret: string): Promise<{ authenticated: boolean }> {
    return apiRequest<{ authenticated: boolean }>('/admin/verify', {
      method: 'POST',
      adminSecret: secret,
    });
  },

  createProject(secret: string, payload: CreateProjectPayload): Promise<Project> {
    return apiRequest<Project>('/admin/projects', {
      method: 'POST',
      adminSecret: secret,
      body: payload,
    });
  },

  deleteProject(secret: string, id: string): Promise<void> {
    return apiRequest<void>(`/admin/projects/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      adminSecret: secret,
    });
  },

  createPost(secret: string, payload: CreatePostPayload): Promise<Post> {
    return apiRequest<Post>('/admin/posts', {
      method: 'POST',
      adminSecret: secret,
      body: payload,
    });
  },

  deletePost(secret: string, id: string): Promise<void> {
    return apiRequest<void>(`/admin/posts/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      adminSecret: secret,
    });
  },

  deleteGuestbookEntry(secret: string, id: string): Promise<void> {
    return apiRequest<void>(`/admin/guestbook/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      adminSecret: secret,
    });
  },

  getMessages(secret: string): Promise<ContactMessage[]> {
    return apiRequest<ContactMessage[]>('/admin/messages', {
      adminSecret: secret,
    });
  },

  markMessageRead(secret: string, id: string): Promise<ContactMessage> {
    return apiRequest<ContactMessage>(
      `/admin/messages/${encodeURIComponent(id)}/read`,
      {
        method: 'PATCH',
        adminSecret: secret,
      }
    );
  },

  deleteMessage(secret: string, id: string): Promise<void> {
    return apiRequest<void>(`/admin/messages/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      adminSecret: secret,
    });
  },
};
