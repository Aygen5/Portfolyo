import {
  ContactMessageEntity,
  CreateMessageInput,
} from '../../domain/entities/ContactMessage';
import { NotFoundError } from '../../domain/errors/DomainError';
import { IMessageRepository } from '../../domain/repositories/IMessageRepository';

export class SendMessageUseCase {
  constructor(private readonly messageRepo: IMessageRepository) {}

  async execute(input: CreateMessageInput): Promise<ContactMessageEntity> {
    return this.messageRepo.create(input);
  }
}

export class GetMessagesUseCase {
  constructor(private readonly messageRepo: IMessageRepository) {}

  async execute(): Promise<ContactMessageEntity[]> {
    return this.messageRepo.findAll();
  }
}

export class MarkMessageReadUseCase {
  constructor(private readonly messageRepo: IMessageRepository) {}

  async execute(id: string): Promise<ContactMessageEntity> {
    const existing = await this.messageRepo.findById(id);
    if (!existing) {
      throw new NotFoundError('Message');
    }
    return this.messageRepo.markAsRead(id);
  }
}

export class DeleteMessageUseCase {
  constructor(private readonly messageRepo: IMessageRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.messageRepo.findById(id);
    if (!existing) {
      throw new NotFoundError('Message');
    }
    await this.messageRepo.delete(id);
  }
}
