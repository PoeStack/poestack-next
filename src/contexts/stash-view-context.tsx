import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

import { gql, useQuery } from "@apollo/client";
import StyledLoading from "@components/library/styled-loading";
import {
  CharacterSnapshotItem,
  PoeStashTab,
  StashViewItemSummary,
  StashViewSnapshotRecord,
  StashViewStashSummary,
  StashViewValueSnapshotSeries,
} from "@generated/graphql";
import { StashViewTab } from "@models/stash-view-models";
import { StashViewUtil } from "@utils/stash-view-util";
import { TFT_CATEGORIES } from "@utils/tft-categories";

import { useStashViewTabs } from "./stash-view-tabs-context";
import { usePoeStackAuth } from "./user-context";

export interface StashViewSettings {
  league: string | undefined | null;
  chaosToDivRate: number | null;

  searchString: string;
  filterCheckedTabs: boolean;

  selectedTabId: string | null;
  checkedTabIds: string[];
  snapshotJobId: string | null;
  lastSnapshotJobCompleteTimestamp: Date | null;

  checkedTags: string[] | null;

  stashTabGroups: Record<string, { name: string; stashTabIds: string[] }>;

  valueOverridesEnabled: boolean;
  itemGroupValueOverrides: Record<string, number>;

  selectedGraph: string;

  stackReducerEnabled: boolean | null;
  selectedExporter: string | null;
  exporterListedValueMultipler: number;

  forumShopMaxStackSizeSetting: string;
  forumShopTabIndexOffset: number;

  relativeTimerseriesFilterMins: number | null;

  excludedItemGroupIds: string[];

  minItemValue: number | null;
  minItemStackValue: number | null;
  minItemQuantity: number | null;

  sortKey: string | null;
  sortDirection: string | null;

  ign: string | null;
  tftSelectedCategory: string | null;
  tftSelectedSubCategory: string | null;

  valueToFractionMode: string;
}

const defaultStashViewSettings: StashViewSettings = {
  league: null,
  chaosToDivRate: null,

  searchString: "",
  filterCheckedTabs: true,

  checkedTabIds: [],
  selectedTabId: null,
  snapshotJobId: null,
  lastSnapshotJobCompleteTimestamp: null,

  stackReducerEnabled: true,
  checkedTags: null,

  stashTabGroups: {},

  valueOverridesEnabled: false,
  itemGroupValueOverrides: {},

  selectedGraph: "net value",

  selectedExporter: null,
  exporterListedValueMultipler: 100,

  forumShopMaxStackSizeSetting: "max",
  forumShopTabIndexOffset: 0,

  relativeTimerseriesFilterMins: null,

  excludedItemGroupIds: [],

  minItemQuantity: null,
  minItemStackValue: null,
  minItemValue: null,

  ign: null,
  tftSelectedCategory: "compasses",
  tftSelectedSubCategory: null,

  sortKey: "stackValue",
  sortDirection: "desc",

  valueToFractionMode: "Max",
};

export interface StashViewContext {
  stashViewSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
  tab: {
    items: CharacterSnapshotItem[] & { x: number; y: number };
    type: string | null;
  } | null;
  stashTabs: StashViewTab[] | null;
  stashSummary:
    | (StashViewStashSummary & { updatedAtTimestamp?: string })
    | null;
  valueSnapshots: StashViewValueSnapshotSeries[];

  snapshotRecords: StashViewSnapshotRecord[] | null;
  selectedSnapshotRecord: StashViewSnapshotRecord | null;
  setSelectedSnapshotRecord: (e: StashViewSnapshotRecord | null) => void;
  refetchStashTabs: () => void;
  refetchValueSnapshots: () => void;
  refetchSnapshotRecords: () => void;
}

const initalContext: StashViewContext = {
  stashViewSettings: defaultStashViewSettings,
  setStashViewSettings: (e: StashViewSettings) => {},
  tab: null,
  stashTabs: null,
  stashSummary: null,
  valueSnapshots: [],
  snapshotRecords: null,
  selectedSnapshotRecord: null,
  setSelectedSnapshotRecord: () => {},
  refetchStashTabs: () => {},
  refetchValueSnapshots: () => {},
  refetchSnapshotRecords: () => {},
};

export const StashViewContext = createContext(initalContext);

