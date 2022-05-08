// Import tailwind styles for the application
import "../tailwind.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Page from "../src/components/Page";
import { ClientProvider } from "../src/graphql/ClientProvider";
import { URL_BACKEND } from "../src/env";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClientProvider>
      <Head>
        <title>arrIgT</title>
        <link rel="icon" href="favicon.svg" />
        <link rel="preconnect" href={URL_BACKEND} />
      </Head>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ClientProvider>
  );
}
