import React from "react";
import { CharacterSnapshotItem } from "../__generated__/resolvers-types";
import Image from "next/image";
import ItemMouseOver from "./item-mouseover";
import { myLoader } from "../utils/general-util";

export default function SecondaryEquipmentDisplay({
  items,
}: {
  items: CharacterSnapshotItem[];
}) {
  if (!items) {
    return <>Loading...</>;
  }

  const flasks = items.filter((i) => i.inventoryId === "Flask");
  const jewels = items.filter((i) => i.inventoryId === "PassiveJewels");

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
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
        <div className="flex flex-row">
          {jewels.map((f) => (
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
      </div>
    </>
  );
}
