import { nanoid } from "nanoid";
import Image from "next/image";
import { useState, useEffect } from "react";

import { gql, useQuery } from "@apollo/client";
import StyledButton from "@components/library/styled-button";
import StyledCard from "@components/library/styled-card";
import StyledInput from "@components/library/styled-input";
import StyledLoading from "@components/library/styled-loading";
import StyledSelect2 from "@components/library/styled-select-2";
import { StyledSelectAuto } from "@components/library/styled-select-auto";
import { StyledTooltip } from "@components/library/styled-tooltip";
import {
  TftLiveListing,
  TftLiveListingSearchProperty,
} from "@generated/graphql";
import { TFT_COMPASSES } from "@utils/tft-compasses";

import { TftLiveSearchRoleHeader } from "./tft-live-search-role-header";
import { useCurrencyConversion } from "@contexts/currency-conversion-context";
import { GeneralUtils } from "@utils/general-util";

export function TftLiveSearchCompasses() {
  const [filters, setFilters] = useState<
    Record<string, TftLiveListingSearchProperty>
  >(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get("filters");

    if (filterParam && filterParam !== "null") {
      let filters = {};
      filterParam.split(",").forEach((e) => {
        const [key, value] = e.split("-");
        filters[nanoid()] = {
          key: `compasses,${key.replace("_", " ")},quantity`,
          value,
        };
      });
      return filters;
    }
    return {
      testId: {
        key: "compasses,Breach,quantity",
        value: "1",
      },
    };
  });

  // Add the filters to the url string
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    if (Object.keys(filters).length > 0) {
      let filterString = "";

      Object.entries(filters).forEach(([key, filter]) => {
        const filterKey = filter.key?.split(",")?.[1];
        filterString += `${filterKey.replace(" ", "_")}-${filter.value},`;
      });
      filterString = filterString.slice(0, -1);

      urlParams.set("filters", filterString);
    } else {
      urlParams.delete("filters");
    }

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParams.toString()}`
    );
  }, [filters]);

  const [sortType, setSortType] = useState<string>("Newest");

  const [listings, setListings] = useState<TftLiveListing[]>([]);
  const { refetch } = useQuery(
    gql`
      query TftLiveListingSearch($search: TftLiveListingSearch!) {
        tftLiveListingSearch(search: $search) {
          channelId
          messageId
          userDiscordId
          userDiscordName
          userDiscordDisplayRole
          userDiscordHighestRole
          userDiscordDisplayRoleColor
          updatedAtTimestamp
          delistedAtTimestamp
          tag
          properties
        }
      }
    `,
    {
      variables: {
        search: {
          tag: "compasses",
          propertyFilterGroups: [
            {
              filters: Object.values(filters),
            },
          ],
        },
      },
      onCompleted(data) {
        setListings(data.tftLiveListingSearch);
      },
    }
  );

  const { divValueChaos } = useCurrencyConversion();

  if (!filters) {
    return <StyledLoading />;
  }

  return (
    <>
      <div className="flex flex-col space-y-4">
        <StyledCard>
          <div className="flex flex-col space-y-2">
            <div>Filters</div>
            {Object.entries(filters).map(([key, filter]) => {
              const filterKey = filter.key?.split(",")?.[1];
              return (
                <>
                  <div className="flex content-center items-center space-x-2">
                    <div>Compass</div>
                    <div>
                      <StyledSelectAuto
                        selected={filterKey}
                        onSelectChange={(e) => {
                          setFilters({
                            ...filters,
                            [key]: {
                              ...filters[key],
                              key: `compasses,${e},quantity`,
                            },
                          });
                        }}
                        items={Object.values(TFT_COMPASSES)}
                      />
                    </div>
                    <div>Min Quantity</div>
                    <div>
                      <StyledInput
                        type="number"
                        value={filter.value}
                        onChange={(e) => {
                          setFilters({
                            ...filters,
                            [key]: {
                              ...filters[key],
                              value: e ? `${parseInt(e)}` : "0",
                            },
                          });
                        }}
                      />
                    </div>
                    <div>
                      <StyledButton
                        text={"Remove"}
                        onClick={() => {
                          const next = { ...filters };
                          delete next[key];
                          setFilters(next);
                        }}
                      />
                    </div>
                  </div>
                </>
              );
            })}
            <div className="flex w-fit flex-col space-y-2">
              <StyledButton
                text={"Add Filter"}
                onClick={() => {
                  setFilters({
                    ...filters,
                    [nanoid()]: {
                      key: "compasses,Alva,quantity",
                      value: "0",
                    },
                  });
                }}
              />
              <StyledButton
                text={"Search"}
                onClick={() => {
                  refetch();
                }}
              />
              <StyledSelect2
                selected={sortType}
                onSelectChange={(e) => setSortType(e)}
                mapToText={(e) => "Sort by " + e}
                items={["Newest", "Cheapest"]}
              />
            </div>
          </div>
        </StyledCard>
        <div className="grid grid-cols-3 gap-2">
          {[...listings]
            .map((listing) => {
              let totalC = 0;
              const core = Object.values(filters)
                .map((e) => {
                  const filterKey = e.key?.split(",")?.[1];
                  const value = listing.properties.compasses[filterKey]?.value;
                  totalC += value * parseFloat(e.value);
                  return `${e.value} ${filterKey} ${value}c each`;
                })
                .join(", ");
              return { ...listing, totalC, core };
            })
            .sort((a, b) => {
              if (sortType === "Newest") return 0;
              return a.totalC - b.totalC;
            })
            .map((listing) => {
              return (
                <>
                  <StyledCard>
                    <div className="flex flex-col">
                      <div className="pb-2">
                        <TftLiveSearchRoleHeader listing={listing} />
                      </div>

                      {Object.entries(filters).map(([key, filter]) => {
                        const filterKey = filter?.key?.split(",")?.[1];
                        return (
                          <>
                            <div className="text-sm">
                              x
                              {
                                listing.properties.compasses[filterKey]
                                  ?.quantity
                              }{" "}
                              {filterKey}{" "}
                              {listing.properties.compasses[filterKey]?.value}c
                              each
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <div className="flex space-x-2 pt-2 text-sm">
                      <div className="align-baseline">
                        {listing.totalC}c Total
                      </div>
                      <div className="flex-1"></div>

                      <div
                        className="cursor-pointer rounded-lg bg-color-secondary p-1"
                        onClick={() => {
                          let msg = `@${listing.properties.ign} WTB ${listing.core}. Total ${listing.totalC}c`;
                          if (divValueChaos) {
                            const divV = listing.totalC / divValueChaos;
                            if (divV >= 0.5) {
                              msg += ` (${GeneralUtils.chaosToDivPlusChaos(
                                divValueChaos,
                                listing.totalC,
                                false
                              )})`;
                            }
                          }
                          navigator.clipboard.writeText(msg);
                        }}
                      >
                        Copy Whisper
                      </div>
                    </div>
                  </StyledCard>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}
