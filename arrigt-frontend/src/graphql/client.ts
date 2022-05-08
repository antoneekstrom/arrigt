import {
  createClient as createUrqlClient,
  dedupExchange,
  defaultExchanges,
  fetchExchange,
  subscriptionExchange,
} from "urql";
import {
  createClient as createWebSocketClient,
  Client as WebSocketClient,
} from "graphql-ws";
import { GRAPHQL_ENDPOINT } from "../env";
import { cacheExchange } from "@urql/exchange-graphcache";

export const client = createClient();

function createClient() {
  const webSocketClient =
    typeof window !== "undefined"
      ? createWebSocketClient({
          url: GRAPHQL_ENDPOINT.replace(/^http/, "ws"),
        })
      : undefined;

  const exchanges = [dedupExchange, cacheExchange({}), fetchExchange];

  if (webSocketClient) {
    exchanges.push(createSubscriptionExchange(webSocketClient));
  }

  return createUrqlClient({
    url: GRAPHQL_ENDPOINT,
    fetchOptions: {
      credentials: "include",
    },
    exchanges,
  });
}

function createSubscriptionExchange(webSocketClient: WebSocketClient) {
  return subscriptionExchange({
    forwardSubscription: (operation) => ({
      subscribe: (sink) => ({
        unsubscribe: webSocketClient.subscribe(operation, sink),
      }),
    }),
  });
}
