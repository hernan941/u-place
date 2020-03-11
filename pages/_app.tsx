import App from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import 'react-html5-camera-photo/build/css/index.css';


import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";

import { Auth } from "../src/client/components/Auth/Context";
import Navigation from "../src/client/components/Navigation";

import WindowDimensionsProvider from '../src/client/components/WindowDimensions/context';

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider
        theme={{
          ...theme,
        }}
      >
        <CSSReset />
        <WindowDimensionsProvider>
          <Auth>
            <Navigation />
            <Component {...pageProps} />
          </Auth>
        </WindowDimensionsProvider>
      </ThemeProvider>
    );
  }
}
