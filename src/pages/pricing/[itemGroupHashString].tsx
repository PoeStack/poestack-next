import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { gql, useQuery } from "@apollo/client";
import CurrencyValueDisplay from "@components/currency-value-display";
import ItemGroupPropertiesDisplay from "@components/item-group-properties-display";
import StyledCard from "@components/library/styled-card";
import StyledLoading from "@components/library/styled-loading";
import LivePricingHistoryChart from "@components/live-pricing/live-pricing-history-chart";
import LivePricingLayout from "@components/live-pricing/live-pricing-layout";
import { POE_LEAGUES } from "@contexts/league-context";
import {
  LivePricingHistoryGroup,
  LivePricingSimpleResult,
} from "@generated/graphql";
import { myLoader } from "@utils/general-util";
import { StashViewUtil } from "@utils/stash-view-util";

export default function PricingItemPage() {
  const router = useRouter();
  const { league, itemGroupHashString } = router.query;

  const [livePricingHistoryGroup, setLivePricingHistoryGroup] =
    useState<LivePricingHistoryGroup | null>(null);
  useQuery(
    gql`
      query LivePricingHistory($config: LivePricingHistoryConfig!) {
        livePricingHistory(config: $config) {
          results {
            itemGroup {
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
      skip: !itemGroupHashString,
      variables: {
        config: {
          itemGroupHashStrings: [itemGroupHashString],
          league: league ?? POE_LEAGUES[0],
          minQuantities: [1],
          types: ["lp10", "totalListings"],
        },
      },
      onCompleted(data) {
        setLivePricingHistoryGroup(data.livePricingHistory.results[0]);
      },
    }
  );

  const [livePricingResult, setLivePricingResult] =
    useState<LivePricingSimpleResult | null>(null);
  useQuery(
    gql`
      query LivePriceSimple($config: LivePricingSimpleConfig!) {
        livePriceSimple(config: $config) {
          allListingsLength
          stockValuation {
            value
          }
          valuation {
            value
            validListings {
              listedAtTimestamp
              quantity
              listedValue
            }
          }
        }
      }
    `,
    {
      fetchPolicy: "cache-first",
      skip: !itemGroupHashString,
      variables: {
        config: {
          itemGroupHashString: itemGroupHashString,
          league: league ?? POE_LEAGUES[0],
          quantity: 25,
        },
      },
      onCompleted(data) {
        setLivePricingResult(data.livePriceSimple);
      },
    }
  );

  if (!livePricingHistoryGroup || !livePricingResult) {
    return <StyledLoading />;
  }

  return (
    <>
      <LivePricingLayout>
        <div className="grid grid-cols-2 w-full gap-4">
          <StyledCard className="col-span-1 space--3">
            <div className="grid grid-cols-2 gap-4 w-fit">
              <div className="col-span-2 flex text-3xl">
                <Image
                  loader={myLoader}
                  height={24 * 3.5}
                  width={24 * 3.5}
                  src={livePricingHistoryGroup.itemGroup.icon ?? ""}
                  alt={""}
                />
                <div>
                  {StashViewUtil.itemEntryToName(livePricingHistoryGroup)}
                </div>
              </div>
              <div>Value</div>
              <div>
                <CurrencyValueDisplay
                  pValue={livePricingResult.valuation?.value ?? 0}
                  league={league as string}
                />
              </div>
              <div>Value (Stock 25+)</div>
              <div>
                <CurrencyValueDisplay
                  pValue={livePricingResult.stockValuation?.value ?? 0}
                  league={league as string}
                />
              </div>
              <div>
                <ItemGroupPropertiesDisplay
                  properties={
                    livePricingHistoryGroup.itemGroup.properties ?? []
                  }
                />
              </div>
            </div>
            <div className="h-full"></div>
            <div className="flex space-x-2">
              <Link
                href={`https://www.poewiki.net/wiki/${encodeURIComponent(
                  (
                    livePricingHistoryGroup.itemGroup?.baseType ?? ""
                  )?.replaceAll(" ", "_")
                )}`}
              >
                <div className="rounded-full bg-indigo-500/10 px-1 py-1 text-sm font-semibold text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                  Wiki
                </div>
              </Link>
              <Link
                href={`https://www.pathofexile.com/trade/search/Crucible?q={"query":{"type":"${livePricingHistoryGroup.itemGroup?.baseType}"}}`}
              >
                <div className="rounded-full bg-indigo-500/10 px-1 py-1 text-sm font-semibold text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                  Trade
                </div>
              </Link>
            </div>
          </StyledCard>
          <StyledCard className="col-span-1">
            <div>Recent Listings</div>
            <div>
              <div className="grid grid-cols-3 gap-1 w-fit">
                {!livePricingResult ? (
                  <div className="max-h-[100px] col-span-4">Loading...</div>
                ) : (
                  <>
                    {livePricingResult?.valuation?.validListings.map(
                      (listing) => (
                        <>
                          <div>x{listing.quantity}</div>
                          <div>
                            <CurrencyValueDisplay
                              pValue={listing.listedValue}
                              league={league as string}
                            />
                          </div>
                          <div>
                            {moment(listing.listedAtTimestamp).fromNow()}
                          </div>
                        </>
                      )
                    )}
                  </>
                )}
              </div>
            </div>
          </StyledCard>

          <StyledCard className="col-span-2 max-h-[600px] pb-12 grow">
            <LivePricingHistoryChart
              historyGroup={livePricingHistoryGroup}
              seriesFilter={(s) => s.type !== "totalListings"}
            />
          </StyledCard>

          <StyledCard className="col-span-2 max-h-[600px] pb-12 grow">
            <LivePricingHistoryChart
              historyGroup={livePricingHistoryGroup}
              seriesFilter={(s) => s.type === "totalListings"}
            />
          </StyledCard>
        </div>
      </LivePricingLayout>
    </>
  );
}
