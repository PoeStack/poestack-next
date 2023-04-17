import StyledCard from "@components/styled-card";
import StyledSelect2 from "@components/styled-select-2";
import { StashViewItemSummary, PoeStashTab } from "@generated/graphql";
import { StashViewSettings } from "pages/poe/stash-view";
import { StashViewForumShopExporterCard } from "./exporters/stash-view-forum-shop-exporter-card";

export function StashViewExportCard({
  items,
  tabs,
  stashSettings,
  setStashViewSettings,
}: {
  items: StashViewItemSummary[];
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
              selected={"Forum Shop"}
              onSelectChange={(e) => {}}
              items={["Forum Shop"]}
            />
          </div>

          <StashViewForumShopExporterCard
            items={items ?? []}
            tabs={tabs}
            stashSettings={stashSettings}
            setStashViewSettings={setStashViewSettings}
          />
        </div>
      </StyledCard>
    </>
  );
}
