import { Provider } from "urql";
import { PropsWithChildren } from "react";
import { client } from "./client";

export const ClientProvider = ({ children }: PropsWithChildren<unknown>) => (
  <Provider value={client}>{children}</Provider>
);
