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
  // console.log("SocketedGems:", socketedGems);

  // const firstRowGems = item?.sockets?.filter((i, index) => index < 2);
  // const secondRowGems = item?.sockets?.filter(
  //   (i, index) => index === 3 || index === 2
  // );
  // console.log("firstRowGems: ", item, firstRowGems);
  // console.log("secondRowGems: ", item, secondRowGems);
  return (
    <>
      {item && (
        <div
          className={`group relative flex w-full h-full mx-auto justify-center   ${
            item.frameType === 0
              ? "bg-white bg-opacity-40 border-color-normal border "
              : null
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

          {/* w-1 items */}
          {/* lg:group-hover:scale-125 */}
          {item?.w! === 1 ? (
            <div className="absolute scale-0 group-hover:scale-100 lg:group-hover:scale-110 w-full h-full grid grid-rows-[_1fr, 3_fr, 3_fr, 3_fr, 1_fr] grid-cols-5 items-center justify-center z-0 ">
              {item?.sockets?.map((s, i) => {
                const gem = socketedGems?.find((e) => e.socket === i);
                const currentSocketGroup = item?.sockets[i - 1]?.group;
                //console.log("currentSocketGroup", currentSocketGroup);

                if (i === 0) {
                  return (
                    <>
                      <span className="row-start-1 row-end-1"></span>
                      {gem && (
                        <div
                          className={`flex justify-center row-start-2 row-end-3 z-50 col-start-3 col-end-4 ${
                            gem.support ? " rounded-full" : "rotate-45"
                          } 
                        
                        ${
                          gem.gemColor === "D"
                            ? "bg-slate-700 border-2  border-green-600  hover:border-green-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "I"
                            ? "bg-slate-700  border-2  border-blue-600  hover:border-blue-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "S"
                            ? "bg-slate-700  border-2  border-red-600  hover:border-red-400 "
                            : null
                        }
                       
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div
                            className={`${gem.support ? null : "-rotate-45 "}`}
                          >
                            <Image
                              loader={myLoader}
                              height={30}
                              width={30}
                              className="scale-125"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  );
                }
                if (i === 1 && item?.sockets[i].group === currentSocketGroup) {
                  return (
                    <>
                      <span className="grid row-start-2 row-end-4 w-3 h-1/3 col-start-3 col-end-4 mx-auto bg-yellow-400 z-0  "></span>
                      {gem && (
                        <div
                          className={`flex justify-center row-start-3 row-end-4 z-50 col-start-3 col-end-4 ${
                            gem.support ? " rounded-full" : "rotate-45"
                          } 
                        
                        ${
                          gem.gemColor === "D"
                            ? "bg-slate-700 border-2  border-green-600  hover:border-green-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "I"
                            ? "bg-slate-700  border-2  border-blue-600  hover:border-blue-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "S"
                            ? "bg-slate-700  border-2  border-red-600  hover:border-red-400 "
                            : null
                        }
                       
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div
                            className={`${gem.support ? null : "-rotate-45 "}`}
                          >
                            <Image
                              loader={myLoader}
                              height={30}
                              width={30}
                              className="scale-125"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  );
                } else if (i === 1) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center row-start-3 row-end-4 z-50 col-start-3 col-end-4 ${
                            gem.support ? " rounded-full" : "rotate-45 "
                          } 
                        
                        ${
                          gem.gemColor === "D"
                            ? "bg-slate-700 border-2  border-green-600  hover:border-green-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "I"
                            ? "bg-slate-700  border-2  border-blue-600  hover:border-blue-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "S"
                            ? "bg-slate-700  border-2  border-red-600  hover:border-red-400 "
                            : null
                        }
                       
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div
                            className={`${gem.support ? null : "-rotate-45 "}`}
                          >
                            <Image
                              loader={myLoader}
                              height={30}
                              width={30}
                              className="scale-125"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  );
                }
                if (i === 2 && item?.sockets[i].group === currentSocketGroup) {
                  return (
                    <>
                      <span className="grid row-start-3 row-end-5 w-3 h-1/3 col-start-3 col-end-4 mx-auto bg-yellow-400 z-0  "></span>
                      {gem && (
                        <div
                          className={`flex justify-center row-start-4 row-end-5 z-50 col-start-3 col-end-4 ${
                            gem.support ? " rounded-full" : "rotate-45"
                          } 
                        
                        ${
                          gem.gemColor === "D"
                            ? "bg-slate-700  border-2  border-green-600  hover:border-green-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "I"
                            ? "bg-slate-700 border-2  border-blue-600  hover:border-blue-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "S"
                            ? "bg-slate-700  border-2  border-red-600  hover:border-red-400 "
                            : null
                        }
                       
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div
                            className={`${gem.support ? null : "-rotate-45 "}`}
                          >
                            <Image
                              loader={myLoader}
                              height={30}
                              width={30}
                              className="scale-125"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  );
                } else if (i === 2) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center row-start-4 row-end-5 z-50 col-start-3 col-end-4 ${
                            gem.support ? " rounded-full" : "rotate-45 "
                          } 
                        
                        ${
                          gem.gemColor === "D"
                            ? "bg-slate-700 border-2  border-green-600  hover:border-green-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "I"
                            ? "bg-slate-700 border-2  border-blue-600  hover:border-blue-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "S"
                            ? "bg-slate-700 border-2  border-red-600  hover:border-red-400 "
                            : null
                        }
                       
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div
                            className={`${gem.support ? null : "-rotate-45 "}`}
                          >
                            <Image
                              loader={myLoader}
                              height={30}
                              width={30}
                              className="scale-125"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  );
                }
              })}
              <span className="row-start-5 row-end-6"></span>
            </div>
          ) : null}
          {/* w-2 items */}
          {/* w-2 && h-2 - Helms, Gloves, Boots, Shield */}

          {item?.w! === 2 && item?.h! === 2 ? (
            <div className="absolute scale-0 group-hover:scale-100 lg:group-hover:scale-110 w-full h-full grid grid-rows-[1fr, 10fr, 10fr, _1fr] grid-cols-[_1fr, _10fr, _10fr, 1_fr] items-center justify-center z-0 gap-x-4 gap-y-4 ">
              {item?.sockets?.map((s, i) => {
                const gem = socketedGems?.find((e) => e.socket === i);
                const currentSocketGroup = item?.sockets[i - 1]?.group;
                console.log("GEM: ", gem);
                //console.log("currentSocketGroup", currentSocketGroup);

                if (i === 0) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center row-start-2 row-end-3 z-50 col-start-2 col-end-3 ${
                            gem.support ? " rounded-full " : "rotate-45"
                          } 
                        
                        ${
                          gem.gemColor === "D"
                            ? "bg-slate-700 border-2  border-green-600  hover:border-green-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "I"
                            ? "bg-slate-700  border-2  border-blue-600  hover:border-blue-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "S"
                            ? "bg-slate-700  border-2  border-red-600  hover:border-red-400 "
                            : null
                        }
                       
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div
                            className={`${gem.support ? null : "-rotate-45 "}`}
                          >
                            <Image
                              loader={myLoader}
                              height={30}
                              width={30}
                              className="scale-125"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  );
                }
                if (i === 1 && item?.sockets[i].group === currentSocketGroup) {
                  return (
                    <>
                      <span className="grid row-start-2 row-end-3 w-1/3 h-3 col-start-2 col-end-4 mx-auto bg-yellow-400 z-0  "></span>
                      {gem && (
                        <div
                          className={`flex justify-center row-start-2 row-end-3 z-50 col-start-3 col-end-4 ${
                            gem.support ? " rounded-full" : "rotate-45"
                          } 
                        
                        ${
                          gem.gemColor === "D"
                            ? "bg-slate-700 border-2  border-green-600  hover:border-green-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "I"
                            ? "bg-slate-700  border-2  border-blue-600  hover:border-blue-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "S"
                            ? "bg-slate-700  border-2  border-red-600  hover:border-red-400 "
                            : null
                        }
                       
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div
                            className={`${gem.support ? null : "-rotate-45 "}`}
                          >
                            <Image
                              loader={myLoader}
                              height={30}
                              width={30}
                              className="scale-125"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  );
                } else if (i === 1) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center row-start-2 row-end-3 z-50 col-start-3 col-end-4 ${
                            gem.support ? " rounded-full" : "rotate-45 "
                          } 
                        
                        ${
                          gem.gemColor === "D"
                            ? "bg-slate-700 border-2  border-green-600  hover:border-green-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "I"
                            ? "bg-slate-700  border-2  border-blue-600  hover:border-blue-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "S"
                            ? "bg-slate-700  border-2  border-red-600  hover:border-red-400 "
                            : null
                        }
                       
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div
                            className={`${gem.support ? null : "-rotate-45 "}`}
                          >
                            <Image
                              loader={myLoader}
                              height={30}
                              width={30}
                              className="scale-125"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  );
                }
                if (i === 2 && item?.sockets[i].group === currentSocketGroup) {
                  return (
                    <>
                      <span className="grid row-start-2 row-end-4 w-3 h-1/3 col-start-3 col-end-4 mx-auto bg-yellow-400 z-0  "></span>
                      {gem && (
                        <div
                          className={`flex justify-center row-start-3 row-end-4 z-50 col-start-3 col-end-4 ${
                            gem.support ? " rounded-full" : "rotate-45"
                          } 
                        
                        ${
                          gem.gemColor === "D"
                            ? "bg-slate-700  border-2  border-green-600  hover:border-green-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "I"
                            ? "bg-slate-700 border-2  border-blue-600  hover:border-blue-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "S"
                            ? "bg-slate-700  border-2  border-red-600  hover:border-red-400 "
                            : null
                        }
                       
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div
                            className={`${gem.support ? null : "-rotate-45 "}`}
                          >
                            <Image
                              loader={myLoader}
                              height={30}
                              width={30}
                              className="scale-125"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  );
                } else if (i === 2) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center row-start-3 row-end-4 z-50 col-start-3 col-end-4 ${
                            gem.support ? " rounded-full" : "rotate-45 "
                          } 
                        
                        ${
                          gem.gemColor === "D"
                            ? "bg-slate-700 border-2  border-green-600  hover:border-green-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "I"
                            ? "bg-slate-700 border-2  border-blue-600  hover:border-blue-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "S"
                            ? "bg-slate-700 border-2  border-red-600  hover:border-red-400 "
                            : null
                        }
                       
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div
                            className={`${gem.support ? null : "-rotate-45 "}`}
                          >
                            <Image
                              loader={myLoader}
                              height={30}
                              width={30}
                              className="scale-125"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  );
                }
                if (i === 3 && item?.sockets[i].group === currentSocketGroup) {
                  return (
                    <>
                      <span className="grid row-start-3 row-end-4 w-1/3 h-3 col-start-2 col-end-4 mx-auto bg-yellow-400 z-0  "></span>
                      {gem && (
                        <div
                          className={`flex justify-center row-start-3 row-end-4 z-50 col-start-2 col-end-3 ${
                            gem.support ? " rounded-full" : "rotate-45"
                          } 
                        
                        ${
                          gem.gemColor === "D"
                            ? "bg-slate-700  border-2  border-green-600  hover:border-green-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "I"
                            ? "bg-slate-700 border-2  border-blue-600  hover:border-blue-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "S"
                            ? "bg-slate-700  border-2  border-red-600  hover:border-red-400 "
                            : null
                        }
                       
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div
                            className={`${gem.support ? null : "-rotate-45 "}`}
                          >
                            <Image
                              loader={myLoader}
                              height={30}
                              width={30}
                              className="scale-125"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  );
                } else if (i === 3) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center row-start-3 row-end-4 z-50 col-start-2 col-end-3 ${
                            gem.support ? " rounded-full" : "rotate-45 "
                          } 
                        
                        ${
                          gem.gemColor === "D"
                            ? "bg-slate-700 border-2  border-green-600  hover:border-green-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "I"
                            ? "bg-slate-700 border-2  border-blue-600  hover:border-blue-400 "
                            : null
                        }
                        ${
                          gem.gemColor === "S"
                            ? "bg-slate-700 border-2  border-red-600  hover:border-red-400 "
                            : null
                        }
                       
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div
                            className={`${gem.support ? null : "-rotate-45 "}`}
                          >
                            <Image
                              loader={myLoader}
                              height={30}
                              width={30}
                              className="scale-125"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  );
                }
              })}
              <span className="row-start-4 row-end-5"></span>
            </div>
          ) : null}
          {/* w-2 && h-3 - Body, Bows, 2 Handers */}
          {item?.w! === 2 && item?.h! === 3 ? <div>3</div> : null}

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
