import { useTheme } from "next-themes";
import { AppProps } from "next/app";

import { Adsense } from "@ctrl/react-adsense";

import FixedAds from "./ads/styled-square-responsive-ad";
import StyledFooter from "./library/styled-footer";
import StyledNavTop from "./nav/styled-nav-top";

export function PageLayout({ Component, pageProps }: AppProps) {
  const { theme } = useTheme();

  return (
    <>
      <div
        className={
          "text-content-base bg-center min-w-fit  " +
          (theme === "Original"
            ? "bg-[url('/assets/common/witch.jpg')]"
            : "bg-[url('/assets/common/witch.jpg')]")
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
