import { AppProps } from "next/app";
import Link from "next/link";

import { usePoeStackAuth } from "@contexts/user-context";

import FixedAds from "./ads/styled-square-responsive-ad";
import StyledFooter from "./library/styled-footer";
import StyledNavTop from "./nav/styled-nav-top";
import UserActivityGuard from "./user-activity-guard";

export function PageLayout({ Component, pageProps }: AppProps) {
  const { profile } = usePoeStackAuth();

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
                  {!profile?.patreonTier && (
                    <div className="text-center pb-4">
                      PoeStack is paid for by ads and through Patreon. Checkout
                      out{" "}
                      <Link
                        className="text-content-accent font-bold"
                        href={"/support"}
                      >
                        poestack.com/support
                      </Link>{" "}
                      to remove ads and get some fun bonuses!
                    </div>
                  )}
                  <UserActivityGuard>
                    <Component {...pageProps} />
                  </UserActivityGuard>
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
