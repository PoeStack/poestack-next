import { StashViewSettings } from "@contexts/stash-view-context";
import {
  StashViewItemSummary,
  StashViewStashSummary,
} from "@generated/graphql";

import { TFT_CATEGORIES } from "./tft-categories";

export class StashViewUtil {
  public static smartLimitOutput(
    limit: number,
    header: string | null,
    body: string[],
    footer: string | null,
    buffer: number = 0,
    joiner: string = "\n"
  ): string {
    let size = (header?.length ?? 0) + (footer?.length ?? 0) + buffer;
    const out: string[] = [];
    if (header?.length ?? 0 > 0) {
      out.push(header!);
    }
    for (const line of body) {
      if (size + line.length + 2 < limit) {
        out.push(line);
        size += line.length + 2;
      }
    }
    if (footer?.length ?? 0 > 0) {
      out.push(footer!);
    }
    return out.join(joiner);
  }

  public static itemValue(
    settings: StashViewSettings,
    item: StashViewItemSummary
  ): number {
    let value = item.valueChaos ?? 0;

    if (settings.valueOverridesEnabled) {
      const overrideValue =
        settings.itemGroupValueOverrides[item.itemGroupHashString ?? ""];
      if (overrideValue !== undefined && overrideValue !== null) {
        value = overrideValue;
      }
    }

    if (["TFT-Bulk", "Forum Shop"].includes(settings.selectedExporter ?? "")) {
      value = value * ((settings.exporterListedValueMultipler ?? 100) / 100);
    }

    return value;
  }

  public static itemStackTotalValue(
    settings: StashViewSettings,
    item: StashViewItemSummary
  ): number {
    return StashViewUtil.itemValue(settings, item) * item.quantity;
  }

  public static searchItems(
    settings: StashViewSettings,
    summary: StashViewStashSummary
  ): StashViewItemSummary[] {
    const filters: ((item: StashViewItemSummary) => boolean)[] = [
      (e) =>
        !settings.filterCheckedTabs ||
        settings.checkedTabIds.includes(e.stashId),
      (e) =>
        settings.searchString.trim().length === 0 ||
        e.searchableString.includes(settings.searchString.toLowerCase()),
      (e) =>
        !settings.excludedItemGroupIds ||
        !e.itemGroupHashString ||
        !settings.excludedItemGroupIds.includes(e.itemGroupHashString),
      (e) =>
        (!settings.minItemQuantity || settings.minItemQuantity <= e.quantity) &&
        (!settings.minItemStackValue ||
          settings.minItemStackValue <
            StashViewUtil.itemStackTotalValue(settings, e)) &&
        (!settings.minItemValue ||
          settings.minItemValue < StashViewUtil.itemValue(settings, e)),
      (e) => {
        if (
          settings.selectedExporter === "TFT-Bulk" &&
          settings.tftSelectedCategory
        ) {
          const category = TFT_CATEGORIES[settings.tftSelectedCategory!]!;
          if (category && category.filter && !category.filter(e)) {
            return false;
          }

          return (
            !settings.checkedTags ||
            settings.checkedTags.some((t) => t === e.itemGroupTag)
          );
        }
        return true;
      },
    ];

    const result = [...summary.items].filter((e) => filters.every((f) => f(e)));
    return result;
  }

  public static reduceItemStacks(
    items: StashViewItemSummary[]
  ): StashViewItemSummary[] {
    const groups: Record<string, StashViewItemSummary> = {};
    for (const item of items) {
      if (item.itemGroupHashString) {
        let group = groups[item.itemGroupHashString];
        if (!group) {
          group = { ...item };
          groups[item.itemGroupHashString] = group;
        } else {
          group.quantity += item.quantity;
        }
      }
    }
    return Object.values(groups);
  }
}
