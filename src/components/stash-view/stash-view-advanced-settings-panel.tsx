import { gql, useMutation, useQuery } from "@apollo/client";
import StyledButton from "@components/library/styled-button";
import StyledSelect2 from "@components/library/styled-select-2";
import { useStashViewContext } from "@contexts/stash-view-context";
import { StashViewAutomaticSnapshotSettings } from "@generated/graphql";
import { useState } from "react";

export default function StashViewAdvancedSettingPanel() {
  const [selectedSetting, setSelectedSetting] = useState("Automatic Snapshots");



  return             <div className="relative p-6 flex-auto">
  <div className="flex flex-col space-y-2">
    <StyledSelect2
      selected={selectedSetting}
      onSelectChange={(e) => {
        setSelectedSetting(e);
      }}
      items={["Automatic Snapshots", "Value Series"]}
    />

    {selectedSetting === "Automatic Snapshots" && (
      <StashViewAutomaticSnapshotSettings />
    )}

    {selectedSetting === "Value Series" && (
      <StashViewValueSeriesSettings />
    )}
  </div>
</div>;
}

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
  const { stashTabs, stashViewSettings } = useStashViewContext();

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
      <div>Current Automatic Snapshot Tabs:</div>
      {!!automaticSnapshotSettings?.stashIds?.length ? (
        <div>
          {(automaticSnapshotSettings?.stashIds ?? []).map((e, i) => (
            <div key={i}>{stashTabs!.find((t) => t.id === e)?.name ?? "NA"}</div>
          ))}
        </div>
      ) : (
        <div>None</div>
      )}
      <StyledButton
        text="Clear"
        onClick={() => {
          setAutomaticSnapshotSettings({
            ...automaticSnapshotSettings,
            stashIds: [],
          });
        }}
      />
      <StyledButton
        text={`Set to (${stashViewSettings.checkedTabIds.length}) Selected Tabs`}
        onClick={() => {
          setAutomaticSnapshotSettings({
            ...automaticSnapshotSettings,
            stashIds: stashViewSettings.checkedTabIds,
          });
        }}
      />
      <StyledSelect2
        selected={
          automaticSnapshotSettings.durationBetweenSnapshotsSeconds / 60
        }
        mapToText={(e) => `${e} Mins Between Snapshots`}
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
    </>
  );
}
