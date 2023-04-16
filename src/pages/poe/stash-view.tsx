import "moment-timezone";
import { gql, useQuery } from "@apollo/client";
import StyledLoading from "@components/styled-loading";
import {
  CharacterSnapshotItem,
  PoeStashTab,
  StashViewItemSummary,
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

export interface StashViewSettings {
  searchString: string;
  filterCheckedTabs: boolean;

  selectedTabId: string | null;
  checkedTabIds: string[];
  snapshotJobId: string | null;
  lastSnapshotJobCompleteTimestamp: Date | null;

  stashTabGroups: Record<string, { name: string; stashTabIds: string[] }>;

  valueOverridesEnabled: boolean;
  itemGroupValueOverrides: Record<string, number>;

  selectedGraph: string;

  selectedExporter: string;
  exporterListedValueMultipler: number;

  forumShopMaxStackSizeSetting: string;
  forumShopTabIndexOffset: number;
}

const defaultStashViewSettings: StashViewSettings = {
  searchString: "",
  filterCheckedTabs: false,

  checkedTabIds: [],
  selectedTabId: null,
  snapshotJobId: null,
  lastSnapshotJobCompleteTimestamp: null,

  stashTabGroups: {},

  valueOverridesEnabled: false,
  itemGroupValueOverrides: {},

  selectedGraph: "net value",

  selectedExporter: "Forum Shop",
  exporterListedValueMultipler: 1,

  forumShopMaxStackSizeSetting: "max",
  forumShopTabIndexOffset: 0,
};

export default function StashView() {
  const { league } = usePoeLeagueCtx();

  const [stashViewSettings, setStashViewSettings] =
    useState<StashViewSettings | null>(null);

  useEffect(() => {
    setStashViewSettings(
      JSON.parse(
        localStorage.getItem(`${league}_stash_view_settings`) ??
          JSON.stringify(defaultStashViewSettings)
      )
    );
  }, [league]);

  useEffect(() => {
    if (stashViewSettings) {
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
    if (stashViewSettings?.selectedTabId) {
      fetch(
        `https://poe-stack-stash-view.nyc3.digitaloceanspaces.com/tabs/d3d595b6-6982-48f9-9358-048292beb8a7/Crucible/${stashViewSettings.selectedTabId}.json`
      )
        .then((v) => {
          if (v.ok) {
            return v.json();
          }
        })
        .then((v) => {
          setTab(v);
        });
    }
  }, [
    stashViewSettings?.selectedTabId,
    stashViewSettings?.lastSnapshotJobCompleteTimestamp,
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
        if (stashViewSettings && !stashViewSettings?.selectedTabId) {
          setStashViewSettings({
            ...stashViewSettings,
            selectedTabId: data.stashTabs?.[0]?.id,
          });
        }
      },
      onError(error) {
        setStashTabs([]);
      },
    }
  );

  const [tabSummaries, setTabSummaries] = useState<
    StashViewItemSummary[] | null
  >(null);
  const { refetch: refetchSummaries } = useQuery(
    gql`
      query StashViewItemsSummary($league: String!) {
        stashViewSummary(league: $league) {
          stashId
          x
          y
          itemGroupHashString
          itemGroupTag
          quantity
          searchableString
          valueChaos
          totalValueChaos
          icon
        }
      }
    `,
    {
      onCompleted(data) {
        setTabSummaries(data.stashViewSummary);
      },
      variables: {
        league: league,
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

  if (!stashTabs || !stashViewSettings) {
    return (
      <>
        <StyledLoading />
      </>
    );
  }

  return (
    <>
      <div className="flex h-full space-x-4">
        <div className="h-full">
          <div className="w-[200px] sticky top-4 flex flex-col space-y-2 h-fit">
            <StashViewTabSelectionCard
              tabs={stashTabs!}
              setStashViewSettings={setStashViewSettings}
              stashViewSettings={stashViewSettings}
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
              items={tabSummaries ?? []}
              tabs={stashTabs}
              stashSettings={stashViewSettings}
              setStashViewSettings={setStashViewSettings}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4 w-full">
          {/*     <StashViewGraphCard
            stashTabs={stashTabs}
            stashViewSettings={stashViewSettings}
            setStashViewSettings={setStashViewSettings}
            valueSnapshots={valueSnapshots}
          />
 */}
          <StashViewItemTable
            items={tabSummaries ?? []}
            tabs={stashTabs}
            stashSettings={stashViewSettings}
            setStashViewSettings={setStashViewSettings}
          />

          <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
            <StashViewTabViewerCard
              items={tab?.items ?? []}
              search={stashViewSettings}
            />
            <StashViewTabBreakdownTable
              items={tabSummaries ?? []}
              tabs={stashTabs}
              stashSettings={stashViewSettings}
              setStashViewSettings={setStashViewSettings}
            />
          </div>
        </div>
      </div>
    </>
  );
}
