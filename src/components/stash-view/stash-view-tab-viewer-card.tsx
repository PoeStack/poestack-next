import ItemMouseOver from "@components/item-mouseover";
import { CharacterSnapshotItem } from "@generated/graphql";
import { myLoader } from "@utils/general-util";
import { StashViewSettings } from "pages/poe/stash-view";
import Image, { ImageLoaderProps } from "next/image";

export function StashViewTabViewerCard({
  items,
  search,
}: {
  items: CharacterSnapshotItem[];
  search: StashViewSettings;
}) {
  const scale = 1.5;
  const scalePx = 24 * scale;
  const cardSize = scalePx + scalePx * 24;

  return (
    <>
      <div
        style={{ width: cardSize, height: cardSize }}
        className={`shrink-0 bg-surface-primary relative`}
      >
        {items?.map((e) => {
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
                  top: scalePx / 2 + scalePx * e["y"],
                  left: scalePx / 2 + scalePx * e["x"],
                  height: scalePx * e["h"],
                  width: scalePx * e["w"],
                }}
                className={`absolute ${
                  !!matchesSearch ? "bg-red-400 border-2 border-red-600" : ""
                }`}
              >
                <ItemMouseOver item={e}>
                  <Image
                    loader={myLoader}
                    height={scalePx * e["h"]}
                    width={scalePx * e["w"]}
                    src={e.icon!}
                    alt={""}
                  />
                </ItemMouseOver>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
