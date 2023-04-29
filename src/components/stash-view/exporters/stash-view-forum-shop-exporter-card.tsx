import StyledButton from "@components/library/styled-button";
import StyledInput from "@components/library/styled-input";
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
        <input
          id="minmax-range"
          type="range"
          min={0}
          max={200}
          step={5}
          value={stashViewSettings.exporterListedValueMultipler ?? 100}
          onChange={(e) => {
            setStashViewSettings({
              ...stashViewSettings,
              exporterListedValueMultipler: parseInt(e.target.value),
            });
          }}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <div className="grid grid-cols-2">
          <div>Multiplier</div>
          <div>{stashViewSettings.exporterListedValueMultipler ?? 100}%</div>
        </div>
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
