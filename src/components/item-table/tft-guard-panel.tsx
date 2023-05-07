import { useRouter } from "next/router";
import { useState } from "react";

import { TftOneClickInstructions } from "@components/tft-one-click-instructions";

import { usePoeStackAuth } from "../../contexts/user-context";
import StyledButton from "../library/styled-button";

export default function TftGuardPanel({
  disableInstructions = false,
  children,
}: {
  disableInstructions?: boolean;
  children: any;
}) {
  const router = useRouter();

  const { profile, tftMember, refetchMyProfile } = usePoeStackAuth();

  const poeAccountConnected = !!profile?.poeProfileName;
  const discordAccountId = profile?.discordUserId;

  if (!poeAccountConnected || !discordAccountId || !tftMember) {
    return (
      <>
        <div className="flex flex-col place-items-center">
          <div className="mb-2">
            Complete the following to use the bulk-selling tool:
          </div>
          <div className="flex flex-row space-x-2">
            <div className="flex flex-row place-items-center">
              <div
                className={
                  "flex w-2.5 h-2.5 rounded-full mr-1.5 flex-shrink-0 " +
                  (poeAccountConnected ? "bg-green-600" : "bg-red-600")
                }
              ></div>
              <div>POE Account Connected</div>
            </div>
            {!poeAccountConnected && (
              <>
                <div
                  className="text-content-accent cursor-pointer"
                  onClick={() => {
                    localStorage.setItem("variable-redirect", router.asPath);
                    router.push(
                      "https://www.pathofexile.com/oauth/authorize?client_id=poestack&response_type=code&scope=account:profile account:stashes account:characters account:league_accounts&state=closeafter&redirect_uri=https://poestack.com/ggg/connected&prompt=consent"
                    );
                  }}
                >
                  Connect
                </div>
              </>
            )}
          </div>
          <div className="flex flex-row place-items-center space-x-2">
            <div className="flex flex-row place-items-center">
              <div
                className={
                  "flex w-2.5 h-2.5 rounded-full mr-1.5 flex-shrink-0 " +
                  (discordAccountId ? "bg-green-600" : "bg-red-600")
                }
              ></div>
              <div>
                Discord Account Connected
                {!!discordAccountId &&
                  ` (${profile?.discordUsername} ${discordAccountId})`}
              </div>
            </div>
            {poeAccountConnected && (
              <>
                <div
                  className="text-content-accent cursor-pointer"
                  onClick={() => {
                    localStorage.setItem("variable-redirect", router.asPath);
                    router.push(
                      "https://discord.com/api/oauth2/authorize?client_id=1075074940275019836&redirect_uri=https%3A%2F%2Fpoestack.com%2Fdiscord%2Fconnected&response_type=code&scope=identify"
                    );
                  }}
                >
                  {discordAccountId ? "Reconnect" : "Connect"}
                </div>
              </>
            )}
          </div>
          {!!discordAccountId && (
            <div className="flex flex-row place-items-center space-x-2">
              <div className="flex flex-row place-items-center">
                <div
                  className={
                    "flex w-2.5 h-2.5 rounded-full mr-1.5 flex-shrink-0 " +
                    (tftMember ? "bg-green-600" : "bg-red-600")
                  }
                ></div>
                <div>TFT Member</div>
              </div>
              {!tftMember && (
                <>
                  <div
                    className="text-content-accent cursor-pointer"
                    onClick={() => {
                      window.open(
                        "https://discord.com/invite/tftrove",
                        "_ blank"
                      );
                    }}
                  >
                    Join Now
                  </div>
                </>
              )}
            </div>
          )}
          <div className="mt-2">
            <StyledButton
              text={"Refresh"}
              onClick={() => {
                refetchMyProfile({ forcePull: true });
              }}
            />
          </div>

          {!disableInstructions && <TftOneClickInstructions />}
        </div>
      </>
    );
  }

  return <>{children}</>;
}
