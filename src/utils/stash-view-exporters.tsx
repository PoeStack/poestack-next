import { PoeStashTab, StashViewItemSummary } from "@generated/graphql";
import { StashViewSettings } from "pages/poe/stash-view";
import { StashViewUtil } from "./stash-view-util";

export function exportToForumShop(
  items: StashViewItemSummary[],
  tabs: PoeStashTab[],
  stashSettings: StashViewSettings
): string {
  let output: string[] = [];

  const filteredItems = items.filter((e) => e.valueChaos ?? 0 > 0);
  for (const item of filteredItems) {
    const tab = tabs.find((e) => e.id === item.stashId);
    if (tab) {
      const index = tab.flatIndex! + 1;

      const itemValue = StashViewUtil.itemValue(stashSettings, item);
      const listedCurrenyType = "chaos";

      output.push(
        `[linkItem location="Stash${
          index + (stashSettings.forumShopTabIndexOffset ?? 0)
        }" league="${item.league}" x="${item.x}" y="${
          item.y
        }"] ~b/o ${itemValue}/${1} ${listedCurrenyType}`
      );
    }
  }

  return StashViewUtil.smartLimitOutput(3000, null, output, null);
}
