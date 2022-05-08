import { GRAPHQL_PATH } from "../env";
import { createSchema } from "../schema";
import { useCors } from "./cors";
import { useGraphQL } from "./graphql";
import { CreateAppResult } from "./start";

export async function configureApp({ app, httpServer }: CreateAppResult) {
  useCors(app);
  await useGraphQL({
    app,
    httpServer,
    schema: await createSchema(),
    endpoint: GRAPHQL_PATH,
  });
}
