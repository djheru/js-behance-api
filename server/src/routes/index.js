import express from 'express';
import { healthCheck } from '../handlers';

const router = express.Router();

/**
 * Set up router for base public routes
 * @param app
 */
export function initializeRoutes(app) {
  router.get('/health-check', healthCheck);

  app.use('/', router);
}
