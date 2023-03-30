import { gql, useQuery } from "@apollo/client";
import CurrencyValueDisplay from "@components/currency-value-display";
import { QuantityChart } from "@components/filterable-item-table";
import HSparkline from "@components/hsparkline";
import StyledPopover from "@components/styled-popover";
import {
  ItemGroupValueTimeseries,
  StashSnapshotItemGroupSummary,
  StashSnapshotItemGroupSummarySearch,
  StashSnapshotItemGroupSummarySearchResponse,
} from "@generated/graphql";
import { GeneralUtils, myLoader } from "@utils/general-util";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { ItemSearchUserInput } from "./snapshot-item-table";

export default function ItemTableBody({
  itemGroupSearch,
  league,
  searchUserInput,
  setSearchUserInput,
  disableTotalValueRow,
}: {
  itemGroupSearch: StashSnapshotItemGroupSummarySearch;
  league: string;
  searchUserInput: ItemSearchUserInput;
  setSearchUserInput: Dispatch<SetStateAction<ItemSearchUserInput>>;
  disableTotalValueRow?: boolean;
}) {
  const [itemGroupSearchResult, setItemGroupSearchResult] =
    useState<StashSnapshotItemGroupSummarySearchResponse | null>(null);
  useQuery(
    gql`
      query FilterableItemTableStashSnapshotItemGroupSummaries(
        $search: StashSnapshotItemGroupSummarySearchInput!
      ) {
        stashSnapshotItemGroupSummaries(search: $search) {
          hasMore
          totalValueChaos
          itemGroupSummaries {
            userId
            stashSnapshotId
            createdAtTimestamp
            itemGroupHashString
            quantity
            valueChaos
            totalValueChaos
            itemGroup {
              hashString
              key
              tag
              baseType
              icon
              inventoryMaxStackSize
              displayName
            }
          }
        }
      }
    `,
    {
      variables: { search: itemGroupSearch },
      skip: !itemGroupSearch,
      onCompleted(data) {
        setItemGroupSearchResult(data.stashSnapshotItemGroupSummaries);
      },
    }
  );

  const [itemValueTimeseries, setItemValueTimeseries] = useState<
    ItemGroupValueTimeseries[]
  >([]);
  useQuery(
    gql`
      query FilterableTimeTableTimeseriesSearch(
        $search: ItemGroupValueTimeseriesSearchInput!
      ) {
        itemGroupValueTimeseriesSearch(search: $search) {
          results {
            series {
              entries {
                timestamp
                value
              }
              type
            }
            itemGroup {
              hashString
            }
          }
        }
      }
    `,
    {
      skip: !league || !itemGroupSearchResult?.itemGroupSummaries?.length,
      variables: {
        search: {
          seriesTypes: ["p5", "p10", "p20", "p50"],
          stockStartingRanges: [0],
          itemGroupSearch: {
            itemGroupHashStrings:
              itemGroupSearchResult?.itemGroupSummaries?.map(
                (i) => i?.itemGroup?.hashString
              ),
            itemGroupHashKeys: [],
            league: league,
            skip: null,
            limit: null,
            searchString: null,
            sortDirection: null,
            itemGroupHashTags: [],
          },
        },
      },
      onCompleted(data) {
        setItemValueTimeseries(
          data?.itemGroupValueTimeseriesSearch?.results ?? []
        );
      },
    }
  );

  return (
    <>
      {" "}
      <table className="table-auto w-full">
        <thead>
          <tr className="w-full text-left">
            <th></th>
            <th></th>
            <th>Name</th>
            <th>Price History (1 Week)</th>
            <th>Quantity</th>
            <th>Value</th>
            {searchUserInput.itemValueOverrides && <th>Override</th>}
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody className="h-80">
          {itemGroupSearchResult?.itemGroupSummaries!.map(
            (itemSummary, index) => (
              <tr key={index} className="text-left">
                <td>
                  <input
                    type="checkbox"
                    className="peer w-4 h-4 text-content-accent bg-gray-100 border-gray-300 rounded "
                    checked={
                      !searchUserInput.excludedItemGroupHashStrings.includes(
                        itemSummary?.itemGroup?.hashString!
                      )
                    }
                    onChange={(e) => {
                      if (
                        searchUserInput.excludedItemGroupHashStrings.includes(
                          itemSummary?.itemGroup?.hashString!
                        )
                      ) {
                        setSearchUserInput({
                          ...searchUserInput,
                          excludedItemGroupHashStrings:
                            searchUserInput.excludedItemGroupHashStrings.filter(
                              (e) => e !== itemSummary?.itemGroup?.hashString!
                            ),
                        });
                      } else {
                        setSearchUserInput({
                          ...searchUserInput,
                          excludedItemGroupHashStrings: [
                            itemSummary?.itemGroup?.hashString!,
                            ...searchUserInput.excludedItemGroupHashStrings,
                          ],
                        });
                      }
                    }}
                  />
                </td>
                <td>
                  <Link
                    href={`https://www.poewiki.net/wiki/${encodeURIComponent(
                      (itemSummary.itemGroup?.baseType ?? "")?.replaceAll(
                        " ",
                        "_"
                      )
                    )}`}
                  >
                    <Image
                      loader={myLoader}
                      src={itemSummary.itemGroup?.icon ?? ""}
                      alt="icon"
                      width="25"
                      height="25"
                    />
                  </Link>
                </td>
                <td className="">
                  <Link
                    href={`/poe/economy/${league}/item-group/${itemSummary.itemGroup?.hashString}`}
                    className="hover:text-content-accent peer-checked:text-content-accent"
                  >
                    {GeneralUtils.itemGroupToDisplayName(
                      itemSummary?.itemGroup
                    )}
                  </Link>
                </td>
                <td>
                  <div className="flex flex-row place space-x-2">
                    <HSparkline
                      series={itemValueTimeseries
                        ?.find(
                          (h) =>
                            h?.itemGroup.hashString ===
                            itemSummary?.itemGroup?.hashString
                        )
                        ?.series?.find((e) => e.type === "p10")}
                    />
                    <StyledPopover text={"+"}>
                      <QuantityChart
                        timeseries={
                          itemValueTimeseries?.find(
                            (h) =>
                              h?.itemGroup.hashString ===
                              itemSummary?.itemGroup?.hashString
                          )?.series
                        }
                      />
                    </StyledPopover>
                  </div>
                </td>
                <td>{itemSummary?.quantity}</td>
                <td>
                  <div>
                    <CurrencyValueDisplay
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "" + itemSummary?.valueChaos
                        );
                      }}
                      pValue={itemSummary?.valueChaos!}
                      league={league}
                    />
                  </div>
                </td>
                <td>
                  {searchUserInput.itemValueOverrides && (
                    <input
                      type={"number"}
                      value={
                        searchUserInput.itemValueOverrides[
                        itemSummary.itemGroup!.hashString
                        ] ?? null
                      }
                      className="bg-transparent border border-color-primary focus:border-color-primary rounded-lg"
                      placeholder={
                        "" +
                        GeneralUtils.roundToFirstNoneZeroN(
                          itemSummary?.valueChaos ?? 0
                        )
                      }
                      required
                      onChange={(e) => {
                        const v = e.target.value
                          ? parseFloat(e.target.value)
                          : null;
                        setSearchUserInput((p) => ({
                          ...p,
                          itemValueOverrides: {
                            ...p.itemValueOverrides,
                            [itemSummary.itemGroup?.hashString!]: v!,
                          },
                        }));
                      }}
                    />
                  )}
                </td>
                <td>
                  <CurrencyValueDisplay
                    onClick={(display) => {
                      navigator.clipboard.writeText(
                        `${display}/${itemSummary?.quantity}`
                      );
                    }}
                    pValue={itemSummary?.totalValueChaos!}
                    league={league}
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
        {!disableTotalValueRow && (
          <tfoot className="sticky bottom-0 bg-theme-color-1 w-full">
            <tr>
              <th id="total" colSpan={6}>
                Total Value:
              </th>
              <td>
                <CurrencyValueDisplay
                  pValue={itemGroupSearchResult?.totalValueChaos ?? 0}
                  league={league}
                />
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </>
  );
}
