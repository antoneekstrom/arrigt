import express from "express";
import { Server as HttpServer, createServer } from "http";
import { CORS_URLS, PORT, URL_FRONTEND } from "../env";

export type ListenableApp = {
  listen(options: { port?: number }, callback?: () => void): unknown;
};

export type CreateAppResult = {
  httpServer: HttpServer;
  app: express.Application;
};

/**
 *
 * @returns
 */
export async function createApp(): Promise<CreateAppResult> {
  const app = express();
  const httpServer = createServer(app);
  return { httpServer, app };
}

/**
 * Starts the server.
 * @param app The server to start.
 */
export async function startApp({ httpServer }: CreateAppResult) {
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  logStartupMessage();
}

function logStartupMessage() {
  console.log("Server started on internal port " + PORT);
  console.log("Frontend should be available on " + URL_FRONTEND);
  console.log("Allowed CORS origins are " + CORS_URLS.join(", "));
}
