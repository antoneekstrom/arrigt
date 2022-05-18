import {
  GAMMA_CLIENT_ID,
  GAMMA_CLIENT_SECRET,
  GAMMA_REDIRECT_PATH,
  GAMMA_REDIRECT_URI,
  GRAPHQL_PATH,
  URL_FRONTEND,
} from "../env";
import { createSchema } from "../schema";
import { useCors } from "./cors";
import { useGraphQL } from "./graphql";
import { CreateAppResult } from "./start";
import { configureGammaAuth } from "../gamma-auth";

export async function configureApp({ app, httpServer }: CreateAppResult) {
  useCors(app);
  configureGammaAuth(app, {
    redirectUrl: GAMMA_REDIRECT_URI,
    redirectPath: GAMMA_REDIRECT_PATH,
    clientId: GAMMA_CLIENT_ID,
    clientSecret: GAMMA_CLIENT_SECRET,
    clientHost: URL_FRONTEND,
    gammaUrl: "http://localhost:8081",
    gammaLocalUrl: "http://gamma-backend:3000",
  });
  await useGraphQL({
    app,
    httpServer,
    schema: await createSchema(),
    endpoint: GRAPHQL_PATH,
  });
}
