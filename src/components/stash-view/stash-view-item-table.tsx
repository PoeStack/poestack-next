import moment from "moment";
import { useEffect, useState } from "react";

import { gql, useQuery } from "@apollo/client";
import CurrencyValueDisplay from "@components/currency-value-display";
import HSparkline from "@components/hsparkline";
import ItemGroupPropertiesDisplay from "@components/item-group-properties-display";
import { ItemGroupTimeseriesChart } from "@components/item-group-timeseries-chart";
import StyledButton from "@components/library/styled-button";
import StyledInput from "@components/library/styled-input";
import StyledPopover from "@components/library/styled-popover";
import LivePricingSparkline from "@components/live-pricing/live-pricing-sparklive";
import { usePoeLeagueCtx } from "@contexts/league-context";
import { useStashViewContext } from "@contexts/stash-view-context";
import {
  ItemGroupValueTimeseries,
  LivePricingHistoryGroup,
  StashViewItemSummary,
} from "@generated/graphql";
import useWindowDimensions from "@hooks/user-window-dimensions";
import { GeneralUtils } from "@utils/general-util";
import { StashViewUtil } from "@utils/stash-view-util";

import { StashViewItemMouseOver } from "./stash-view-item-mouse-over";

export function StashViewItemTable({
  forceReducer = false,
}: {
  forceReducer?: boolean;
}) {
  const { stashTabs, stashViewSettings, stashSummary, setStashViewSettings } =
    useStashViewContext();

  const { league } = usePoeLeagueCtx();
  const { width } = useWindowDimensions();

  const pageSize = 25;

  const [page, setPage] = useState(0);

  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const [sortedItems, setSortedItems] = useState<StashViewItemSummary[]>([]);

  useEffect(() => {
    const res = StashViewUtil.searchItems(
      { ...stashViewSettings, excludedItemGroupIds: [] },
      stashSummary!,
      forceReducer || !!stashViewSettings.stackReducerEnabled
    );

    function sortValueOfKey(
      key: string | null,
      item: StashViewItemSummary
    ): number | string {
      key = key ?? "stackValue";
      let sortValue: number | string = 0;
      if (key === "stackValue") {
        sortValue = (item.valueChaos ?? 0) * item.quantity;
      } else if (key === "value") {
        sortValue = item.valueChaos ?? 0;
      } else if (key === "name") {
        sortValue = item.itemGroup?.displayName ?? item.searchableString;
      } else {
        sortValue = item[key];
      }
      return sortValue;
    }

    res.sort((a, b) => {
      const aV = sortValueOfKey(stashViewSettings.sortKey, a);
      const bV = sortValueOfKey(stashViewSettings.sortKey, b);

      let sortValue = 0;
      if (typeof aV === "string") {
        sortValue = (aV as string).localeCompare(bV as string);
      } else {
        sortValue = aV - (bV as number);
      }

      return stashViewSettings.sortDirection === "desc"
        ? -sortValue
        : sortValue;
    });

    setSelectAllChecked(
      stashViewSettings.excludedItemGroupIds.length === 0 ||
        !res.some(
          (e) =>
            e.itemGroupHashString &&
            stashViewSettings.excludedItemGroupIds.includes(
              e.itemGroupHashString
            )
        )
    );
    setSortedItems(res);
  }, [
    stashSummary,
    stashViewSettings,
    stashTabs,
    page,
    stashSummary?.updatedAtTimestamp,
    stashViewSettings?.lastSnapshotJobCompleteTimestamp,
  ]);

  const maxPage = Math.ceil(sortedItems.length / pageSize);

  const [livePricingHistoryGroups, setLivePricingHistoryGroups] = useState<
    LivePricingHistoryGroup[] | null
  >(null);
  useQuery(
    gql`
      query LivePricingHistories($config: LivePricingHistoryConfig!) {
        livePricingHistory(config: $config) {
          results {
            itemGroup {
              hashString
            }
            series {
              type
              stockRangeStartInclusive
              entries {
                timestamp
                value
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        config: {
          itemGroupHashStrings: sortedItems
            .slice(page * pageSize, page * pageSize + pageSize)
            .map((e) => e.itemGroupHashString)
            .filter((e) => !!e),
          league: league,
          minQuantities: [1],
          types: ["lp10"],
        },
      },
      onCompleted(data) {
        setLivePricingHistoryGroups(data.livePricingHistory.results);
      },
    }
  );

  if (page !== 0 && page >= maxPage) {
    setPage(Math.max(0, maxPage - 1));
  }

  function toggleSort(key: string) {
    if (stashViewSettings.sortKey === key) {
      setStashViewSettings({
        ...stashViewSettings,
        sortDirection:
          stashViewSettings.sortDirection === "asc" ? "desc" : "asc",
      });
    } else {
      setStashViewSettings({
        ...stashViewSettings,
        sortKey: key,
        sortDirection: "desc",
      });
    }
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
                  checked={selectAllChecked}
                  onChange={(e) => {
                    if (selectAllChecked) {
                      setStashViewSettings({
                        ...stashViewSettings,
                        excludedItemGroupIds: [
                          ...stashViewSettings.excludedItemGroupIds,
                          ...(sortedItems
                            .map((e) => e.itemGroupHashString)
                            .filter((e) => !!e) as string[]),
                        ],
                      });
                    } else {
                      setStashViewSettings({
                        ...stashViewSettings,
                        excludedItemGroupIds:
                          stashViewSettings.excludedItemGroupIds.filter(
                            (g) =>
                              !sortedItems.some(
                                (e) => e.itemGroupHashString === g
                              )
                          ),
                      });
                    }
                  }}
                />
              </th>
              <th></th>
              <th
                className="cursor-pointer"
                onClick={() => {
                  toggleSort("name");
                }}
              >
                Name
              </th>
              <th>Properties</th>
              <th>History</th>
              {!forceReducer && !stashViewSettings.stackReducerEnabled && (
                <th
                  className="cursor-pointer"
                  onClick={() => {
                    toggleSort("stashId");
                  }}
                >
                  Stash
                </th>
              )}
              <th
                className="cursor-pointer"
                onClick={() => {
                  toggleSort("quantity");
                }}
              >
                Quantity
              </th>
              {stashViewSettings.valueOverridesEnabled && (
                <th
                  className="cursor-pointer"
                  onClick={() => {
                    toggleSort("override");
                  }}
                >
                  Override
                </th>
              )}
              <th
                className="cursor-pointer"
                onClick={() => {
                  toggleSort("value");
                }}
              >
                Value
              </th>
              <th
                className="cursor-pointer"
                onClick={() => {
                  toggleSort("stackValue");
                }}
              >
                Total Value
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedItems
              .slice(page * pageSize, page * pageSize + pageSize)
              .map((item) => {
                const tab = stashTabs?.find((e) => e.id === item.stashId);
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
                        <img
                          style={{ height: 30 }}
                          src={item.icon ?? item.itemGroup?.icon!}
                        />
                      </td>
                      <td>
                        <StashViewItemMouseOver item={null} itemSummary={item}>
                          <div className="group-hover:text-content-accent">
                            {StashViewUtil.itemEntryToDisplayName(item)}
                          </div>
                        </StashViewItemMouseOver>
                      </td>
                      {!forceReducer &&
                        !stashViewSettings.stackReducerEnabled && (
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
                        <ItemGroupPropertiesDisplay
                          properties={item?.itemGroup?.properties as any}
                        />
                      </td>
                      <td>
                        <LivePricingSparkline
                          historyGroup={livePricingHistoryGroups?.find(
                            (g) =>
                              g.itemGroup.hashString ===
                              item.itemGroupHashString
                          )}
                        />
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
              text={"First"}
              onClick={() => {
                setPage(0);
              }}
            />
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
            <StyledButton
              text={"Last"}
              onClick={() => {
                setPage(maxPage);
              }}
            />
          </div>
          <div className="flex space-x-4 items-center">
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
            {!forceReducer && (
              <div className="flex space-x-1 items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-content-accent bg-gray-100 border-gray-300 rounded"
                  checked={!!stashViewSettings.stackReducerEnabled}
                  onChange={(e) => {
                    setStashViewSettings({
                      ...stashViewSettings,
                      stackReducerEnabled:
                        !stashViewSettings.stackReducerEnabled,
                    });
                  }}
                />
                <div>Reduce Stacks</div>
              </div>
            )}
          </div>
          <div className="flex-1"></div>
          <div>
            Updated {moment(stashSummary?.updatedAtTimestamp).fromNow()}
          </div>
        </div>
      </div>
    </>
  );
}
