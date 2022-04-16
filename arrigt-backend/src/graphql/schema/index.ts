import { buildSchema, NonEmptyArray } from "type-graphql";
import Container from "typedi";
import { EventResolver } from "./resolvers/EventResolver";
import { RegistrationResolver } from "./resolvers/RegistrationResolver";

/**
 * Contains the resolver classes for the GraphQL schema.
 */
const resolvers: NonEmptyArray<Function> = [RegistrationResolver, EventResolver];

/**
 * Creates the graphql schema.
 *
 * @returns the schema
 */
export async function schema() {
  return await buildSchema({
    resolvers,
    container: Container,
  });
}
