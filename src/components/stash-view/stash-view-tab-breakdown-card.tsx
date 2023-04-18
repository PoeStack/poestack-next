import CurrencyValueDisplay from "@components/currency-value-display";
import StyledCard from "@components/styled-card";
import { usePoeLeagueCtx } from "@contexts/league-context";
import {
  StashViewItemSummary,
  PoeStashTab,
  StashViewStashSummary,
} from "@generated/graphql";
import { StashViewUtil } from "@utils/stash-view-util";
import { StashViewSettings } from "pages/poe/stash-view";
import { useEffect, useState } from "react";

export function StashViewTabBreakdownTable({
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
  const { league } = usePoeLeagueCtx();

  const [cache, setCache] = useState<{
    tabValueCache: Record<string, number>;
    tagValueCache: Record<string, number>;
  }>({ tabValueCache: {}, tagValueCache: {} });

  useEffect(() => {
    const nextCache = { tabValueCache: {}, tagValueCache: {} };
    StashViewUtil.searchItems(stashSettings, stashSummary.items).forEach(
      (e) => {
        const totalStackValue = StashViewUtil.itemStackTotalValue(
          stashSettings,
          e
        );

        nextCache.tabValueCache[e.stashId] =
          (nextCache.tabValueCache[e.stashId] ?? 0) + totalStackValue;
        nextCache.tagValueCache[e.itemGroupTag ?? "na"] =
          (nextCache.tagValueCache[e.itemGroupTag ?? "na"] ?? 0) +
          totalStackValue;
      }
    );

    setCache(nextCache);
  }, [stashSummary, stashSettings]);

  return (
    <>
      <div className="flex flex-col space-y-2">
        <div>Value Breakdown</div>
        <div className="flex">
          <div className="w-full">
            {Object.entries(cache.tabValueCache)
              .sort((a, b) => b[1] - a[1])
              .map(([stashId, value]) => {
                const stash = tabs.find((e) => e.id === stashId);
                return (
                  <>
                    <div className="grid grid-cols-2">
                      <div>{stash?.name}</div>
                      <CurrencyValueDisplay pValue={value} league={league} />
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
                    <div className="grid grid-cols-2">
                      <div>{tag}</div>
                      <CurrencyValueDisplay pValue={value} league={league} />
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
