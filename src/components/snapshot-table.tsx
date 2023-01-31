import React, { useState } from "react";
import CurrencyValueDisplay from "./currency-value-display";
import { StashSnapshot } from "../__generated__/resolvers-types";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import StyledDropdown from "./styled-dropdown";

export default function SnapshotTable({
  snapshots,
}: {
  snapshots: StashSnapshot[];
}) {
  const router = useRouter();

  const [selectedSnapshotIds, setSelectedSnapshotIds] = useState<string[]>([]);

  const [deleteSnapshots] = useMutation(
    gql`
      mutation DeleteSnapshots($stashSnapshotIds: [String!]!) {
        deleteSnapshots(stashSnapshotIds: $stashSnapshotIds)
      }
    `,
    {
      variables: {
        stashSnapshotIds: selectedSnapshotIds,
      },
      onCompleted(data, clientOptions) {
        router.reload();
      },
    }
  );

  const orderedSanpshots = [...snapshots].sort(
    (a, b) =>
      new Date(b.createdAtTimestamp).valueOf() -
      new Date(a.createdAtTimestamp).valueOf()
  );

  return (
    <>
      <div className="">
        <div className="flex flex-row-reverse space-x-4 pb-3">
          <StyledDropdown
            items={[
              {
                text: "Delete",
                onClick: () => {
                  if (selectedSnapshotIds.length > 0) {
                    deleteSnapshots();
                  }
                },
              },
            ]}
            text={"Actions"}
          />
        </div>
        <div className="h-64 overflow-y-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th></th>
                <th>Time</th>
                <th>Total Value</th>
                <th>Change Previous</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orderedSanpshots?.map((snapshot, index) => (
                <tr key={snapshot.id}>
                  <td>
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      checked={selectedSnapshotIds.includes(snapshot.id)}
                      onChange={(e) => {
                        if (selectedSnapshotIds.includes(snapshot.id)) {
                          setSelectedSnapshotIds(
                            selectedSnapshotIds.filter((e) => e !== snapshot.id)
                          );
                        } else {
                          setSelectedSnapshotIds(
                            selectedSnapshotIds.concat(snapshot.id)
                          );
                        }
                      }}
                    />
                  </td>
                  <td>
                    {new Date(snapshot.createdAtTimestamp).toLocaleString()}
                  </td>
                  <td>
                    <CurrencyValueDisplay
                      valueChaos={snapshot.totalValueChaos ?? 0}
                    />
                  </td>
                  <td>
                    <CurrencyValueDisplay
                      valueChaos={
                        snapshot.totalValueChaos! -
                        (snapshots[index + 1]?.totalValueChaos ?? 0)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
