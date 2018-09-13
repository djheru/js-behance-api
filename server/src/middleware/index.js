import cors from 'cors';
import logger from '../utils/logger';

const log = logger.log('app:middleware');

/**
 * Initialize express middleware
 * @param app
 */
export function initializeMiddleware(app) {
  log('Initializing middleware');

  app.use(cors());
}
