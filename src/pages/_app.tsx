import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import client from "poe-stack-apollo-client";
import { CookiesProvider } from "react-cookie";

import { ApolloProvider } from "@apollo/client";
import StyledHorizontalBannerAd from "@components/ads/styled-horizontal-banner-ad";
import StyledHorizontalResponsiveAd from "@components/ads/styled-horizontal-responsive-ad";
import StyledSquareResponsiveAd from "@components/ads/styled-square-responsive-ad";
import StyledVerticalBannerAd from "@components/ads/styled-vertical-banner-ad";
import StyledFooter from "@components/library/styled-footer";
import StyledNavBar from "@components/library/styled-nav-bar";
import StyledNavTop from "@components/nav/styled-nav-top";
import { PoeStackOptionsProvider } from "@contexts/options-context";

import { PoeStackLeagueProvider } from "../contexts/league-context";
import { PoeStackAuthProvider } from "../contexts/user-context";
import "../styles/globals.css";

declare global {
  interface Array<T> {
    sortByMultiple<T>(
      this: Array<T>,
      ...keys: { key: keyof T; order?: "asc" | "desc" }[]
    ): this;
  }
}

Array.prototype.sortByMultiple = function sortByMultiple<T>(
  this: [],
  ...keys: { key: keyof T; order?: "asc" | "desc" }[]
) {
  return [...keys].reverse().reduce(
    (curr, key) =>
      //@ts-ignore
      curr.sort((a: any, b: any) =>
        key.order === "asc"
          ? a[key.key] < b[key.key]
            ? -1
            : a[key.key] == b[key.key]
            ? 0
            : 1
          : a[key.key] > b[key.key]
          ? -1
          : a[key.key] == b[key.key]
          ? 0
          : 1
      ),
    this
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <ApolloProvider client={client}>
        <PoeStackOptionsProvider>
          <ThemeProvider>
            <PoeStackAuthProvider>
              <PoeStackLeagueProvider>
                <Script
                  strategy="afterInteractive"
                  src="https://www.googletagmanager.com/gtag/js?id=G-V6G8CPK4ZY"
                />
                <Script
                  id="google-analytics"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-V6G8CPK4ZY', {
                page_path: window.location.pathname,
              });`,
                  }}
                />
                <Script
                  strategy="afterInteractive"
                  crossOrigin="anonymous"
                  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1917075558725173"
                />
                <Head>
                  <title>PoeStack</title>
                </Head>

                <div className="text-content-base bg-color-primary min-h-screen min-w-fit">
                  <div className="flex flex-col bg-color-primary">
                    <div className="flex w-full">
                      <div className="min-h-full">
                        <StyledNavBar />
                      </div>
                      <div className="flex flex-col w-full">
                        <StyledNavTop />
                        <div className="flex w-full">
                          <div className="basis-[15%] justify-center">
                            {/* <StyledVerticalBannerAd /> */}
                          </div>
                          <div className="flex-1 flex flex-col pb-[150px]">
                            <div className="flex w-full pt-4 justify-center"></div>
                            <Component {...pageProps} />
                          </div>
                          <div className="basis-[15%]">
                            {/* <StyledVerticalBannerAd /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <StyledFooter />
                    </div>
                  </div>
                </div>
              </PoeStackLeagueProvider>
            </PoeStackAuthProvider>
          </ThemeProvider>
        </PoeStackOptionsProvider>
      </ApolloProvider>
    </CookiesProvider>
  );
}
