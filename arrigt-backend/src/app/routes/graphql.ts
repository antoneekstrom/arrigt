import { Application } from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema } from "graphql";

/**
 * Adds a GraphQL endpoint to the application.
 *
 * @param app the application
 * @param schema the graphql schema
 * @param route the route to serve on
 */
export function addGraphqlRoute(
  app: Application,
  schema: GraphQLSchema,
  route: string
) {
  app.use(
    route,
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );
}
