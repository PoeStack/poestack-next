import "moment-timezone";
import { useState } from "react";

import FixedAds from "@components/ads/styled-square-responsive-ad";
import LeagueSelect from "@components/league-select";
import StyledButton from "@components/library/styled-button";
import StyledCard from "@components/library/styled-card";
import PoeAccountConnectedGaurdPanel from "@components/poe-account-connected-guard-panel";
import StashViewAdvancedSettingPanel from "@components/stash-view/stash-view-advanced-settings-panel";
import { StashViewChartJsTest } from "@components/stash-view/stash-view-chart-js-test";
import { StashViewExportCard } from "@components/stash-view/stash-view-export-card";
import { StashViewInfoCard } from "@components/stash-view/stash-view-info-card";
import { StashViewItemTable } from "@components/stash-view/stash-view-item-table";
import { StashViewSearchCard } from "@components/stash-view/stash-view-search-card";
import { StashViewSnapshotJobCard } from "@components/stash-view/stash-view-snapshot-job-card";
import { StashViewTabBreakdownTable } from "@components/stash-view/stash-view-tab-breakdown-card";
import { StashViewTabGroupsPanel } from "@components/stash-view/stash-view-tab-groups-panel";
import { StashViewTabSelectionCard } from "@components/stash-view/stash-view-tab-selection-card";
import { StashViewTabViewerCard } from "@components/stash-view/stash-view-tab-viewer-card";
import { StashViewValueChangeCard } from "@components/stash-view/stash-view-value-change-card";
import { StashViewContextProvider } from "@contexts/stash-view-context";

export default function StashView() {
  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);

  return (
    <>
      <PoeAccountConnectedGaurdPanel>
        <FixedAds />
        <StashViewContextProvider cacheId={"stash-view-page"}>
          <StashViewAdvancedSettingPanel
            open={advancedSettingsOpen}
            setOpen={setAdvancedSettingsOpen}
          />

          <div className="flex space-x-4 pb-[70px]">
            <div className="min-h-full">
              <div className="w-[200px] sticky top-4 flex flex-col space-y-2 h-fit">
                <StyledCard className="flex flex-col space-y-2">
                  <LeagueSelect />
                  <StashViewTabSelectionCard />
                  <StashViewSnapshotJobCard />
                  <StyledButton
                    text="Settings"
                    onClick={() => {
                      setAdvancedSettingsOpen(true);
                    }}
                  />
                </StyledCard>

                <StashViewSearchCard />

                <StashViewTabGroupsPanel />

                <StashViewExportCard />
              </div>
            </div>

            <div className="w-full grid grid-cols-1 2xl:grid-cols-2 gap-4">
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
            </div>
          </div>
        </StashViewContextProvider>
      </PoeAccountConnectedGaurdPanel>
    </>
  );
}
