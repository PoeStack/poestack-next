import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import StyledCard from "../../../../components/styled-card";
import StyledPaginate from "../../../../components/styled-paginate";
import { useRouter } from "next/router";
import { ItemGroupValueTimeseriesSearchInput } from "../../../../__generated__/resolvers-types";
import ItemGroupTagSelect from "../../../../components/item-group-tag-select";
import { ItemGroupValueTimeseries } from "../../../../__generated__/resolvers-types";
import { usePoeLeagueCtx } from "../../../../contexts/league-context";
import StyledLoadingIndicator from "../../../../components/styled-loading-indicator";
import ItemsTable from "../../../../components/items-table/items-table";

const ItemGroupsQuery = gql`
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
  `;

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

  const { loading, refetch: refetchHistograms } = useQuery(
    ItemGroupsQuery,
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

  return (
    <div>
      <StyledCard title={"Economy"}>
        <ItemGroupTagSelect
          selected={tag}
          league={league?.toString() ?? "Sanctum"}
          onSelectChange={(e: string[]) => {
            router.push({ query: { league: league, tag: e } });
          }}
        />

        {
          loading?
            <StyledLoadingIndicator/> :
            <ItemsTable items={itemValueTimeseries} league={league} />
        }

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
  );
}
