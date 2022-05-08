import { Application } from "express";
import cors from "cors";
import { CORS_URLS, URL_FRONTEND } from "../env";

/**
 * Configures the application to allow cross-origin requests from the frontend.
 * @param app the express application
 */
 export function useCors(app: Application) {
  app.use(configureCorsMiddleware());
}

/**
 * @returns the configured cors middleware
 */
function configureCorsMiddleware() {
  return cors({
    credentials: true,
    origin: CORS_URLS,
  });
}
