import { useState } from "react";
import { usePoeStackAuth } from "../../contexts/user-context";
import StyledButton from "../styled-button";

export default function TftGuardPanel({ children }) {
  const { profile, tftMember, refetchMyProfile } = usePoeStackAuth();

  const poeAccountConnected = !!profile?.poeProfileName;
  const discordAccountConnected = !!profile?.discordUserId;

  if (!poeAccountConnected || !discordAccountConnected || !tftMember) {
    return (
      <>
        <div className="flex flex-col place-content-center place-items-center ">
          <div className="flex flex-row place-content-center place-items-center  space-x-2">
            <div className="flex flex-row place-content-center place-items-center">
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
                  className="text-amber-300"
                  onClick={() => {
                    window.open(
                      "https://www.pathofexile.com/oauth/authorize?client_id=poestack&response_type=code&scope=account:profile account:stashes account:characters account:league_accounts&state=closeafter&redirect_uri=https://poestack.com/ggg/connected&prompt=consent",
                      "_ blank"
                    );
                  }}
                >
                  Connect
                </div>
              </>
            )}
          </div>
          <div className="flex flex-row place-content-center place-items-center space-x-2">
            <div className="flex flex-row place-content-center place-items-center">
              <div
                className={
                  "flex w-2.5 h-2.5 rounded-full mr-1.5 flex-shrink-0 " +
                  (discordAccountConnected ? "bg-green-600" : "bg-red-600")
                }
              ></div>
              <div>Discord Account Connected</div>
            </div>
            {!discordAccountConnected && (
              <>
                <div
                  className="text-amber-300"
                  onClick={() => {
                    window.open(
                      "https://discord.com/api/oauth2/authorize?client_id=1075074940275019836&redirect_uri=https%3A%2F%2Fpoestack.com%2Fdiscord%2Fconnected&response_type=code&scope=identify",
                      "_ blank"
                    );
                  }}
                >
                  Connect
                </div>
              </>
            )}
          </div>
          <div className="flex flex-row place-content-center place-items-center space-x-2">
            <div className="flex flex-row place-content-center place-items-center">
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
                  className="text-amber-300"
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
          <div>
            <StyledButton
              text={"Refresh"}
              onClick={() => {
                refetchMyProfile();
              }}
            />
          </div>
        </div>
      </>
    );
  }

  return <>{children}</>;
}
