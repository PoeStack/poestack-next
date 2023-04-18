import StyledButton from "@components/styled-button";
import StyledInput from "@components/styled-input";
import StyledSelect2 from "@components/styled-select-2";
import { PoeStashTab, StashViewStashSummary } from "@generated/graphql";
import { StashViewExporters } from "@utils/stash-view-exporters";
import { TFT_CATEGORIES } from "@utils/tft-categories";
import { StashViewSettings } from "pages/poe/stash-view";

export function StashViewGenericTftExporterCard({
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
        <StyledSelect2
          selected={stashSettings.tftSelectedCategory}
          mapToIcon={(e) => TFT_CATEGORIES[e]?.icon}
          onSelectChange={(e) => {
            setStashViewSettings({
              ...stashSettings,
              tftSelectedCategory: e,
              checkedTags: TFT_CATEGORIES[e]?.tags ?? null,
            });
          }}
          items={[null, ...Object.keys(TFT_CATEGORIES)]}
        />
        <input
          id="minmax-range"
          type="range"
          min={0}
          max={200}
          step={5}
          value={stashSettings.tftValueMultiplier ?? 100}
          onChange={(e) => {
            setStashViewSettings({
              ...stashSettings,
              tftValueMultiplier: parseInt(e.target.value),
            });
          }}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <StyledInput
          value={stashSettings.ign}
          onChange={(e) => {
            setStashViewSettings({ ...stashSettings, ign: e });
          }}
        />
        <div className="grid grid-cols-2">
          <div>Multiplier</div>
          <div>{stashSettings.tftValueMultiplier ?? 100}%</div>
        </div>
        <StyledButton
          text={"Post (Coming Soon)"}
          onClick={() => {
            navigator.clipboard.writeText(
              TFT_CATEGORIES[stashSettings.tftSelectedCategory!].export(
                stashSummary.items,
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
