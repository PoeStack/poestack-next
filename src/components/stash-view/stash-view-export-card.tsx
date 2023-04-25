import StyledCard from "@components/styled-card";
import StyledSelect2 from "@components/styled-select-2";
import { StashViewForumShopExporterCard } from "./exporters/stash-view-forum-shop-exporter-card";
import { StashViewGenericTftExporterCard } from "./exporters/stash-view-generic-tft-exporter-card";
import { useStashViewContext } from "@contexts/stash-view-context";

export function StashViewExportCard() {
  const { stashViewSettings, stashSummary, setStashViewSettings } =
    useStashViewContext();

  return (
    <>
      <StyledCard>
        <div className="flex flex-col space-y-2">
          <div>Export Items</div>
          <div>
            <StyledSelect2
              selected={stashViewSettings?.selectedExporter ?? "Forum Shop"}
              onSelectChange={(e) => {
                setStashViewSettings({
                  ...stashViewSettings,
                  selectedExporter: e,
                });
              }}
              items={["Forum Shop", "TFT-Bulk"]}
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
