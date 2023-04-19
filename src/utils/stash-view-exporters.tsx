import {
  PoeStashTab,
  StashViewItemSummary,
  StashViewStashSummary,
} from "@generated/graphql";
import { StashViewSettings } from "pages/poe/stash-view";
import { StashViewUtil } from "./stash-view-util";
import { GeneralUtils } from "./general-util";

export class StashViewExporters {
  public static exportTftCompassesBulk(
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
      output.push(`wts compasses ${item.quantity} ${item.searchableString}`);
    }

    return StashViewUtil.smartLimitOutput(3000, null, output, null, 100);
  }

  public static exportTftGenericBulk(
    summary: StashViewStashSummary,
    tabs: PoeStashTab[],
    stashSettings: StashViewSettings
  ): string {
    const filteredItems = StashViewUtil.searchItems(stashSettings, summary)
      .filter((e) => !!e.valueChaos)
      .sort(
        (a, b) =>
          StashViewUtil.itemValue(stashSettings, b) -
          StashViewUtil.itemValue(stashSettings, a)
      );

    let totalValue = 0;
    let totalListedValue = 0;
    let output: string[] = [];
    for (const item of filteredItems) {
      const itemValue = StashViewUtil.itemValue(stashSettings, item);
      totalValue += item.valueChaos ?? 0;
      totalListedValue += itemValue;
    }

    const header = `WTS ${stashSettings.league}\nIGN ${
      stashSettings.ign
    }\nPoeStack Price: ${Math.round(
      totalValue
    )} :chaos: (${StashViewExporters.chaosToDivPlusChaos(
      stashSettings.chaosToDivRate!,
      totalValue
    )}) at ratio [${GeneralUtils.roundToFirstNoneZeroN(
      stashSettings.chaosToDivRate!
    )} :chaos: / 1 :divine:]\nAsking Price: ${Math.round(
      totalListedValue
    )} :chaos: (${StashViewExporters.chaosToDivPlusChaos(
      stashSettings.chaosToDivRate!,
      totalListedValue
    )}) ${stashSettings.tftValueMultiplier!}% of PoeStack Price at ratio [${GeneralUtils.roundToFirstNoneZeroN(
      stashSettings.chaosToDivRate!
    )} :chaos: / 1 :divine:]`;

    return StashViewUtil.smartLimitOutput(3000, header, output, null, 100);
  }

  public static chaosToDivPlusChaos(
    divRate: number,
    totalChaos: number
  ): string {
    const div = Math.floor(totalChaos / divRate);
    const divMsg = `${Math.floor(totalChaos / divRate)} :divine: + `;
    return (
      (div > 0 ? divMsg : "") + `${Math.round(totalChaos % divRate)} :chaos:`
    );
  }

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

        let fract = StashViewExporters.closestFraction(
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

  private static closestFraction(x: number, y: number): string {
    let numerator = Math.round(x * y);
    let denominator = y;
    let diff = Math.abs(x - numerator / denominator);

    for (let d = y - 1; d >= 1; d--) {
      const n = Math.round(x * d);
      const newDiff = Math.abs(x - n / d);
      if (newDiff < diff) {
        numerator = n;
        denominator = d;
        diff = newDiff;
      }
    }

    const gcd = StashViewExporters.findGcd(numerator, denominator);
    numerator /= gcd;
    denominator /= gcd;
    if (denominator === 1) {
      return `${numerator}`;
    }
    return `${numerator}/${denominator}`;
  }

  private static findGcd(a: number, b: number): number {
    if (b === 0) {
      return a;
    }
    return StashViewExporters.findGcd(b, a % b);
  }
}
