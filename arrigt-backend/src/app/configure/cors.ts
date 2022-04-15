import { Application } from "express";
import cors from "cors";

/**
 * Configures the application to allow cross-origin requests from the frontend.
 * @param app the application
 */
export function configureCors(app: Application) {
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
}
