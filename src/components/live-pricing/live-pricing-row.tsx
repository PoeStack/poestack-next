import Image from "next/image";
import { useRouter } from "next/router";

import CurrencyValueDisplay from "@components/currency-value-display";
import ItemGroupPropertiesDisplay from "@components/item-group-properties-display";
import { DIV_HASH_STRING } from "@contexts/currency-conversion-context";
import { POE_LEAGUES } from "@contexts/league-context";
import {
  LivePricingHistoryGroup,
  LivePricingSummaryEntry,
} from "@generated/graphql";
import { GeneralUtils, myLoader } from "@utils/general-util";

import LivePricingSparkline from "./live-pricing-sparklive";

export default function LivePriceRow({
  pricingSummary,
  historyGroup,
}: {
  pricingSummary: LivePricingSummaryEntry;
  historyGroup: LivePricingHistoryGroup | null | undefined;
}) {
  const router = useRouter();

  if (!pricingSummary) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <tr
        key={pricingSummary.itemGroup.hashString}
        className="group text-gray-300 "
      >
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
          <Image
            loader={myLoader}
            height={24}
            width={24}
            className="scale-150"
            src={pricingSummary.itemGroup.icon!}
            alt={""}
          />
        </td>
        <td
          className="whitespace-nowrap px-3 py-4 text-sm  cursor-pointer group-hover:text-content-accent"
          onClick={() => {
            router.push(
              `/pricing/${pricingSummary.itemGroup.hashString}?league=${
                router.query.league ?? POE_LEAGUES[0]
              }`
            );
          }}
        >
          {GeneralUtils.capitalize(
            pricingSummary.itemGroup.displayName ?? pricingSummary.itemGroup.key
          )}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm group-hover:text-content-accent">
          <ItemGroupPropertiesDisplay
            properties={pricingSummary.itemGroup.properties as any}
          />
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm group-hover:text-content-accent">
          <LivePricingSparkline historyGroup={historyGroup} />
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm group-hover:text-content-accent">
          {pricingSummary?.valuation?.value ? (
            <CurrencyValueDisplay
              pValue={pricingSummary?.valuation?.value}
              league={(router.query.league as string) ?? POE_LEAGUES[0]}
              forceChaosDisplay={
                pricingSummary.itemGroup.hashString === DIV_HASH_STRING
              }
            />
          ) : (
            "-"
          )}
          <div className="text-xs">
            {pricingSummary?.valuation?.validListingsLength ?? "-"} Listings
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm group-hover:text-content-accent ">
          <div>
            {pricingSummary?.stockValuation?.value ? (
              <CurrencyValueDisplay
                pValue={pricingSummary?.stockValuation?.value}
                league={(router.query.league as string) ?? POE_LEAGUES[0]}
                forceChaosDisplay={
                  pricingSummary.itemGroup.hashString === DIV_HASH_STRING
                }
              />
            ) : (
              "-"
            )}
          </div>
          <div className="text-xs">
            {pricingSummary?.stockValuation?.validListingsLength ?? "-"}{" "}
            Listings
          </div>
        </td>
      </tr>
    </>
  );
}
