import {
  CreateGuestbookInput,
  GuestbookEntryEntity,
} from '../../domain/entities/GuestbookEntry';
import { IGuestbookRepository } from '../../domain/repositories/IGuestbookRepository';
import { prisma } from '../db/prisma';
import { GuestbookMapper } from '../mappers/GuestbookMapper';

export class PrismaGuestbookRepository implements IGuestbookRepository {
  async findAll(): Promise<GuestbookEntryEntity[]> {
    const rows = await prisma.guestbookEntry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(GuestbookMapper.toDomain);
  }

  async findById(id: string): Promise<GuestbookEntryEntity | null> {
    const row = await prisma.guestbookEntry.findUnique({ where: { id } });
    return row ? GuestbookMapper.toDomain(row) : null;
  }

  async create(input: CreateGuestbookInput): Promise<GuestbookEntryEntity> {
    const row = await prisma.guestbookEntry.create({
      data: GuestbookMapper.toPersistence(input),
    });
    return GuestbookMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await prisma.guestbookEntry.delete({ where: { id } });
  }
}
