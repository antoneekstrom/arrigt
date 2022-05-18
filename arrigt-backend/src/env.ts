export default process.env;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      URL_FRONTEND: string;
      PORT: string;
      GRAPHQL_PATH: string;
      CORS_URLS: string;
      GAMMA_REDIRECT_PATH: string;
      GAMMA_REDIRECT_URI: string;
      GAMMA_CLIENT_ID: string;
      GAMMA_CLIENT_SECRET: string;
      GAMMA_URL: string;
      GAMMA_LOCAL_URL: string;
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

export const GAMMA_REDIRECT_PATH =
  process.env.GAMMA_REDIRECT_PATH ?? "/api/auth/callback";

export const GAMMA_REDIRECT_URI =
  process.env.GAMMA_REDIRECT_URI ?? `${URL_FRONTEND}${GAMMA_REDIRECT_PATH}`;

export const GAMMA_CLIENT_ID = process.env.GAMMA_CLIENT_ID ?? "plupp";

export const GAMMA_CLIENT_SECRET = process.env.GAMMA_CLIENT_SECRET ?? "plupp";
