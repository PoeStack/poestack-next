import Image from "next/image";
import { useRouter } from "next/router";

import CurrencyValueDisplay from "@components/currency-value-display";
import ItemGroupPropertiesDisplay from "@components/item-group-properties-display";
import { LivePricingSummaryEntry } from "@generated/graphql";
import { GeneralUtils, myLoader } from "@utils/general-util";

export default function LivePriceRow({
  pricingSummary,
}: {
  pricingSummary: LivePricingSummaryEntry;
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
              `/pricing/${pricingSummary.itemGroup.hashString}?league=${router.query.league}`
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
          {pricingSummary?.valuation?.value ? (
            <CurrencyValueDisplay
              pValue={pricingSummary?.valuation?.value}
              league={router.query.league as string}
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
                league={router.query.league as string}
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
