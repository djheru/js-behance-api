import 'dotenv/config';
import logger from './utils/logger';
import initializeApplication from './app';

const log = logger.log('app:server');
const { PORT: port = 8000, HOST: host = '0.0.0.0' } = process.env;

/**
 * Initializes the express app and listens on the host/port specified in the environment config
 *
 * @returns {Promise.<*>}
 */
async function main() {
  try {
    log('Starting server');
    const app = await initializeApplication();
    app.listen({ port, host }, () => logger.appStarted(port, host));
    return app;
  } catch (e) {
    logger.error(e);
    return false;
  }
}

const app = main();

export default async () => app;
