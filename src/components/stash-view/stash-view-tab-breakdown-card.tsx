import CurrencyValueDisplay from "@components/currency-value-display";
import StyledCard from "@components/styled-card";
import { usePoeLeagueCtx } from "@contexts/league-context";
import { StashViewItemSummary, PoeStashTab } from "@generated/graphql";
import { StashViewUtil } from "@utils/stash-view-util";
import { StashViewSettings } from "pages/poe/stash-view";

export function StashViewTabBreakdownTable({
  items,
  tabs,
  stashSettings,
  setStashViewSettings,
}: {
  items: StashViewItemSummary[];
  tabs: PoeStashTab[];
  stashSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
}) {
  const { league } = usePoeLeagueCtx();

  const tabValueCache: Record<string, number> = {};
  const tagValueCache: Record<string, number> = {};
  StashViewUtil.searchItems(stashSettings, items).forEach((e) => {
    const totalStackValue = StashViewUtil.itemStackTotalValue(stashSettings, e);

    tabValueCache[e.stashId] =
      (tabValueCache[e.stashId] ?? 0) + totalStackValue;
    tagValueCache[e.itemGroupTag ?? "na"] =
      (tagValueCache[e.itemGroupTag ?? "na"] ?? 0) + totalStackValue;
  });

  return (
    <>
      <StyledCard>
        <div className="flex flex-col space-y-2">
          <div>Value Breakdown</div>
          <div className="flex">
            <div className="w-full">
              {Object.entries(tabValueCache)
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
              {Object.entries(tagValueCache)
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
      </StyledCard>
    </>
  );
}
