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

  public static findItemsToSell(numItems: number, itemValue: number): string {
    // Calculate the target value for each item
    const targetValue = Math.round(itemValue);

    // Sort the items by their fractional value
    const sortedItems = Array.from({ length: numItems }, (_, i) => i).sort(
      (i, j) => itemValue - targetValue
    );

    // Initialize the total value of the items to zero
    let totalValue = 0;

    // Initialize the list of items to sell to an empty list
    const itemsToSell: number[] = [];

    // Iterate over the sorted items
    for (const itemIndex of sortedItems) {
      // If the total value plus the value of the item is less than or equal to the target value,
      // add the item to the list of items to sell and update the total value
      if (totalValue + itemValue <= targetValue) {
        itemsToSell.push(itemIndex);
        totalValue += itemValue;
      }
    }

    const dec = itemsToSell.length + 1;
    return `${Math.floor(itemValue * dec)}/${dec}`;
  }

  public static itemStackTotalValue(
    settings: StashViewSettings,
    item: StashViewItemSummary
  ): number {
    return StashViewUtil.itemValue(settings, item) * item.quantity;
  }

  public static searchItems(
    settings: StashViewSettings,
    summary: StashViewStashSummary,
    reduceStack: boolean = false
  ): StashViewItemSummary[] {
    const filters: ((item: StashViewItemSummary) => boolean)[] = [
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

    const prefilter = [...summary.items].filter(
      (e) =>
        !settings.filterCheckedTabs ||
        settings.checkedTabIds.includes(e.stashId)
    );

    const result = (
      reduceStack ? StashViewUtil.reduceItemStacks(prefilter) : prefilter
    ).filter((e) => filters.every((f) => f(e)));
    return result;
  }

  private static reduceItemStacks(
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
