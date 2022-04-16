import { Application } from "express";
import { GraphQLSchema } from "graphql";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

/**
 * Adds a GraphQL endpoint to the application.
 *
 * @param app the application
 * @param schema the graphql schema
 * @param route the route to serve on
 */
export async function addGraphqlRoute(
  app: Application,
  httpServer: http.Server,
  schema: GraphQLSchema,
  route: string
) {
  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: [
        "http://localhost:3000",
        "https://studio.apollographql.com",
      ],
    },
    path: route,
  });
}
