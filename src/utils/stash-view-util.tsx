import client from "poe-stack-apollo-client";

import { gql } from "@apollo/client";
import { StashViewSettings } from "@contexts/stash-view-context";
import {
  StashViewItemSummary,
  StashViewSnapshotRecord,
  StashViewStashSummary,
} from "@generated/graphql";
import {
  StashViewSnapshotGrouped,
  StashViewSnapshotItemGroups,
  StashViewSnapshotUntracked,
  StashViewTrackedItemEntry,
} from "@models/stash-view-models";

import { GeneralUtils } from "./general-util";
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
        !!StashViewUtil.itemEntryToName(e)
          ?.toLocaleLowerCase()
          ?.includes(settings.searchString.toLowerCase()),
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
            settings.checkedTags.some((t) => t === e.itemGroup?.tag)
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

  public static itemEntryToName(item) {
    return GeneralUtils.capitalize(
      item.searchableString ??
        item?.itemGroup?.displayName ??
        item?.itemGroup?.key
    );
  }

  public static async fetchTab(
    league: string,
    opaqueKey: string,
    tabId: string
  ) {
    const tabResp = await fetch(
      `https://poe-stack-stash-view.nyc3.digitaloceanspaces.com/v1/stash/${opaqueKey}/${league}/tabs/${tabId}.json?ms=${Date.now()}`
    );

    if (tabResp.ok) {
      return await tabResp.json();
    } else {
      return null;
    }
  }

  public static async fetchSnapshotRecords(
    league: string
  ): Promise<StashViewSnapshotRecord[] | null> {
    const snapshotRecords = await client.query({
      query: gql`
        query StashViewSnapshotRecords($league: String!) {
          stashViewSnapshotRecords(league: $league) {
            userId
            league
            timestamp
            favorited
            name
          }
        }
      `,
      variables: { league: league },
    });
    return snapshotRecords?.data?.stashViewSnapshotRecords;
  }

  public static async fetchStashTabs(league: string, opaqueKey: string) {
    const stashTabsResp = await fetch(
      `https://poe-stack-stash-view.nyc3.digitaloceanspaces.com/v1/stash/${opaqueKey}/${league}/tabs.json?ms=${Date.now()}`
    );

    if (stashTabsResp.ok) {
      const json = await stashTabsResp.json();
      return json?.tabs;
    } else {
      return null;
    }
  }

  public async fetchSnapshotValueSeries(league: string) {
    const snapshotSeries = await client.query({
      query: gql`
        query StashViewValueSnapshotSeries($league: String!) {
          stashViewValueSnapshotSeries(league: $league) {
            stashId
            values
            timestamps
          }
        }
      `,
      variables: { league: league },
    });
  }

  public static async fetchMostRecentStashSummary(
    league: string,
    opaqueKey: string
  ): Promise<(StashViewStashSummary & { updatedAtTimestamp?: string }) | null> {
    const currentSnapshotResp = await fetch(
      `https://poe-stack-stash-view.nyc3.digitaloceanspaces.com/v1/stash/${opaqueKey}/${league}/snapshots/current_snapshot.json`
    );

    if (currentSnapshotResp.ok) {
      const currentSnapshot = await currentSnapshotResp.json();
      return await this.fetchStashSummary(
        league,
        opaqueKey,
        currentSnapshot.timestamp
      );
    }

    return null;
  }

  public static async fetchStashSummary(
    league: string,
    opaqueKey: string,
    timestampISO: string
  ): Promise<StashViewStashSummary & { updatedAtTimestamp?: string }> {
    const trackedResp = await fetch(
      `https://poe-stack-stash-view.nyc3.digitaloceanspaces.com/v1/stash/${opaqueKey}/${league}/snapshots/${timestampISO}/tracked.json`
    );
    const untrackedResp = await fetch(
      `https://poe-stack-stash-view.nyc3.digitaloceanspaces.com/v1/stash/${opaqueKey}/${league}/snapshots/${timestampISO}/untracked.json`
    );
    const itemGroupsResp = await fetch(
      `https://poe-stack-stash-view.nyc3.digitaloceanspaces.com/v1/stash/${opaqueKey}/${league}/snapshots/${timestampISO}/item_groups.json`
    );

    if (
      trackedResp.status === 403 ||
      untrackedResp.status === 403 ||
      itemGroupsResp.status === 403
    ) {
      return {
        itemGroups: [],
        items: [],
      };
    } else {
      const trackedJson: StashViewSnapshotGrouped = await trackedResp.json();
      const untrackedJson: StashViewSnapshotUntracked =
        await untrackedResp.json();
      const itemGroupsJson: StashViewSnapshotItemGroups =
        await itemGroupsResp.json();

      const items: any[] = [];

      for (const [stashId, entries] of [
        ...Object.entries(trackedJson.entriesByTab),
        ...Object.entries(untrackedJson.entriesByTab),
      ]) {
        for (const item of entries) {
          const itemGroup =
            "itemGroupHashString" in item
              ? itemGroupsJson.itemGroups.find(
                  (ig) => ig.hashString === item.itemGroupHashString
                )
              : null;
          items.push({
            ...item,
            stashId: stashId,
            league: league as string,
            itemGroup: itemGroup,
          });
        }
      }

      return {
        itemGroups: itemGroupsJson.itemGroups,
        updatedAtTimestamp: trackedJson.timestamp,
        items: items,
      };
    }
  }
}
