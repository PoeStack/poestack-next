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
      <div className="flex space-x-2">
        <div>
          <Image
            loader={myLoader}
            height={30}
            width={30}
            className="scale-150"
            src={pricingSummary.icon}
            alt={""}
          />
        </div>
        <div className="mr-auto px-2">
          {GeneralUtils.capitalize(itemGroupSummary.searchableString)}
        </div>
        <div className="ml-auto px-2">
          <ItemGroupPropertiesDisplay
            properties={itemGroupSummary.properties}
          />
        </div>
        <div>{pricingSummary.value ?? "-"}</div>
        <div>{pricingSummary.stockValue ?? "-"}</div>
      </div>
    </>
  );
}
