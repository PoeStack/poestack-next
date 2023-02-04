import React from "react";
import { usePoeStackAuth } from "../contexts/user-context";
import Link from "next/link";
import StyledDropdown from "./styled-dropdown";
import { CharacterSnapshotItem } from "../__generated__/resolvers-types";
import Image from "next/image";
import ItemMouseOver from "./item-mouseover";

export default function EquipmentDisplay({
  items,
}: {
  items: CharacterSnapshotItem[];
}) {
  console.log("items", items);

  if (!items) {
    return <>Loading...</>;
  }

  const weapon = items.find((i) => i.inventoryId === "Weapon");
  const helm = items.find((i) => i.inventoryId === "Helm");
  const body = items.find((i) => i.inventoryId === "BodyArmour");
  const offHand = items.find((i) => i.inventoryId === "Offhand");
  const gloves = items.find((i) => i.inventoryId === "Gloves");
  const boots = items.find((i) => i.inventoryId === "Boots");

  const ring1 = items.find((i) => i.inventoryId === "Ring");
  const ring2 = items.find((i) => i.inventoryId === "Ring2");
  const amulet = items.find((i) => i.inventoryId === "Amulet");
  const belt = items.find((i) => i.inventoryId === "Belt");

  return (
    <>
      <div className="max-w-[400px]">
        <div className="grid grid-cols-6 justify-items-center">
          <div className="col-span-2 row-span-2"></div>
          <div className="col-span-2 row-span-2">
            <ItemMouseOver item={helm} items={items}>
              <Image height={94} width={94} src={helm?.icon!} alt={""} />
            </ItemMouseOver>
          </div>
          <div className="col-span-2"></div>
          <div>
            <ItemMouseOver item={amulet} items={items}>
              <Image height={40} width={40} src={amulet?.icon!} alt={""} />
            </ItemMouseOver>
          </div>
          <div></div>
          <div className="col-span-2 row-span-3">
            <ItemMouseOver item={weapon} items={items}>
              <Image
                height={200}
                width={50 * weapon!.w}
                src={weapon?.icon!}
                alt={""}
              />
            </ItemMouseOver>
          </div>
          <div className="col-span-2 row-span-3">
            <ItemMouseOver item={body} items={items}>
              <Image height={200} width={100} src={body?.icon!} alt={""} />
            </ItemMouseOver>
          </div>
          <div className="col-span-2 row-span-3">
            <ItemMouseOver item={offHand} items={items}>
              <Image
                height={200}
                width={50 * offHand!.w}
                src={offHand?.icon!}
                alt={""}
              />
            </ItemMouseOver>
          </div>
          <div></div>
          <div>
            <ItemMouseOver item={ring1} items={items}>
              <Image height={40} width={40} src={ring1?.icon!} alt={""} />
            </ItemMouseOver>
          </div>
          <div className="col-span-2">
            <ItemMouseOver item={belt} items={items}>
              <Image height={40} width={80} src={belt?.icon!} alt={""} />
            </ItemMouseOver>
          </div>
          <div>
            <ItemMouseOver item={ring2} items={items}>
              <Image height={40} width={40} src={ring2?.icon!} alt={""} />
            </ItemMouseOver>
          </div>
          <div></div>
          <div className="row-span-2"></div>
          <div className="col-span-2 row-span-2">
            <ItemMouseOver item={gloves} items={items}>
              <Image height={94} width={94} src={gloves?.icon!} alt={""} />
            </ItemMouseOver>
          </div>
          <div className="col-span-2 row-span-2">
            <ItemMouseOver item={boots} items={items}>
              <Image height={94} width={94} src={boots?.icon!} alt={""} />
            </ItemMouseOver>
          </div>
        </div>
      </div>
    </>
  );
}
