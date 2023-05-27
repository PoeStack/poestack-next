import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

import { gql, useLazyQuery } from "@apollo/client";
import CurrencyValueDisplay from "@components/currency-value-display";
import { useStashViewContext } from "@contexts/stash-view-context";
import {
  CharacterSnapshotItem,
  LivePricingSimpleResult,
  StashViewItemSummary,
} from "@generated/graphql";
import { GeneralUtils } from "@utils/general-util";
import { StashViewExporters } from "@utils/stash-view-exporters";
import { StashViewUtil } from "@utils/stash-view-util";

export function StashViewItemMouseOver({
  item,
  itemSummary,
  children,
}: {
  item: CharacterSnapshotItem | null;
  itemSummary: StashViewItemSummary | null | undefined;
  children: any;
}) {
  const { stashViewSettings, stashSummary } = useStashViewContext();

  if (item?.itemGroupHashString && !itemSummary) {
    itemSummary = stashSummary!.items.find(
      (e) => e.itemGroupHashString === item.itemGroupHashString
    );
  }

  const stock = stashSummary!.items.reduce(
    (p, c) =>
      p +
      (c.itemGroupHashString === itemSummary?.itemGroupHashString
        ? c.quantity
        : 0),
    0
  );

  const [baseHover, setIsHovering] = useState(false);
  const [extraHover, setIsExtraHovering] = useState(false);

  const [livePricingResult, setLivePricingResult] =
    useState<LivePricingSimpleResult | null>(null);
  const [fetchListings, { loading }] = useLazyQuery(
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
      variables: {
        config: {
          itemGroupHashString: itemSummary?.itemGroupHashString,
          league: itemSummary?.league,
          quantity: stock,
        },
      },
      onCompleted(data) {
        setLivePricingResult(data.livePriceSimple);
      },
    }
  );

  useEffect(() => {
    if (!livePricingResult && (baseHover || extraHover)) {
      fetchListings();
    }
  }, [baseHover, extraHover]);

  const displayName =
    itemSummary?.itemGroup?.displayName ?? itemSummary?.searchableString;

  if (!itemSummary) {
    return <>{children}</>;
  }

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
              <div className="p-4 bg-color-primary border-2 border-color-secondary rounded-lg flex flex-col space-y-2 min-w-[600px]">
                <div>{StashViewUtil.itemEntryToName(itemSummary)}</div>
                <div className="flex space-x-4">
                  <div className="flex space-x-1 items-center">
                    <div>Value</div>
                    <CurrencyValueDisplay
                      pValue={itemSummary["lpValue"] ?? 0}
                      league={itemSummary?.league}
                    />
                  </div>
                  <div className="flex space-x-1 items-center">
                    <div>Quantity</div>
                    <div>{stock}</div>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <div>Stock Value</div>
                    <CurrencyValueDisplay
                      pValue={itemSummary["lpStockValue"] ?? 0}
                      league={itemSummary?.league}
                    />
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div>
                    {StashViewExporters.getWholeFractionString(
                      StashViewUtil.itemValue(stashViewSettings, itemSummary!),
                      itemSummary?.quantity!
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/pricing/${itemSummary?.itemGroupHashString}?league=${itemSummary?.league}`}
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
                <div className="grid grid-cols-3 gap-1">
                  {loading ? (
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
                                league={itemSummary?.league}
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
            </div>
          </div>
        )}
        {children}
      </div>
    </>
  );
}
