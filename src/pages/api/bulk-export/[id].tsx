/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";

import { NextRequest } from "next/server";
import client from "poe-stack-apollo-client";
import { gql } from "@apollo/client";
import { GeneralUtils } from "@utils/general-util";

export const config = {
  runtime: "experimental-edge",
};

export default async function BulkExportImage(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const d = await client.mutate({
    mutation: gql`
      mutation ExportStashSnapshot($input: StashSnapshotExportInput!) {
        exportStashSnapshot(input: $input) {
          itemGroupSummaries {
            quantity
            valueChaos
            itemGroup {
              displayName
              key
              icon
            }
          }
          totalValueChaos
          divineChaosValue
        }
      }
    `,
    variables: {
      input: JSON.parse(searchParams.get("input")!),
    },
  });

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
          <div tw="min-h-5 pl-2 flex flex-row pt-3">
            PoeStack Bulk Export - Asking price{" "}
            {GeneralUtils.roundToFirstNoneZeroN(
              d?.data?.exportStashSnapshot.totalValueChaos
            )}
            c or{" "}
            {GeneralUtils.roundToFirstNoneZeroN(
              d?.data?.exportStashSnapshot.totalValueChaos /
                d?.data?.exportStashSnapshot.divineChaosValue
            )}{" "}
            div
          </div>
          <div tw="flex flex-col flex-wrap h-[95%] pt-3">
            {d?.data?.exportStashSnapshot?.itemGroupSummaries?.map((igs, i) => (
              <>
                <div tw="flex flex-row mr-2">
                  <img
                    width="25"
                    height="25"
                    src={igs.itemGroup.icon}
                    alt="x"
                  />
                  <div tw="flex flex-row">
                    {igs.quantity}x{" "}
                    {GeneralUtils.itemGroupToDisplayName(igs.itemGroup)} @{" "}
                    {GeneralUtils.roundToFirstNoneZeroN(igs.valueChaos)}c
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
