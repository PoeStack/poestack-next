import { gql, useMutation, useQuery } from "@apollo/client";
import StyledButton from "@components/library/styled-button";
import StyledSelect2 from "@components/library/styled-select-2";
import { useStashViewContext } from "@contexts/stash-view-context";
import { StashViewAutomaticSnapshotSettings } from "@generated/graphql";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function StashViewAdvancedSettingPanel({ open, setOpen }) {
  const [selectedSetting, setSelectedSetting] = useState("Automatic Snapshots");

  if (!open) {
    return <></>;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-surface-primary outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Advanced Settings</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setOpen(false)}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="relative p-6 flex-auto">
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
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
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
            <div key={i}>{stashTabs.find((t) => t.id === e)?.name ?? "NA"}</div>
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
