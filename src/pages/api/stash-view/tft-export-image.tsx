/* eslint-disable @next/next/no-img-element */
import client from "poe-stack-apollo-client";

import { gql } from "@apollo/client";
import { StashViewSettings } from "@contexts/stash-view-context";
import { StashViewStashSummary } from "@generated/graphql";
import { GeneralUtils } from "@utils/general-util";
import { StashViewUtil } from "@utils/stash-view-util";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default async function TftExportImage(req) {
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
  const items = StashViewUtil.reduceItemStacks(
    StashViewUtil.searchItems(stashViewSettings, stashSummary)
  )
    .filter((e) => !!e.itemGroupHashString)
    .sort(
      (a, b) =>
        StashViewUtil.itemStackTotalValue(stashViewSettings, b) -
        StashViewUtil.itemStackTotalValue(stashViewSettings, a)
    );

  const cols = Math.ceil(items.length / 15);

  function cleanText(e: string): string {
    return e.replaceAll(" Scarab", "").replaceAll("Essence Of ", "");
  }

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
        <div tw="flex flex-col h-full text-white">
          <div tw="flex flex-row">PoeStack Bulk Export</div>
          <div tw="flex flex-1 flex-col flex-wrap">
            {items?.map((igs, i) => (
              <>
                <div key={i} tw="flex flex-row pr-2">
                  <img width="25" height="25" src={igs.icon!} alt="x" />
                  <div tw="flex flex-row">
                    x{igs.quantity}{" "}
                    {cleanText(GeneralUtils.capitalize(igs.searchableString)!)}{" "}
                    {GeneralUtils.roundToFirstNoneZeroN(
                      StashViewUtil.itemValue(stashViewSettings, igs)
                    )}
                    c each
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: cols * 320,
      height: 500,
    }
  );
}
