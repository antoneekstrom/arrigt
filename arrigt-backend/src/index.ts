// Required by type-graphql
import "reflect-metadata";
import { configureApp } from "./app/configure";
import { createApp, startApp } from "./app/start";

/**
 * Entrypoint for the backend application.
 */
async function run() {
  const result = await createApp();
  await configureApp(result);
  await startApp(result);
}

run();