export function StashViewContextProvider({
  cacheId,
  children,
}: {
  cacheId: string;
  children: any;
}) {
  const { profile } = usePoeStackAuth();

  const router = useRouter();
  const { league } = router.query;

  const { stashTabs } = useStashViewTabs();

  const [stashViewSettings, setStashViewSettings] =
    useState<StashViewSettings | null>(null);

  useEffect(() => {
    if (league) {
      const loadedStashSettings = JSON.parse(
        localStorage.getItem(
          `${cacheId}_${profile?.userId}_${league}_stash_view_settings_3`
        ) ?? "{}"
      );

      console.log("loaded stash settings", league, loadedStashSettings);
      const combinedSettings = {
        ...defaultStashViewSettings,
        ...loadedStashSettings,
        league: league,
      };
      setStashViewSettings(combinedSettings);

      console.log("set stash settings", league, combinedSettings);
    } else {
      router.push({ query: { league: "Crucible" } });
    }
  }, [league, profile?.userId, router.basePath, cacheId]);

  useEffect(() => {
    if (stashViewSettings && league) {
      console.log("storing settings", league, stashViewSettings);
      localStorage.setItem(
        `${cacheId}_${profile?.userId}_${league}_stash_view_settings_3`,
        JSON.stringify(stashViewSettings)
      );
    }
  }, [stashViewSettings, league, cacheId]);

  const [tab, setTab] = useState<{
    items: CharacterSnapshotItem[] & { x: number; y: number };
    type: string | null;
  } | null | null>(null);
  useEffect(() => {
    if (stashViewSettings?.selectedTabId && league && profile?.userId) {
      StashViewUtil.fetchTab(
        league as string,
        profile?.opaqueKey!,
        stashViewSettings.selectedTabId
      ).then((v) => setTab(v));
    }
  }, [
    stashViewSettings?.selectedTabId,
    stashViewSettings?.lastSnapshotJobCompleteTimestamp,
    league,
    profile?.userId,
  ]);

  const [selectedSnapshotRecord, setSelectedSnapshotRecord] =
    useState<StashViewSnapshotRecord | null>(null);
  const [snapshotRecords, setSnapshotRecords] = useState<
    StashViewSnapshotRecord[]
  >([]);
  const { refetch: refetchSnapshotRecords } = useQuery(
    gql`
      query StashViewSnapshotRecords($league: String!) {
        stashViewSnapshotRecords(league: $league) {
          timestamp
          favorited
          name
          fixedValue
          lpValue
          lpStockValue
        }
      }
    `,
    {
      variables: { league: league },
      pollInterval: 1000 * 60,
      onCompleted(data) {
        setSnapshotRecords(data.stashViewSnapshotRecords);
      },
    }
  );

  const [stashSummary, setTabSummary] = useState<
    (StashViewStashSummary & { updatedAtTimestamp?: string }) | null
  >(null);
  async function pullStashSummary() {
    try {
      if (snapshotRecords) {
        const summary = await StashViewUtil.fetchStashSummary(
          stashViewSettings?.league!,
          profile?.opaqueKey!,
          selectedSnapshotRecord?.timestamp ?? snapshotRecords[0].timestamp
        );
        setTabSummary(summary);
      }
    } catch (error) {
      console.log("Error loading summary", error);
    }
  }
  useEffect(() => {
    pullStashSummary();
  }, [
    stashViewSettings?.league,
    profile?.userId,
    router.basePath,
    stashViewSettings?.lastSnapshotJobCompleteTimestamp,
    snapshotRecords,
    selectedSnapshotRecord,
  ]);

  const [valueSnapshots, setValueSnapshots] = useState<
    StashViewValueSnapshotSeries[]
  >([]);
  const { refetch: refetchValueSnapshots } = useQuery(
    gql`
      query StashViewValueSnapshotSeries($league: String!) {
        stashViewValueSnapshotSeries(league: $league) {
          stashId
          values
          timestamps
        }
      }
    `,
    {
      skip: !league,
      variables: {
        league: league,
      },
      onCompleted(data) {
        setValueSnapshots(data.stashViewValueSnapshotSeries);
      },
      onError(error) {
        setValueSnapshots([]);
      },
    }
  );

  useQuery(
    gql`
      query CurrenyValuePullDiv($key: String!, $league: String!) {
        div: itemGroupValueChaos(key: $key, league: $league)
      }
    `,
    {
      skip: !league || !stashViewSettings,
      variables: {
        league: league,
        key: "divine orb",
      },
      fetchPolicy: "cache-first",
      onCompleted(data) {
        const div: number | null = data?.div ?? null;
        setStashViewSettings({
          ...(stashViewSettings as StashViewSettings),
          chaosToDivRate: div,
        });
      },
    }
  );

  const value: StashViewContext = {
    stashViewSettings: stashViewSettings ?? defaultStashViewSettings,
    setStashViewSettings: (e) => {
      if (
        e.selectedExporter === "TFT-Bulk" &&
        !TFT_CATEGORIES[e.tftSelectedCategory!]?.overrideEnabled
      ) {
        e.valueOverridesEnabled = false;
      }

      if (stashTabs?.length && !e.selectedTabId) {
        e.selectedTabId = stashTabs[0].id;
      }

      setStashViewSettings(e);
    },
    tab: tab,
    stashTabs: stashTabs,
    stashSummary: stashSummary,
    snapshotRecords: snapshotRecords,
    selectedSnapshotRecord: selectedSnapshotRecord,
    valueSnapshots: valueSnapshots,
    setSelectedSnapshotRecord: setSelectedSnapshotRecord,
    refetchStashTabs: () => {},
    refetchSnapshotRecords: refetchSnapshotRecords,
    refetchValueSnapshots: refetchValueSnapshots,
  };

  let loading: string | null = null;
  if (!stashTabs) {
    loading = "Loading stash tabs";
  }
  if (!league) {
    loading = "Loading league";
  }

  if (loading) {
    return (
      <>
        <StyledLoading message={loading} />
      </>
    );
  }

  return (
    <StashViewContext.Provider value={value}>
      {children}
    </StashViewContext.Provider>
  );
}

export const useStashViewContext = () => useContext(StashViewContext);
