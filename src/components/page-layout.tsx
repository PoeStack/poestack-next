import { AppProps } from "next/app";
import Link from "next/link";

import FixedAds from "./ads/styled-square-responsive-ad";
import StyledFooter from "./library/styled-footer";
import StyledNavTop from "./nav/styled-nav-top";

export function PageLayout({ Component, pageProps }: AppProps) {
  return (
    <>
      <div
        className={
          "text-content-base bg-contain min-w-fit bg-[url('/assets/common/witch.png')]"
        }
      >
        <FixedAds />
        <div className="flex flex-col backdrop-brightness-[25%]">
          <div className="flex w-full">
            <div className="flex flex-col w-full">
              <StyledNavTop />
              <div className="flex w-full">
                <div className="basis-[15%] min-w-[180px]"></div>
                <div className="flex-1 flex flex-col pb-[150px] min-h-screen pt-4">
                  <div className="text-center pb-4">
                    Congratulations to{" "}
                    <Link
                      className="text-content-accent font-bold"
                      href={"https://www.twitch.tv/playlifee"}
                    >
                      twitch.tv/playlifee
                    </Link>{" "}
                    for winning the SSFHC Ruthless race!
                  </div>
                  <Component {...pageProps} />
                </div>
                <div className="basis-[15%] min-w-[180px]"></div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <StyledFooter />
          </div>
        </div>
      </div>
    </>
  );
}
