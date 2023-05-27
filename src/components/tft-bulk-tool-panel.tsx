import { useEffect } from "react";

import { useStashViewContext } from "@contexts/stash-view-context";

import LeagueSelect from "./league-select";
import { StashViewGenericTftExporterCard } from "./stash-view/exporters/stash-view-generic-tft-exporter-card";
import { StashViewInfoCard } from "./stash-view/stash-view-info-card";
import { StashViewItemTable } from "./stash-view/stash-view-item-table";
import { StashViewSnapshotJobCard } from "./stash-view/stash-view-snapshot-job-card";
import { StashViewTabSelectionCard } from "./stash-view/stash-view-tab-selection-card";

export default function TftBulkToolPanel() {
  const { stashViewSettings, setStashViewSettings } = useStashViewContext();
  const { stashSummary } = useStashViewContext();

  useEffect(() => {
    if (
      stashViewSettings?.selectedView !== "TFT-Bulk" ||
      !stashViewSettings?.valueOverridesEnabled
    ) {
      setStashViewSettings({
        ...stashViewSettings,
        selectedView: "TFT-Bulk",
        valueOverridesEnabled: true,
      });
    }
  }, [stashViewSettings]);

  return (
    <>
      <div className="flex space-x-2">
        <div className="flex flex-col space-y-2">
          <LeagueSelect
            leagueFilter={(e) => ["Crucible", "Standard"].includes(e)}
          />
          <StashViewTabSelectionCard />
          <StashViewSnapshotJobCard />
          {!!stashSummary && (
            <>
              <StashViewGenericTftExporterCard />
              <StashViewInfoCard />
            </>
          )}
        </div>
        {!stashSummary ? (
          <div>Load some tabs to get started.</div>
        ) : (
          <div className="flex-1">
            <StashViewItemTable forceReducer={true} />
          </div>
        )}
      </div>
    </>
  );
}
