import * as functions from 'firebase-functions';
import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Função para carregar controllers assincronamente
async function loadControllers() {
  const controllersPath = path.join(__dirname, 'controllers');
  const controllerFiles = fs.readdirSync(controllersPath);

  for (const file of controllerFiles) {
    const { default: controller } = await import(`./controllers/${file}`);
    if (typeof controller === 'function') {
      controller(app);
    }
  }
}

// Carrega os controllers antes de exportar a função
await loadControllers();

// Exporta a função HTTPS para o Firebase
export const api = functions.https.onRequest(app);
