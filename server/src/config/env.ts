import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 4000,
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  adminSecret: process.env.ADMIN_SECRET || 'aygen-portfolio-admin-2026',
};
