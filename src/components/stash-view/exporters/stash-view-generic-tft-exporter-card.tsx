import { useState } from "react";

import { gql, useMutation } from "@apollo/client";
import TftGuardPanel from "@components/item-table/tft-guard-panel";
import StyledButton from "@components/library/styled-button";
import StyledDropdown from "@components/library/styled-dropdown";
import StyledInput from "@components/library/styled-input";
import StyledSelect2 from "@components/library/styled-select-2";
import { useStashViewContext } from "@contexts/stash-view-context";
import { usePoeStackAuth } from "@contexts/user-context";
import { GeneralUtils } from "@utils/general-util";
import { TFT_CATEGORIES } from "@utils/tft-categories";
import { useMessagePostedContext } from "@contexts/post-message-events-context";

export function StashViewGenericTftExporterCard() {
  const { profile } = usePoeStackAuth();
  const { stashViewSettings, setStashViewSettings } = useStashViewContext();

  const [error, setError] = useState<string | null>(null);
  const [statusText, setStatusText] = useState<string | null>(null);

  const { setMessagePosted } = useMessagePostedContext();

  function generateInput() {
    return {
      league: stashViewSettings.league,
      chaosToDivRate: stashViewSettings.chaosToDivRate,
      searchString: stashViewSettings.searchString,
      selectedTabId: stashViewSettings.selectedTabId,
      checkedTabIds: stashViewSettings.checkedTabIds,
      checkedTags: stashViewSettings.checkedTags,
      valueOverridesEnabled: stashViewSettings.valueOverridesEnabled,
      itemGroupValueOverrides: stashViewSettings.itemGroupValueOverrides,
      selectedView: stashViewSettings.selectedView,
      exporterListedValueMultipler:
        stashViewSettings.exporterListedValueMultipler,
      ign: stashViewSettings.ign,
      tftSelectedCategory: stashViewSettings.tftSelectedCategory,
      tftSelectedSubCategory: stashViewSettings.tftSelectedSubCategory,
      excludedItemGroupIds: stashViewSettings.excludedItemGroupIds,
      minItemQuantity: stashViewSettings.minItemQuantity,
      minItemValue: stashViewSettings.minItemValue,
      minItemStackValue: stashViewSettings.minItemStackValue,
      selectedValuationType: stashViewSettings.selectedValuationType,
    };
  }

  const [postOneClick, { loading }] = useMutation(
    gql`
      mutation StashViewOneClickPost($input: StashViewSettings!) {
        stashViewOneClickPost(input: $input)
      }
    `,
    {
      variables: {
        input: generateInput(),
      },
      onCompleted() {
        setError(null);
        setStatusText(null);
        setMessagePosted(true);
      },
      onError(error) {
        setError(error.message);
        setStatusText(null);
      },
    }
  );

  const [generateMessageToClipboard] = useMutation(
    gql`
      mutation StashViewOneClickMessage($input: StashViewSettings!) {
        stashViewOneClickMessage(input: $input)
      }
    `,
    {
      variables: {
        input: generateInput(),
      },
      onCompleted(data) {
        setError(null);
        setStatusText(null);
        navigator.clipboard.writeText(data.stashViewOneClickMessage);
      },
      onError(error) {
        setError(error.message);
        setStatusText(null);
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
            mapToText={(e) => (e ? GeneralUtils.capitalize(e)! : "...")}
            onSelectChange={(e) => {
              setStashViewSettings({
                ...stashViewSettings,
                tftSelectedCategory: e,
                checkedTags: TFT_CATEGORIES[e]?.tags ?? null,
              });
            }}
            items={[null, ...Object.keys(TFT_CATEGORIES)]}
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
          {error && (
            <>
              <div className="text-red-600">Error: {error}</div>
            </>
          )}
          <div className="flex w-full">
            <StyledButton
              className="flex-1 rounded-r-none"
              disabled={(stashViewSettings?.ign?.length ?? 0) < 3}
              text={statusText ? statusText : "Post to TFT"}
              onClick={() => {
                if (!stashViewSettings.tftSelectedCategory) {
                  setError("You must select a TFT category.");
                } else if ((stashViewSettings?.ign?.length ?? 0) < 3) {
                  setError("You must set an IGN.");
                } else {
                  setStatusText("Waiting for Bot");
                  postOneClick();
                }
              }}
            />
            <StyledDropdown
              className={"rounded-l-none"}
              text={null}
              items={[
                {
                  text: "Copy Text",
                  onClick: () => {
                    if (!stashViewSettings.tftSelectedCategory) {
                      setError("You must select a TFT category.");
                    } else if ((stashViewSettings?.ign?.length ?? 0) < 3) {
                      setError("You must set an IGN.");
                    } else {
                      generateMessageToClipboard();
                    }
                  },
                },
                {
                  text: "Copy Image",
                  onClick: () => {
                    const cpy = async () => {
                      if (!stashViewSettings.tftSelectedCategory) {
                        setError("You must select a TFT category.");
                      } else {
                        const response = await fetch(
                          `/api/stash-view/tft-export-image?input=${encodeURIComponent(
                            JSON.stringify(generateInput())
                          )}&opaqueKey=${profile?.opaqueKey}`
                        );
                        const blob = await response.blob();
                        await navigator.clipboard.write([
                          new ClipboardItem({
                            [blob.type]: blob,
                          }),
                        ]);
                      }
                    };
                    setStatusText("Loading Image");
                    cpy().finally(() => {
                      setStatusText(null);
                    });
                  },
                },
              ]}
            />
          </div>
        </TftGuardPanel>
      </div>
    </>
  );
}
