import type { AppProps } from "next/app";
import Head from "next/head";
import "../tailwind.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>App</title>
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
