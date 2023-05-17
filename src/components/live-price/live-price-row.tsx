import Image from "next/image";

import ItemGroupPropertiesDisplay from "@components/item-group-properties-display";
import { LivePricingSummaryEntry } from "@generated/graphql";
import { GeneralUtils, myLoader } from "@utils/general-util";

export default function LivePriceRow({
  pricingSummary,
}: {
  pricingSummary: LivePricingSummaryEntry;
}) {
  if (!pricingSummary) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <tr key={pricingSummary.itemGroup.hashString}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
          <Image
            loader={myLoader}
            height={24}
            width={24}
            className="scale-150"
            src={pricingSummary.itemGroup.icon!}
            alt={""}
          />
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
          {GeneralUtils.capitalize(
            pricingSummary.itemGroup.displayName ?? pricingSummary.itemGroup.key
          )}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
          <ItemGroupPropertiesDisplay
            properties={pricingSummary.itemGroup.properties as any}
          />
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
          <div>{pricingSummary?.valuation?.value ?? "-"}</div>
          <div>{pricingSummary?.valuation?.validListingsLength ?? "-"}</div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
          <div>{pricingSummary?.stockValuation?.value ?? "-"}</div>
          <div>
            {pricingSummary?.stockValuation?.validListingsLength ?? "-"}
          </div>
        </td>
      </tr>
    </>
  );
}
