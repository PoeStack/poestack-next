import React from "react";
import { CharacterSnapshotItem } from "../__generated__/graphql";
import Image from "next/image";
import { useState } from "react";
import { myLoader } from "../utils/general-util";
import CurrencyValueDisplay from "./currency-value-display";

export default function ItemMouseOver({
  children,
  item,
  items,
}: {
  children: any;
  item?: CharacterSnapshotItem;
  items?: CharacterSnapshotItem[];
}) {
  const [hoveredGem, setHoveredGem] = useState<
    CharacterSnapshotItem | null | undefined
  >(null);

  const socketedGems = items?.filter((i) => i.socketedInId === item?.itemId);

  // const test = item?.sockets?.filter((i, index) => index < 2);
  // const test2 = item?.sockets?.filter((i, index) => index === 3 || index === 2);
  // console.log("test: ", item, test);
  // console.log("test2: ", item, test2);
  return (
    <>
      {item && (
        <div
          className={`group relative flex w-full h-full mx-auto justify-center bg-opacity-80  ${
            item.frameType === 0 ? "bg-color-normal " : null
          }
          // magic
          ${
            item.frameType === 1
              ? " bg-indigo-300  bg-opacity-25 border border-color-magic "
              : null
          } 
          // rare
          ${
            item.frameType === 2
              ? "bg-yellow-100 bg-opacity-25 border border-color-rare"
              : null
          } 
          // unique
          ${
            item.frameType === 3
              ? "bg-orange-400 bg-opacity-25 border  border-color-unique"
              : null
          } 
          
          `}
          onClick={() => {
            console.log(item);
          }}
        >
          <div
            className={`absolute top-10 left-28 scale-0 rounded z-50 text-xs text-white group-hover:scale-100`}
          >
            <div className="flex flex-row space-x-5">
              <ItemStatDisplay item={item} />
              {hoveredGem && <ItemStatDisplay item={hoveredGem} />}
            </div>
          </div>
          <div
            className={`absolute scale-0 group-hover:scale-100 w-full h-full grid ${
              item?.w! > 1 ? "grid-cols-2" : "grid-cols-1"
            } items-center`}
          >
            {/* 1st Row */}
            {item?.sockets
              ?.filter((d, index) => index < 2)
              .map((s, i) => {
                const gem = socketedGems?.find((e) => e.socket === i);
                return (
                  <>
                    {gem && (
                      <div
                        className="flex justify-center"
                        key={i}
                        onMouseEnter={() => {
                          setHoveredGem(gem);
                        }}
                        onMouseLeave={() => {
                          setHoveredGem(null);
                        }}
                      >
                        <Image
                          loader={myLoader}
                          height={30}
                          width={30}
                          src={gem?.icon ?? ""}
                          alt={""}
                        />
                      </div>
                    )}
                  </>
                );
              })}
            {/* 2nd Row */}
            {item?.sockets
              ?.filter((i, index) => index === 3 || index === 2)
              ?.reverse()
              .map((s, i) => {
                let newI = i + 2;
                const gem = socketedGems?.find((e) => e.socket === newI);
                return (
                  <>
                    {gem && (
                      <div
                        className="flex justify-center"
                        key={newI}
                        onMouseEnter={() => {
                          setHoveredGem(gem);
                        }}
                        onMouseLeave={() => {
                          setHoveredGem(null);
                        }}
                      >
                        <Image
                          loader={myLoader}
                          height={30}
                          width={30}
                          src={gem?.icon ?? ""}
                          alt={""}
                        />
                      </div>
                    )}
                  </>
                );
              })}
          </div>
          {children}
        </div>
      )}
    </>
  );
}

export function ItemStatDisplay({ item }) {
  const frameTypeToBorderColorMap = [
    "",
    "border-purple-600 divide-purple-600",
    "border-yellow-300 divide-yellow-300",
    "border-orange-800 divide-orange-800",
    "border-green-600 divide-green-600",
    "",
    "",
    "",
    "",
    "",
    "border-orange-800 divide-orange-800",
  ];

  return (
    <>
      <div
        className={
          "flex flex-col space-y-2 bg-color-primary p-3 w-96 text-center border-t-2 border-b-2 divide-y " +
          frameTypeToBorderColorMap[item.frameType ?? 0]
        }
      >
        <div>{`${item?.name} ${item?.typeLine}`.trim()}</div>
        {!!item?.properties?.length && (
          <>
            <div className="flex flex-col w-full items-center">
              {item?.properties
                ?.filter((p) => p.values?.length > 0)
                .map((p, i) => (
                  <>
                    <div key={i} className="flex flex-row space-x-1">
                      <div className="text-slate-500">{p.name}:</div>
                      <div>{p.values?.[0]?.[0]}</div>
                    </div>
                  </>
                ))}
            </div>
          </>
        )}
        {!!item?.enchantMods?.length && (
          <>
            <div>
              {item?.enchantMods?.map((p, i) => (
                <>
                  <div key={i} className=" text-blue-400">
                    {p}
                  </div>
                </>
              ))}
            </div>
          </>
        )}
        {!!item?.implicitMods?.length && (
          <>
            <div className="flex flex-col">
              {item?.implicitMods?.map((p, i) => (
                <>
                  <div key={i}>{p}</div>
                </>
              ))}
            </div>
          </>
        )}
        <div className="flex flex-col">
          {item?.fracturedMods?.map((p, i) => (
            <>
              <div key={i} className=" text-amber-200">
                {p}
              </div>
            </>
          ))}
          {item?.explicitMods?.map((p, i) => (
            <>
              <div key={i}>{p}</div>
            </>
          ))}
          {item?.craftedMods?.map((p, i) => (
            <>
              <div key={i} className=" text-blue-400">
                {p}
              </div>
            </>
          ))}
        </div>
        {!!item.corrupted && (
          <>
            <div className="text-red-700">Corrupted</div>
          </>
        )}
        {!!item?.note && (
          <>
            <div>{item?.note}</div>
          </>
        )}
        {!!item?.valueChaos && (
          <>
            <div className="flex w-full text-center place-content-center place-items-center">
              <CurrencyValueDisplay valueChaos={item?.valueChaos} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
