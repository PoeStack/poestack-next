import { CHAOS_ICON, DIV_ICON } from "@components/currency-value-display";
import { PoeStashTab, StashViewStashSummary } from "@generated/graphql";
import { GeneralUtils, myLoader } from "@utils/general-util";
import { StashViewUtil } from "@utils/stash-view-util";
import { StashViewSettings } from "pages/poe/stash-view";
import { useEffect, useState } from "react";
import Image from "next/image";

export function StashViewInfoCard({
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
  const [info, setInfo] = useState<{ totalValue: number }>({ totalValue: 0 });

  useEffect(() => {
    let totalValue = 0;
    for (const item of StashViewUtil.searchItems(stashSettings, stashSummary)) {
      totalValue += StashViewUtil.itemStackTotalValue(stashSettings, item);
    }
    setInfo({ totalValue: totalValue });
  }, [stashSummary, stashSettings]);

  return (
    <>
      <div className="space-y-1">
        <div>Info</div>
        <div className="grid grid-cols-2">
          <div>Total Chaos Value</div>
          <div className="flex space-x-2">
            <div>{GeneralUtils.roundToFirstNoneZeroN(info.totalValue)}</div>
            <div>
              <Image
                loader={myLoader}
                src={CHAOS_ICON}
                alt={""}
                width={30}
                height={30}
              />
            </div>
          </div>
          <div>Current Div Value</div>
          <div className="flex space-x-2">
            <div>
              {GeneralUtils.roundToFirstNoneZeroN(
                stashSettings.chaosToDivRate ?? 0
              )}
            </div>
            <div>
              <Image
                loader={myLoader}
                src={CHAOS_ICON}
                alt={""}
                width={30}
                height={30}
              />
            </div>
          </div>
          <div>Total Div Value</div>
          <div className="flex space-x-2">
            <div>
              {stashSettings.chaosToDivRate
                ? GeneralUtils.roundToFirstNoneZeroN(
                    info.totalValue / stashSettings.chaosToDivRate
                  )
                : "NA"}
            </div>
            <div>
              <Image
                loader={myLoader}
                src={DIV_ICON}
                alt={""}
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
