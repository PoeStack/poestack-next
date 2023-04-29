import Image from "next/image";
import React from "react";

import { CharacterSnapshotItem } from "../__generated__/graphql";
import { myLoader } from "../utils/general-util";
import ItemMouseOver from "./item-mouseover";
import StyledLoading from "./library/styled-loading";

export default function SecondaryEquipmentDisplay({
  items,
}: {
  items: CharacterSnapshotItem[];
}) {
  if (!items) {
    return (
      <>
        <StyledLoading />
      </>
    );
  }

  const flasks = items.filter((i) => i.inventoryId === "Flask");
  const jewels = items.filter((i) => i.inventoryId === "PassiveJewels");
  const nonUniqueJewels = items.filter(
    (i) => i.inventoryId === "PassiveJewels" && i.frameType !== 3
  );

  // Clusters
  const largeClusterJewels = jewels.filter(
    (i) => i.typeLine === "Large Cluster Jewel"
  );

  const mediumClusterJewels = jewels.filter(
    (i) => i.typeLine === "Medium Cluster Jewel"
  );

  const smallClusterJewels = jewels.filter(
    (i) => i.typeLine === "Small Cluster Jewel"
  );

  //Unique Jewels
  const uniqueJewels = items.filter(
    (i) =>
      i.inventoryId === "PassiveJewels" &&
      i.frameType === 3 &&
      i.typeLine !== "Small Cluster Jewel" &&
      i.typeLine !== "Medium Cluster Jewel" &&
      i.typeLine !== "Large Cluster Jewel"
  );

  //Normal Jewels
  const prismaticJewels = nonUniqueJewels.filter(
    (i) => i.typeLine === "Prismatic Jewel"
  );

  const cobaltJewels = nonUniqueJewels.filter(
    (i) => i.typeLine === "Cobalt Jewel"
  );

  const crimsonJewels = nonUniqueJewels.filter(
    (i) => i.typeLine === "Crimson Jewel"
  );

  const viridianJewels = nonUniqueJewels.filter(
    (i) => i.typeLine === "Viridian Jewel"
  );

  return (
    <>
      <div className="flex flex-col items-center space-y-1">
        <div className="flex flex-row space-x-1">
          {flasks.map((f) => (
            <>
              <div>
                <ItemMouseOver item={f}>
                  <Image
                    loader={myLoader}
                    width={40}
                    height={60}
                    src={f.icon!}
                    alt={""}
                  />
                </ItemMouseOver>
              </div>
            </>
          ))}
        </div>
        <div className="flex flex-row space-x-1">
          {/* Large Clusters */}
          {largeClusterJewels.map((f) => (
            <>
              <div>
                <ItemMouseOver item={f}>
                  <Image
                    loader={myLoader}
                    width={40}
                    height={60}
                    src={f.icon!}
                    alt={""}
                  />
                </ItemMouseOver>
              </div>
            </>
          ))}
          {/* Medium Clusters */}
          {mediumClusterJewels.map((f) => (
            <>
              <div>
                <ItemMouseOver item={f}>
                  <Image
                    loader={myLoader}
                    width={40}
                    height={60}
                    src={f.icon!}
                    alt={""}
                  />
                </ItemMouseOver>
              </div>
            </>
          ))}
          {/* Small Clusters */}
          {smallClusterJewels.map((f) => (
            <>
              <div>
                <ItemMouseOver item={f}>
                  <Image
                    loader={myLoader}
                    width={40}
                    height={60}
                    src={f.icon!}
                    alt={""}
                  />
                </ItemMouseOver>
              </div>
            </>
          ))}
        </div>
        <div className="flex flex-row space-x-1">
          {/* Unique Jewels */}
          {uniqueJewels.map((f) => (
            <>
              <div>
                <ItemMouseOver item={f}>
                  <Image
                    loader={myLoader}
                    width={40}
                    height={60}
                    src={f.icon!}
                    alt={""}
                  />
                </ItemMouseOver>
              </div>
            </>
          ))}

          {/* Prismatic Jewels */}
          {prismaticJewels.map((f) => (
            <>
              <div>
                <ItemMouseOver item={f}>
                  <Image
                    loader={myLoader}
                    width={40}
                    height={60}
                    src={f.icon!}
                    alt={""}
                  />
                </ItemMouseOver>
              </div>
            </>
          ))}
          {/* Cobalt Jewels */}
          {cobaltJewels.map((f) => (
            <>
              <div>
                <ItemMouseOver item={f}>
                  <Image
                    loader={myLoader}
                    width={40}
                    height={60}
                    src={f.icon!}
                    alt={""}
                  />
                </ItemMouseOver>
              </div>
            </>
          ))}
          {/* Crimson  */}
          {crimsonJewels.map((f) => (
            <>
              <div>
                <ItemMouseOver item={f}>
                  <Image
                    loader={myLoader}
                    width={40}
                    height={60}
                    src={f.icon!}
                    alt={""}
                  />
                </ItemMouseOver>
              </div>
            </>
          ))}
          {/* Viridian */}
          {viridianJewels.map((f) => (
            <>
              <div>
                <ItemMouseOver item={f}>
                  <Image
                    loader={myLoader}
                    width={40}
                    height={60}
                    src={f.icon!}
                    alt={""}
                  />
                </ItemMouseOver>
              </div>
            </>
          ))}
          {/* Cobalt Jewels */}
          {/* Small Jewels */}
          {/* {jewels.map((f) => (
            <>
              <div>
                <ItemMouseOver item={f}>
                  <Image
                    loader={myLoader}
                    width={40}
                    height={60}
                    src={f.icon!}
                    alt={""}
                  />
                </ItemMouseOver>
              </div>
            </>
          ))} */}
        </div>
      </div>
    </>
  );
}
