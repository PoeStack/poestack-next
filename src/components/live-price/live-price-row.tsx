import Image from "next/image";
import { ItemGroupSummary } from "pages/pricing";

import ItemGroupPropertiesDisplay from "@components/item-group-properties-display";
import { LivePricingSummaryEntry } from "@generated/graphql";
import { GeneralUtils, myLoader } from "@utils/general-util";

export default function LivePriceRow({
  itemGroupSummary,
  pricingSummary,
}: {
  itemGroupSummary: ItemGroupSummary;
  pricingSummary: LivePricingSummaryEntry;
}) {
  if (!pricingSummary) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <tr key={itemGroupSummary.hash}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
          <Image
            loader={myLoader}
            height={24}
            width={24}
            className="scale-150"
            src={pricingSummary.icon}
            alt={""}
          />
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
          {GeneralUtils.capitalize(itemGroupSummary.searchableString)}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
          <ItemGroupPropertiesDisplay
            properties={itemGroupSummary.properties}
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
