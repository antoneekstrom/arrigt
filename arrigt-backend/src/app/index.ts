import { Application } from "express";

/**
 * Starts the application
 * @param app the application
 */
export function start(app: Application) {
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
}
