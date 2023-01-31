import React, { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";
import StyledDropdown from "./styled-dropdown";
import CurrencyValueDisplay from "./currency-value-display";
import { gql, useQuery } from "@apollo/client";
import StyledPaginate from "./styled-paginate";
import CreateBulkListingModal from "./create-bulk-listing-modal";
import { usePoeStackAuth } from "../contexts/user-context";
import ItemGroupTagSelect from "./item-group-tag-select";
import Link from "next/link";
import StyledPopover from "./styled-popover";
import moment from "moment";
import "moment-timezone";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import StyledInput from "./styled-input";
import { GeneralUtils } from "../utils/general-util";
import {
  ItemGroupValueTimeseries,
  ItemGroupValueTimeseriesGroupSeries,
} from "../__generated__/resolvers-types";
import {
  StashSnapshot,
  StashSnapshotItemGroupSummarySearchInput,
  StashSnapshotItemGroupSummarySearchResponse,
} from "../__generated__/resolvers-types";

export default function FilterableItemTable({
  snapshot,
}: {
  snapshot: StashSnapshot;
}) {
  const { profile } = usePoeStackAuth();

  const [excludedItemGroupHashStrings, setExcludedItemGroupHashStrings] =
    useState<string[]>([]);

  const [createBulkListingOpen, setCreateBulkListingOpen] =
    useState<boolean>(false);

  const [itemGroupSearch, setItemGroupSearch] =
    useState<StashSnapshotItemGroupSummarySearchInput>({
      profileId: snapshot.snapshotProfileId,
      snapshotId: snapshot.id,
      skip: 0,
      limit: 20,
      sortDirection: "desc",
      sortKey: "totalValueChaos",
    });

  const [itemValueOverridesEnabled, setItemValueOverridesEnabled] =
    useState(false);
  const [itemValueOverrides, setItemValueOverrides] = useState({});
  useEffect(() => {
    if (snapshot?.snapshotProfileId) {
      const localItemValueOverrides = localStorage.getItem(
        `${snapshot.snapshotProfileId}__itemgroupoverides`
      );
      if (localItemValueOverrides) {
        setItemValueOverrides(JSON.parse(localItemValueOverrides));
      }
    }
  }, [snapshot, setItemValueOverrides]);

  useEffect(() => {
    if (itemValueOverrides && snapshot?.snapshotProfileId) {
      localStorage.setItem(
        `${snapshot.snapshotProfileId}__itemgroupoverides`,
        JSON.stringify(itemValueOverrides)
      );
    }
  }, [itemValueOverrides, snapshot]);

  const [itemGroupSearchResult, setItemGroupSearchResult] =
    useState<StashSnapshotItemGroupSummarySearchResponse | null>(null);
  useQuery(
    gql`
      query StashSnapshotItemGroupSummaries(
        $search: StashSnapshotItemGroupSummarySearchInput!
      ) {
        stashSnapshotItemGroupSummaries(search: $search) {
          hasMore
          totalValueChaos
          itemGroupSummaries {
            userId
            stashSnapshotId
            createdAtTimestamp
            itemGroupHashString
            quantity
            valueChaos
            totalValueChaos
            itemGroup {
              hashString
              key
              tag
              league
              baseType
              icon
              inventoryMaxStackSize
              displayName
            }
          }
        }
      }
    `,
    {
      variables: { search: itemGroupSearch },
      skip: !itemGroupSearch.snapshotId,
      onCompleted(data) {
        setItemGroupSearchResult(data.stashSnapshotItemGroupSummaries);
      },
    }
  );

  const [itemValueTimeseries, setItemValueTimeseries] = useState<
    ItemGroupValueTimeseries[]
  >([]);
  useQuery(
    gql`
      query Entries($search: ItemGroupValueTimeseriesSearchInput!) {
        itemGroupValueTimeseriesSearch(search: $search) {
          results {
            series {
              entries {
                timestamp
                value
              }
              type
            }
            itemGroup {
              hashString
            }
          }
        }
      }
    `,
    {
      skip:
        !snapshot?.league || !itemGroupSearchResult?.itemGroupSummaries?.length,
      variables: {
        search: {
          seriesTypes: ["p5", "p10", "p20", "p50"],
          stockStartingRanges: [0],
          itemGroupSearch: {
            itemGroupHashStrings:
              itemGroupSearchResult?.itemGroupSummaries?.map(
                (i) => i?.itemGroup?.hashString
              ),
            itemGroupHashKeys: [],
            league: snapshot?.league,
            skip: null,
            limit: null,
            searchString: null,
            sortDirection: null,
            itemGroupHashTags: [],
          },
        },
      },
      onCompleted(data) {
        setItemValueTimeseries(
          data?.itemGroupValueTimeseriesSearch?.results ?? []
        );
      },
    }
  );

  useEffect(() => {
    setItemGroupSearch((p) => {
      return {
        ...p,
        ...{ snapshotId: snapshot?.id, profileId: snapshot?.snapshotProfileId },
      };
    });
  }, [snapshot, setItemGroupSearch]);

  if (!itemGroupSearchResult) {
    return <>loading...</>;
  }

  return (
    <>
      <div>
        <CreateBulkListingModal
          open={createBulkListingOpen}
          itemGroupSearch={itemGroupSearch}
          onComplete={() => {
            setCreateBulkListingOpen(false);
          }}
          excludedItemGroupHashStrings={excludedItemGroupHashStrings}
          itemValueOverrides={
            itemValueOverridesEnabled ? itemValueOverrides : []
          }
        />

        <div className="flex flex-row-reverse space-x-4 pb-3">
          <StyledDropdown
            items={
              profile?.userId === snapshot?.userId
                ? [
                    {
                      text: "Export",
                      onClick: () => {
                        setCreateBulkListingOpen(true);
                      },
                    },
                    {
                      text: itemValueOverridesEnabled
                        ? "Disable Overrides"
                        : "Enable Overrides",
                      onClick: () => {
                        setItemValueOverridesEnabled(
                          !itemValueOverridesEnabled
                        );
                      },
                    },
                  ]
                : []
            }
            text={"Actions"}
          />
        </div>

        <ItemGroupTagSelect
          selected={itemGroupSearch?.tags ?? []}
          league={snapshot?.league}
          onSelectChange={(e) => {
            setItemGroupSearch({
              ...itemGroupSearch,
              ...{ tags: e },
            });
          }}
        />

        <div className="flex flex-row">
          <StyledInput
            value={itemGroupSearch?.searchstring}
            label="Search"
            onChange={(e) => {
              setItemGroupSearch({
                ...itemGroupSearch,
                ...{ searchstring: e },
              });
            }}
          />

          <StyledInput
            value={itemGroupSearch?.minValueChaos ?? 0}
            label="Min Value"
            type="number"
            onChange={(e) => {
              setItemGroupSearch({
                ...itemGroupSearch,
                ...{ minValueChaos: parseInt(e ?? "0") },
              });
            }}
          />

          <StyledInput
            value={itemGroupSearch?.minTotalValueChaos ?? 0}
            label="Min Total Value"
            type="number"
            onChange={(e) => {
              setItemGroupSearch({
                ...itemGroupSearch,
                ...{ minTotalValueChaos: parseInt(e ?? "0") },
              });
            }}
          />
        </div>

        <div>
          <table className="table-auto w-full">
            <thead>
              <tr className="w-full">
                <th></th>
                <th></th>
                <th>Name</th>
                <th></th>
                <th>Quantity</th>
                <th
                  onClick={() => {
                    setItemGroupSearch({
                      ...itemGroupSearch,
                      ...{
                        sortKey: "valueChaos",
                        sortDirection:
                          itemGroupSearch?.sortDirection === "asc"
                            ? "desc"
                            : "asc",
                      },
                    });
                  }}
                >
                  Value
                </th>
                <th
                  onClick={() => {
                    setItemGroupSearch({
                      ...itemGroupSearch,
                      ...{
                        sortKey: "totalValueChaos",
                        sortDirection:
                          itemGroupSearch?.sortDirection === "asc"
                            ? "desc"
                            : "asc",
                      },
                    });
                  }}
                >
                  Total Value
                </th>
              </tr>
            </thead>
            <tbody className="h-80">
              {itemGroupSearchResult.itemGroupSummaries!.map(
                (summary, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                        checked={
                          !excludedItemGroupHashStrings.includes(
                            summary?.itemGroup?.hashString!
                          )
                        }
                        onChange={(e) => {
                          if (
                            excludedItemGroupHashStrings.includes(
                              summary?.itemGroup?.hashString!
                            )
                          ) {
                            setExcludedItemGroupHashStrings(
                              excludedItemGroupHashStrings.filter(
                                (e) => e !== summary?.itemGroup?.hashString!
                              )
                            );
                          } else {
                            setExcludedItemGroupHashStrings([
                              summary?.itemGroup?.hashString!,
                              ...excludedItemGroupHashStrings,
                            ]);
                          }
                        }}
                      />
                    </td>
                    <td>
                      <Link
                        href={`https://www.poewiki.net/wiki/${encodeURIComponent(
                          (summary.itemGroup?.baseType ?? "")?.replaceAll(
                            " ",
                            "_"
                          )
                        )}`}
                      >
                        <Image
                          src={summary.itemGroup?.icon ?? ""}
                          alt="icon"
                          width="25"
                          height="25"
                        />
                      </Link>
                    </td>
                    <td>
                      <Link
                        href={`/poe/economy/${snapshot.league}/item-group/${summary.itemGroup?.hashString}`}
                      >
                        {GeneralUtils.itemGroupToDisplayName(
                          summary?.itemGroup
                        )}
                      </Link>
                    </td>
                    <td>
                      <StyledPopover text={"Econ"}>
                        <QuantityChart
                          timeseries={
                            itemValueTimeseries?.find(
                              (h) =>
                                h?.itemGroup.hashString ===
                                summary?.itemGroup?.hashString
                            )?.series
                          }
                        />
                      </StyledPopover>
                    </td>
                    <td>{summary?.quantity}</td>
                    <td>
                      <div className="flex flex-row space-x-3">
                        <CurrencyValueDisplay
                          onClick={() => {
                            navigator.clipboard.writeText(
                              "" + summary?.valueChaos
                            );
                          }}
                          valueChaos={summary?.valueChaos!}
                        />
                        {itemValueOverridesEnabled && (
                          <input
                            type={"number"}
                            value={
                              itemValueOverrides[
                                summary.itemGroup!.hashString
                              ] ?? null
                            }
                            className="bg-transparent border border-theme-color-2 focus:border-theme-color-2 rounded-lg"
                            placeholder={"" + summary?.valueChaos}
                            required
                            onChange={(e) => {
                              const v = e.target.value
                                ? parseFloat(e.target.value)
                                : null;
                              setItemValueOverrides((p) => ({
                                ...p,
                                ...{
                                  [summary.itemGroup!.hashString]: v,
                                },
                              }));
                            }}
                          />
                        )}
                      </div>
                    </td>
                    <td>
                      <CurrencyValueDisplay
                        onClick={(display) => {
                          navigator.clipboard.writeText(
                            `${display}/${summary?.quantity}`
                          );
                        }}
                        valueChaos={summary?.totalValueChaos!}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
            <tfoot className="sticky bottom-0 bg-theme-color-1 w-full">
              <tr>
                <th id="total" colSpan={6}>
                  Total Value:
                </th>
                <td>
                  <CurrencyValueDisplay
                    valueChaos={itemGroupSearchResult?.totalValueChaos ?? 0}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <StyledPaginate
          currentSkip={itemGroupSearch.skip!}
          onSelectionChange={function (skip: number, limit: number): void {
            setItemGroupSearch((search) => {
              return { ...search, ...{ skip: skip, limit: limit } };
            });
          }}
          limit={itemGroupSearch.limit!}
          hasMore={itemGroupSearchResult.hasMore}
        />
      </div>
    </>
  );
}

export function QuantityChart({
  timeseries,
}: {
  timeseries: ItemGroupValueTimeseriesGroupSeries[] | undefined;
}) {
  const series = timeseries?.map((t) => ({
    name: t.type,
    tooltip: {
      valueDecimals: 2,
    },
    data: t.entries?.map((e) => {
      return [new Date(e?.timestamp).valueOf(), e?.value ?? 0];
    }),
  }));
  console.log("series", series);

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
    },
    series: series,
  };

  return (
    <>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
}
