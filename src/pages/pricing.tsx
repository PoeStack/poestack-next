import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { gql, useQuery } from "@apollo/client";
import LeagueSelect from "@components/league-select";
import StyledButton from "@components/library/styled-button";
import StyledCard from "@components/library/styled-card";
import StyledInput from "@components/library/styled-input";
import StyledPaginate from "@components/library/styled-paginate";
import LivePricingLayout from "@components/live-pricing/live-pricing-layout";
import LivePriceRow from "@components/live-pricing/live-pricing-row";
import { POE_LEAGUES } from "@contexts/league-context";
import {
  LivePricingHistoryGroup,
  LivePricingSummaryEntry,
} from "@generated/graphql";
import { GeneralUtils, myLoader } from "@utils/general-util";

export interface ItemGroupSummary {
  hash: string;
  properties: any;
  searchableString: string;
}

export default function LivePricingPage() {
  const router = useRouter();

  const [livePricingEntires, setLivePricingEntires] = useState<
    LivePricingSummaryEntry[]
  >([]);
  useQuery(
    gql`
      query Query($search: LivePricingSummarySearch!) {
        livePricingSummarySearch(search: $search) {
          entries {
            itemGroup {
              hashString
              key
              properties
              icon
              displayName
            }
            valuation {
              value
              validListingsLength
            }
            stockValuation {
              listingPercent
              value
              validListingsLength
            }
          }
        }
      }
    `,
    {
      variables: {
        search: {
          league: router.query.league ?? POE_LEAGUES[0],
          offSet: router.query.offSet
            ? parseInt(router.query.offSet as string)
            : 0,
          searchString: router.query.searchString ?? null,
          tag: router.query.tag ?? null,
          quantityMin: router.query.stockQuantity
            ? parseInt(router.query.stockQuantity as string)
            : 25,
        },
      },
      onCompleted(data) {
        setLivePricingEntires(data.livePricingSummarySearch?.entries);
      },
    }
  );

  const [livePricingHistoryGroups, setLivePricingHistoryGroups] = useState<
    LivePricingHistoryGroup[] | null
  >(null);
  useQuery(
    gql`
      query LivePricingHistories($config: LivePricingHistoryConfig!) {
        livePricingHistory(config: $config) {
          results {
            itemGroup {
              hashString
            }
            series {
              type
              stockRangeStartInclusive
              entries {
                timestamp
                value
              }
            }
          }
        }
      }
    `,
    {
      skip: !livePricingEntires,
      variables: {
        config: {
          itemGroupHashStrings: livePricingEntires.map(
            (e) => e.itemGroup.hashString
          ),
          league: router.query.league ?? POE_LEAGUES[0],
          minQuantities: [1],
          types: ["lp10"],
        },
      },
      onCompleted(data) {
        setLivePricingHistoryGroups(data.livePricingHistory.results);
      },
    }
  );

  return (
    <>
      <LivePricingLayout>
        <div className="flex flex-col space-y-2 w-full">
          <div className="flex-0 flex space-x-3">
            <div className="flex-1">
              <StyledInput
                value={(router.query.searchString as string) ?? ""}
                placeholder="Search..."
                onChange={(e) => {
                  GeneralUtils.debounce(
                    router.push({
                      query: { ...router.query, searchString: e },
                    }),
                    300
                  );
                }}
              />
            </div>
            <div>
              <StyledInput
                type="number"
                value={router.query.stockQuantity as string}
                placeholder="Minimum Stock"
                onChange={(e) => {
                  router.push({ query: { ...router.query, stockQuantity: e } });
                }}
              />
            </div>
          </div>
          <div className="flex-1 w-full">
            <table className="divide-y divide-gray-700 w-full">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                  >
                    Icon
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Properties
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    History
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Value
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Stock Value (
                    {router.query.stockQuantity?.length
                      ? router.query.stockQuantity
                      : 25}
                    +)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {livePricingEntires?.map((e) => (
                  <LivePriceRow
                    key={e.itemGroup.hashString}
                    pricingSummary={e}
                    historyGroup={livePricingHistoryGroups?.find(
                      (g) => g.itemGroup.hashString === e.itemGroup.hashString
                    )}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <StyledPaginate
            currentSkip={parseInt((router.query.offSet as string) ?? "0")}
            onSelectionChange={(skip, limit) => {
              router.push({ query: { ...router.query, offSet: skip } });
            }}
            limit={40}
            hasMore={true}
          />
        </div>
      </LivePricingLayout>
    </>
  );
}
