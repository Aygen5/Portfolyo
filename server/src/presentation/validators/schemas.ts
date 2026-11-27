import { z } from 'zod';

export const createGuestbookSchema = z.object({
  authorName: z.string().trim().min(2, 'Name must be at least 2 characters').max(60),
  emoji: z.string().trim().min(1).max(8).optional().default('👋'),
  message: z.string().trim().min(3, 'Message must be at least 3 characters').max(320),
});

export const createMessageSchema = z.object({
  senderName: z.string().trim().min(2, 'Name must be at least 2 characters').max(80),
  senderEmail: z.string().trim().email('Please provide a valid email address'),
  subject: z.string().trim().min(2, 'Subject must be at least 2 characters').max(120),
  body: z.string().trim().min(10, 'Message body must be at least 10 characters').max(2000),
});

export const createPostSchema = z.object({
  content: z.string().trim().min(3).max(500),
  mood: z.string().trim().min(1).max(8).optional().default('✨'),
});

const labeledItemSchema = z.object({
  label: z.string().trim().min(1),
  text: z.string().trim().min(1),
});

const architectureLayerSchema = z.object({
  name: z.string().trim().min(1),
  text: z.string().trim().min(1),
});

export const createProjectSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  title: z.string().trim().min(2).max(100),
  subtitle: z.string().trim().min(2).max(160),
  category: z.enum(['fullstack', 'backend', 'mobile']),
  summary: z.string().trim().min(10).max(500),
  overview: z.string().trim().min(10).max(2000),
  problem: z.string().trim().min(5).max(1500),
  goal: z.string().trim().min(5).max(1500),
  solution: z.string().trim().min(5).max(1500),
  techStack: z.array(z.string().trim().min(1)).min(1),
  highlights: z.array(z.string().trim().min(1)).optional().default([]),
  architecture: z
    .object({
      layers: z.array(architectureLayerSchema).default([]),
      note: z.string().default(''),
    })
    .optional(),
  features: z.array(labeledItemSchema).optional().default([]),
  challenges: z.array(labeledItemSchema).optional().default([]),
  learned: z.array(z.string().trim().min(1)).optional().default([]),
  imageUrl: z.string().trim().min(1),
  secondaryImageUrl: z.string().trim().nullable().optional(),
  liveUrl: z.string().trim().url().nullable().optional(),
  repoUrl: z.string().trim().url(),
  sortOrder: z.number().int().optional().default(0),
});
