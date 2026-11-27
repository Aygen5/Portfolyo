import { prisma } from '../src/infrastructure/db/prisma';
import { ProjectMapper } from '../src/infrastructure/mappers/ProjectMapper';
import { SEED_GUESTBOOK, SEED_POSTS, SEED_PROJECTS } from './seedData';

async function main() {
  console.log('[seed] Starting idempotent database seed...');

  for (const proj of SEED_PROJECTS) {
    const { initialLikes, ...input } = proj;
    const persistenceData = ProjectMapper.toPersistence(input);

    await prisma.project.upsert({
      where: { slug: input.slug },
      update: {
        ...persistenceData,
      },
      create: {
        ...persistenceData,
        likes: initialLikes,
      },
    });
  }

  const existingPosts = await prisma.post.count();
  if (existingPosts === 0) {
    for (const post of SEED_POSTS) {
      await prisma.post.create({
        data: {
          content: post.content,
          mood: post.mood ?? '✨',
          likes: post.initialLikes,
        },
      });
    }
  }

  const existingGuestbook = await prisma.guestbookEntry.count();
  if (existingGuestbook === 0) {
    for (const entry of SEED_GUESTBOOK) {
      await prisma.guestbookEntry.create({
        data: {
          authorName: entry.authorName,
          emoji: entry.emoji ?? '👋',
          message: entry.message,
        },
      });
    }
  }

  console.log('[seed] Database seed completed successfully.');
}

main()
  .catch((err) => {
    console.error('[seed] Failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
