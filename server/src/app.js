import express from 'express';
// import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import logger from './utils/logger';

const log = logger.log('app:initialize');

/**
 * Sets up the express app with mongodb connection, middleware, auth, routes and resources
 *
 * @returns {Promise.<*|Function>} Configured express application
 */
export default async function initializeApplication() {
  log('Initializing Express app with Apollo Server');
  const app = express();

  app.use(cors());

  return app;
}
