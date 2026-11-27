import { ContactMessageEntity, CreateMessageInput } from '../entities/ContactMessage';

export interface IMessageRepository {
  findAll(): Promise<ContactMessageEntity[]>;
  findById(id: string): Promise<ContactMessageEntity | null>;
  create(input: CreateMessageInput): Promise<ContactMessageEntity>;
  markAsRead(id: string): Promise<ContactMessageEntity>;
  delete(id: string): Promise<void>;
}
