import React from "react";
import { CharacterSnapshotItem } from "../__generated__/resolvers-types";
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
      <div className="group relative flex justify-center">
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
              </>
            );
          })}
        </div>
        {children}
      </div>
    </>
  );
}

export function ItemStatDisplay({ item }) {
  return (
    <>
      <div className="flex flex-col space-y-2 bg-slate-500 p-3 w-96">
        <div>{item?.baseType}</div>
        <div className="flex flex-col">
          {item?.properties
            ?.filter((p) => p.values?.length > 0)
            .map((p, i) => (
              <>
                <div key={i} className="flex flex-row">
                  {p.name} {p.values?.[0]?.[0]}
                </div>
              </>
            ))}
        </div>
        <div className="flex flex-col">
          {item?.explicitMods.map((p, i) => (
            <>
              <div key={i} className="flex flex-row">
                {p}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
