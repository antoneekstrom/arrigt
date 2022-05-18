import { Application } from "express";
import { GraphQLSchema } from "graphql";
import { ApolloServer } from "apollo-server-express";
import { Server as HttpServer } from "http";
import {
  ApolloServerPluginDrainHttpServer,
  PluginDefinition,
} from "apollo-server-core";
import { CORS_URLS } from "../env";
import { WebSocketServer } from "ws";
import { useServer as useWebSocketServer } from "graphql-ws/lib/use/ws";
import { Disposable } from "graphql-ws";

type ConfigureGraphQLOptions = {
  app: Application;
  httpServer: HttpServer;
  schema: GraphQLSchema;
  endpoint: string;
};

/**
 * Adds a GraphQL endpoint to the application.
 */
export async function useGraphQL({
  httpServer,
  app,
  endpoint,
  schema,
}: ConfigureGraphQLOptions) {
  // Starts the websocket server
  const webSocketServerCleanup = useWebSocketServer(
    { schema },
    // Creates websocket server for graphql subscriptions
    new WebSocketServer({
      server: httpServer,
      path: endpoint,
    })
  );

  // Creates plugins for apollo server
  const plugins = [
    // Proper cleanup for apollo server
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // Proper cleanup for websocket server
    createApolloPluginFromDisposable(webSocketServerCleanup),
  ];

  // Creates apollo server
  const apolloServer = new ApolloServer({
    schema,
    plugins,
    context: ({ req }) => {
      const context = {
        user: req.session.user, // `req.user` comes from `express-session`
      };
      return context;
    },
  });

  // Starts the apollo server
  await apolloServer.start();

  // Creates express middleware for apollo server
  const apolloMiddleware = apolloServer.getMiddleware({
    cors: {
      credentials: true,
      origin: CORS_URLS,
    },
    path: endpoint,
  });

  // Adds the middleware to the application
  app.use(apolloMiddleware);
}

/**
 *
 * @param disposable
 * @returns
 */
function createApolloPluginFromDisposable(
  disposable: Disposable
): PluginDefinition {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await disposable.dispose();
        },
      };
    },
  };
}
