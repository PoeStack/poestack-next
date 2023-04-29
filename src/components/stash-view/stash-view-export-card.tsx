import StyledCard from "@components/library/styled-card";
import StyledSelect2 from "@components/library/styled-select-2";
import { useStashViewContext } from "@contexts/stash-view-context";

import { StashViewForumShopExporterCard } from "./exporters/stash-view-forum-shop-exporter-card";
import { StashViewGenericTftExporterCard } from "./exporters/stash-view-generic-tft-exporter-card";

export function StashViewExportCard() {
  const { stashViewSettings, stashSummary, setStashViewSettings } =
    useStashViewContext();

  return (
    <>
      <StyledCard>
        <div className="flex flex-col space-y-2">
          <div>Post Items</div>
          <div>
            <StyledSelect2
              selected={stashViewSettings?.selectedExporter}
              onSelectChange={(e) => {
                setStashViewSettings({
                  ...stashViewSettings,
                  selectedExporter: e,
                  stackReducerEnabled:
                    e === "TFT-Bulk"
                      ? true
                      : stashViewSettings.stackReducerEnabled,
                });
              }}
              mapToText={(e) => (e ? e : "Select Here")}
              items={[null, "TFT-Bulk", "Forum Shop"]}
            />
          </div>

          {stashViewSettings?.selectedExporter === "Forum Shop" && (
            <StashViewForumShopExporterCard />
          )}

          {stashViewSettings?.selectedExporter === "TFT-Bulk" && (
            <StashViewGenericTftExporterCard />
          )}
        </div>
      </StyledCard>
    </>
  );
}
