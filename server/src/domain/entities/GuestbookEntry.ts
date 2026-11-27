export interface GuestbookEntryEntity {
  id: string;
  authorName: string;
  emoji: string;
  message: string;
  createdAt: Date;
}

export interface CreateGuestbookInput {
  authorName: string;
  emoji?: string;
  message: string;
}
