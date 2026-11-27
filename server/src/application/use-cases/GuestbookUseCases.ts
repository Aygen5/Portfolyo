import {
  CreateGuestbookInput,
  GuestbookEntryEntity,
} from '../../domain/entities/GuestbookEntry';
import { NotFoundError } from '../../domain/errors/DomainError';
import { IGuestbookRepository } from '../../domain/repositories/IGuestbookRepository';

export class GetGuestbookUseCase {
  constructor(private readonly guestbookRepo: IGuestbookRepository) {}

  async execute(): Promise<GuestbookEntryEntity[]> {
    return this.guestbookRepo.findAll();
  }
}

export class CreateGuestbookEntryUseCase {
  constructor(private readonly guestbookRepo: IGuestbookRepository) {}

  async execute(input: CreateGuestbookInput): Promise<GuestbookEntryEntity> {
    return this.guestbookRepo.create(input);
  }
}

export class DeleteGuestbookEntryUseCase {
  constructor(private readonly guestbookRepo: IGuestbookRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.guestbookRepo.findById(id);
    if (!existing) {
      throw new NotFoundError('Guestbook entry');
    }
    await this.guestbookRepo.delete(id);
  }
}
