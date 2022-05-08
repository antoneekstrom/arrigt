import {
  createClient as createUrqlClient,
  defaultExchanges,
  subscriptionExchange,
} from "urql";
import {
  createClient as createWebSocketClient,
  Client as WebSocketClient,
} from "graphql-ws";
import { GRAPHQL_ENDPOINT } from "../env";

export const client = createClient();

function createClient() {
  const webSocketClient =
    typeof window !== "undefined"
      ? createWebSocketClient({
          url: "ws://localhost:3001/graphql",
        })
      : undefined;

  const exchanges = [...defaultExchanges];

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
