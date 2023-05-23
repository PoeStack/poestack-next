import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import client from "poe-stack-apollo-client";
import { CookiesProvider } from "react-cookie";

import { ApolloProvider } from "@apollo/client";
import { PageLayout } from "@components/page-layout";
import { CurrencyConversionProvider } from "@contexts/currency-conversion-context";
import { PoeStackOptionsProvider } from "@contexts/options-context";
import { StashViewTabProvider } from "@contexts/stash-view-tabs-context";

import { PoeStackLeagueProvider } from "../contexts/league-context";
import { PoeStackAuthProvider } from "../contexts/user-context";
import "../styles/globals.css";

export default function App(appProps: AppProps) {
  return (
    <CookiesProvider>
      <ApolloProvider client={client}>
        <PoeStackOptionsProvider>
          <ThemeProvider>
            <PoeStackAuthProvider>
              <PoeStackLeagueProvider>
                <CurrencyConversionProvider>
                  <StashViewTabProvider>
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

                    <PageLayout {...appProps} />
                  </StashViewTabProvider>
                </CurrencyConversionProvider>
              </PoeStackLeagueProvider>
            </PoeStackAuthProvider>
          </ThemeProvider>
        </PoeStackOptionsProvider>
      </ApolloProvider>
    </CookiesProvider>
  );
}
