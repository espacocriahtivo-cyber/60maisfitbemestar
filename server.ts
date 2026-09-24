import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Endpoints para consumo dinâmico no 60+ FIT
app.get('/api/health-check', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    app: '60+ FIT - Musculação e Funcionalidade',
    server: 'Hostinger Ready (Node.js / Express)',
    timestamp: new Date().toISOString(),
  });
});

// Servir arquivos estáticos do build do Vite na pasta dist
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback para SPA (Single Page Application)
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[60+ FIT] Servidor rodando na porta ${PORT}`);
  console.log(`Pronto para implantação na Hostinger (VPS / Cloud / Node.js)`);
});
