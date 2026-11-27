import {
  ContactMessageEntity,
  CreateMessageInput,
} from '../../domain/entities/ContactMessage';
import { IMessageRepository } from '../../domain/repositories/IMessageRepository';
import { prisma } from '../db/prisma';
import { MessageMapper } from '../mappers/MessageMapper';

export class PrismaMessageRepository implements IMessageRepository {
  async findAll(): Promise<ContactMessageEntity[]> {
    const rows = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(MessageMapper.toDomain);
  }

  async findById(id: string): Promise<ContactMessageEntity | null> {
    const row = await prisma.message.findUnique({ where: { id } });
    return row ? MessageMapper.toDomain(row) : null;
  }

  async create(input: CreateMessageInput): Promise<ContactMessageEntity> {
    const row = await prisma.message.create({
      data: MessageMapper.toPersistence(input),
    });
    return MessageMapper.toDomain(row);
  }

  async markAsRead(id: string): Promise<ContactMessageEntity> {
    const row = await prisma.message.update({
      where: { id },
      data: { isRead: true },
    });
    return MessageMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await prisma.message.delete({ where: { id } });
  }
}
