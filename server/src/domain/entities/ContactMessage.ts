export interface ContactMessageEntity {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  body: string;
  isRead: boolean;
  createdAt: Date;
}

export interface CreateMessageInput {
  senderName: string;
  senderEmail: string;
  subject: string;
  body: string;
}
