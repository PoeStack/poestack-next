import { useEffect, useState } from "react";

import { gql, useQuery } from "@apollo/client";
import LeagueSelect from "@components/league-select";
import StyledCard from "@components/library/styled-card";
import LivePriceRow from "@components/live-price/live-price-row";
import { LivePricingSummaryEntry } from "@generated/graphql";

export interface ItemGroupSummary {
  hash: string;
  properties: any;
  searchableString: string;
}

const ITEM_GROUP_CATEGORIES = [
  { tag: "currency" },
  { tag: "fragment" },
  { tag: "card" },
  { tag: "compass" },
  { tag: "artifacts" },
  { tag: "oil" },
  { tag: "incubator" },

  { tag: "unique" },
  { tag: "cluster" },

  { tag: "atlas memory" },
  { tag: "beast" },
  { tag: "blueprint" },
  { tag: "catalyst" },
  { tag: "contract" },
  { tag: "delirium orb" },
  { tag: "essence" },
  { tag: "fossil" },
  { tag: "gem" },
  { tag: "geode" },
  { tag: "invitation" },
  { tag: "invocation" },
  { tag: "logbook" },
  { tag: "map" },
  { tag: "misc" },
  { tag: "resonator" },
  { tag: "scarab" },
  { tag: "scouting report" },
  { tag: "vial" },
];

export default function LivePricingPage() {
  const [livePricingConfig, setLivePricingConfig] = useState<{
    selectedTag: string;
  }>({ selectedTag: "gem" });

  const [summaries, setSummaries] = useState<ItemGroupSummary[] | null>(null);
  useEffect(() => {
    fetch(
      `https://poe-stack-public.nyc3.digitaloceanspaces.com/item-groups/tag_${livePricingConfig.selectedTag}.json`
    )
      .then((v) => {
        if (v.ok) {
          return v.json();
        } else {
          setSummaries(null);
        }
      })
      .then((v) => {
        setSummaries(
          v.entries.map((e) => ({
            hash: e[0],
            searchableString: e[1],
            properties: e[2],
          }))
        );
      });
  }, [livePricingConfig.selectedTag]);

  function selectedSummaries() {
    return summaries?.slice(0, 50);
  }

  const [pricingSummaryMap, setPricingSummaryMap] = useState<
    Record<string, LivePricingSummaryEntry>
  >({});
  useQuery(
    gql`
      query LivePricingSummary($config: LivePricingKeySummaryConfig!) {
        livePricingSummary(config: $config) {
          entries {
            itemGroupKey
            itemGroupHashString
            icon
            value
            stockValue
          }
        }
      }
    `,
    {
      skip: !livePricingConfig.selectedTag || !summaries,
      variables: {
        config: {
          itemGroupHashStrings: selectedSummaries()?.map((e) => e.hash),
          league: "Crucible",
        },
      },
      onCompleted(data) {
        const map = { ...pricingSummaryMap };
        data?.livePricingSummary?.entries?.map((e) => {
          map[e.itemGroupHashString] = e;
        });
        setPricingSummaryMap(map);
      },
    }
  );

  //Make stock # confiureable, add things to url not state, make last URL save local state, add clear
  return (
    <>
      <StyledCard className="flex-0">
        <div className="flex space-x-6">
          <div className="flex flex-col space-y-2">
            <LeagueSelect />
            {ITEM_GROUP_CATEGORIES.map((category) => (
              <div
                key={category.tag}
                onClick={() =>
                  setLivePricingConfig({
                    ...livePricingConfig,
                    selectedTag: category.tag,
                  })
                }
              >
                {category.tag}
              </div>
            ))}
          </div>

          <div className="flex flex-col space-y-2">
            {selectedSummaries()?.map((e) => (
              <LivePriceRow
                key={e.hash}
                itemGroupSummary={e}
                pricingSummary={pricingSummaryMap?.[e.hash]}
              />
            ))}
          </div>
        </div>
      </StyledCard>
    </>
  );
}
