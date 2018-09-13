import express from 'express';
import { initializeMiddleware } from './middleware';
import { initializeRoutes } from './routes';
import { initializeGraphQLServer } from './middleware/graphql';
import { initializeErrorMiddleware } from './middleware/error';
import logger from './utils/logger';

const log = logger.log('app:initialize');

/**
 * Sets up the express app with ApolloServer, middleware, etc
 *
 * @returns {Promise.<*|Function>} Configured express application
 */
export default async function initializeApplication() {
  log('Initializing Express app with Apollo Server');
  const app = express();

  initializeMiddleware(app);
  initializeRoutes(app);
  initializeGraphQLServer(app);
  initializeErrorMiddleware(app);

  return app;
}
