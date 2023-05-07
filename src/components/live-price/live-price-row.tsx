import Image from "next/image";

import { SearchableItemGroupSummary } from "@generated/graphql";
import { GeneralUtils, myLoader } from "@utils/general-util";

export default function LivePriceRow({
  itemGroupSummary,
}: {
  itemGroupSummary: SearchableItemGroupSummary;
}) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex">
          <img style={{ height: 30, width: 30 }} src={itemGroupSummary.icon!} />
          <div className="mr-auto px-2">
            {GeneralUtils.capitalize(
              itemGroupSummary.displayName ?? itemGroupSummary.key
            )}
          </div>
          <div className="mr-auto px-2">
            {GeneralUtils.capitalize(
              itemGroupSummary.displayName ?? itemGroupSummary.key
            )}
          </div>
        </div>
      </div>
    </>
  );
}
