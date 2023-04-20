import StyledCard from "@components/styled-card";
import StyledSelect2 from "@components/styled-select-2";
import { PoeStashTab, StashViewStashSummary } from "@generated/graphql";
import { StashViewSettings } from "pages/poe/stash-view";
import { StashViewForumShopExporterCard } from "./exporters/stash-view-forum-shop-exporter-card";
import { StashViewGenericTftExporterCard } from "./exporters/stash-view-generic-tft-exporter-card";

export function StashViewExportCard({
  stashSummary,
  tabs,
  stashSettings,
  setStashViewSettings,
}: {
  stashSummary: StashViewStashSummary;
  tabs: PoeStashTab[];
  stashSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
}) {
  return (
    <>
      <StyledCard>
        <div className="flex flex-col space-y-2">
          <div>Export Items</div>
          <div>
            <StyledSelect2
              selected={stashSettings?.selectedExporter ?? "Forum Shop"}
              onSelectChange={(e) => {
                setStashViewSettings({ ...stashSettings, selectedExporter: e });
              }}
              items={["Forum Shop", "TFT-Bulk"]}
            />
          </div>

          {stashSettings?.selectedExporter === "Forum Shop" && (
            <StashViewForumShopExporterCard
              stashSummary={stashSummary}
              tabs={tabs}
              stashSettings={stashSettings}
              setStashViewSettings={setStashViewSettings}
            />
          )}

          {stashSettings?.selectedExporter === "TFT-Bulk" && (
            <StashViewGenericTftExporterCard
              stashSummary={stashSummary}
              tabs={tabs}
              stashSettings={stashSettings}
              setStashViewSettings={setStashViewSettings}
            />
          )}
        </div>
      </StyledCard>
    </>
  );
}
