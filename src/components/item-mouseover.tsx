import React from "react";
import { CharacterSnapshotItem } from "../__generated__/resolvers-types";

export default function ItemMouseOver({
  children,
  item,
}: {
  children: any;
  item?: CharacterSnapshotItem;
}) {
  return (
    <>
      <div>
        <div className="group relative flex justify-center">
          <div className="absolute top-10 scale-0 rounded w-96 h-96 z-20 bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
            <div className="flex flex-col space-y-2">
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
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
