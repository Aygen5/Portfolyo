import { Router } from 'express';
import { PrismaProjectRepository } from '../../infrastructure/repositories/PrismaProjectRepository';
import { PrismaPostRepository } from '../../infrastructure/repositories/PrismaPostRepository';
import { PrismaGuestbookRepository } from '../../infrastructure/repositories/PrismaGuestbookRepository';
import { PrismaMessageRepository } from '../../infrastructure/repositories/PrismaMessageRepository';
import {
  CreateProjectUseCase,
  DeleteProjectUseCase,
  GetProjectBySlugUseCase,
  GetProjectsUseCase,
  LikeProjectUseCase,
} from '../../application/use-cases/ProjectUseCases';
import {
  CreatePostUseCase,
  DeletePostUseCase,
  GetPostsUseCase,
  LikePostUseCase,
} from '../../application/use-cases/PostUseCases';
import {
  CreateGuestbookEntryUseCase,
  DeleteGuestbookEntryUseCase,
  GetGuestbookUseCase,
} from '../../application/use-cases/GuestbookUseCases';
import {
  DeleteMessageUseCase,
  GetMessagesUseCase,
  MarkMessageReadUseCase,
  SendMessageUseCase,
} from '../../application/use-cases/MessageUseCases';
import { PublicController } from '../controllers/PublicController';
import { AdminController } from '../controllers/AdminController';
import { adminAuthMiddleware } from '../middlewares/adminAuth';
import { writeRateLimiter } from '../middlewares/rateLimiter';

const projectRepo = new PrismaProjectRepository();
const postRepo = new PrismaPostRepository();
const guestbookRepo = new PrismaGuestbookRepository();
const messageRepo = new PrismaMessageRepository();

const publicController = new PublicController(
  new GetProjectsUseCase(projectRepo),
  new GetProjectBySlugUseCase(projectRepo),
  new LikeProjectUseCase(projectRepo),
  new GetPostsUseCase(postRepo),
  new LikePostUseCase(postRepo),
  new GetGuestbookUseCase(guestbookRepo),
  new CreateGuestbookEntryUseCase(guestbookRepo),
  new SendMessageUseCase(messageRepo)
);

const adminController = new AdminController(
  new CreateProjectUseCase(projectRepo),
  new DeleteProjectUseCase(projectRepo),
  new CreatePostUseCase(postRepo),
  new DeletePostUseCase(postRepo),
  new DeleteGuestbookEntryUseCase(guestbookRepo),
  new GetMessagesUseCase(messageRepo),
  new MarkMessageReadUseCase(messageRepo),
  new DeleteMessageUseCase(messageRepo)
);

export const apiRouter = Router();

// Public Endpoints
apiRouter.get('/projects', publicController.getProjects);
apiRouter.get('/projects/:slug', publicController.getProjectBySlug);
apiRouter.post('/projects/:id/like', writeRateLimiter, publicController.likeProject);

apiRouter.get('/posts', publicController.getPosts);
apiRouter.post('/posts/:id/like', writeRateLimiter, publicController.likePost);

apiRouter.get('/guestbook', publicController.getGuestbook);
apiRouter.post('/guestbook', writeRateLimiter, publicController.createGuestbookEntry);

apiRouter.post('/messages', writeRateLimiter, publicController.sendMessage);

// Protected Admin Endpoints
const adminRouter = Router();
adminRouter.use(adminAuthMiddleware);

adminRouter.post('/verify', adminController.verify);
adminRouter.post('/projects', adminController.createProject);
adminRouter.delete('/projects/:id', adminController.deleteProject);
adminRouter.post('/posts', adminController.createPost);
adminRouter.delete('/posts/:id', adminController.deletePost);
adminRouter.delete('/guestbook/:id', adminController.deleteGuestbookEntry);
adminRouter.get('/messages', adminController.getMessages);
adminRouter.patch('/messages/:id/read', adminController.markMessageRead);
adminRouter.delete('/messages/:id', adminController.deleteMessage);

apiRouter.use('/admin', adminRouter);
