import { useMutation, gql, useQuery } from "@apollo/client";
import StyledButton from "@components/styled-button";
import { usePoeLeagueCtx } from "@contexts/league-context";
import { PoeStashTab, StashViewJob } from "@generated/graphql";
import { StashViewSettings } from "pages/poe/stash-view";
import { useState } from "react";

export function StashViewSnapshotJobCard({
  stashViewSettings,
  setStashViewSettings,
  onJobComplete,
}: {
  tabs: PoeStashTab[];
  stashViewSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
  onJobComplete: () => void;
}) {
  const { league } = usePoeLeagueCtx();

  const [takeSnapshot] = useMutation(gql`
    mutation TakeStashViewSanpshot($input: StashViewSnapshotInput!) {
      stashViewSnapshot(input: $input)
    }
  `);

  const [jobStatus, setJobStatus] = useState<StashViewJob | null>(null);
  const { refetch } = useQuery(
    gql`
      query StashViewJobStat($jobId: String!) {
        stashViewJobStat(jobId: $jobId) {
          id
          userId
          status
          totalStahes
          timestamp
        }
      }
    `,
    {
      variables: { jobId: stashViewSettings.snapshotJobId },
      skip: !stashViewSettings?.snapshotJobId,
      fetchPolicy: "no-cache",
      nextFetchPolicy: "no-cache",
      pollInterval: 1000,
      onCompleted(data) {
        setJobStatus(data?.stashViewJobStat);

        if (data?.stashViewJobStat?.status === "Complete.") {
          setTimeout(() => {
            setJobStatus(null);
          }, 5000);
          onJobComplete();
        }
      },
    }
  );

  return (
    <>
      <div className="flex flex-col space-y-1">
        <StyledButton
          text={`Snapshot ${stashViewSettings.checkedTabIds.length} Tabs`}
          onClick={() => {
            takeSnapshot({
              variables: {
                input: {
                  league: league,
                  stashIds: stashViewSettings.checkedTabIds,
                },
              },
              onCompleted(data) {
                setStashViewSettings({
                  ...stashViewSettings,
                  snapshotJobId: data.stashViewSnapshot,
                });
              },
            });
          }}
        />

        {!!jobStatus?.status && <div>{jobStatus?.status}</div>}
      </div>
    </>
  );
}
