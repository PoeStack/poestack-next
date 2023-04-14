import "moment-timezone";
import { gql, useMutation, useQuery } from "@apollo/client";
import StyledLoading from "@components/styled-loading";
import {
  CharacterSnapshotItem,
  PoeStashTab,
  StashViewItemSummary,
  StashViewJob,
  StashViewValueSnapshotSeries,
} from "@generated/graphql";
import { useEffect, useState } from "react";
import Image, { ImageLoaderProps } from "next/image";
import { GeneralUtils, myLoader } from "@utils/general-util";
import ItemMouseOver from "@components/item-mouseover";
import StyledCard from "@components/styled-card";
import { usePoeLeagueCtx } from "@contexts/league-context";
import StyledInput from "@components/styled-input";
import StyledButton from "@components/styled-button";
import moment from "moment";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export interface StashViewSettings {
  searchString: string;
  filterCheckedTabs: boolean;

  selectedTabId: string | null;
  checkedTabIds: string[];
  snapshotJobId: string | null;
}

const defaultStashViewSettings: StashViewSettings = {
  searchString: "",
  filterCheckedTabs: false,

  checkedTabIds: [],
  selectedTabId: null,
  snapshotJobId: null,
};

export default function StashView() {
  const { league } = usePoeLeagueCtx();

  const [stashViewSettings, setStashViewSettings] = useState<StashViewSettings>(
    defaultStashViewSettings
  );

  useEffect(() => {
    setStashViewSettings(
      JSON.parse(
        localStorage.getItem(`${league}_stash_view_settings`) ??
          JSON.stringify(defaultStashViewSettings)
      )
    );
  }, [league]);

  useEffect(() => {
    console.log("settings update", stashViewSettings);
    localStorage.setItem(
      `${league}_stash_view_settings`,
      JSON.stringify(stashViewSettings)
    );
  }, [stashViewSettings]);

  const [tab, setTab] = useState<{ items: CharacterSnapshotItem[] } | null>(
    null
  );
  useEffect(() => {
    if (stashViewSettings.selectedTabId) {
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
  }, [stashViewSettings.selectedTabId]);

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
        if (!stashViewSettings.selectedTabId) {
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
  useQuery(
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

  if (!stashTabs) {
    return (
      <>
        <StyledLoading />
      </>
    );
  }

  return (
    <>
      <div className="flex space-x-4">
        <div className="w-[200px] fixed flex flex-col space-y-2">
          <TabSelectorCard
            tabs={stashTabs!}
            setStashViewSettings={setStashViewSettings}
            stashViewSettings={stashViewSettings}
          />

          <StyledCard>
            <TabSnapshotCard
              tabs={stashTabs}
              stashViewSettings={stashViewSettings}
              setStashViewSettings={setStashViewSettings}
              onJobComplete={() => {
                refetchValueSnapshots()
              }}
            />
          </StyledCard>

          <StashViewSearchPanel
            stashViewSettings={stashViewSettings}
            setStashViewSettings={setStashViewSettings}
          />
        </div>

        <div className="grow flex flex-col space-y-4 pl-[200px]">
          <StashViewGraph
            tabs={stashTabs}
            stashViewSettings={stashViewSettings}
            setStashViewSettings={setStashViewSettings}
            series={valueSnapshots}
          />

          <StashViewItemTable
            items={tabSummaries ?? []}
            tabs={stashTabs}
            stashSettings={stashViewSettings}
            setStashViewSettings={setStashViewSettings}
          />
          <TabViewerCard items={tab?.items ?? []} search={stashViewSettings} />
        </div>
      </div>
    </>
  );
}

export function TabViewerCard({
  items,
  search,
}: {
  items: CharacterSnapshotItem[];
  search: StashViewSettings;
}) {
  const scale = 1.5;
  const scalePx = 24 * scale;
  const cardSize = scalePx + scalePx * 24;

  return (
    <>
      <div
        style={{ width: cardSize, height: cardSize }}
        className={`shrink-0 bg-surface-primary relative`}
      >
        {items?.map((e) => {
          const matchesSearch =
            search.searchString.trim().length > 0 &&
            [e.baseType, e.typeLine, e.name]
              .filter((e) => !!e)
              .join(" ")
              ?.toLowerCase()
              ?.includes(search?.searchString);

          return (
            <>
              <div
                style={{
                  top: scalePx / 2 + scalePx * e["y"],
                  left: scalePx / 2 + scalePx * e["x"],
                  height: scalePx * e["h"],
                  width: scalePx * e["w"],
                }}
                className={`absolute ${
                  !!matchesSearch ? "bg-red-400 border-2 border-red-600" : ""
                }`}
              >
                <ItemMouseOver item={e}>
                  <Image
                    loader={myLoader}
                    height={scalePx * e["h"]}
                    width={scalePx * e["w"]}
                    src={e.icon!}
                    alt={""}
                  />
                </ItemMouseOver>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export function StashViewSearchPanel({
  stashViewSettings,
  setStashViewSettings,
}: {
  stashViewSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
}) {
  return (
    <>
      <StyledCard>
        <div className="flex flex-col space-y-2">
          <StyledInput
            value={stashViewSettings.searchString}
            placeholder="Search..."
            onChange={(e) => {
              setStashViewSettings({ ...stashViewSettings, searchString: e });
            }}
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-content-accent bg-gray-100 border-gray-300 rounded"
              checked={stashViewSettings.filterCheckedTabs}
              onChange={(e) => {
                setStashViewSettings({
                  ...stashViewSettings,
                  filterCheckedTabs: !stashViewSettings.filterCheckedTabs,
                });
              }}
            />
            <div>
              Filter ({stashViewSettings.checkedTabIds.length}) Selected Tabs
            </div>
          </div>
        </div>
      </StyledCard>
    </>
  );
}

export function StashViewItemTable({
  items,
  tabs,
  stashSettings,
  setStashViewSettings,
}: {
  items: StashViewItemSummary[];
  tabs: PoeStashTab[];
  stashSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
}) {
  const pageSize = 25;

  const [page, setPage] = useState(0);

  const sortedItems = [...items]
    .filter(
      (e) =>
        !stashSettings.filterCheckedTabs ||
        stashSettings.checkedTabIds.includes(e.stashId)
    )
    .filter(
      (e) =>
        stashSettings.searchString.trim().length === 0 ||
        e.searchableString.includes(stashSettings.searchString.toLowerCase())
    )
    .sort((a, b) => (b.totalValueChaos ?? 0) - (a.totalValueChaos ?? 0));

  const maxPage = Math.ceil(sortedItems.length / pageSize);

  if (page !== 0 && page >= maxPage) {
    setPage(Math.max(0, maxPage - 1));
  }

  return (
    <>
      <StyledCard>
        <div className="flex flex-col space-y-2">
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Stash</th>
                <th>Quantity</th>
                <th>Value</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {sortedItems
                .slice(page * pageSize, page * pageSize + pageSize)
                .map((item) => {
                  const tab = tabs.find((e) => e.id === item.stashId);
                  return (
                    <>
                      <tr>
                        <td>
                          <img style={{ height: 30 }} src={item.icon!} />
                        </td>
                        <td>
                          {GeneralUtils.capitalize(item.searchableString)}
                        </td>
                        <td
                          className={`${
                            tab?.id == stashSettings.selectedTabId
                              ? "text-content-accent"
                              : ""
                          } cursor-pointer`}
                          onClick={() => {
                            setStashViewSettings({
                              ...stashSettings,
                              selectedTabId: tab!.id,
                            });
                          }}
                        >
                          {tab?.name}
                        </td>
                        <td>{item.quantity}</td>
                        <td>
                          {GeneralUtils.roundToFirstNoneZeroN(
                            item.valueChaos ?? 0
                          )}
                        </td>
                        <td>
                          {GeneralUtils.roundToFirstNoneZeroN(
                            item.totalValueChaos ?? 0
                          )}
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <div className="flex space-x-2 items-center">
            <StyledButton
              text={"Previous"}
              onClick={() => {
                setPage(Math.max(0, page - 1));
              }}
            />
            <div>
              {maxPage === 0 ? 0 : page + 1}/{maxPage} Page
            </div>
            <StyledButton
              text={"Next"}
              onClick={() => {
                setPage(Math.min(maxPage - 1, page + 1));
              }}
            />
          </div>
        </div>
      </StyledCard>
    </>
  );
}

export function TabSnapshotCard({
  stashViewSettings,
  setStashViewSettings,
  onJobComplete,
}: {
  tabs: PoeStashTab[];
  stashViewSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
  onJobComplete: () => void;
}) {
  const { league } = usePoeLeagueCtx();

  const [takeSnapshot] = useMutation(gql`
    mutation TakeStashViewSanpshot($input: StashViewSnapshotInput!) {
      stashViewSnapshot(input: $input)
    }
  `);

  const [jobStatus, setJobStatus] = useState<StashViewJob | null>(null);
  const { refetch } = useQuery(
    gql`
      query StashViewJobStat($jobId: String!) {
        stashViewJobStat(jobId: $jobId) {
          id
          userId
          status
          totalStahes
          timestamp
        }
      }
    `,
    {
      variables: { jobId: stashViewSettings.snapshotJobId },
      skip: !stashViewSettings.snapshotJobId,
      onCompleted(data) {
        setJobStatus(data.stashViewJobStat);

        console.log("got", data.stashViewJobStat?.status);
        if (data.stashViewJobStat?.status === "Complete.") {
          setStashViewSettings({ ...stashViewSettings, snapshotJobId: null });
          setTimeout(() => {
            setJobStatus(null);
          }, 5000);
          onJobComplete();
        }
      },
    }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        !!stashViewSettings?.snapshotJobId &&
        jobStatus?.status !== "Complete."
      ) {
        refetch();
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [stashViewSettings?.snapshotJobId, jobStatus?.status]);

  return (
    <>
      <div className="flex flex-col space-y-1">
        <StyledButton
          text={`Snapshot ${stashViewSettings.checkedTabIds.length} Tabs`}
          onClick={() => {
            takeSnapshot({
              variables: {
                input: {
                  league: league,
                  stashIds: stashViewSettings.checkedTabIds,
                },
              },
              onCompleted(data) {
                setStashViewSettings({
                  ...stashViewSettings,
                  snapshotJobId: data.stashViewSnapshot,
                });
              },
            });
          }}
        />

        {!!jobStatus?.status && <div>{jobStatus?.status}</div>}
      </div>
    </>
  );
}

export function StashViewGraph({
  tabs,
  stashViewSettings,
  setStashViewSettings,
  series,
}: {
  tabs: PoeStashTab[];
  stashViewSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
  series: StashViewValueSnapshotSeries[];
}) {
  const filteredSeries = series
    .filter(
      (e) =>
        !stashViewSettings.filterCheckedTabs ||
        stashViewSettings.checkedTabIds.includes(e.stashId)
    )
    .filter((e) => e.values.some((v) => v > 0));

  const highchartsSeries = filteredSeries.map((s) => {
    return {
      name: tabs.find((e) => s.stashId === e.id)?.name ?? "NA",
      tooltip: {
        valueDecimals: 0,
      },
      data: s.values.map((v, i) => [new Date(s.timestamps[i]).valueOf(), v]),
    };
  });

  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: "",
    },
    time: {
      moment: moment,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    yAxis: {
      title: {
        enabled: false,
      },
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        minute: "%l:%M %P",
        hour: "%l:%M %P",
        day: "%e. %b",
        week: "%e. %b",
        month: "%b '%y",
        year: "%Y",
      },
    },
    legend: {
      enabled: false,
      itemStyle: {
        color: "white",
      },
    },
    series: highchartsSeries,
  };

  return (
    <>
      <div>
        <StyledCard>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </StyledCard>
      </div>
    </>
  );
}

export function TabSelectorCard({
  tabs,
  stashViewSettings,
  setStashViewSettings,
}: {
  tabs: PoeStashTab[];
  stashViewSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
}) {
  return (
    <>
      <StyledCard>
        <div className="flex flex-col space-y-1 max-h-[600px] overflow-y-auto">
          {tabs?.map((tab) => (
            <>
              <div className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-content-accent bg-gray-100 border-gray-300 rounded"
                  checked={stashViewSettings.checkedTabIds.includes(tab.id)}
                  onChange={(e) => {
                    if (stashViewSettings.checkedTabIds.includes(tab.id)) {
                      setStashViewSettings({
                        ...stashViewSettings,
                        checkedTabIds: stashViewSettings.checkedTabIds.filter(
                          (e) => e !== tab.id
                        ),
                      });
                    } else {
                      setStashViewSettings({
                        ...stashViewSettings,
                        checkedTabIds: [
                          ...stashViewSettings.checkedTabIds,
                          tab.id,
                        ],
                      });
                    }
                  }}
                />
                <div
                  className={`${
                    stashViewSettings.selectedTabId === tab.id
                      ? "text-content-accent"
                      : "text-white"
                  } cursor-pointer`}
                  onClick={() => {
                    setStashViewSettings({
                      ...stashViewSettings,
                      selectedTabId: tab.id,
                    });
                  }}
                >
                  {tab.name}
                </div>
              </div>
            </>
          ))}
        </div>
      </StyledCard>
    </>
  );
}
