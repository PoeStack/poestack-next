import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import HSparkline from "../../../../components/hsparkline";
import StyledSelect from "../../../../components/styled-select";
import Image from "next/image";
import StyledCard from "../../../../components/styled-card";
import StyledPaginate from "../../../../components/styled-paginate";
import LeagueSelect from "../../../../components/league-select";
import { useRouter } from "next/router";
import Link from "next/link";
import { GeneralUtils } from "../../../../utils/general-util";
import _ from "lodash";
import { ItemGroupValueTimeseriesSearchInput } from "../../../../__generated__/resolvers-types";
import ItemGroupTagSelect from "../../../../components/item-group-tag-select";
import {
  ItemGroupValueTimeseries,
  StashSnapshotItemGroupSummarySearchInput,
} from "../../../../__generated__/resolvers-types";
import { usePoeLeagueCtx } from "../../../../contexts/league-context";
import CurrencyValueDisplay from "../../../../components/currency-value-display";

export default function Economy() {
  const router = useRouter();
  const { league: routerLeague, tag } = router.query;

  const { league, setLeague } = usePoeLeagueCtx();
  useEffect(() => {
    setLeague(routerLeague);
  }, [routerLeague, setLeague]);

  const [timeseriesSearch, setTimeseriesSearch] =
    useState<ItemGroupValueTimeseriesSearchInput>({
      seriesTypes: ["p10", "totalValidListings"],
      stockStartingRanges: [0],
      itemGroupSearch: {
        itemGroupHashStrings: [],
        itemGroupHashKeys: [],
        league: league?.toString() ?? "Sanctum",
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
            league: league?.toString() ?? "Sanctum",
            itemGroupHashTags: [tag ?? "currency"].flat(),
          },
        },
      };
    });
  }, [tag, league, setTimeseriesSearch]);

  useEffect(() => {
    refetchHistograms();
  }, [refetchHistograms, timeseriesSearch]);

  if (!itemValueTimeseries) {
    return "loading...";
  }

  return (
    <>
      <div>
        <StyledCard title={"Economy"}>
          <ItemGroupTagSelect
            selected={tag}
            league={league?.toString() ?? "Sanctum"}
            onSelectChange={(e: string[]) => {
              router.push({ query: { league: league, tag: e } });
            }}
          />

          <div className="min-h-[20rem]">
            <table className="w-full">
              <thead className="text-left">
                <tr className="w-full">
                  <th className="pl-2"></th>
                  <th className="pl-2">Name</th>
                  <th className="pl-2 text-center">History</th>
                  <th className="pl-2 text-center">Listings</th>
                  <th className="pl-2 text-center">Value</th>
                </tr>
              </thead>
              <tbody>
                {itemValueTimeseries!.map((groupSeries, index) => (
                  <tr
                    key={index}
                    className="hover:text-skin-accent  pl-3 hover:bg-skin-primary"
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
                    <td className="flex flex-col items-center">
                      <HSparkline data={groupSeries.series} />
                    </td>
                    <td className="text-center">
                      {(() => {
                        const recent = groupSeries.series?.find(
                          (s) => s.type === "totalValidListings"
                        );

                        return (
                          <>
                            {
                              recent?.entries?.[recent.entries.length - 1]
                                ?.value
                            }
                          </>
                        );
                      })()}
                    </td>
                    <td className="flex flex-col items-center">
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
