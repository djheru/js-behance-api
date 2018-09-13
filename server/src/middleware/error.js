import {
  notFoundHandler,
  internalServerErrorHandler
} from '../handlers/error';
import logger from '../utils/logger';

const log = logger.log('app:middleware');

/**
 * Error handling middleware - NOTE: These must be registered last on the express app
 * @param app
 */
export function initializeErrorMiddleware(app) {
  log('Initializing error middleware');

  // Catch 404 and forward to error handler
  app.use('*', notFoundHandler);

  // Error handler
  app.use(internalServerErrorHandler);
}
