import { ContactMessage, CreateMessagePayload } from '../domain/models';
import { apiRequest } from './apiClient';

export const messageService = {
  send(payload: CreateMessagePayload): Promise<ContactMessage> {
    return apiRequest<ContactMessage>('/messages', {
      method: 'POST',
      body: payload,
    });
  },
};
