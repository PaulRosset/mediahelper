import { Fragment, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import { Menu } from "../components/Menu";

import "../styles/main.css";
import "../styles/pages.css";
import "../styles/widgets.css";
import "../styles/decryption.css";
import "../styles/isobmff.css";
import "../styles/manifest.css";
import "../styles/samples.css";

import Sidebar from "../components/Sidebar";
import { EnvDetection } from "../components/EnvDetection";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // Only for less than 767px width
  const [isSidebarOpen, setSideBarOpen] = useState(false);

  const onSidebarBtnClicked = (_: unknown) => {
    setSideBarOpen((prevState) => !prevState);
  };

  return (
    <Fragment>
      <Head>
        <meta charSet="UTF-8" />
        <title>Media Helper</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="Media Helper - Media Debugging Tools" />
        <meta
          name="description"
          content="This website is a tool that expose a bunch of different browser APIs and hand made tools related to Media playback capabilities in the browser."
        />
        <meta name="keywords" content="media, bits, video, streaming" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="body">
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div
          className={isSidebarOpen ? "content contentSideBarOpen" : "content"}
        >
          <Menu onClick={onSidebarBtnClicked} />
          {router.route !== "/" ? <EnvDetection /> : null}
          <Component {...pageProps} />
        </div>
      </div>
    </Fragment>
  );
}

export default MyApp;
