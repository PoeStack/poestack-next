import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";
import {
  LivePricingHistoryGroup,
  LivePricingHistorySeries,
  LivePricingValuation,
} from "@generated/graphql";
import { StashViewTab } from "@models/stash-view-models";
import { StashViewUtil } from "@utils/stash-view-util";

import { POE_LEAGUES, usePoeLeagueCtx } from "./league-context";
import { usePoeStackAuth } from "./user-context";

export const DIV_HASH_STRING = "cceb40e33d9237cb6a06037e739e40aa9a548c70";

const initalContext: {
  divValueFromChaos: (e: number, date?: Date | null) => number | null;
  divValueChaos: number | null | undefined;
} = {
  divValueFromChaos: (e, t) => {
    return null;
  },
  divValueChaos: null,
};

export const CurrencyConversionContext = createContext(initalContext);

export function CurrencyConversionProvider({ children }) {
  const { league } = usePoeLeagueCtx();

  const [divSimpleValuation, setDivSimpleValuation] =
    useState<LivePricingValuation | null>(null);
  useQuery(
    gql`
      query LivePriceDivConvSimple($config: LivePricingSimpleConfig!) {
        livePriceSimple(config: $config) {
          valuation {
            value
          }
        }
      }
    `,
    {
      variables: {
        config: {
          itemGroupHashString: "cceb40e33d9237cb6a06037e739e40aa9a548c70",
          league: league,
          listingPercent: 10,
          quantity: 1,
        },
      },
      onCompleted(data) {
        console.log("asdasd, ", data.livePriceSimple);
        setDivSimpleValuation(data.livePriceSimple?.valuation);
      },
    }
  );

  const [livePricingHistoryGroup, setLivePricingHistoryGroup] =
    useState<LivePricingHistorySeries | null>(null);
  useQuery(
    gql`
      query LivePricingHistoriesDivs($config: LivePricingHistoryConfig!) {
        livePricingHistory(config: $config) {
          results {
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
      variables: {
        config: {
          itemGroupHashStrings: ["cceb40e33d9237cb6a06037e739e40aa9a548c70"],
          league: league ?? POE_LEAGUES[0],
          minQuantities: [1],
          types: ["lp10"],
        },
      },
      onCompleted(data) {
        setLivePricingHistoryGroup(
          data.livePricingHistory.results[0].series[0]
        );
      },
    }
  );

  function divValueFromChaos(e: number, date?: Date | null): number | null {
    const length = livePricingHistoryGroup?.entries?.length;
    if (length) {
      const latestDivValueC = livePricingHistoryGroup?.entries[length - 1];

      if (e <= latestDivValueC.value) {
        return e;
      }

      if (!date) {
        return e / latestDivValueC.value;
      } else {
        const roundedDate = new Date(date);
        roundedDate.setHours(0, 0, 0, 0);
        const divValueC =
          livePricingHistoryGroup?.entries.find((e) => {
            const entryRoundedDate = new Date(e.timestamp);
            entryRoundedDate.setHours(0, 0, 0, 0);

            return entryRoundedDate === roundedDate;
          }) ?? latestDivValueC;
        return e / divValueC.value;
      }
    }
    return null;
  }

  const value = {
    divValueFromChaos: divValueFromChaos,
    divValueChaos: divSimpleValuation?.value,
  };

  return (
    <CurrencyConversionContext.Provider value={value}>
      {children}
    </CurrencyConversionContext.Provider>
  );
}

export const useCurrencyConversion = () =>
  useContext(CurrencyConversionContext);
