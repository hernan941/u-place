import "react-html5-camera-photo/build/css/index.css";

import App from "next/app";
import Router from "next/router";
import NProgress from "nprogress";

import { CSSReset, theme, ThemeProvider } from "@chakra-ui/core";

import { Auth } from "../src/client/components/Auth/Context";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider
        theme={{
          ...theme
        }}
      >
        <CSSReset />
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </ThemeProvider>
    );
  }
}
