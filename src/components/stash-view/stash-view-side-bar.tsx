import { useState } from "react";

import LeagueSelect from "@components/league-select";
import StyledButton from "@components/library/styled-button";
import StyledCard from "@components/library/styled-card";
import StyledSelect2 from "@components/library/styled-select-2";
import { useStashViewContext } from "@contexts/stash-view-context";

import { StashViewForumShopExporterCard } from "./exporters/stash-view-forum-shop-exporter-card";
import StashViewAdvancedSettingPanel, {
  StashViewAutomaticSnapshotSettings,
  StashViewValueSeriesSettings,
} from "./stash-view-advanced-settings-panel";
import { StashViewSnapshotJobCard } from "./stash-view-snapshot-job-card";
import { StashViewTabGroupsPanel } from "./stash-view-tab-groups-panel";
import { StashViewTabSelectionCard } from "./stash-view-tab-selection-card";

export default function StashViewSideBar() {
  const { stashViewSettings, setStashViewSettings } = useStashViewContext();

  return (
    <>
      <StyledCard className="flex flex-col space-y-2">
        <StyledSelect2
          selected={stashViewSettings.selectedView ?? "Tabs"}
          onSelectChange={(e) => {
            setStashViewSettings({ ...stashViewSettings, selectedView: e });
          }}
          items={[
            "Tabs",
            "Tab Groups",
            "Forum Shop",
            "Automatic Snapshots",
            "Value Series",
          ]}
        />
        {(!stashViewSettings.selectedView ||
          stashViewSettings.selectedView === "Tabs") && (
          <div>
            <LeagueSelect />
            <StashViewTabSelectionCard />
            <StashViewSnapshotJobCard />
          </div>
        )}
        {stashViewSettings.selectedView === "Tab Groups" && (
          <StashViewTabGroupsPanel />
        )}
        {stashViewSettings.selectedView === "Forum Shop" && (
          <StashViewForumShopExporterCard />
        )}
        {stashViewSettings.selectedView === "Automatic Snapshots" && (
          <StashViewAutomaticSnapshotSettings />
        )}
        {stashViewSettings.selectedView === "Value Series" && (
          <StashViewValueSeriesSettings />
        )}
      </StyledCard>
    </>
  );
}
