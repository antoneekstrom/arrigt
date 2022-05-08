import { buildSchema, NonEmptyArray } from "type-graphql";
import Container from "typedi";
import { EventResolver } from "./resolvers/EventResolver";
import { RegistrationResolver } from "./resolvers/RegistrationResolver";

/**
 * Contains the resolver classes for the GraphQL schema.
 */
const resolvers: NonEmptyArray<Function> = [
  RegistrationResolver,
  EventResolver,
];

/**
 * Creates the graphql schema.
 *
 * @returns the schema
 */
export async function createSchema() {
  return await buildSchema({
    resolvers,
    container: Container,
    validate: {
      enableDebugMessages: true,
      validationError: {
        target: true,
        value: true,
      },
    },
  });
}
