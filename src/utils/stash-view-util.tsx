import { StashViewItemSummary } from "@generated/graphql";
import { StashViewSettings } from "pages/poe/stash-view";

export class StashViewUtil {
  public static itemStackTotalValue(
    settings: StashViewSettings,
    item: StashViewItemSummary
  ): number {
    if (settings.valueOverridesEnabled) {
      return (
        (settings.itemGroupValueOverrides[item.itemGroupHashString ?? ""] ??
          item.valueChaos ??
          0) * item.quantity
      );
    } else {
      return (item.valueChaos ?? 0) * item.quantity;
    }
  }

  public static searchItems(
    settings: StashViewSettings,
    items: StashViewItemSummary[]
  ): StashViewItemSummary[] {
    const filters: ((item) => boolean)[] = [
      (e) =>
        !settings.filterCheckedTabs ||
        settings.checkedTabIds.includes(e.stashId),
      (e) =>
        settings.searchString.trim().length === 0 ||
        e.searchableString.includes(settings.searchString.toLowerCase()),
    ];

    const result = [...items].filter((e) => filters.every((f) => f(e)));
    return result;
  }
}
