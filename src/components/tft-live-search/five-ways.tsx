import moment from "moment";
import Image from "next/image";
import { useState } from "react";

import { gql, useQuery } from "@apollo/client";
import { DIV_ICON } from "@components/currency-value-display";
import StyledButton from "@components/library/styled-button";
import StyledCard from "@components/library/styled-card";
import StyledMultiSelect2 from "@components/library/styled-multi-select-2";
import { StyledTooltip } from "@components/library/styled-tooltip";
import { useTftLiveSearchCtx } from "@contexts/tft-live-search-context";
import { TftLiveListing } from "@generated/graphql";
import { GeneralUtils } from "@utils/general-util";

export default function TftLiveSearcgFiveWays() {
  const { tftLiveSearchSettings, setTftLiveSearchSettings } =
    useTftLiveSearchCtx();

  const [searchSettings, setSearchSettings] = useState<{
    selectedRegion: string[];
  }>({ selectedRegion: ["NA", "EU", "KR", "RU", "SG", "JP"] });

  const [listings, setListings] = useState<TftLiveListing[] | null>(null);
  useQuery(
    gql`
      query TftLiveListings {
        tftLiveListings {
          channelId
          messageId
          userDiscordId
          userDiscordName
          userDiscordDisplayRole
          userDiscordDisplayRoleColor
          userDiscordHighestRole
          updatedAtTimestamp
          delistedAtTimestamp
          tag
          body
          properties
        }
      }
    `,
    {
      pollInterval: 1000,
      onCompleted(data) {
        setListings(data.tftLiveListings);
      },
    }
  );

  return (
    <>
      <div className="flex flex-col space-y-2">
        {!tftLiveSearchSettings.disclaimerClosed && (
          <StyledCard>
            <div>
              <div>
                ⚠️ We&apos;re here to prevent you from being scammed. Maybe you
                noticed, there are a lot of scams in 5 ways and rotations. ⚠️
              </div>
              <div>
                - Check the name of the person you want to join the group of.
              </div>
              <div>
                - Before trading, check in the party if there are no low-level
                players.
              </div>
              <div>- Only trade the host. Double check their name.</div>
              <div>
                From now on, as a client, you may be held responsible if you
                don&apos;t check who you&apos;re trading with repeatedly.
              </div>

              <StyledButton
                text={"Accept and Close"}
                onClick={() => {
                  setTftLiveSearchSettings({
                    ...tftLiveSearchSettings,
                    disclaimerClosed: true,
                  });
                }}
              ></StyledButton>
            </div>
          </StyledCard>
        )}

        <StyledCard className="space-y-2">
          <StyledButton
            text={
              tftLiveSearchSettings.messageHistoryOpen
                ? "Listings"
                : "Message History"
            }
            onClick={() => {
              setTftLiveSearchSettings({
                ...tftLiveSearchSettings,
                messageHistoryOpen: !tftLiveSearchSettings.messageHistoryOpen,
              });
            }}
          />
          <StyledMultiSelect2
            selected={searchSettings.selectedRegion}
            items={["NA", "EU", "KR", "RU", "SG", "JP"]}
            onSelectChange={(e) => {
              setSearchSettings({ ...searchSettings, selectedRegion: e });
            }}
          />
        </StyledCard>
        <div className="grid grid-cols-3 gap-2">
          {listings
            ?.filter((listing) =>
              listing.properties.regions?.some((r) =>
                searchSettings.selectedRegion.includes(r?.toUpperCase())
              )
            )
            ?.map((listing) => (
              <>
                <>
                  <StyledCard className="w-full">
                    <div className="flex flex-col space-y-2">
                      <div className="flex space-x-1">
                        <StyledTooltip
                          texts={[
                            listing.userDiscordDisplayRole ??
                              listing.userDiscordHighestRole ??
                              "None",
                          ]}
                          placement={"auto"}
                        >
                          <div className="flex space-x-1">
                            {!!listing.userDiscordDisplayRole && (
                              <Image
                                height={25}
                                width={25}
                                src={`/assets/tft/roles/${listing.userDiscordDisplayRole}.png`}
                                alt={""}
                              />
                            )}
                            <div
                              style={{
                                color:
                                  listing.userDiscordDisplayRoleColor ??
                                  "#f1f1f1",
                              }}
                              className="text-lg"
                            >
                              {listing.userDiscordName?.replaceAll(
                                /[^a-zA-Z0-9 ]/g,
                                ""
                              )}
                            </div>
                          </div>
                        </StyledTooltip>
                        <div className="flex-1"></div>
                        <div className="text-sm">
                          {moment(listing.updatedAtTimestamp)
                            .subtract(10, "seconds")
                            .fromNow()}
                        </div>
                      </div>

                      <div className="flex items-baseline space-x-1 text-sm">
                        <div className="flex space-x-1">
                          {listing.properties.priceDiv}
                          <Image
                            height={20}
                            width={20}
                            src={DIV_ICON}
                            alt={""}
                          />
                          / {listing.properties.runs} Runs
                        </div>
                        <div>
                          (
                          {GeneralUtils.roundToFirstNoneZeroN(
                            listing.properties.priceDiv /
                              listing.properties.runs
                          )}{" "}
                          Per Run)
                        </div>
                        <div className="flex-1"></div>
                        <div className="flex items-baseline space-x-1 text-sm">
                          {listing.properties.regions
                            .map((e) => e.toUpperCase())
                            .join(", ")}
                        </div>
                      </div>

                      <div className="flex items-baseline space-x-1 text-sm">
                        {listing.properties.guarantee
                          ?.replaceAll(/<[^>]*/g, "")
                          .replaceAll("|", "")}
                      </div>

                      <div className="flex items-baseline space-x-1 text-sm">
                        <div className="flex">
                          {listing.properties.currentClients}/
                          {listing.properties.maxClients} Clients
                        </div>
                        <div className="flex">
                          {listing.properties.currentResetters}/
                          {listing.properties.maxResetters} Resetters
                        </div>
                        <div className="flex">
                          {listing.properties.currentAurabots}/
                          {listing.properties.maxAurabots} Aurabots
                        </div>
                      </div>

                      <div className="flex items-baseline space-x-1 text-sm">
                        <div
                          className="bg-color-secondary p-1 rounded-lg cursor-pointer"
                          onClick={() => {
                            setTftLiveSearchSettings({
                              ...tftLiveSearchSettings,
                              messageHistory: [
                                ...tftLiveSearchSettings.messageHistory,
                                {
                                  messageId: listing.messageId,
                                  userDiscordId: listing.userDiscordId,
                                  userDiscordName: listing.userDiscordName,
                                  userIgn: listing.properties.ign,
                                  messageBody: listing.body,
                                },
                              ],
                            });
                            navigator.clipboard.writeText(
                              `@${listing.properties.ign} Hey I'd like to join your 5 way as Client, ${listing.properties.priceDiv} div for ${listing.properties.runs} runs.`
                            );
                          }}
                        >
                          {tftLiveSearchSettings.messageHistory.find(
                            (e) => e.messageId === listing.messageId
                          )
                            ? "Copied"
                            : "Copy Whisper"}
                        </div>
                      </div>
                    </div>
                  </StyledCard>
                </>
              </>
            ))}
        </div>
      </div>
    </>
  );
}
