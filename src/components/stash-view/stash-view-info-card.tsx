import Image from "next/image";
import { useEffect, useState } from "react";

import { CHAOS_ICON, DIV_ICON } from "@components/currency-value-display";
import { useStashViewContext } from "@contexts/stash-view-context";
import { GeneralUtils, myLoader } from "@utils/general-util";
import { StashViewUtil } from "@utils/stash-view-util";

export function StashViewInfoCard() {
  const { stashViewSettings, stashSummary } = useStashViewContext();

  const [info, setInfo] = useState<{ totalValue: number }>({ totalValue: 0 });

  useEffect(() => {
    let totalValue = 0;
    for (const item of StashViewUtil.searchItems(
      stashViewSettings,
      stashSummary!
    )) {
      const itemValue = StashViewUtil.itemStackTotalValue(stashViewSettings, item);
      totalValue += Number.isNaN(itemValue) ? 0 : itemValue;
    }
    setInfo({ totalValue: totalValue });
  }, [stashSummary, stashViewSettings]);

  return (
    <>
      <div className="space-y-1">
        <div>Info</div>
        <div className="grid gap-2 grid-cols-2">
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
                stashViewSettings.chaosToDivRate ?? 0
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
              {stashViewSettings.chaosToDivRate
                ? GeneralUtils.roundToFirstNoneZeroN(
                    info.totalValue / stashViewSettings.chaosToDivRate
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
