import "reflect-metadata";
import express from "express";
import { schema } from "./graphql/schema";
import { addGraphqlRoute } from "./app/routes/graphql";
import { configureCors, getCorsMiddleware } from "./app/configure/cors";
import { start } from "./app";
import http from "http";

run();

/**
 * Entrypoint of the server.
 */
async function run() {
  const app = express();
  const httpServer = new http.Server(app);

  await addGraphqlRoute(app, httpServer, await schema(), "/graphql");

  await new Promise<void>(resolve => httpServer.listen({ port: 3000 }, resolve));
  console.log("Server started");
}
