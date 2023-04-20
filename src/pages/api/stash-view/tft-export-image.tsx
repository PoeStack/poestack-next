/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";

import { NextRequest } from "next/server";
import client from "poe-stack-apollo-client";
import { gql } from "@apollo/client";
import { StashViewSettings } from "pages/poe/stash-view";
import { StashViewStashSummary } from "@generated/graphql";
import { StashViewUtil } from "@utils/stash-view-util";

export const config = {
  runtime: "experimental-edge",
};

export default async function TftExportImage(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const stashViewSettings: StashViewSettings = JSON.parse(
    searchParams.get("input")!
  );

  const d: any = await client.query({
    query: gql`
      query StashViewStashSummary($league: String!) {
        stashViewStashSummary(league: $league) {
          itemGroups {
            hashString
            key
            tag
            properties
            baseType
            icon
            inventoryMaxStackSize
            displayName
            createdAtTimestamp
          }
          items {
            stashId
            x
            y
            itemGroupHashString
            itemGroupTag
            quantity
            searchableString
            valueChaos
            totalValueChaos
            icon
          }
        }
      }
    `,
    variables: {
      league: stashViewSettings.league!,
    },
  });
  const stashSummary: StashViewStashSummary = d.stashViewStashSummary;
  const items = StashViewUtil.searchItems(stashViewSettings, stashSummary);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <div tw="flex flex-col text-white">
          <div tw="min-h-5 pl-2 flex flex-row pt-3">PoeStack Bulk Export</div>
          <div tw="flex flex-col flex-wrap h-[95%] pt-3">
            {items?.map((igs, i) => (
              <>
                <div tw="flex flex-row">
                  <img width="25" height="25" src={igs.icon!} alt="x" />
                  <div tw="flex flex-row">
                    {igs.quantity}x {igs.searchableString} @{" "}
                    {StashViewUtil.itemValue(stashViewSettings, igs)}c
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 900,
      height:
        100 +
        (d?.data?.exportStashSnapshot?.itemGroupSummaries?.length / 2) * 25,
    }
  );
}
