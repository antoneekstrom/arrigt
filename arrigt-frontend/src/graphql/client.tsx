import { PropsWithChildren } from "react";
import { createClient, Provider } from "urql";

export const client = createClient({
  url: "http://localhost:3001/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

export const ClientProvider = ({ children }: PropsWithChildren<unknown>) => (
  <Provider value={client}>{children}</Provider>
);
