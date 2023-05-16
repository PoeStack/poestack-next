import { ItemGroup } from "@generated/graphql";

export interface StashViewItemEntry {
  x: number;
  y: number;
  quantity: number;
}

export interface StashViewTrackedItemEntry extends StashViewItemEntry {
  itemGroupHashString: string;
  fixedValue: number;
  stockValue: number;
  valueChaos: number;
  totalValueChaos: number;
}

export interface StashViewUntrackedItemEntry extends StashViewItemEntry {
  searchableString: string;
  icon: string;
}

export interface StashViewSnapshotHeader {
  userId: string;
  timestamp: string;
}

export interface StashViewSnapshotGrouped {
  timestamp: string;
  entriesByTab: Record<string, StashViewTrackedItemEntry[]>;
}

export interface StashViewSnapshotItemGroups {
  timestamp: string;
  itemGroups: ItemGroup[];
}

export interface StashViewSnapshotUntracked {
  timestamp: string;
  entriesByTab: Record<string, StashViewUntrackedItemEntry[]>;
}

export interface StashViewTab {
  id: string;
  parent: string;
  color: string;
  folder: boolean;
  name: string;
  type: string;
  index: number;
  flatIndex: number;
}
