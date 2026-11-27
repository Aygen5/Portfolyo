import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { apiRouter } from './presentation/routes/apiRoutes';
import { errorHandler } from './presentation/middlewares/errorHandler';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'portfolio-server' });
});

app.use('/api', apiRouter);
app.use(errorHandler);

if (require.main === module) {
  app.listen(env.port, () => {
    console.log(`[server] Running on http://localhost:${env.port}`);
  });
}
