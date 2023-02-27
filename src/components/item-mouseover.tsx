import React from "react";
import { CharacterSnapshotItem } from "../__generated__/graphql";
import Image from "next/image";
import { useState } from "react";
import { myLoader } from "../utils/general-util";

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

  return (
    <>
      {item && (
        <div
          className="group relative flex justify-center"
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
            {item?.sockets?.map((s, i) => {
              const gem = socketedGems?.find((e) => e.socket === i);
              return (
                <>
                  {gem && (
                    <div
                      className="items-center"
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
      </div>
    </>
  );
}
