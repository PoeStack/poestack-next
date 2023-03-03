import React from "react";
import { usePoeStackAuth } from "../contexts/user-context";
import Link from "next/link";
import StyledDropdown from "./styled-dropdown";
import { CharacterSnapshotItem } from "../__generated__/graphql";
import Image, { ImageLoaderProps } from "next/image";
import ItemMouseOver from "./item-mouseover";
import { myLoader } from "../utils/general-util";

export default function EquipmentDisplay({
  items,
}: {
  items: CharacterSnapshotItem[];
}) {
  if (!items) {
    return <>Loading...</>;
  }

  const weapon = items.find((i) => i.inventoryId === "Weapon");
  console.log("WEapon: ", weapon);
  const helm = items.find((i) => i.inventoryId === "Helm");
  const body = items.find((i) => i.inventoryId === "BodyArmour");
  console.log("Body: ", body);
  const offHand = items.find((i) => i.inventoryId === "Offhand");
  const gloves = items.find((i) => i.inventoryId === "Gloves");
  const boots = items.find((i) => i.inventoryId === "Boots");

  const ring1 = items.find((i) => i.inventoryId === "Ring");
  const ring2 = items.find((i) => i.inventoryId === "Ring2");
  const amulet = items.find((i) => i.inventoryId === "Amulet");
  const belt = items.find((i) => i.inventoryId === "Belt");

  return (
    <>
      <div className="">
        {/* //! Swap to 8 grid column and overspecifiy each item slots location:
        
      
    
        
        */}
        <div className="grid grid-cols-8 grid-rows-6 gap-1">
          {/* Head */}
          <div className="col-start-4 col-end-6 col-span-2 row-span-2 row-start-1 row-end-3">
            <ItemMouseOver item={helm} items={items}>
              <Image height={90} width={90} src={helm?.icon!} alt={""} />
            </ItemMouseOver>
          </div>
          {/* Amulet */}
          <div className="col-start-6 row-start-3">
            <ItemMouseOver item={amulet} items={items}>
              <Image
                loader={myLoader}
                height={40}
                width={40}
                src={amulet?.icon!}
                alt={""}
              />
            </ItemMouseOver>
          </div>

          {/* MainHand */}
          <div className="col-start-1 col-end-3 row-start-1 row-end-5 col-span-2 row-span-4 ">
            <ItemMouseOver item={weapon} items={items}>
              <Image
                loader={myLoader}
                height={130}
                width={50 * (weapon?.w ?? 1)}
                src={weapon?.icon!}
                alt={""}
              />
            </ItemMouseOver>
          </div>
          {/* Body */}
          <div className="col-start-4 col-end-6 col-span-2 row-span-3 row-start-3 row-end-6">
            <ItemMouseOver item={body} items={items}>
              <Image
                loader={myLoader}
                height={180}
                width={90}
                src={body?.icon!}
                alt={""}
              />
            </ItemMouseOver>
          </div>
          {/* OffHand */}
          <div className="col-start-7 col-end-9 col-span-2 row-start-1 row-end-5 row-span-4">
            <ItemMouseOver item={offHand} items={items}>
              <Image
                loader={myLoader}
                height={110}
                width={50 * (offHand?.w ?? 1)}
                src={offHand?.icon!}
                alt={""}
              />
            </ItemMouseOver>
          </div>
          {/* RingLeft */}
          <div className="col-start-3 col-end-4 row-start-4 row-end-5">
            <ItemMouseOver item={ring1} items={items}>
              <Image
                loader={myLoader}
                height={45}
                width={45}
                src={ring1?.icon!}
                alt={""}
              />
            </ItemMouseOver>
          </div>
          {/* Belt */}
          <div className="col-start-4 col-end-6 row-start-6 row-end-7 col-span-2 row-span-1">
            <ItemMouseOver item={belt} items={items}>
              <Image
                loader={myLoader}
                height={45}
                width={90}
                src={belt?.icon!}
                alt={""}
              />
            </ItemMouseOver>
          </div>
          {/* RingRight */}
          <div className="col-start-6 col-end-7 row-start-4 row-end-5">
            <ItemMouseOver item={ring2} items={items}>
              <Image
                loader={myLoader}
                height={45}
                width={45}
                src={ring2?.icon!}
                alt={""}
              />
            </ItemMouseOver>
          </div>
          {/* Gloves */}
          <div className="col-start-2 col-end-4 row-start-5 row-end-7 col-span-2 row-span-2">
            <ItemMouseOver item={gloves} items={items}>
              <Image
                loader={myLoader}
                height={90}
                width={90}
                src={gloves?.icon!}
                alt={""}
              />
            </ItemMouseOver>
          </div>
          {/* Boots */}
          <div className="col-start-6 col-end-8 row-start-5 row-end-7 col-span-2 row-span-2">
            <ItemMouseOver item={boots} items={items}>
              <Image
                loader={myLoader}
                height={90}
                width={90}
                src={boots?.icon!}
                alt={""}
              />
            </ItemMouseOver>
          </div>
        </div>
      </div>
    </>
  );
}
