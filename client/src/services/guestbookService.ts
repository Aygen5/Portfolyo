import { CreateGuestbookPayload, GuestbookEntry } from '../domain/models';
import { apiRequest } from './apiClient';

export const guestbookService = {
  getAll(): Promise<GuestbookEntry[]> {
    return apiRequest<GuestbookEntry[]>('/guestbook');
  },

  create(payload: CreateGuestbookPayload): Promise<GuestbookEntry> {
    return apiRequest<GuestbookEntry>('/guestbook', {
      method: 'POST',
      body: payload,
    });
  },
};
