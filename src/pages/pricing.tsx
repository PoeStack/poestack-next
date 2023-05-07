import { useEffect, useState } from "react";

import LeagueSelect from "@components/league-select";
import StyledCard from "@components/library/styled-card";
import LivePriceRow from "@components/live-price/live-price-row";
import { SearchableItemGroupSummary } from "@generated/graphql";

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

  const [summaries, setSummaries] = useState<{
    summaries: SearchableItemGroupSummary[];
  } | null>(null);
  useEffect(() => {
    fetch(
      `https://poe-stack-public.nyc3.digitaloceanspaces.com/item-groups/all-summaries.json`
    )
      .then((v) => {
        if (v.ok) {
          return v.json();
        } else {
          setSummaries(null);
        }
      })
      .then((v) => {
        setSummaries(v);
      });
  }, []);

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
            {summaries?.summaries
              .filter((e) => e.tag === livePricingConfig.selectedTag)
              .slice(0, 50)
              .map((e) => (
                <LivePriceRow key={e.key} itemGroupSummary={e} />
              ))}
          </div>
        </div>
      </StyledCard>
    </>
  );
}
