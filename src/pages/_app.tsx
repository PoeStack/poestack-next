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
              <div className="w-full h-full overflow-hidden bg-surface-secondary text-content-base">
                <div className="flex flex-col w-full h-full min-h-screen ">
                  <StyledNavBar />
                  <div className="flex pt-4 space-x-2 grow">
                    <div className="lg:basis-1/12"></div>
                    <div className="grow lg:basis-5/6">
                      <Component {...pageProps} />
                    </div>
                    <div className="lg:basis-1/12"></div>
                  </div>
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
