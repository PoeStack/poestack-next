import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { gql, useQuery } from "@apollo/client";
import LeagueSelect from "@components/league-select";
import StyledButton from "@components/library/styled-button";
import StyledCard from "@components/library/styled-card";
import LivePriceRow from "@components/live-price/live-price-row";
import { LivePricingSummaryEntry } from "@generated/graphql";
import { GeneralUtils, myLoader } from "@utils/general-util";

export interface ItemGroupSummary {
  hash: string;
  properties: any;
  searchableString: string;
}

export default function LivePricingPage() {
  const router = useRouter();

  useEffect(() => {
    if (router.query && !router.query.league) {
      router.push(
        {
          query: { ...router.query, league: "Crucible" },
        },
        undefined,
        {
          shallow: true,
        }
      );
    }
  }, []);

  const [livePricingEntires, setLivePricingEntires] = useState<
    LivePricingSummaryEntry[]
  >([]);
  useQuery(
    gql`
      query Query($search: LivePricingSummarySearch!) {
        livePricingSummarySearch(search: $search) {
          entries {
            itemGroup {
              hashString
              key
              properties
              icon
              displayName
            }
            valuation {
              value
              validListingsLength
            }
            stockValuation {
              listingPercent
              value
              validListingsLength
            }
          }
        }
      }
    `,
    {
      variables: {
        search: {
          league: router.query.league,
          offSet: 0,
          searchString: null,
          tag: router.query.tag ?? "currency",
        },
      },
      onCompleted(data) {
        setLivePricingEntires(data.livePricingSummarySearch?.entries);
      },
    }
  );

  return (
    <>
      <StyledCard className="flex-0">
        <div className="flex space-x-6">
          <div className="flex flex-col space-y-3">
            <LeagueSelect />
            {ITEM_GROUP_CATEGORIES.map((category) => (
              <div
                key={category.tag}
                className="flex space-x-1 cursor-pointer"
                onClick={() => {
                  router.push(
                    {
                      query: { ...router.query, tag: category.tag },
                    },
                    undefined,
                    {
                      shallow: true,
                    }
                  );
                }}
              >
                <div>
                  <Image
                    loader={myLoader}
                    height={24}
                    width={24}
                    src={category.icon}
                    alt={""}
                  />
                </div>
                <div className="text-lg">
                  {GeneralUtils.capitalize(category.tag)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col space-y-2 w-full">
            <table className="divide-y divide-gray-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                  >
                    Icon
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Properties
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Value
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Stock Value (25+)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {livePricingEntires?.map((e) => (
                  <LivePriceRow
                    key={e.itemGroup.hashString}
                    pricingSummary={e}
                  />
                ))}
              </tbody>
            </table>
            {/*             <StyledButton
              text={"Load More"}
              onClick={() => {
                setTargetCount(targetCount + 25);
              }}
            /> */}
          </div>
        </div>
      </StyledCard>
    </>
  );
}

const ITEM_GROUP_CATEGORIES = [
  {
    tag: "currency",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lNb2RWYWx1ZXMiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/e1a54ff97d/CurrencyModValues.png",
  },
  {
    tag: "fragment",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9BdGxhc01hcEd1YXJkaWFuRmlyZSIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/6327dee00e/AtlasMapGuardianFire.png",
  },
  {
    tag: "scarab",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvU2NhcmFicy9Ob3JtYWxTY2FyYWJEaXZpbmF0aW9uIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/7fb7abf05a/NormalScarabDivination.png",
  },
  {
    tag: "compass",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ2hhcmdlZENvbXBhc3MiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/ea8fcc3e35/ChargedCompass.png",
  },
  {
    tag: "card",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvRGl2aW5hdGlvbi9JbnZlbnRvcnlJY29uIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/f34bf8cbb5/InventoryIcon.png",
  },
  {
    tag: "artifacts",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRXhwZWRpdGlvbi9HYW1ibGVyUmVmcmVzaEN1cnJlbmN5IiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/f878f8fc1a/GamblerRefreshCurrency.png",
  },
  {
    tag: "oil",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvT2lscy9BenVyZU9pbCIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/926343421b/AzureOil.png",
  },
  {
    tag: "incubator",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvSW5jdWJhdGlvbi9JbmN1YmF0aW9uQ3VycmVuY3kiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/90d8bfe442/IncubationCurrency.png",
  },

  {
    tag: "unique",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQW11bGV0cy9NYXN0ZXJPZkdlbXMiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/f6497cbdfe/MasterOfGems.png",
  },
  {
    tag: "cluster",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvSmV3ZWxzL05ld0dlbUJhc2UzIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/db35e60885/NewGemBase3.png",
  },

  {
    tag: "atlas memory",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvTWVtb3J5TGluZS9OaWtvTWVtb3J5SXRlbSIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/5c560ea8fd/NikoMemoryItem.png",
  },
  {
    tag: "beast",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQmVzdGlhcnlPcmJGdWxsIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/3214b44360/BestiaryOrbFull.png",
  },
  {
    tag: "blueprint",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvSGVpc3QvQmx1ZXByaW50Tm90QXBwcm92ZWQ0IiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/2705c5829f/BlueprintNotApproved4.png",
  },
  {
    tag: "catalyst",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ2F0YWx5c3RzL0ludHJpbnNpY0NhdGFseXN0IiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/107ffb799e/IntrinsicCatalyst.png",
  },
  {
    tag: "contract",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvSGVpc3QvQ29udHJhY3RJdGVtNSIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/fd1a9eb91f/ContractItem5.png",
  },
  {
    tag: "delirium orb",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsaXJpdW0vRGVsaXJpdW1PcmJTY2FyYWJzIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/fa4c5160ca/DeliriumOrbScarabs.png",
  },
  {
    tag: "essence",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRXNzZW5jZS9IYXRyZWQ3IiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/81249b110a/Hatred7.png",
  },
  {
    tag: "fossil",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsdmUvRmFjZXRlZEZvc3NpbCIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/db0aba6238/FacetedFossil.png",
  },
  {
    tag: "gem",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvR2Vtcy9TdXBwb3J0L1N1cHBvcnRQbHVzL1NwZWxsQ2FzY2FkZVBsdXMiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/7a316ceb5c/SpellCascadePlus.png",
  },
  {
    tag: "invitation",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvUXVlc3RJdGVtcy9DbGVhbnNpbmdGaXJlT3JiUXVlc3Q1IiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/e6f9234053/CleansingFireOrbQuest5.png",
  },
  {
    tag: "logbook",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9FeHBlZGl0aW9uQ2hyb25pY2xlMyIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/2802fe605e/ExpeditionChronicle3.png",
  },
  {
    tag: "map",
    icon: "https://web.poecdn.com/gen/image/WzI4LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9BdGxhczJNYXBzL05ldy9NYWxmb3JtYXRpb24iLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MSwibW4iOjE3LCJtdCI6MTYsIm1jIjoyLCJtZCI6dHJ1ZX1d/9ace75b843/Malformation.png",
  },
  {
    tag: "misc",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ3VycmVuY3lSaG9hRmVhdGhlciIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/a6c81de02d/CurrencyRhoaFeather.png",
  },
  {
    tag: "resonator",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsdmUvUmVyb2xsMXgxQSIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/eea57ec0df/Reroll1x1A.png",
  },
  {
    tag: "scouting report",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvU2NvdXRpbmdSZXBvcnQiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/584635f3c8/ScoutingReport.png",
  },
  {
    tag: "vial",
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvVmlhbFRlbXBlcmVkRmxlc2giLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/ff6f1f931e/VialTemperedFlesh.png",
  },
];
