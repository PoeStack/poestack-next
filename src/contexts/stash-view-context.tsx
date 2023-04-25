import { gql, useQuery } from "@apollo/client";
import {
  CharacterSnapshotItem,
  PoeStashTab,
  StashViewStashSummary,
  StashViewValueSnapshotSeries,
} from "@generated/graphql";
import { createContext, useContext, useEffect, useState } from "react";
import { usePoeStackAuth } from "./user-context";
import { useRouter } from "next/router";
import StyledLoading from "@components/styled-loading";

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

  selectedExporter: string;
  exporterListedValueMultipler: number;

  forumShopMaxStackSizeSetting: string;
  forumShopTabIndexOffset: number;

  relativeTimerseriesFilterMins: number | null;

  excludedItemGroupIds: string[];

  ign: string | null;
  tftSelectedCategory: string | null;
  tftSelectedSubCategory: string | null;
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

  checkedTags: null,

  stashTabGroups: {},

  valueOverridesEnabled: false,
  itemGroupValueOverrides: {},

  selectedGraph: "net value",

  selectedExporter: "Forum Shop",
  exporterListedValueMultipler: 100,

  forumShopMaxStackSizeSetting: "max",
  forumShopTabIndexOffset: 0,

  relativeTimerseriesFilterMins: null,

  excludedItemGroupIds: [],

  ign: null,
  tftSelectedCategory: null,
  tftSelectedSubCategory: null,
};

export interface StashViewContext {
  stashViewSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
  tab: {
    items: CharacterSnapshotItem[] & { x: number; y: number };
    type: string | null;
  } | null;
  stashTabs: PoeStashTab[];
  stashSummary: StashViewStashSummary | null;
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

export function StashViewContextProvider({ children }) {
  const { profile } = usePoeStackAuth();

  const router = useRouter();
  const { league } = router.query;

  const [stashViewSettings, setStashViewSettings] =
    useState<StashViewSettings | null>(null);

  useEffect(() => {
    if (league) {
      const loadedStashSettings = JSON.parse(
        localStorage.getItem(`${league}_stash_view_settings`) ?? "{}"
      );

      console.log("loaded stash settings", league, loadedStashSettings);
      const combinedSettings = {
        ...defaultStashViewSettings,
        ...loadedStashSettings,
        league: league,
      };
      setStashViewSettings(combinedSettings);

      console.log("set stash settings", league, combinedSettings);
    }
  }, [league]);

  useEffect(() => {
    if (stashViewSettings && league) {
      console.log("storing settings", league, stashViewSettings);
      localStorage.setItem(
        `${league}_stash_view_settings`,
        JSON.stringify(stashViewSettings)
      );
    }
  }, [stashViewSettings]);

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

  const [stashSummary, setTabSummary] = useState<StashViewStashSummary | null>(
    null
  );
  const { refetch: refetchSummaries } = useQuery(
    gql`
      query StashExportSearchSummary($search: StashViewStashSummarySearch!) {
        stashViewStashSummary(search: $search) {
          itemGroups {
            hashString
            key
            tag
            properties
            baseType
            icon
            inventoryMaxStackSize
            displayName
            createdAtTimestamp
          }
          items {
            itemId
            userId
            league
            stashId
            x
            y
            quantity
            searchableString
            itemGroupHashString
            itemGroupTag
            valueChaos
            totalValueChaos
            icon
          }
        }
      }
    `,
    {
      skip: !league,
      onCompleted(data) {
        const tabSummary: StashViewStashSummary = data.stashViewStashSummary;
        setTabSummary({
          ...tabSummary,
          items: tabSummary.items.map((e) => ({
            ...e,
            league: league as string,
            itemGroup: e.itemGroupHashString
              ? tabSummary.itemGroups.find(
                  (ig) => ig.hashString === e.itemGroupHashString
                )
              : null,
          })),
        });
      },
      variables: {
        search: {
          league: league!,
          opaqueKey: null,
          execludeNonItemGroups: false,
        },
      },
    }
  );

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
    setStashViewSettings: setStashViewSettings,
    tab: tab,
    stashTabs: stashTabs,
    stashSummary: stashSummary,
    valueSnapshots: valueSnapshots,
    refetchStashTabs: () => {
      refetchStashTabs({
        variables: {
          league: league,
          forcePull: true,
        },
      });
    },
    refetchSummaries: refetchSummaries,
    refetchValueSnapshots: refetchValueSnapshots,
  };

  if (!stashTabs || !stashViewSettings || !stashSummary || !league) {
    return (
      <>
        <StyledLoading />
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
