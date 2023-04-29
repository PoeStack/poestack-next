import CurrencyValueDisplay from "@components/currency-value-display";
import { useStashViewContext } from "@contexts/stash-view-context";
import { StashViewUtil } from "@utils/stash-view-util";
import { useEffect, useState } from "react";

export function StashViewTabBreakdownTable() {
  const { stashSummary, stashTabs, stashViewSettings, setStashViewSettings } =
    useStashViewContext();

  const [cache, setCache] = useState<{
    tabValueCache: Record<string, number>;
    tagValueCache: Record<string, number>;
  }>({ tabValueCache: {}, tagValueCache: {} });

  useEffect(() => {
    const nextCache = { tabValueCache: {}, tagValueCache: {} };
    StashViewUtil.searchItems(stashViewSettings, stashSummary!).forEach((e) => {
      const totalStackValue = StashViewUtil.itemStackTotalValue(
        stashViewSettings,
        e
      );

      nextCache.tabValueCache[e.stashId] =
        (nextCache.tabValueCache[e.stashId] ?? 0) + totalStackValue;
      nextCache.tagValueCache[e.itemGroupTag ?? "na"] =
        (nextCache.tagValueCache[e.itemGroupTag ?? "na"] ?? 0) +
        totalStackValue;
    });

    setCache(nextCache);
  }, [stashSummary, stashViewSettings]);

  return (
    <>
      <div className="flex flex-col space-y-2">
        <div>Value Breakdown</div>
        <div className="flex">
          <div className="w-full">
            {Object.entries(cache.tabValueCache)
              .sort((a, b) => b[1] - a[1])
              .map(([stashId, value]) => {
                const stash = stashTabs.find((e) => e.id === stashId);
                return (
                  <>
                    <div className="grid grid-cols-2 group">
                      <div
                        className={`cursor-pointer ${
                          stashViewSettings.selectedTabId === stashId
                            ? "text-content-accent"
                            : ""
                        } group-hover:text-content-accent`}
                        onClick={() => {
                          setStashViewSettings({
                            ...stashViewSettings,
                            selectedTabId: stashId,
                          });
                        }}
                      >
                        {stash?.name}
                      </div>
                      <div className="group-hover:text-content-accent">
                        <CurrencyValueDisplay
                          pValue={value}
                          league={stashViewSettings.league}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
          <div className="w-full">
            {Object.entries(cache.tagValueCache)
              .sort((a, b) => b[1] - a[1])
              .filter((e) => e[0] !== "na")
              .map(([tag, value]) => {
                return (
                  <>
                    <div className="grid grid-cols-2 group">
                      <div className="group-hover:text-content-accent">
                        {tag}
                      </div>
                      <div className="group-hover:text-content-accent">
                        <CurrencyValueDisplay
                          pValue={value}
                          league={stashViewSettings.league}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
