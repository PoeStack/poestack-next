import { gql, useQuery, useMutation } from "@apollo/client";
import TftGuardPanel from "@components/item-table/tft-guard-panel";
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
  const [postOneClick] = useMutation(
    gql`
      mutation StashViewOneClickPost($input: StashViewSettings!) {
        stashViewOneClickPost(input: $input)
      }
    `,
    {
      variables: {
        input: {
          league: stashSettings.league,
          chaosToDivRate: stashSettings.chaosToDivRate,
          searchString: stashSettings.searchString,
          filterCheckedTabs: stashSettings.filterCheckedTabs,
          selectedTabId: stashSettings.selectedTabId,
          checkedTabIds: stashSettings.checkedTabIds,
          checkedTags: stashSettings.checkedTags,
          valueOverridesEnabled: stashSettings.valueOverridesEnabled,
          itemGroupValueOverrides: stashSettings.itemGroupValueOverrides,
          selectedExporter: stashSettings.selectedExporter,
          exporterListedValueMultipler:
            stashSettings.exporterListedValueMultipler,
          ign: stashSettings.ign,
          tftSelectedCategory: stashSettings.tftSelectedCategory,
          tftSelectedSubCategory: stashSettings.tftSelectedSubCategory,
          excludedItemGroupIds: stashSettings.excludedItemGroupIds
        },
      },
    }
  );

  return (
    <>
      <div className="flex flex-col space-y-2">
        <TftGuardPanel disableInstructions={true}>
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
            value={stashSettings.exporterListedValueMultipler ?? 100}
            onChange={(e) => {
              setStashViewSettings({
                ...stashSettings,
                exporterListedValueMultipler: parseInt(e.target.value),
              });
            }}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <StyledInput
            className={
              (stashSettings?.ign?.length ?? 0) < 3
                ? "border-red-600 border-2"
                : ""
            }
            value={stashSettings.ign}
            placeholder="IGN"
            onChange={(e) => {
              setStashViewSettings({ ...stashSettings, ign: e });
            }}
          />
          <div className="grid grid-cols-2">
            <div>Multiplier</div>
            <div>{stashSettings.exporterListedValueMultipler ?? 100}%</div>
          </div>
          <StyledButton
            disabled={(stashSettings?.ign?.length ?? 0) < 3}
            text={"Post to TFT"}
            onClick={() => {
              postOneClick();
            }}
          />
        </TftGuardPanel>
      </div>
    </>
  );
}
