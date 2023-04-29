import Image from "next/image";
import React from "react";

import { CharacterSnapshotItem } from "../__generated__/graphql";
import { myLoader } from "../utils/general-util";
import ItemMouseOver from "./item-mouseover";
import StyledLoading from "./library/styled-loading";

export default function EquipmentDisplay({
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
      <div className="">
        {/* //! Swap to 8 grid column and overspecifiy each item slots location:
        
      
    
        
        */}
        <div className="grid grid-cols-8 grid-rows-6 gap-1">
          {/* Head */}
          <div className="col-span-2 col-start-4 col-end-6 row-span-2 row-start-1 row-end-3">
            <ItemMouseOver item={helm} items={items}>
              <div className="flex flex-row items-center">
                <Image height={90} width={105} src={helm?.icon!} alt={""} />
              </div>
            </ItemMouseOver>
          </div>
          {/* Amulet */}
          <div className="col-start-6 row-start-3">
            <ItemMouseOver item={amulet} items={items}>
              <div className="flex flex-row items-center">
                <Image
                  loader={myLoader}
                  height={45}
                  width={45}
                  src={amulet?.icon!}
                  alt={""}
                />
              </div>
            </ItemMouseOver>
          </div>

          {/* MainHand */}
          <div className="col-span-2 col-start-1 col-end-3 row-span-4 row-start-1 row-end-5 ">
            <ItemMouseOver item={weapon} items={items}>
              <div className="flex flex-row items-center">
                <Image
                  loader={myLoader}
                  height={130}
                  width={55 * (weapon?.w ?? 1)}
                  src={weapon?.icon!}
                  alt={""}
                />
              </div>
            </ItemMouseOver>
          </div>
          {/* Body */}
          <div className="col-span-2 col-start-4 col-end-6 row-span-3 row-start-3 row-end-6">
            <ItemMouseOver item={body} items={items}>
              <div className="flex flex-row items-center">
                <Image
                  loader={myLoader}
                  height={180}
                  width={105}
                  src={body?.icon!}
                  alt={""}
                />
              </div>
            </ItemMouseOver>
          </div>
          {/* OffHand */}
          <div className="col-span-2 col-start-7 col-end-9 row-span-4 row-start-1 row-end-5">
            <ItemMouseOver item={offHand} items={items}>
              <div className="flex flex-row items-center">
                <Image
                  loader={myLoader}
                  height={110}
                  width={50 * (offHand?.w ?? 1)}
                  src={offHand?.icon!}
                  alt={""}
                />
              </div>
            </ItemMouseOver>
          </div>
          {/* RingLeft */}
          <div className="col-start-3 col-end-4 row-start-4 row-end-5">
            <ItemMouseOver item={ring1} items={items}>
              <div className="flex flex-row items-center">
                <Image
                  loader={myLoader}
                  height={45}
                  width={45}
                  src={ring1?.icon!}
                  alt={""}
                />
              </div>
            </ItemMouseOver>
          </div>
          {/* Belt */}
          <div className="col-span-2 col-start-4 col-end-6 row-span-1 row-start-6 row-end-7">
            <ItemMouseOver item={belt} items={items}>
              <div className="flex flex-row items-center">
                <Image
                  loader={myLoader}
                  height={45}
                  width={100}
                  src={belt?.icon!}
                  alt={""}
                />
              </div>
            </ItemMouseOver>
          </div>
          {/* RingRight */}
          <div className="col-start-6 col-end-7 row-start-4 row-end-5">
            <ItemMouseOver item={ring2} items={items}>
              <div className="flex flex-row items-center">
                <Image
                  loader={myLoader}
                  height={45}
                  width={45}
                  src={ring2?.icon!}
                  alt={""}
                />
              </div>
            </ItemMouseOver>
          </div>
          {/* Gloves */}
          <div className="col-span-2 col-start-2 col-end-4 row-span-2 row-start-5 row-end-7">
            <ItemMouseOver item={gloves} items={items}>
              <div className="flex flex-row items-center">
                <Image
                  loader={myLoader}
                  height={90}
                  width={105}
                  src={gloves?.icon!}
                  alt={""}
                />
              </div>
            </ItemMouseOver>
          </div>
          {/* Boots */}
          <div className="col-span-2 col-start-6 col-end-8 row-span-2 row-start-5 row-end-7">
            <ItemMouseOver item={boots} items={items}>
              <div className="flex flex-row items-center">
                <Image
                  loader={myLoader}
                  height={90}
                  width={105}
                  src={boots?.icon!}
                  alt={""}
                />
              </div>
            </ItemMouseOver>
          </div>
        </div>
      </div>
    </>
  );
}
