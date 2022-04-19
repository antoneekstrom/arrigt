import { Application } from "express";
import cors from "cors";

export function getCorsMiddleware() {
  return cors({
    credentials: false,
    origin: "http://localhost:3000",
  });
}

/**
 * Configures the application to allow cross-origin requests from the frontend.
 * @param app the application
 */
export function configureCors(app: Application) {
  app.use(getCorsMiddleware());
}
