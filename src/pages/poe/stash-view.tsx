import "moment-timezone";
import { gql, useQuery } from "@apollo/client";
import StyledLoading from "@components/styled-loading";
import {
  CharacterSnapshotItem,
  PoeStashTab,
  StashViewStashSummary,
  StashViewValueSnapshotSeries,
} from "@generated/graphql";
import { useEffect, useState } from "react";
import StyledCard from "@components/styled-card";
import { usePoeLeagueCtx } from "@contexts/league-context";
import { StashViewSnapshotJobCard } from "@components/stash-view/stash-view-snapshot-job-card";
import { StashViewTabSelectionCard } from "@components/stash-view/stash-view-tab-selection-card";
import { StashViewItemTable } from "@components/stash-view/stash-view-item-table";
import { StashViewTabBreakdownTable } from "@components/stash-view/stash-view-tab-breakdown-card";
import { StashViewSearchCard } from "@components/stash-view/stash-view-search-card";
import { StashViewTabViewerCard } from "@components/stash-view/stash-view-tab-viewer-card";
import { StashViewTabGroupsPanel } from "@components/stash-view/stash-view-tab-groups-panel";
import { StashViewExportCard } from "@components/stash-view/stash-view-export-card";
import LeagueSelect from "@components/league-select";
import { usePoeStackAuth } from "@contexts/user-context";
import { StashViewGraphCard } from "@components/stash-view/stash-view-graph-card";
import { useRouter } from "next/router";
import { StashViewChartJsTest } from "@components/stash-view/stash-view-chart-js-test";
import { StashViewInfoCard } from "@components/stash-view/stash-view-info-card";
import { StashViewValueChangeCard } from "@components/stash-view/stash-view-value-change-card";

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

export default function StashView() {
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

  const [tab, setTab] = useState<{ items: CharacterSnapshotItem[] } | null>(
    null
  );
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

  if (!stashTabs || !stashViewSettings || !stashSummary || !league) {
    return (
      <>
        <StyledLoading />
      </>
    );
  }

  return (
    <>
      <div className="flex space-x-4 pb-[200px]">
        <div className="min-h-full">
          <div className="w-[200px] sticky top-4 flex flex-col space-y-2 h-fit">
            <StyledCard>
              <LeagueSelect />
            </StyledCard>

            <StashViewTabSelectionCard
              tabs={stashTabs!}
              setStashViewSettings={setStashViewSettings}
              stashViewSettings={stashViewSettings}
              refreshStashTabs={() => {
                refetchStashTabs({
                  variables: {
                    league: league,
                    forcePull: true,
                  },
                });
              }}
            />

            <StyledCard>
              <StashViewSnapshotJobCard
                tabs={stashTabs}
                stashViewSettings={stashViewSettings}
                setStashViewSettings={setStashViewSettings}
                onJobComplete={() => {
                  refetchValueSnapshots();
                  refetchSummaries();
                  setStashViewSettings({
                    ...stashViewSettings,
                    lastSnapshotJobCompleteTimestamp: new Date(),
                    snapshotJobId: null,
                  });
                }}
              />
            </StyledCard>

            <StashViewSearchCard
              stashViewSettings={stashViewSettings}
              setStashViewSettings={setStashViewSettings}
            />

            <StashViewTabGroupsPanel
              stashViewSettings={stashViewSettings}
              setStashViewSettings={setStashViewSettings}
            />

            <StashViewExportCard
              stashSummary={stashSummary}
              tabs={stashTabs}
              stashSettings={stashViewSettings}
              setStashViewSettings={setStashViewSettings}
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-1 2xl:grid-cols-2 gap-4">
          <StyledCard className="col-span-1 2xl:col-span-2 max-h-[600px] pb-12 grow">
            <StashViewChartJsTest
              tabs={stashTabs}
              stashViewSettings={stashViewSettings}
              setStashViewSettings={setStashViewSettings}
              series={valueSnapshots}
            />
          </StyledCard>

          <StyledCard>
            <StashViewInfoCard
              stashSummary={stashSummary}
              tabs={stashTabs}
              stashSettings={stashViewSettings}
              setStashViewSettings={setStashViewSettings}
            />
          </StyledCard>
          <StyledCard>
            <StashViewValueChangeCard
              stashSummary={stashSummary}
              tabs={stashTabs}
              stashSettings={stashViewSettings}
              setStashViewSettings={setStashViewSettings}
              series={valueSnapshots}
            />
          </StyledCard>

          <StyledCard className="col-span-1 2xl:col-span-2">
            <StashViewItemTable
              stashSummary={stashSummary}
              tabs={stashTabs}
              stashSettings={stashViewSettings}
              setStashViewSettings={setStashViewSettings}
            />
          </StyledCard>

          <StashViewTabViewerCard
            tab={tab}
            search={stashViewSettings}
            stashSettings={stashViewSettings}
            setStashViewSettings={setStashViewSettings!}
            stashSummary={stashSummary}
          />

          <StyledCard className="max-h-[800px]">
            <StashViewTabBreakdownTable
              stashSummary={stashSummary}
              tabs={stashTabs}
              stashSettings={stashViewSettings}
              setStashViewSettings={setStashViewSettings}
            />
          </StyledCard>
        </div>
      </div>
    </>
  );
}
