import { Project } from '../domain/models';
import { apiRequest } from './apiClient';

export const projectService = {
  getAll(): Promise<Project[]> {
    return apiRequest<Project[]>('/projects');
  },

  getBySlug(slug: string): Promise<Project> {
    return apiRequest<Project>(`/projects/${encodeURIComponent(slug)}`);
  },

  like(id: string): Promise<Project> {
    return apiRequest<Project>(`/projects/${encodeURIComponent(id)}/like`, {
      method: 'POST',
    });
  },
};
