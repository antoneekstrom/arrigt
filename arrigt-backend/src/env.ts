export default process.env;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      URL_FRONTEND: string;
      PORT: string;
      GRAPHQL_PATH: string;
      CORS_URLS: string;
    }
  }
}

export const URL_FRONTEND = process.env.URL_FRONTEND ?? "http://localhost:3000";
export const PORT = process.env.PORT ?? 3000;
export const GRAPHQL_PATH = process.env.GRAPHQL_PATH ?? "/graphql";
export const CORS_URLS = process.env.CORS_URLS?.split(",") ?? [
  URL_FRONTEND,
  "https://studio.apollographql.com",
];
