import { useQuery, gql } from "@apollo/client";
import CurrencyValueDisplay from "@components/currency-value-display";
import HSparkline from "@components/hsparkline";
import { ItemGroupTimeseriesChart } from "@components/item-group-timeseries-chart";
import StyledButton from "@components/styled-button";
import StyledCard from "@components/styled-card";
import StyledInput from "@components/styled-input";
import StyledPopover from "@components/styled-popover";
import { usePoeLeagueCtx } from "@contexts/league-context";
import {
  PoeStashTab,
  ItemGroupValueTimeseries,
  StashViewStashSummary,
  StashViewItemSummary,
} from "@generated/graphql";
import { GeneralUtils } from "@utils/general-util";
import { StashViewUtil } from "@utils/stash-view-util";
import { useEffect, useState } from "react";
import { StashViewItemMouseOver } from "./stash-view-item-mouse-over";
import { useStashViewContext } from "@contexts/stash-view-context";

export function StashViewItemTable() {
  const { stashTabs, stashViewSettings, stashSummary, setStashViewSettings } =
    useStashViewContext();

  const { league } = usePoeLeagueCtx();

  const pageSize = 25;

  const [page, setPage] = useState(0);

  const [sortedItems, setSortedItems] = useState<StashViewItemSummary[]>([]);

  useEffect(() => {
    let res = StashViewUtil.searchItems(
      { ...stashViewSettings, excludedItemGroupIds: [] },
      stashSummary!
    ).sort((a, b) => (b.totalValueChaos ?? 0) - (a.totalValueChaos ?? 0));

    if (stashViewSettings.selectedExporter === "TFT-Bulk") {
      res = StashViewUtil.reduceItemStacks(res);
    }

    setSortedItems(res);
  }, [stashSummary, stashViewSettings, stashTabs, page]);

  const maxPage = Math.ceil(sortedItems.length / pageSize);

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
      skip: !league || !sortedItems?.length,
      variables: {
        search: {
          seriesTypes: ["p5", "p10", "p20", "p50"],
          stockStartingRanges: [0],
          itemGroupSearch: {
            itemGroupHashStrings: sortedItems
              .slice(page * pageSize, page * pageSize + pageSize)
              .map((e) => e.itemGroupHashString)
              .filter((e) => !!e),
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

  if (page !== 0 && page >= maxPage) {
    setPage(Math.max(0, maxPage - 1));
  }

  return (
    <>
      <div className="flex flex-col space-y-2 min-h-[826px]">
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded peer text-content-accent "
                  checked={stashViewSettings.excludedItemGroupIds.length === 0}
                  onChange={(e) => {
                    if (stashViewSettings.excludedItemGroupIds.length === 0) {
                      setStashViewSettings({
                        ...stashViewSettings,
                        excludedItemGroupIds: sortedItems
                          .map((e) => e.itemGroupHashString)
                          .filter((e) => !!e) as string[],
                      });
                    } else {
                      setStashViewSettings({
                        ...stashViewSettings,
                        excludedItemGroupIds: [],
                      });
                    }
                  }}
                />
              </th>
              <th></th>
              <th>Name</th>
              {stashViewSettings.selectedExporter !== "TFT-Bulk" && (
                <th>Stash</th>
              )}
              <th></th>
              <th>Quantity</th>
              {stashViewSettings.valueOverridesEnabled && <th>Override</th>}
              <th>Value</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems
              .slice(page * pageSize, page * pageSize + pageSize)
              .map((item) => {
                const tab = stashTabs.find((e) => e.id === item.stashId);
                return (
                  <>
                    <tr className="h-[36px] group">
                      <td>
                        <input
                          type="checkbox"
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded peer text-content-accent "
                          checked={
                            !item.itemGroupHashString ||
                            !stashViewSettings.excludedItemGroupIds?.includes(
                              item.itemGroupHashString
                            )
                          }
                          onChange={(e) => {
                            if (item.itemGroupHashString) {
                              if (
                                !stashViewSettings.excludedItemGroupIds?.includes(
                                  item.itemGroupHashString
                                )
                              ) {
                                setStashViewSettings({
                                  ...stashViewSettings,
                                  excludedItemGroupIds: [
                                    ...(stashViewSettings.excludedItemGroupIds ??
                                      []),
                                    item.itemGroupHashString!,
                                  ],
                                });
                              } else {
                                setStashViewSettings({
                                  ...stashViewSettings,
                                  excludedItemGroupIds:
                                    stashViewSettings.excludedItemGroupIds.filter(
                                      (id) => id !== item.itemGroupHashString
                                    ),
                                });
                              }
                            }
                          }}
                        />
                      </td>
                      <td>
                        <img style={{ height: 30 }} src={item.icon!} />
                      </td>
                      <td>
                        <StashViewItemMouseOver item={null} itemSummary={item}>
                          <div className="group-hover:text-content-accent">
                            {GeneralUtils.capitalize(
                              item.itemGroup?.displayName ??
                                item.searchableString
                            )}
                          </div>
                        </StashViewItemMouseOver>
                      </td>
                      {stashViewSettings.selectedExporter !== "TFT-Bulk" && (
                        <td
                          className={`${
                            tab?.id == stashViewSettings.selectedTabId
                              ? "text-content-accent"
                              : ""
                          } cursor-pointer group-hover:text-content-accent`}
                          onClick={() => {
                            setStashViewSettings({
                              ...stashViewSettings,
                              selectedTabId: tab!.id,
                            });
                          }}
                        >
                          {tab?.name}
                        </td>
                      )}
                      <td>
                        {!!item.itemGroupHashString && (
                          <div className="flex">
                            <HSparkline
                              series={itemValueTimeseries
                                ?.find(
                                  (h) =>
                                    h?.itemGroup.hashString ===
                                    item.itemGroupHashString
                                )
                                ?.series?.find((e) => e.type === "p10")}
                            />
                            <StyledPopover>
                              <ItemGroupTimeseriesChart
                                timeseries={
                                  itemValueTimeseries?.find(
                                    (h) =>
                                      h?.itemGroup.hashString ===
                                      item.itemGroupHashString
                                  )?.series
                                }
                              />
                            </StyledPopover>
                          </div>
                        )}
                      </td>
                      <td className="group-hover:text-content-accent">
                        {item.quantity}
                      </td>
                      {stashViewSettings.valueOverridesEnabled && (
                        <td>
                          {!!item.itemGroupHashString && (
                            <StyledInput
                              value={
                                stashViewSettings.itemGroupValueOverrides[
                                  item.itemGroupHashString!
                                ]
                              }
                              type="number"
                              onChange={(e) => {
                                if (e?.length > 0) {
                                  setStashViewSettings({
                                    ...stashViewSettings,
                                    itemGroupValueOverrides: {
                                      ...stashViewSettings.itemGroupValueOverrides,
                                      [item.itemGroupHashString!]:
                                        parseFloat(e),
                                    },
                                  });
                                } else {
                                  const temp = {
                                    ...stashViewSettings.itemGroupValueOverrides,
                                  };
                                  delete temp[item.itemGroupHashString!];
                                  setStashViewSettings({
                                    ...stashViewSettings,
                                    itemGroupValueOverrides: temp,
                                  });
                                }
                              }}
                              placeholder={`${GeneralUtils.roundToFirstNoneZeroN(
                                item.valueChaos ?? 0
                              )}c`}
                            />
                          )}
                        </td>
                      )}
                      <td className="group-hover:text-content-accent">
                        <CurrencyValueDisplay
                          pValue={StashViewUtil.itemValue(
                            stashViewSettings,
                            item
                          )}
                          league={league}
                        />
                      </td>
                      <td className="group-hover:text-content-accent">
                        <CurrencyValueDisplay
                          pValue={StashViewUtil.itemStackTotalValue(
                            stashViewSettings,
                            item
                          )}
                          league={league}
                        />
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
        <div className="flex-1"></div>
        <div className="flex space-x-4 items-center">
          <div className="flex space-x-2">
            <StyledButton
              text={"Previous"}
              onClick={() => {
                setPage(Math.max(0, page - 1));
              }}
            />
            <div>
              {maxPage === 0 ? 0 : page + 1}/{maxPage} Page
            </div>
            <StyledButton
              text={"Next"}
              onClick={() => {
                setPage(Math.min(maxPage - 1, page + 1));
              }}
            />
          </div>
          <div className="flex space-x-1 items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-content-accent bg-gray-100 border-gray-300 rounded"
              checked={stashViewSettings.valueOverridesEnabled}
              onChange={(e) => {
                setStashViewSettings({
                  ...stashViewSettings,
                  valueOverridesEnabled:
                    !stashViewSettings.valueOverridesEnabled,
                });
              }}
            />
            <div>Enabled Overrides</div>
          </div>
        </div>
      </div>
    </>
  );
}
