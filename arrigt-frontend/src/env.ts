export default process.env;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      URL_BACKEND: string;
      GRAPHQL_ENDPOINT: string;
    }
  }
}

export const URL_BACKEND = process.env.URL_BACKEND ?? "http://localhost:3001";
export const GRAPHQL_ENDPOINT =
  process.env.GRAPHQL_ENDPOINT ?? `${URL_BACKEND}/graphql`;
