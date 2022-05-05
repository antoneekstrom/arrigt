import type { AppProps } from "next/app";
import Head from "next/head";
import Page from "../src/components/Page";
import { ClientProvider } from "../src/graphql/client";
import "../tailwind.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClientProvider>
      <Head>
        <title>Kursenkätsfika - arrIgT</title>
        <link rel="icon" href="favicon.svg" />
        <link rel="preconnect" href="http://localhost:3001" />
      </Head>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ClientProvider>
  );
}
