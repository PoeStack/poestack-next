import { useRouter } from "next/router";
import { useState } from "react";

import { gql, useQuery } from "@apollo/client";
import CurrencyValueDisplay from "@components/currency-value-display";
import StyledCard from "@components/library/styled-card";
import StyledLoading from "@components/library/styled-loading";
import LivePricingHistoryChart from "@components/live-pricing/live-pricing-history-chart";
import {
  LivePricingHistoryGroup,
  LivePricingSimpleResult,
} from "@generated/graphql";
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
      skip: !league || !itemGroupHashString,
      variables: {
        config: {
          itemGroupHashStrings: [itemGroupHashString],
          league: league,
          minQuantities: [1],
          types: ["lp10"],
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
      skip: !league || !itemGroupHashString,
      variables: {
        config: {
          itemGroupHashString: itemGroupHashString,
          league: league,
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
      <div className="">
        <StyledCard>
          <div>{StashViewUtil.itemEntryToName(livePricingHistoryGroup)}</div>
          <div>
            <CurrencyValueDisplay
              pValue={livePricingResult.valuation.value}
              league={league as string}
            />
          </div>
          <div>
            <CurrencyValueDisplay
              pValue={livePricingResult.stockValuation.value}
              league={league as string}
            />
          </div>
        </StyledCard>

        <div className="">
          <LivePricingHistoryChart historyGroup={livePricingHistoryGroup} />
        </div>
      </div>
    </>
  );
}
