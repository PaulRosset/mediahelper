import { Fragment } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import "../styles/main.css";
import "../styles/pages.css";
import "../styles/widgets.css";
import "../styles/decryption.css";

import Sidebar from "../components/Sidebar";
import { EnvDetection } from "../components/EnvDetection";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <Fragment>
      <Head>
        <title>The Cyber Swiss Media Knife</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="body">
        <Sidebar />

        <div className="content">
          {router.route !== "/" ? <EnvDetection /> : null}
          <Component {...pageProps} />
        </div>
      </div>
    </Fragment>
  );
}

export default MyApp;
