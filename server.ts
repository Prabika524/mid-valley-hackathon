import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import backendApp from './backend/server.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mount backend API endpoints FIRST
  app.use(backendApp);

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', app: 'Nepal Heritage' });
  });

  // Vite middleware for development or static dist serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nepal Heritage server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
