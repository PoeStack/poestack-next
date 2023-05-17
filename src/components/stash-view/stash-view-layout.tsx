import "moment-timezone";
import { useState } from "react";

import LeagueSelect from "@components/league-select";
import StyledButton from "@components/library/styled-button";
import StyledCard from "@components/library/styled-card";
import StashViewAdvancedSettingPanel from "@components/stash-view/stash-view-advanced-settings-panel";
import { StashViewChartJsTest } from "@components/stash-view/stash-view-chart-js-test";
import { StashViewExportCard } from "@components/stash-view/stash-view-export-card";
import { StashViewInfoCard } from "@components/stash-view/stash-view-info-card";
import { StashViewItemTable } from "@components/stash-view/stash-view-item-table";
import { StashViewSearchCard } from "@components/stash-view/stash-view-search-card";
import { StashViewSnapshotJobCard } from "@components/stash-view/stash-view-snapshot-job-card";
import StashViewSnapshotsCard from "@components/stash-view/stash-view-snapshots-card";
import { StashViewTabBreakdownTable } from "@components/stash-view/stash-view-tab-breakdown-card";
import { StashViewTabGroupsPanel } from "@components/stash-view/stash-view-tab-groups-panel";
import { StashViewTabSelectionCard } from "@components/stash-view/stash-view-tab-selection-card";
import { StashViewTabViewerCard } from "@components/stash-view/stash-view-tab-viewer-card";
import { StashViewValueChangeCard } from "@components/stash-view/stash-view-value-change-card";
import { useStashViewContext } from "@contexts/stash-view-context";

import StashViewHeaderCard from "./stash-view-header-card";

export default function StashViewLayout() {
  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);

  const { stashSummary, selectedSnapshotRecord } = useStashViewContext();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
      <StashViewAdvancedSettingPanel
        open={advancedSettingsOpen}
        setOpen={setAdvancedSettingsOpen}
      />

      <div className="flex space-x-4 pb-[70px]">
        <div className="min-h-full">
          <div className="w-[200px] sticky top-4 flex flex-col space-y-2 h-fit">
            <StyledCard className="flex flex-col space-y-2">
              <button onClick={handleToggleCollapse}>
                {isCollapsed ? "Expand" : "Hide"}
              </button>
              <div style={{ display: isCollapsed ? "none" : "block" }}>
                <LeagueSelect />
                <StashViewTabSelectionCard />
                <StashViewSnapshotJobCard />

                <div className="flex flex-col space-y-2 mt-2">
                  <StyledButton
                    text="Settings"
                    onClick={() => {
                      setAdvancedSettingsOpen(true);
                    }}
                  />
                </div>
              </div>
            </StyledCard>

            {!!stashSummary && (
              <>
                <StashViewSearchCard />

                <StashViewTabGroupsPanel />
                <StashViewExportCard />
              </>
            )}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 2xl:grid-cols-2 gap-4">
          {!stashSummary ? (
            <div>Load some tabs to get started.</div>
          ) : (
            <>
              <StashViewHeaderCard />
              <StyledCard className="col-span-1 2xl:col-span-2 max-h-[600px] pb-12 grow">
                <StashViewChartJsTest />
              </StyledCard>
              <StyledCard>
                <StashViewInfoCard />
              </StyledCard>
              <StyledCard>
                <StashViewValueChangeCard />
              </StyledCard>
              <StyledCard className="col-span-1 2xl:col-span-2">
                <StashViewItemTable />
              </StyledCard>
              <StashViewTabViewerCard />
              <StyledCard className="max-h-[800px]">
                <StashViewTabBreakdownTable />
              </StyledCard>
              <StashViewSnapshotsCard />
            </>
          )}
        </div>
      </div>
    </>
  );
}
