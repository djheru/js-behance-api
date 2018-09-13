import { ApolloServer } from 'apollo-server-express';
import typeDefs from '../schema';
import resolvers from '../resolvers';
import { BehanceAPI } from '../services/BehanceAPI';
import logger from '../utils/logger';

const log = logger.log('app:middleware');

/**
 * Configure and apply ApolloServer
 * @param app
 */
export function initializeGraphQLServer(app) {
  log('Initializing graphQL middleware');

  const behanceClientId = process.env.BEHANCE_CLIENT_ID || '';

  const apolloConfig = {
    typeDefs,
    resolvers,
    dataSources: () => ({
      behanceAPI: new BehanceAPI(behanceClientId)
    }),
    context: {}
  };

  const graphqlServer = new ApolloServer(apolloConfig);
  graphqlServer.applyMiddleware({ app, path: '/graphql' });
}
