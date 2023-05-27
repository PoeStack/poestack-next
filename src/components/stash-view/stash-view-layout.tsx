import "moment-timezone";

import StyledCard from "@components/library/styled-card";
import { StashViewChartJsTest } from "@components/stash-view/stash-view-chart-js-test";
import { StashViewInfoCard } from "@components/stash-view/stash-view-info-card";
import { StashViewItemTable } from "@components/stash-view/stash-view-item-table";
import { StashViewSearchCard } from "@components/stash-view/stash-view-search-card";
import StashViewSnapshotsCard from "@components/stash-view/stash-view-snapshots-card";
import { StashViewTabBreakdownTable } from "@components/stash-view/stash-view-tab-breakdown-card";
import { StashViewTabViewerCard } from "@components/stash-view/stash-view-tab-viewer-card";
import { StashViewValueChangeCard } from "@components/stash-view/stash-view-value-change-card";
import { useStashViewContext } from "@contexts/stash-view-context";

import StashViewHeaderCard from "./stash-view-header-card";
import StashViewSideBar from "./stash-view-side-bar";

export default function StashViewLayout() {
  const { stashSummary } = useStashViewContext();

  return (
    <>
      <div className="flex space-x-4 pb-[70px]">
        <div className="min-h-full">
          <div className="w-[200px] sticky top-4 flex flex-col space-y-2 h-fit">
            <StashViewSideBar />
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
                <StashViewSearchCard />
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
