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
  StashViewItemSummary,
  PoeStashTab,
  ItemGroupValueTimeseries,
} from "@generated/graphql";
import { GeneralUtils } from "@utils/general-util";
import { StashViewUtil } from "@utils/stash-view-util";
import { StashViewSettings } from "pages/poe/stash-view";
import { useState } from "react";

export function StashViewItemTable({
  items,
  tabs,
  stashSettings,
  setStashViewSettings,
}: {
  items: StashViewItemSummary[];
  tabs: PoeStashTab[];
  stashSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
}) {
  const { league } = usePoeLeagueCtx();

  const pageSize = 25;

  const [page, setPage] = useState(0);

  const sortedItems = StashViewUtil.searchItems(stashSettings, items).sort(
    (a, b) => (b.totalValueChaos ?? 0) - (a.totalValueChaos ?? 0)
  );

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
      <StyledCard>
        <div className="flex flex-col space-y-2">
          <table className="w-full table-auto text-left min-h-[826px]">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Stash</th>
                <th></th>
                <th>Quantity</th>
                <th>Value</th>
                {stashSettings.valueOverridesEnabled && <th>Override</th>}
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {sortedItems
                .slice(page * pageSize, page * pageSize + pageSize)
                .map((item) => {
                  const tab = tabs.find((e) => e.id === item.stashId);
                  return (
                    <>
                      <tr className="h-[36px]">
                        <td>
                          <img style={{ height: 30 }} src={item.icon!} />
                        </td>
                        <td>
                          {GeneralUtils.capitalize(item.searchableString)}
                        </td>
                        <td
                          className={`${
                            tab?.id == stashSettings.selectedTabId
                              ? "text-content-accent"
                              : ""
                          } cursor-pointer`}
                          onClick={() => {
                            setStashViewSettings({
                              ...stashSettings,
                              selectedTabId: tab!.id,
                            });
                          }}
                        >
                          {tab?.name}
                        </td>
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
                        <td>{item.quantity}</td>
                        <td>
                          <CurrencyValueDisplay
                            pValue={item.valueChaos ?? 0}
                            league={league}
                          />
                        </td>
                        {stashSettings.valueOverridesEnabled && (
                          <td>
                            {!!item.itemGroupHashString && (
                              <StyledInput
                                value={
                                  stashSettings.itemGroupValueOverrides[
                                    item.itemGroupHashString!
                                  ]
                                }
                                type="number"
                                onChange={(e) => {
                                  if (e?.length > 0) {
                                    setStashViewSettings({
                                      ...stashSettings,
                                      itemGroupValueOverrides: {
                                        ...stashSettings.itemGroupValueOverrides,
                                        [item.itemGroupHashString!]:
                                          parseFloat(e),
                                      },
                                    });
                                  } else {
                                    const temp = {
                                      ...stashSettings.itemGroupValueOverrides,
                                    };
                                    delete temp[item.itemGroupHashString!];
                                    setStashViewSettings({
                                      ...stashSettings,
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
                        <td>
                          <CurrencyValueDisplay
                            pValue={StashViewUtil.itemStackTotalValue(
                              stashSettings,
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
                checked={stashSettings.valueOverridesEnabled}
                onChange={(e) => {
                  setStashViewSettings({
                    ...stashSettings,
                    valueOverridesEnabled: !stashSettings.valueOverridesEnabled,
                  });
                }}
              />
              <div>Enabled Overrides</div>
            </div>
          </div>
        </div>
      </StyledCard>
    </>
  );
}
