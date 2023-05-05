import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

import { gql, useQuery } from "@apollo/client";
import StyledLoading from "@components/library/styled-loading";
import {
  CharacterSnapshotItem,
  PoeStashTab,
  StashViewItemSummary,
  StashViewStashSummary,
  StashViewValueSnapshotSeries,
} from "@generated/graphql";
import { TFT_CATEGORIES } from "@utils/tft-categories";

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
  filterCheckedTabs: false,

  checkedTabIds: [],
  selectedTabId: null,
  snapshotJobId: null,
  lastSnapshotJobCompleteTimestamp: null,

  stackReducerEnabled: null,
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
  stashTabs: PoeStashTab[];
  stashSummary:
    | (StashViewStashSummary & { updatedAtTimestamp?: string })
    | null;
  valueSnapshots: StashViewValueSnapshotSeries[];
  refetchStashTabs: () => void;
  refetchSummaries: () => void;
  refetchValueSnapshots: () => void;
}

const initalContext: StashViewContext = {
  stashViewSettings: defaultStashViewSettings,
  setStashViewSettings: (e: StashViewSettings) => {},
  tab: null,
  stashTabs: [],
  stashSummary: null,
  valueSnapshots: [],
  refetchStashTabs: () => {},
  refetchSummaries: () => {},
  refetchValueSnapshots: () => {},
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
      fetch(
        `https://poe-stack-stash-view.nyc3.digitaloceanspaces.com/tabs/${profile?.userId}/${league}/${stashViewSettings.selectedTabId}.json`
      )
        .then((v) => {
          if (v.ok) {
            return v.json();
          } else {
            setTab(null);
          }
        })
        .then((v) => {
          setTab(v);
        });
    }
  }, [
    stashViewSettings?.selectedTabId,
    stashViewSettings?.lastSnapshotJobCompleteTimestamp,
    league,
    profile?.userId,
  ]);

  const [stashTabs, setStashTabs] = useState<PoeStashTab[]>([]);
  const { refetch: refetchStashTabs } = useQuery<{
    stashTabs: PoeStashTab[];
  }>(
    gql`
      query StashTabs($league: String!, $forcePull: Boolean) {
        stashTabs(league: $league, forcePull: $forcePull) {
          id
          userId
          league
          parent
          name
          type
          index
          flatIndex
        }
      }
    `,
    {
      skip: !league,
      variables: {
        league: league,
        forcePull: false,
      },
      onCompleted(data) {
        setStashTabs(data.stashTabs);
      },
      onError(error) {
        setStashTabs([]);
      },
    }
  );

  const [stashSummary, setTabSummary] = useState<
    (StashViewStashSummary & { updatedAtTimestamp?: string }) | null
  >(null);
  async function pullStashSummary() {
    try {
      const summaryResp = await fetch(
        `https://poe-stack-stash-view.nyc3.digitaloceanspaces.com/tabs/${profile?.userId}/${league}/summary.json`
      );

      const itemGroupsResp = await fetch(
        `https://poe-stack-stash-view.nyc3.digitaloceanspaces.com/tabs/${profile?.userId}/${league}/summary_item_groups.json`
      );
      if (summaryResp.status === 403 || itemGroupsResp.status === 403) {
        setTabSummary({
          itemGroups: [],
          items: [],
        });
      } else {
        const summaryJson = await summaryResp.json();
        const itemGroupsJson = await itemGroupsResp.json();
        console.log("summary", summaryJson);
        console.log("groups", itemGroupsJson);

        const items: any[] = Object.values(summaryJson.tabs).flatMap(
          (e: any) => e.itemSummaries
        );

        setTabSummary({
          itemGroups: Object.values(itemGroupsJson.itemGroups),
          updatedAtTimestamp: itemGroupsJson.updatedAtTimestamp,
          items: items.map((e) => ({
            ...e,
            league: league as string,
            itemGroup: e.itemGroupHashString
              ? itemGroupsJson.itemGroups[e.itemGroupHashString]
              : null,
          })),
        });
      }
    } catch (error) {
      console.log("Error loading summary", error);
    }
  }
  useEffect(() => {
    pullStashSummary();
  }, [
    league,
    profile?.userId,
    router.basePath,
    stashViewSettings?.lastSnapshotJobCompleteTimestamp,
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
      setStashViewSettings(e);
    },
    tab: tab,
    stashTabs: stashTabs,
    stashSummary: stashSummary,
    valueSnapshots: valueSnapshots,
    refetchStashTabs: () => {
      refetchStashTabs({
        league: league,
        forcePull: true,
      });
    },
    refetchSummaries: pullStashSummary,
    refetchValueSnapshots: refetchValueSnapshots,
  };

  let loading: string | null = null;
  if (!stashTabs) {
    loading = "Loading stash tabs";
  }
  if (!stashSummary) {
    loading = "Loading summary";
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
