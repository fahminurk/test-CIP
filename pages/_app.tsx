import type { AppProps } from "next/app";
import "@/pages/globals.css";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
