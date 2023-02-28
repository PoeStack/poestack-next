import React from "react";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import CurrencyValueDisplay from "./currency-value-display";
import {
  StashSnapshot,
  StashSnapshotItemGroupSummarySearchAggregationResponse,
} from "../__generated__/graphql";

export default function ValueBreakdownTable({
  snapshot,
}: {
  snapshot: StashSnapshot | null;
}) {
  const [chaosValuesByTag, setChaosValuesByTag] =
    useState<StashSnapshotItemGroupSummarySearchAggregationResponse | null>(
      null
    );
  useQuery(
    gql`
      query StashSnapshotItemGroupSummariesAggregation(
        $search: StashSnapshotItemGroupSummarySearchInput!
        $aggregation: String!
      ) {
        stashSnapshotItemGroupSummariesAggregation(
          search: $search
          aggregation: $aggregation
        ) {
          entries {
            key
            value
            matches
          }
        }
      }
    `,
    {
      skip: !snapshot?.id || !snapshot?.snapshotProfileId,
      variables: {
        search: {
          snapshotId: snapshot?.id,
        },
        aggregation: "chaos-value-by-tab",
      },
      onCompleted(data) {
        setChaosValuesByTag(data?.stashSnapshotItemGroupSummariesAggregation);
      },
    }
  );

  if (!chaosValuesByTag) {
    return <>loading...</>;
  }

  return (
    <>
      <div className="h-64 overflow-y-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Tag</th>
              <th>Quantity</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            {chaosValuesByTag?.entries?.map((entry, index) => (
              <tr key={index}>
                <td>{entry?.key}</td>
                <td>{entry?.matches}</td>
                <td>
                  <CurrencyValueDisplay valueChaos={entry?.value ?? 0} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
