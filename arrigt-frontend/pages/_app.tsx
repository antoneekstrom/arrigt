import type { AppProps } from "next/app";
import Head from "next/head";
import Page from "../src/components/Page";
import { ClientProvider } from "../src/graphql/client";
import "../tailwind.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClientProvider>
      <Head>
        <title>App</title>
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ClientProvider>
  );
}
