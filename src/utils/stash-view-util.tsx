import { StashViewItemSummary } from "@generated/graphql";
import { StashViewSettings } from "pages/poe/stash-view";

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
    if (settings.valueOverridesEnabled) {
      return (
        settings.itemGroupValueOverrides[item.itemGroupHashString ?? ""] ??
        item.valueChaos ??
        0
      );
    } else {
      return item.valueChaos ?? 0;
    }
  }

  public static itemStackTotalValue(
    settings: StashViewSettings,
    item: StashViewItemSummary
  ): number {
    return StashViewUtil.itemValue(settings, item) * item.quantity;
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
