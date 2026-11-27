import { Message as PrismaMessage } from '@prisma/client';
import {
  ContactMessageEntity,
  CreateMessageInput,
} from '../../domain/entities/ContactMessage';

export class MessageMapper {
  static toDomain(row: PrismaMessage): ContactMessageEntity {
    return {
      id: row.id,
      senderName: row.senderName,
      senderEmail: row.senderEmail,
      subject: row.subject,
      body: row.body,
      isRead: row.isRead,
      createdAt: row.createdAt,
    };
  }

  static toPersistence(input: CreateMessageInput) {
    return {
      senderName: input.senderName,
      senderEmail: input.senderEmail,
      subject: input.subject,
      body: input.body,
    };
  }
}
