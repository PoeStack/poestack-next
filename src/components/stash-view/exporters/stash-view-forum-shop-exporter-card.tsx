import StyledButton from "@components/styled-button";
import StyledInput from "@components/styled-input";
import { PoeStashTab, StashViewStashSummary } from "@generated/graphql";
import { StashViewExporters } from "@utils/stash-view-exporters";
import { StashViewSettings } from "pages/poe/stash-view";

export function StashViewForumShopExporterCard({
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
              StashViewExporters.exportToForumShop(
                stashSummary,
                tabs,
                stashSettings
              )
            );
          }}
        />
      </div>
    </>
  );
}
