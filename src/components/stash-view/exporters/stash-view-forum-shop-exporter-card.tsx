import StyledButton from "@components/styled-button";
import StyledInput from "@components/styled-input";
import { useStashViewContext } from "@contexts/stash-view-context";
import { StashViewExporters } from "@utils/stash-view-exporters";

export function StashViewForumShopExporterCard() {
  const {
    stashTabs,
    valueSnapshots,
    stashViewSettings,
    stashSummary,
    setStashViewSettings,
  } = useStashViewContext();

  return (
    <>
      <div className="flex flex-col space-y-2">
        <StyledInput
          type="number"
          placeholder="Shop Index Offset"
          value={stashViewSettings.forumShopTabIndexOffset}
          onChange={(e) => {
            setStashViewSettings({
              ...stashViewSettings,
              forumShopTabIndexOffset: parseInt(e),
            });
          }}
        />
        <StyledButton
          text={"Copy"}
          onClick={() => {
            navigator.clipboard.writeText(
              StashViewExporters.exportToForumShop(
                stashSummary!,
                stashTabs,
                stashViewSettings
              )
            );
          }}
        />
      </div>
    </>
  );
}
