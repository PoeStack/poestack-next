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
import Link from "next/link";
import Script from "next/script";
import StyledNavBar from "@components/styled-nav-bar";
import Head from "next/head";
import { PoeStackLeagueProvider } from "@contexts/league-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <ApolloProvider client={client}>
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
            <div className=" bg-skin-tertiary text-skin-base w-full h-full">
              <div className="flex flex-col w-full h-full min-h-screen overflow-x-auto">
                <StyledNavBar />
                <div className="flex grow space-x-2 pt-4">
                  <div className="lg:basis-1/12"></div>
                  <div className="grow lg:basis-5/6">
                    <Component {...pageProps} />
                  </div>
                  <div className="lg:basis-1/12"></div>
                </div>
                <div className="flex flex-row space-x-3">
                  <div>
                    <h3>
                      This product isn&apos;t affiliated with or endorsed by
                      Grinding Gear Games in any way.
                    </h3>
                  </div>
                  <div>
                    <Link
                      href={
                        "https://www.privacypolicygenerator.info/live.php?token=6cH1lbmNbc4oU9ntPGezJpm0jjoAAFl1"
                      }
                    >
                      Privacy Policy
                    </Link>
                  </div>
                  <div>
                    <Link
                      href={
                        "https://www.termsandconditionsgenerator.com/live.php?token=iHhICDjDy7nTvREruFufuv1pCsMHdJ5j"
                      }
                    >
                      Terms of Service
                    </Link>
                  </div>
                  <div>Copyright ©2023 PoeStack.com Owner</div>
                </div>
              </div>
            </div>
          </PoeStackLeagueProvider>
        </PoeStackAuthProvider>
      </ApolloProvider>
    </CookiesProvider>
  );
}
