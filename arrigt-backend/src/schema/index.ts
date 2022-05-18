import { buildSchema, NonEmptyArray } from "type-graphql";
import Container from "typedi";
import { EventResolver } from "./resolvers/EventResolver";
import { RegistrationResolver } from "./resolvers/RegistrationResolver";
import { GammaUser } from "../gamma-auth";

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
    authChecker: gammaAuthChecker
  });
}

type GammaAuthCheckerOptions = {
  context: { user?: GammaUser };
};

type GammaRole = string;

function gammaAuthChecker(
  options: GammaAuthCheckerOptions,
  _roles: GammaRole[]
) {
  console.log("user", options.context.user);
  return options.context.user != undefined;
}
