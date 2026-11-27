import { GuestbookEntry as PrismaGuestbookEntry } from '@prisma/client';
import {
  CreateGuestbookInput,
  GuestbookEntryEntity,
} from '../../domain/entities/GuestbookEntry';

export class GuestbookMapper {
  static toDomain(row: PrismaGuestbookEntry): GuestbookEntryEntity {
    return {
      id: row.id,
      authorName: row.authorName,
      emoji: row.emoji,
      message: row.message,
      createdAt: row.createdAt,
    };
  }

  static toPersistence(input: CreateGuestbookInput) {
    return {
      authorName: input.authorName,
      emoji: input.emoji ?? '👋',
      message: input.message,
    };
  }
}
