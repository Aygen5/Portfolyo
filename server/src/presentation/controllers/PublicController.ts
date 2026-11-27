import { NextFunction, Request, Response } from 'express';
import {
  GetProjectBySlugUseCase,
  GetProjectsUseCase,
  LikeProjectUseCase,
} from '../../application/use-cases/ProjectUseCases';
import {
  GetPostsUseCase,
  LikePostUseCase,
} from '../../application/use-cases/PostUseCases';
import {
  CreateGuestbookEntryUseCase,
  GetGuestbookUseCase,
} from '../../application/use-cases/GuestbookUseCases';
import { SendMessageUseCase } from '../../application/use-cases/MessageUseCases';
import {
  createGuestbookSchema,
  createMessageSchema,
} from '../validators/schemas';

export class PublicController {
  constructor(
    private readonly getProjectsUseCase: GetProjectsUseCase,
    private readonly getProjectBySlugUseCase: GetProjectBySlugUseCase,
    private readonly likeProjectUseCase: LikeProjectUseCase,
    private readonly getPostsUseCase: GetPostsUseCase,
    private readonly likePostUseCase: LikePostUseCase,
    private readonly getGuestbookUseCase: GetGuestbookUseCase,
    private readonly createGuestbookUseCase: CreateGuestbookEntryUseCase,
    private readonly sendMessageUseCase: SendMessageUseCase
  ) {}

  getProjects = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await this.getProjectsUseCase.execute();
      res.json({ data: projects });
    } catch (err) {
      next(err);
    }
  };

  getProjectBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await this.getProjectBySlugUseCase.execute(String(req.params.slug));
      res.json({ data: project });
    } catch (err) {
      next(err);
    }
  };

  likeProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated = await this.likeProjectUseCase.execute(String(req.params.id));
      res.json({ data: updated });
    } catch (err) {
      next(err);
    }
  };

  getPosts = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await this.getPostsUseCase.execute();
      res.json({ data: posts });
    } catch (err) {
      next(err);
    }
  };

  likePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated = await this.likePostUseCase.execute(String(req.params.id));
      res.json({ data: updated });
    } catch (err) {
      next(err);
    }
  };

  getGuestbook = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const entries = await this.getGuestbookUseCase.execute();
      res.json({ data: entries });
    } catch (err) {
      next(err);
    }
  };

  createGuestbookEntry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = createGuestbookSchema.parse(req.body);
      const entry = await this.createGuestbookUseCase.execute(input);
      res.status(201).json({ data: entry });
    } catch (err) {
      next(err);
    }
  };

  sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = createMessageSchema.parse(req.body);
      const message = await this.sendMessageUseCase.execute(input);
      res.status(201).json({ data: message });
    } catch (err) {
      next(err);
    }
  };
}
