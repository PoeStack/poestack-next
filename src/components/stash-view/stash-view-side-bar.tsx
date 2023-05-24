import { useState } from "react";

import LeagueSelect from "@components/league-select";
import StyledButton from "@components/library/styled-button";
import StyledCard from "@components/library/styled-card";
import StyledSelect2 from "@components/library/styled-select-2";
import { useStashViewContext } from "@contexts/stash-view-context";

import StashViewAdvancedSettingPanel, {
  StashViewAutomaticSnapshotSettings,
  StashViewValueSeriesSettings,
} from "./stash-view-advanced-settings-panel";
import { StashViewExportCard } from "./stash-view-export-card";
import { StashViewSnapshotJobCard } from "./stash-view-snapshot-job-card";
import { StashViewTabGroupsPanel } from "./stash-view-tab-groups-panel";
import { StashViewTabSelectionCard } from "./stash-view-tab-selection-card";

export default function StashViewSideBar() {
  const { stashSummary, selectedSnapshotRecord } = useStashViewContext();

  const [selectedTab, setSelectedTab] = useState<string>("Tabs");

  return (
    <>
      <StyledCard className="flex flex-col space-y-2">
        <StyledSelect2
          selected={selectedTab}
          onSelectChange={(e) => {
            setSelectedTab(e);
          }}
          items={[
            "Tabs",
            "Tab Groups",
            "Export",
            "Automatic Snapshots",
            "Value Series",
          ]}
        />
        {selectedTab === "Tabs" && (
          <div>
            <LeagueSelect />
            <StashViewTabSelectionCard />
            <StashViewSnapshotJobCard />
          </div>
        )}
        {selectedTab === "Tab Groups" && <StashViewTabGroupsPanel />}
        {selectedTab === "Export" && <StashViewExportCard />}
        {selectedTab === "Automatic Snapshots" && (
          <StashViewAutomaticSnapshotSettings />
        )}
        {selectedTab === "Value Series" && <StashViewValueSeriesSettings />}
      </StyledCard>
    </>
  );
}
