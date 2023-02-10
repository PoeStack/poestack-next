import React from 'react';
import Link from "next/link";
import Image from "next/image";
import CurrencyValueDisplay from "../../../../../components/currency-value-display";
import HSparkline from "../../../../../components/hsparkline";
import { GeneralUtils } from "../../../../../utils/general-util";
import { ItemGroupValueTimeseries } from "../../../../../__generated__/resolvers-types";

type ItemsProps = {items: ItemGroupValueTimeseries[], league: string};

export default function ItemsTable({items, league }: ItemsProps) {
    return (
      <div className="min-h-[20rem]">
        <table className="w-full">
          <thead>
            <tr className="w-full">
              <th></th>
              <th className="text-left">Name</th>
              <th className="text-left">History</th>
              <th className="text-left">Listings</th>
              <th className="text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {items!.map((groupSeries, index) => (
              <tr key={index} className="hover:text-skin-accent">
                <td>
                  <Image
                    src={groupSeries.itemGroup?.icon ?? ""}
                    alt="icon"
                    width="25"
                    height="25"
                  />
                </td>

                <td>
                  <Link
                    href={`/poe/economy/${league}/item-group/${groupSeries?.itemGroup?.hashString}`}
                  >
                    {GeneralUtils.itemGroupToDisplayName(
                      groupSeries.itemGroup!
                    )}
                  </Link>
                </td>
                <td>
                  <HSparkline data={groupSeries.series} />
                </td>
                <td>
                  {(() => {
                    const recent = groupSeries.series?.find(
                      (s) => s.type === "totalValidListings"
                    );

                    return (
                      <>
                        {
                          recent?.entries?.[recent.entries.length - 1]
                            ?.value
                        }
                      </>
                    );
                  })()}
                </td>
                <td>
                  {(() => {
                    const recent = groupSeries.series?.find(
                      (s) => s.type === "p10"
                    );

                    return (
                      <>
                        <CurrencyValueDisplay
                          valueChaos={
                            recent?.entries?.[recent.entries.length - 1]
                              ?.value ?? 0
                          }
                        />
                      </>
                    );
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }