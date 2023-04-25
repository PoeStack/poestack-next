import { gql, useMutation } from "@apollo/client";
import TftGuardPanel from "@components/item-table/tft-guard-panel";
import StyledButton from "@components/styled-button";
import StyledInput from "@components/styled-input";
import StyledSelect2 from "@components/styled-select-2";
import { useStashViewContext } from "@contexts/stash-view-context";
import { TFT_CATEGORIES } from "@utils/tft-categories";
import { useState } from "react";

export function StashViewGenericTftExporterCard() {
  const { stashViewSettings, setStashViewSettings } = useStashViewContext();

  const [error, setError] = useState<string | null>(null);

  const [postOneClick, { loading }] = useMutation(
    gql`
      mutation StashViewOneClickPost($input: StashViewSettings!) {
        stashViewOneClickPost(input: $input)
      }
    `,
    {
      variables: {
        input: {
          league: stashViewSettings.league,
          chaosToDivRate: stashViewSettings.chaosToDivRate,
          searchString: stashViewSettings.searchString,
          filterCheckedTabs: stashViewSettings.filterCheckedTabs,
          selectedTabId: stashViewSettings.selectedTabId,
          checkedTabIds: stashViewSettings.checkedTabIds,
          checkedTags: stashViewSettings.checkedTags,
          valueOverridesEnabled: stashViewSettings.valueOverridesEnabled,
          itemGroupValueOverrides: stashViewSettings.itemGroupValueOverrides,
          selectedExporter: stashViewSettings.selectedExporter,
          exporterListedValueMultipler:
            stashViewSettings.exporterListedValueMultipler,
          ign: stashViewSettings.ign,
          tftSelectedCategory: stashViewSettings.tftSelectedCategory,
          tftSelectedSubCategory: stashViewSettings.tftSelectedSubCategory,
          excludedItemGroupIds: stashViewSettings.excludedItemGroupIds,
        },
      },
      onCompleted() {
        setError(null);
      },
      onError(error) {
        console.log("error", error);
        setError(error.message);
      },
    }
  );

  return (
    <>
      <div className="flex flex-col space-y-2">
        <TftGuardPanel disableInstructions={true}>
          <StyledSelect2
            selected={stashViewSettings.tftSelectedCategory}
            mapToIcon={(e) => TFT_CATEGORIES[e]?.icon}
            onSelectChange={(e) => {
              setStashViewSettings({
                ...stashViewSettings,
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
            value={stashViewSettings.exporterListedValueMultipler ?? 100}
            onChange={(e) => {
              setStashViewSettings({
                ...stashViewSettings,
                exporterListedValueMultipler: parseInt(e.target.value),
              });
            }}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <StyledInput
            className={
              (stashViewSettings?.ign?.length ?? 0) < 3
                ? "border-red-600 border-2"
                : ""
            }
            value={stashViewSettings.ign}
            placeholder="IGN"
            onChange={(e) => {
              setStashViewSettings({ ...stashViewSettings, ign: e });
            }}
          />
          <div className="grid grid-cols-2">
            <div>Multiplier</div>
            <div>{stashViewSettings.exporterListedValueMultipler ?? 100}%</div>
          </div>
          {error && (
            <>
              <div className="text-red-600">Error: {error}</div>
            </>
          )}
          <StyledButton
            disabled={(stashViewSettings?.ign?.length ?? 0) < 3}
            text={loading ? "Waiting for Bot" : "Post to TFT"}
            onClick={() => {
              if ((stashViewSettings?.ign?.length ?? 0) >= 3 && !loading) {
                postOneClick();
              }
            }}
          />
        </TftGuardPanel>
      </div>
    </>
  );
}
