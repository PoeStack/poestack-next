import { ApolloProvider } from "@apollo/client";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import client from "poe-stack-apollo-client";
import { CookiesProvider } from "react-cookie";
import {
  PoeStackAuthProvider,
  usePoeStackAuth,
} from "../contexts/user-context";
import GggAuthBtn from "@components/ggg-auth-btn";

import Script from "next/script";
import StyledNavBar from "@components/styled-nav-bar";
import Head from "next/head";
import { PoeStackLeagueProvider } from "../contexts/league-context";
import { ThemeProvider } from "next-themes";
import StyledFooter from "@components/styled-footer";


declare global {
  interface Array<T> {
    sortByMultiple<T>(
      this: Array<T>,
      ...keys: { key: keyof T; order?: "asc" | "desc" }[]
    ): this;
  }
}
interface Array<T> {
  sortByMultiple<T>(
    this: Array<T>,
    ...keys: { key: keyof T; order?: "asc" | "desc" }[]
  ): this;
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
              <Head>
                <title>PoeStack</title>
              </Head>
              <div className="w-full h-full overflow-auto bg-surface-secondary text-content-base">
                <div className="flex flex-col w-full h-full min-h-screen ">
                  <StyledNavBar />
                  <Component {...pageProps} />
                  {/* Footer */}
                  <StyledFooter />
                </div>
              </div>
            </PoeStackLeagueProvider>
          </PoeStackAuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    </CookiesProvider>
  );
}
