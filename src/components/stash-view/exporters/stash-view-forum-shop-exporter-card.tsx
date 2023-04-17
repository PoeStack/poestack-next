import StyledButton from "@components/styled-button";
import StyledCard from "@components/styled-card";
import StyledInput from "@components/styled-input";
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
      <div className="flex flex-col space-y-2">
        <StyledInput
          type="number"
          placeholder="Shop Index Offset"
          value={stashSettings.forumShopTabIndexOffset}
          onChange={(e) => {
            setStashViewSettings({
              ...stashSettings,
              forumShopTabIndexOffset: parseInt(e),
            });
          }}
        />
        <StyledButton
          text={"Copy"}
          onClick={() => {
            navigator.clipboard.writeText(
              exportToForumShop(items, tabs, stashSettings)
            );
          }}
        />
      </div>
    </>
  );
}
