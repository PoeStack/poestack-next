import ItemMouseOver from "@components/item-mouseover";
import { CharacterSnapshotItem } from "@generated/graphql";
import { StashViewSettings } from "pages/poe/stash-view";
import StyledLoading from "@components/styled-loading";
import {
  BLIGHT_LAYOUT,
  CURRENCY_LAYOUT,
  DELI_LAYOUT,
  DELVE_LAYOUT,
  ESSENCE_LAYOUT,
  FRAGMENT_LAYOUT,
  METAMORPH_LAYOUT,
} from "./stash-layouts";
import { useState } from "react";

export function StashViewTabViewerCard({
  tab,
  search,
}: {
  tab: {
    items: (CharacterSnapshotItem & {
      x?: number;
      y?: number;
      section?: string;
    })[];
    type?: string;
  } | null;
  search: StashViewSettings;
}) {
  if (!tab) {
    return (
      <>
        <StyledLoading />
      </>
    );
  }

  const tabLayoutMap = {
    FragmentStash: FRAGMENT_LAYOUT,
    DelveStash: DELVE_LAYOUT,
    DeliriumStash: DELI_LAYOUT,
    EssenceStash: ESSENCE_LAYOUT,
    BlightStash: BLIGHT_LAYOUT,
    MetamorphStash: METAMORPH_LAYOUT,
    CurrencyStash: CURRENCY_LAYOUT,
  };

  if (
    [
      "UniqueStash",
      "MapStash",
      "GemStash",
      "FlaskStash",
      "DivinationCardStash",
    ].includes(tab.type!)
  ) {
    return (
      <>
        <div className={`bg-surface-primary relative aspect-square max-h-[800px]`}>
          Tab type not yet supported.
        </div>
      </>
    );
  }

  let scale = 12;
  if (tab.type === "QuadStash") {
    scale = 24;
  } else if (!!tabLayoutMap[tab.type!]) {
    return (
      <>
        <div className={`bg-surface-primary relative aspect-square max-h-[800px]`}>
          <StashViewPoeLayoutTabViewer
            tab={tab}
            search={search}
            layout={tabLayoutMap[tab.type!]}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`bg-surface-primary relative aspect-square max-h-[800px]`}>
        <StashViewBasicTabViewer tab={tab} search={search} scale={scale} />
      </div>
    </>
  );
}

export function StashViewPoeLayoutTabViewer({
  layout,
  tab,
  search,
}: {
  layout: any;
  tab: {
    items: (CharacterSnapshotItem & {
      x?: number;
      y?: number;
      section?: string;
    })[];
  };
  search: StashViewSettings;
}) {
  tab.items.forEach((e) => {
    let pos;
    if (tab["type"] === "MetamorphStash") {
      pos = layout[`${e.x}`] ?? layout[`${e.x},${e.y}`];
    } else if (tab["type"] === "FragmentStash") {
      pos = layout[e.y ? `${e.x},${e.y}` : `${e.x}`];
    } else {
      pos = layout[`${e.x}`];
    }
    if (pos) {
      e.section = pos.section;
      e["px"] = (pos.x / 570) * 100;
      e["py"] = (pos.y / 570) * 100;
      e["pw"] = pos.w ?? 1;
      e["ph"] = pos.h ?? 1;
    }
  });

  const allSections = [
    ...new Set<string>(Object.values(layout).map((e: any) => e.section)),
  ];

  const [selectedSection, setSelectedSection] = useState<string | null>(
    allSections?.[0]
  );

  return (
    <>
      <div>
        <div className="w-full flex pt-2">
          {allSections.map((e) => (
            <>
              <div
                className="grow text-center"
                onClick={() => {
                  setSelectedSection(e);
                }}
              >
                {e}
              </div>
            </>
          ))}
        </div>
        <div>
          {tab.items
            ?.filter((e) => !e.section || e.section === selectedSection)
            ?.map((e) => {
              const matchesSearch =
                search.searchString.trim().length > 0 &&
                [e.baseType, e.typeLine, e.name]
                  .filter((e) => !!e)
                  .join(" ")
                  ?.toLowerCase()
                  ?.includes(search?.searchString);

              return (
                <>
                  <div
                    style={{
                      top: `${e["py"]}%`,
                      left: `${e["px"]}%`,
                      height: `${6 * e["ph"]}%`,
                      width: `${6 * e["pw"]}%`,
                    }}
                    className={`absolute ${
                      !!matchesSearch
                        ? "bg-red-400 border-2 border-red-600"
                        : ""
                    }`}
                  >
                    <ItemMouseOver item={e}>
                      <img src={e.icon} alt="" />
                    </ItemMouseOver>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export function StashViewBasicTabViewer({
  tab,
  search,
  scale,
}: {
  tab: { items: CharacterSnapshotItem[] };
  scale: number;
  search: StashViewSettings;
}) {
  const scaleP = 100 / scale;
  return (
    <>
      {tab.items?.map((e) => {
        const matchesSearch =
          search.searchString.trim().length > 0 &&
          [e.baseType, e.typeLine, e.name]
            .filter((e) => !!e)
            .join(" ")
            ?.toLowerCase()
            ?.includes(search?.searchString);

        return (
          <>
            <div
              style={{
                top: `${scaleP * e["y"]}%`,
                left: `${scaleP * e["x"]}%`,
                height: `${scaleP * e["h"]}%`,
                width: `${scaleP * e["w"]}%`,
              }}
              className={`absolute ${
                !!matchesSearch ? "bg-red-400 border-2 border-red-600" : ""
              }`}
            >
              <ItemMouseOver item={e}>
                <img src={e.icon} alt="" />
              </ItemMouseOver>
            </div>
          </>
        );
      })}
    </>
  );
}
