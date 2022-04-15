import "reflect-metadata";
import express from "express";
import { schema } from "./graphql/schema";
import { addGraphqlRoute } from "./app/routes/graphql";
import { configureCors } from "./app/configure/cors";
import { start } from "./app";

run();

/**
 * Entrypoint of the server.
 */
async function run() {
  const app = express();

  configureCors(app);
  addGraphqlRoute(app, await schema(), "/graphql");

  start(app);
}
