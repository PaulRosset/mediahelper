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
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
            for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
            MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
            mixpanel.init("2008e51a7a5ed938f1139a54ff0062a8", {"api_host": "https://api-eu.mixpanel.com", batch_requests: true})
              `,
          }}
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
