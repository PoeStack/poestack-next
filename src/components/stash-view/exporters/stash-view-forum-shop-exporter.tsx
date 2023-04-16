import StyledButton from "@components/styled-button";
import StyledCard from "@components/styled-card";
import StyledSelect2 from "@components/styled-select-2";
import { StashViewItemSummary, PoeStashTab } from "@generated/graphql";
import { exportToForumShop } from "@utils/stash-view-exporters";
import { StashViewSettings } from "pages/poe/stash-view";

export function StashViewForumShopExporterCard({
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
      <StyledButton
        text={"Copy"}
        onClick={() => {
          navigator.clipboard.writeText(
            exportToForumShop(items, tabs, stashSettings)
          );
        }}
      />
    </>
  );
}
