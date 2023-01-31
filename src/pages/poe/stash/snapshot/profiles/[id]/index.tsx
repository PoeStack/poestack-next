import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import FilterableItemTable from "../../../../../../components/filterable-item-table";
import SnapshotTable from "../../../../../../components/snapshot-table";
import StyledCard from "../../../../../../components/styled-card";
import StyledButton from "../../../../../../components/styled-button";
import CurrencyValueDisplay from "../../../../../../components/currency-value-display";
import NetWorthChart from "../../../../../../components/net-worth-chart";
import ValueBreakdownTable from "../../../../../../components/value-breakdown-table";
import { usePoeStackAuth } from "../../../../../../contexts/user-context";
import ProfitCard from "../../../../../../components/profit-card";
import {
  StashSnapshot,
  StashSnapshotProfile,
} from "../../../../../../__generated__/resolvers-types";

export default function ViewProfile() {
  const router = useRouter();
  const { id } = router.query;

  const [profile, setProfile] = useState<StashSnapshotProfile | null>(null);
  useQuery(
    gql`
      query StashSnapshotProfile($snapshotProfileId: String!) {
        stashSnapshotProfile(snapshotProfileId: $snapshotProfileId) {
          id
          userId
          league
          name
          public
          createdAtTimestamp
          lastSnapshotTimestamp
          poeStashTabIds
          valuationTargetPValue
          valuationStockInfluence
          automaticSnapshotIntervalSeconds
        }
      }
    `,
    {
      variables: { snapshotProfileId: id },
      onCompleted(data) {
        if (data?.stashSnapshotProfile) {
          setProfile(data?.stashSnapshotProfile);
        }
      },
    }
  );

  const [snapshots, setSnapshots] = useState<StashSnapshot[]>([]);
  const [snapshot, setSnapshot] = useState<StashSnapshot | null>(null);
  const { refetch: refetchSnapshots } = useQuery(
    gql`
      query StashSnapshots($stashSnapshotProfileId: String!) {
        stashSnapshots(stashSnapshotProfileId: $stashSnapshotProfileId) {
          id
          league
          userId
          snapshotProfileId
          createdAtTimestamp
          tags
          totalValueChaos
          divineChaosValue
          exaltChaosValue
        }
      }
    `,
    {
      variables: { stashSnapshotProfileId: profile?.id },
      fetchPolicy: "network-only",
      skip: !profile?.id,
      onCompleted(data) {
        setSnapshots(data?.stashSnapshots);
        if (data?.stashSnapshots.length > 0) {
          const snap = data?.stashSnapshots[data?.stashSnapshots.length - 1];
          setSnapshot(snap);
          console.log("snapshot", snap);
        }
      },
    }
  );

  const [takeSnapshot, { loading: takeSnapshotLoading }] = useMutation(
    gql`
      mutation TakeSnapshot($stashSnapshotProfileId: String!) {
        takeSnapshot(stashSnapshotProfileId: $stashSnapshotProfileId) {
          id
        }
      }
    `,
    {
      variables: { stashSnapshotProfileId: profile?.id },
      onCompleted() {
        refetchSnapshots();
      },
    }
  );

  const { profile: psUserProfile } = usePoeStackAuth();

  if (!profile) {
    return <>loading...</>;
  }

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row space-x-2">
          <StyledCard title="Info">
            <h4>Profile Name: {profile.name}</h4>
            <h4>League: {profile.league}</h4>
            <div className="flex flex-row space-x-1">
              <h4>Total Value:</h4>
              <CurrencyValueDisplay
                valueChaos={snapshot?.totalValueChaos ?? 0}
              />
            </div>

            {psUserProfile?.userId === profile?.userId && (
              <StyledButton
                text={takeSnapshotLoading ? "Loading..." : "Take Snapshot"}
                onClick={() => {
                  takeSnapshot();
                }}
              />
            )}
          </StyledCard>

          <ProfitCard snapshots={snapshots ?? []} />
        </div>

        <StyledCard title="Net Worth (Divs)">
          <NetWorthChart snapshots={snapshots ?? []} />
        </StyledCard>

        <StyledCard title="Items">
          {snapshot ? (
            <>
              {" "}
              <FilterableItemTable snapshot={snapshot} />
            </>
          ) : (
            "loading..."
          )}
        </StyledCard>

        <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:space-x-3">
          <StyledCard title="Value By Tag">
            <ValueBreakdownTable snapshot={snapshot} />
          </StyledCard>

          <StyledCard title="Snapshots">
            <SnapshotTable snapshots={snapshots ?? []} />
          </StyledCard>
        </div>
      </div>
    </>
  );
}
