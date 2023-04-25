/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";

import { NextRequest } from "next/server";
import client from "poe-stack-apollo-client";
import { gql } from "@apollo/client";
import { StashViewStashSummary } from "@generated/graphql";
import { StashViewUtil } from "@utils/stash-view-util";
import { GeneralUtils } from "@utils/general-util";
import { StashViewSettings } from "@contexts/stash-view-context";

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
      query StashExportSearchSummary($search: StashViewStashSummarySearch!) {
        stashViewStashSummary(search: $search) {
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
            itemId
            userId
            league
            stashId
            x
            y
            quantity
            searchableString
            itemGroupHashString
            itemGroupTag
            valueChaos
            totalValueChaos
            icon
          }
        }
      }
    `,
    fetchPolicy: "no-cache",
    variables: {
      search: {
        league: stashViewSettings.league!,
        opaqueKey: searchParams.get("opaqueKey"),
        execludeNonItemGroups: true,
      },
    },
  });

  const stashSummary: StashViewStashSummary = d.data.stashViewStashSummary;
  const items = StashViewUtil.searchItems(stashViewSettings, stashSummary)
    .filter((e) => !!e.itemGroupHashString)
    .sort(
      (a, b) =>
        StashViewUtil.itemStackTotalValue(stashViewSettings, b) -
        StashViewUtil.itemStackTotalValue(stashViewSettings, a)
    );

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
                    {igs.quantity}x{" "}
                    {GeneralUtils.capitalize(igs.searchableString)} @{" "}
                    {GeneralUtils.roundToFirstNoneZeroN(
                      StashViewUtil.itemValue(stashViewSettings, igs)
                    )}
                    c
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
