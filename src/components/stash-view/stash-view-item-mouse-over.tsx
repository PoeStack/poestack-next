import { gql, useLazyQuery } from "@apollo/client";
import CurrencyValueDisplay from "@components/currency-value-display";

import {
  CharacterSnapshotItem,
  ItemGroupListing,
  StashViewItemSummary,
  StashViewStashSummary,
} from "@generated/graphql";
import { GeneralUtils } from "@utils/general-util";
import { StashViewExporters } from "@utils/stash-view-exporters";
import { StashViewUtil } from "@utils/stash-view-util";
import moment from "moment";
import Link from "next/link";
import { StashViewSettings } from "pages/poe/stash-view";
import { useEffect, useState } from "react";

export function StashViewItemMouseOver({
  item,
  itemSummary,
  stashSummary,
  stashSettings,
  setStashViewSettings,
  children,
}: {
  item: CharacterSnapshotItem | null;
  itemSummary: StashViewItemSummary | null | undefined;
  stashSummary: StashViewStashSummary;
  stashSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
  children: any;
}) {
  if (item?.itemGroupHashString && !itemSummary) {
    itemSummary = stashSummary.items.find(
      (e) => e.itemGroupHashString === item.itemGroupHashString
    );
  }

  const stock = stashSummary.items.reduce(
    (p, c) =>
      p +
      (c.itemGroupHashString === itemSummary?.itemGroupHashString
        ? c.quantity
        : 0),
    0
  );

  const [baseHover, setIsHovering] = useState(false);
  const [extraHover, setIsExtraHovering] = useState(false);

  const [listings, setListings] = useState<ItemGroupListing[] | null>(null);
  const [fetchListings, { loading }] = useLazyQuery(
    gql`
      query ItemGroupListings(
        $hashString: String!
        $league: String!
        $minStock: Float
      ) {
        itemGroupListings(
          hashString: $hashString
          league: $league
          minStock: $minStock
        ) {
          accountName
          listedAtTimestamp
          stackSize
          listedValueChaos
        }
      }
    `,
    {
      variables: {
        hashString: itemSummary?.itemGroupHashString,
        league: "Crucible",
        minStock: stock,
      },
      onCompleted(data) {
        setListings(data.itemGroupListings);
      },
    }
  );

  useEffect(() => {
    if (!listings && (baseHover || extraHover)) {
      fetchListings();
    }
  }, [baseHover, extraHover]);

  const displayName =
    itemSummary?.itemGroup?.displayName ?? itemSummary?.searchableString;

  return (
    <>
      <div
        onMouseEnter={() => {
          setIsHovering(true);
        }}
        onMouseLeave={() => setIsHovering(false)}
      >
        {(baseHover || extraHover) && (
          <div className="absolute z-50">
            <div
              className="pr-5 pb-5 pl-20"
              onMouseEnter={() => {
                setIsExtraHovering(true);
              }}
              onMouseLeave={() => setIsExtraHovering(false)}
            >
              <div className="p-4 bg-color-primary opacity-100 flex flex-col space-y-2 min-w-[600px]">
                <div>{GeneralUtils.capitalize(displayName)}</div>
                <div className="flex space-x-4">
                  <div className="flex space-x-1 items-center">
                    <div>Value</div>
                    <CurrencyValueDisplay
                      pValue={StashViewUtil.itemValue(
                        stashSettings,
                        itemSummary!
                      )}
                      league={itemSummary?.league}
                    />
                  </div>
                  <div className="flex space-x-1 items-center">
                    <div>Stock</div>
                    <div>{stock}</div>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <div>Total</div>
                    <CurrencyValueDisplay
                      pValue={
                        stock *
                        StashViewUtil.itemValue(stashSettings, itemSummary!)
                      }
                      league={itemSummary?.league}
                    />
                  </div>
                </div>
                <div className="flex space-x-1">
 
                  <div>
                    {StashViewExporters.closestFraction(
                      StashViewUtil.itemValue(stashSettings, itemSummary!),
                      itemSummary?.quantity!
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/poe/economy/${itemSummary?.league}/item-group/${itemSummary?.itemGroupHashString}`}
                  >
                    <div className="bg-surface-primary rounded-lg p-1">
                      Economy
                    </div>
                  </Link>
                  <Link
                    href={`https://www.poewiki.net/wiki/${encodeURIComponent(
                      (itemSummary!.itemGroup?.baseType ?? "")?.replaceAll(
                        " ",
                        "_"
                      )
                    )}`}
                  >
                    <div className="bg-surface-primary rounded-lg p-1">
                      Wiki
                    </div>
                  </Link>
                  <Link
                    href={`https://www.pathofexile.com/trade/search/Crucible?q={"query":{"type":"${itemSummary?.itemGroup?.baseType}"}}`}
                  >
                    <div className="bg-surface-primary rounded-lg p-1">
                      Trade
                    </div>
                  </Link>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {listings?.slice(0, 20).map((listing) => (
                    <>
                      <div>x{listing.stackSize}</div>
                      <div>{listing.accountName}</div>
                      <div>
                        <CurrencyValueDisplay
                          pValue={listing.listedValueChaos}
                          league={itemSummary?.league}
                        />
                      </div>
                      <div>{moment(listing.listedAtTimestamp).fromNow()}</div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {children}
      </div>
    </>
  );
}
