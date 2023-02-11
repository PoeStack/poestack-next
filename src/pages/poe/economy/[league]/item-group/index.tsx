import { useRouter } from "next/router";
import { ItemGroupValueTimeseries } from "../../../../../__generated__/graphql";
import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { GeneralUtils } from "../../../../../utils/general-util";
import StyledCard from "../../../../../components/styled-card";
import {
  POE_LEAGUES,
  usePoeLeagueCtx,
} from "../../../../../contexts/league-context";

export default function EconomyKeyGroup() {
  const router = useRouter();
  const { league: routerLeague, key } = router.query;

  const { league, setLeague } = usePoeLeagueCtx();
  useEffect(() => {
    setLeague(routerLeague);
  }, [routerLeague, setLeague]);

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
              league
              hashString
              properties
            }
          }
        }
      }
    `,
    {
      skip: !league || !key,
      variables: {
        search: {
          seriesTypes: ["p10"],
          stockStartingRanges: [0],
          itemGroupSearch: {
            itemGroupHashStrings: [],
            itemGroupHashKeys: [key],
            league: league?.toString() ?? POE_LEAGUES[0],
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

  if (itemValueTimeseries.length === 1) {
    router.push(
      `/poe/economy/${league}/item-group/${itemValueTimeseries[0].itemGroup.hashString}`
    );
  }

  const cols = [
    ...new Set<string>(
      itemValueTimeseries.flatMap((ivt) =>
        ivt.itemGroup.properties?.map((p) => p?.key)
      )
    ),
  ];

  return (
    <>
      <div>
        <div>
          <div className="flex flex-col space-y-2">
            <StyledCard title={`Variations`}>
              <div className="min-h-[20rem]">
                <table className="w-full">
                  <thead>
                    <tr className="w-full">
                      <th></th>
                      <th>Name</th>
                      {cols.map((p) => (
                        <>
                          <th>{p}</th>
                        </>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {itemValueTimeseries.map((series) => (
                      <>
                        <tr>
                          <td></td>
                          <td>
                            <Link
                              href={`/poe/economy/${series.itemGroup.league}/item-group/${series.itemGroup.hashString}`}
                            >
                              {GeneralUtils.itemGroupToDisplayName(
                                series.itemGroup
                              )}
                            </Link>
                          </td>
                          {cols.map((col) => (
                            <>
                              <td>
                                {series.itemGroup.properties
                                  .find((p) => p.key === col)
                                  ?.value?.toString()}
                              </td>
                            </>
                          ))}
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </StyledCard>
          </div>
        </div>
      </div>
    </>
  );
}
