import { CreateGuestbookInput, GuestbookEntryEntity } from '../entities/GuestbookEntry';

export interface IGuestbookRepository {
  findAll(): Promise<GuestbookEntryEntity[]>;
  findById(id: string): Promise<GuestbookEntryEntity | null>;
  create(input: CreateGuestbookInput): Promise<GuestbookEntryEntity>;
  delete(id: string): Promise<void>;
}
