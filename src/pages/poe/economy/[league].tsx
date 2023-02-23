import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import HSparkline from "@components/hsparkline";
import Link from "next/link";
import Image from "next/image";
import StyledCard from "@components/styled-card";
import StyledPaginate from "@components/styled-paginate";
import { useRouter } from "next/router";
import { GeneralUtils } from "@utils/general-util";
import _ from "lodash";
import { ItemGroupValueTimeseriesSearchInput } from "@generated/graphql";
import ItemGroupTagSelect from "@components/item-group-tag-select";
import {
  ItemGroupValueTimeseries,
  StashSnapshotItemGroupSummarySearchInput,
} from "@generated/graphql";
import { POE_LEAGUES, usePoeLeagueCtx } from "@contexts/league-context";
import CurrencyValueDisplay from "@components/currency-value-display";
import useSortableTable from "@hooks/use-sort-th-hook";
import SortableTableHeader, {
  SortableTableColumns,
} from "@components/sortable-table-header";
import LeagueSelect from "@components/league-select";

const columns: SortableTableColumns = [
  {
    key: "",
    text: "",
    notSortable: true,
  },
  {
    key: "name",
    text: "Name",
  },
  {
    key: "history",
    text: "History",
    notSortable: true,
  },
  {
    key: "listing",
    text: "Listings",
  },
  {
    key: "value",
    text: "Value",
  },
];

export default function Economy() {
  const router = useRouter();
  const { tag } = router.query;

  const { league, setLeague } = usePoeLeagueCtx();

  const [timeseriesSearch, setTimeseriesSearch] =
    useState<ItemGroupValueTimeseriesSearchInput>({
      seriesTypes: ["p10", "totalValidListings"],
      stockStartingRanges: [0],
      itemGroupSearch: {
        itemGroupHashStrings: [],
        itemGroupHashKeys: [],
        league: league,
        skip: null,
        limit: null,
        searchString: null,
        sortDirection: null,
        itemGroupHashTags: [],
      },
    });
  const [itemValueTimeseries, setItemValueTimeseries] = useState<
    ItemGroupValueTimeseries[]
  >([]);
  const { refetch: refetchHistograms } = useQuery(
    gql`
      query EconSearch1($search: ItemGroupValueTimeseriesSearchInput!) {
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
              icon
              displayName
              key
              hashString
            }
          }
        }
      }
    `,
    {
      variables: {
        search: timeseriesSearch,
      },
      onCompleted(data) {
        setItemValueTimeseries(
          data?.itemGroupValueTimeseriesSearch?.results ?? []
        );
      },
    }
  );

  useEffect(() => {
    setTimeseriesSearch((p) => {
      return {
        ...p,
        ...{
          itemGroupSearch: {
            ...p.itemGroupSearch,
            skip: 0,
            limit: 20,
            league: league?.toString() ?? POE_LEAGUES[0],
            itemGroupHashTags: [tag ?? "currency"].flat(),
          },
        },
      };
    });
  }, [tag, league, setTimeseriesSearch]);

  useEffect(() => {
    refetchHistograms();
  }, [refetchHistograms, timeseriesSearch]);

  const [columnsSortMap, updateSortMap] = useSortableTable(
    columns,
    (key, dir) => {
      /*  update the queries in here somehow */
    }
  );

  if (!itemValueTimeseries) {
    return "loading...";
  }

  return (
    <>
      <div>
        <StyledCard title={"Economy"}>
          <LeagueSelect />
          <ItemGroupTagSelect
            selected={tag}
            league={league?.toString() ?? POE_LEAGUES[0]}
            onSelectChange={(e: string[]) => {
              router.push({ query: { league: league, tag: e } });
            }}
          />

          <div className="min-h-[20rem]">
            <table className="w-full">
              <SortableTableHeader
                columns={columns}
                columnDirections={columnsSortMap}
                onSortChange={updateSortMap}
              />

              <tbody>
                {itemValueTimeseries!.map((groupSeries, index) => (
                  <tr
                    key={index}
                    className=" hover:text-content-accent  pl-3 hover:bg-color-primary"
                  >
                    <td>
                      <Image
                        src={groupSeries.itemGroup?.icon ?? ""}
                        alt="icon"
                        width="25"
                        height="25"
                      />
                    </td>

                    <td>
                      <Link
                        href={`/poe/economy/${league}/item-group/${groupSeries?.itemGroup?.hashString}`}
                      >
                        {GeneralUtils.itemGroupToDisplayName(
                          groupSeries.itemGroup!
                        )}
                      </Link>
                    </td>
                    <td className="flex flex-col items-start">
                      <HSparkline
                        series={groupSeries.series?.find(
                          (e) => e.type === "p10"
                        )}
                      />
                    </td>
                    <td className="text-left">
                      {(() => {
                        const recent = groupSeries.series?.find(
                          (s) => s.type === "totalValidListings"
                        );
                        return (
                          <>
                            {recent?.entries?.[
                              recent.entries.length - 1
                            ]?.value?.toFixed(0)}
                          </>
                        );
                      })()}
                    </td>
                    <td className="flex flex-col">
                      {(() => {
                        const recent = groupSeries.series?.find(
                          (s) => s.type === "p10"
                        );
                        return (
                          <>
                            <CurrencyValueDisplay
                              valueChaos={
                                recent?.entries?.[recent.entries.length - 1]
                                  ?.value ?? 0
                              }
                            />
                          </>
                        );
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <StyledPaginate
            currentSkip={timeseriesSearch.itemGroupSearch?.skip!}
            limit={timeseriesSearch.itemGroupSearch?.limit!}
            onSelectionChange={function (skip: number, limit: number): void {
              setTimeseriesSearch({
                ...timeseriesSearch,
                ...{
                  itemGroupSearch: {
                    ...timeseriesSearch.itemGroupSearch,
                    skip: skip,
                    limit: limit,
                  },
                },
              });
            }}
            hasMore={true}
          />
        </StyledCard>
      </div>
    </>
  );
}
