import { gql, useMutation, useQuery } from "@apollo/client";
import StyledButton from "@components/library/styled-button";
import StyledSelect2 from "@components/library/styled-select-2";
import { useStashViewContext } from "@contexts/stash-view-context";
import { StashViewAutomaticSnapshotSettings } from "@generated/graphql";
import { useState } from "react";
import StashViewTabSelectVertical from "./stash-view-tab-select-vertical";

export function StashViewValueSeriesSettings() {
  const { refetchValueSnapshots } = useStashViewContext();

  const [deleteAllValueSnapshots, { loading: deletingSnapshots }] = useMutation(
    gql`
      mutation Mutation {
        deleteStashViewValueSnapshotSeries
      }
    `,
    {
      onCompleted() {
        refetchValueSnapshots();
      },
    }
  );

  return (
    <>
      <StyledButton
        text={deletingSnapshots ? "Waiting" : "Delete All Value Snapshots"}
        onClick={() => {
          deleteAllValueSnapshots();
        }}
      />
    </>
  );
}

export function StashViewAutomaticSnapshotSettings() {
  const { stashViewSettings } = useStashViewContext();

  const [automaticSnapshotSettings, setAutomaticSnapshotSettings] =
    useState<StashViewAutomaticSnapshotSettings>({
      league: stashViewSettings.league!,
      durationBetweenSnapshotsSeconds: 60 * 10,
      nextSnapshotTimestamp: new Date(),
      stashIds: [],
      userId: "",
    });
  useQuery(
    gql`
      query StashViewAutomaticSnapshotSettings($league: String!) {
        stashViewAutomaticSnapshotSettings(league: $league) {
          userId
          league
          stashIds
          durationBetweenSnapshotsSeconds
          nextSnapshotTimestamp
        }
      }
    `,
    {
      variables: { league: stashViewSettings.league },
      onCompleted(data) {
        setAutomaticSnapshotSettings(data.stashViewAutomaticSnapshotSettings);
      },
    }
  );

  const [
    updateAutomaticSnapshotSettings,
    { loading: updatingAutomaticSnapshotSettings },
  ] = useMutation(
    gql`
      mutation UpdateStashViewAutomaticSnapshotSettings(
        $input: StashViewAutomaticSnapshotSettingsInput!
      ) {
        updateStashViewAutomaticSnapshotSettings(input: $input)
      }
    `,
    {
      variables: {
        input: {
          durationBetweenSnapshotsSeconds:
            automaticSnapshotSettings?.durationBetweenSnapshotsSeconds,
          league: automaticSnapshotSettings?.league,
          stashIds: automaticSnapshotSettings?.stashIds,
        },
      },
    }
  );

  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="max-h-[200px] overflow-y-auto">
          <StashViewTabSelectVertical
            selectedTabIds={automaticSnapshotSettings?.stashIds}
            onSelectChange={(tab) => {
              if (automaticSnapshotSettings?.stashIds?.includes(tab.id)) {
                setAutomaticSnapshotSettings({
                  ...automaticSnapshotSettings,
                  stashIds: automaticSnapshotSettings.stashIds.filter(
                    (e) => e !== tab.id
                  ),
                });
              } else {
                setAutomaticSnapshotSettings({
                  ...automaticSnapshotSettings,
                  stashIds: [...automaticSnapshotSettings.stashIds, tab.id],
                });
              }
            }}
          />
        </div>
        <div className="flex flex-col space-y-2 pt-2">
          <StyledSelect2
            className="text-sm"
            selected={
              automaticSnapshotSettings.durationBetweenSnapshotsSeconds / 60
            }
            mapToText={(e) => `${e} Min Interval`}
            onSelectChange={(e) => {
              setAutomaticSnapshotSettings({
                ...automaticSnapshotSettings,
                durationBetweenSnapshotsSeconds: e * 60,
              });
            }}
            items={[10, 15, 30, 60, 120]}
          />
          <StyledButton
            text={updatingAutomaticSnapshotSettings ? "Saving" : `Save`}
            onClick={() => {
              updateAutomaticSnapshotSettings();
            }}
          />
        </div>
      </div>
    </>
  );
}
