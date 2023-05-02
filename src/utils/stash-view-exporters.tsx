import { StashViewSettings } from "@contexts/stash-view-context";
import { PoeStashTab, StashViewStashSummary } from "@generated/graphql";

import { StashViewUtil } from "./stash-view-util";

export class StashViewExporters {
  public static exportToForumShop(
    summary: StashViewStashSummary,
    tabs: PoeStashTab[],
    stashSettings: StashViewSettings
  ): string {
    let output: string[] = [];

    const filteredItems = StashViewUtil.searchItems(stashSettings, summary)
      .filter((e) => !!e.valueChaos)
      .sort(
        (a, b) =>
          StashViewUtil.itemValue(stashSettings, b) -
          StashViewUtil.itemValue(stashSettings, a)
      );
    for (const item of filteredItems) {
      const tab = tabs.find((e) => e.id === item.stashId);
      if (tab) {
        const index =
          tab.flatIndex! + 1 + (stashSettings.forumShopTabIndexOffset ?? 0);

        const itemValue = StashViewUtil.itemValue(stashSettings, item);

        let fract = StashViewExporters.getWholeFractionString(
          itemValue,
          item.quantity
        );
        if (fract === "0") {
          fract = "1";
        }

        const listedCurrenyType = "chaos";
        output.push(
          `[linkItem location="Stash${
            index + (stashSettings.forumShopTabIndexOffset ?? 0)
          }" league="${item.league}" x="${item.x}" y="${
            item.y
          }"] ~b/o ${fract} ${listedCurrenyType}`
        );
      }
    }

    return StashViewUtil.smartLimitOutput(50000, null, output, null, 100);
  }

  public static getWholeFractionString(x: number, y: number): string {
    const numerator = x * y;
    const denominator = y;

    const fraction = numerator / denominator;
    const fracNumerator = Math.round(fraction * denominator);

    return `${fracNumerator}/${denominator}`;
  }
}
