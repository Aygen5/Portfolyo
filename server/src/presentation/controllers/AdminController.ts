import { NextFunction, Request, Response } from 'express';
import {
  CreateProjectUseCase,
  DeleteProjectUseCase,
} from '../../application/use-cases/ProjectUseCases';
import {
  CreatePostUseCase,
  DeletePostUseCase,
} from '../../application/use-cases/PostUseCases';
import { DeleteGuestbookEntryUseCase } from '../../application/use-cases/GuestbookUseCases';
import {
  DeleteMessageUseCase,
  GetMessagesUseCase,
  MarkMessageReadUseCase,
} from '../../application/use-cases/MessageUseCases';
import { createPostSchema, createProjectSchema } from '../validators/schemas';

export class AdminController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly deleteProjectUseCase: DeleteProjectUseCase,
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
    private readonly deleteGuestbookUseCase: DeleteGuestbookEntryUseCase,
    private readonly getMessagesUseCase: GetMessagesUseCase,
    private readonly markMessageReadUseCase: MarkMessageReadUseCase,
    private readonly deleteMessageUseCase: DeleteMessageUseCase
  ) {}

  verify = (_req: Request, res: Response) => {
    res.json({ data: { authenticated: true } });
  };

  createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = createProjectSchema.parse(req.body);
      const project = await this.createProjectUseCase.execute(input);
      res.status(201).json({ data: project });
    } catch (err) {
      next(err);
    }
  };

  deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.deleteProjectUseCase.execute(String(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

  createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = createPostSchema.parse(req.body);
      const post = await this.createPostUseCase.execute(input);
      res.status(201).json({ data: post });
    } catch (err) {
      next(err);
    }
  };

  deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.deletePostUseCase.execute(String(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

  deleteGuestbookEntry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.deleteGuestbookUseCase.execute(String(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

  getMessages = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const messages = await this.getMessagesUseCase.execute();
      res.json({ data: messages });
    } catch (err) {
      next(err);
    }
  };

  markMessageRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated = await this.markMessageReadUseCase.execute(String(req.params.id));
      res.json({ data: updated });
    } catch (err) {
      next(err);
    }
  };

  deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.deleteMessageUseCase.execute(String(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
