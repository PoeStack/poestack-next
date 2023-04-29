import Image from "next/image";
import React from "react";
import { useState } from "react";

import { CharacterSnapshotItem } from "../__generated__/graphql";
import { myLoader } from "../utils/general-util";
import CurrencyValueDisplay from "./currency-value-display";
import ZoomableSVG from "./trees/nodes-tree/zoomable-svg";

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
          className={`group relative flex w-full h-full mx-auto justify-center  
          

          ${
            item.frameType === 0 && item.corrupted
              ? "bg-white bg-opacity-40 border-2  border-red-900"
              : null
          }
          ${
            item.frameType === 0
              ? "bg-white bg-opacity-40 border-color-normal border "
              : null
          }
    
          ${
            item.frameType === 1 && item.corrupted
              ? " bg-indigo-300  bg-opacity-25 border-2  border-red-900 "
              : null
          } 
          ${
            item.frameType === 1
              ? " bg-indigo-300  bg-opacity-25 border border-color-magic "
              : null
          } 
 
          ${
            item.frameType === 2 && item.corrupted
              ? "bg-yellow-200 bg-opacity-25 border-2  border-red-900"
              : null
          } 
          ${
            item.frameType === 2
              ? "bg-yellow-200 bg-opacity-25 border border-color-rare"
              : null
          } 
      
          ${
            item.frameType === 3 && item.corrupted
              ? "bg-orange-500 bg-opacity-30 border-2  border-red-900"
              : null
          } 
          ${
            item.frameType === 3
              ? "bg-orange-400 bg-opacity-20 border  border-color-unique"
              : null
          } 
          ${
            item.frameType === 9
              ? "bg-pink-400 bg-opacity-25 border  border-pink-400"
              : null
          } 
          
          
          `}
          onClick={() => {
            console.log(item);
          }}
        >
          <div
            className={`absolute top-10 left-24 scale-0 rounded z-50 text-xs text-white group-hover:scale-100`}
          >
            <div className="flex flex-col pl-10 lg:flex-row z-100">
              <div className="p-1">
                {hoveredGem && <ItemStatDisplay item={hoveredGem} />}
              </div>
              <div className="p-1">
                <ItemStatDisplay item={item} />
              </div>
            </div>
          </div>

          {/* w-1 items */}
          {/* lg:group-hover:scale-150 */}

          {/* w-1 h-1 rings & amulets */}
          {item?.w! === 1 && item?.h! === 1 ? (
            <div className="absolute z-0 grid items-center justify-center w-full h-full scale-0 group-hover:scale-100 ">
              {item?.sockets?.map((s, i) => {
                const gem = socketedGems?.find((e) => e.socket === i);
                const currentSocketGroup = item?.sockets[i - 1]?.group;

                if (i === 0) {
                  return (
                    <>
                      <span className="row-start-1 row-end-1"></span>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90  z-50  ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90  z-50 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                } else {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 z-50  ${
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
                            className={`${gem.support ? null : "-rotate-45"}`}
                          >
                            <Image
                              loader={myLoader}
                              height={30}
                              width={30}
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-2 col-end-3 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                }
              })}
              <span className="row-start-5 row-end-6"></span>
            </div>
          ) : null}
          {/* w-2 h-1 belts */}
          {item?.w! === 2 && item?.h! === 1 ? (
            <div className="absolute z-0 grid items-center justify-center w-full h-full scale-0 group-hover:scale-100 ">
              {item?.sockets?.map((s, i) => {
                const gem = socketedGems?.find((e) => e.socket === i);
                const currentSocketGroup = item?.sockets[i - 1]?.group;

                if (i === 0) {
                  return (
                    <>
                      <span className="row-start-1 row-end-1"></span>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90  z-50  ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90  z-50 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                } else {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 z-50 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-2 col-end-3 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                }
              })}
              <span className="row-start-5 row-end-6"></span>
            </div>
          ) : null}
          {/* w-1 weapons : daggers/wands */}
          {item?.w! === 1 && item?.inventoryId === "Weapon" ? (
            <div className="absolute scale-0 group-hover:scale-100  w-full h-full grid grid-rows-[1px, 3_fr, 3_fr, 3_fr, 1px] grid-cols-3 items-center justify-center z-0 ">
              {item?.sockets?.map((s, i) => {
                const gem = socketedGems?.find((e) => e.socket === i);
                const currentSocketGroup = item?.sockets[i - 1]?.group;

                if (i === 0) {
                  return (
                    <>
                      <span className="row-start-1 row-end-1"></span>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-2 row-end-3 z-50 col-start-2 col-end-3 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-2 row-end-3 z-50 col-start-2 col-end-3 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                }
                if (i === 1 && item?.sockets[i].group === currentSocketGroup) {
                  return (
                    <>
                      <span className="z-0 grid w-3 col-start-2 col-end-3 row-start-2 row-end-4 mx-auto bg-yellow-400 h-1/3 "></span>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-2 col-end-3 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-2 col-end-3 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                } else if (i === 1) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-2 col-end-3 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-2 col-end-3 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                }
                if (i === 2 && item?.sockets[i].group === currentSocketGroup) {
                  return (
                    <>
                      <span className="z-0 grid w-3 col-start-2 col-end-3 row-start-3 row-end-5 mx-auto bg-yellow-400 h-1/3 "></span>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-4 row-end-5 z-50 col-start-2 col-end-3 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-4 row-end-5 z-50 col-start-2 col-end-3 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                } else if (i === 2) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-4 row-end-5 z-50 col-start-2 col-end-3 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-4 row-end-5 z-50 col-start-2 col-end-3 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
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

          {/* w-2 && h-2 - Shields*/}
          {item?.w! === 2 &&
          item?.h! === 2 &&
          item?.inventoryId === "Offhand" ? (
            <div
              className="absolute scale-0 group-hover:scale-100  w-full h-full grid grid-rows-[_1fr, _1fr, _1fr, _10fr, _10fr, _10fr,  _1fr, _1fr, _1fr] 
            grid-cols-[_1fr, _10fr, _10fr, _1fr] items-center justify-center z-0 gap-x-2 gap-y-2 "
            >
              {item?.sockets?.map((s, i) => {
                const gem = socketedGems?.find((e) => e.socket === i);
                const currentSocketGroup = item?.sockets[i - 1]?.group;

                if (i === 0) {
                  return (
                    <>
                      <span className="row-span-3 row-start-1"></span>
                      <span className="row-span-3 row-start-6"></span>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-4 row-end-5 z-50 col-start-2 col-end-3 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-2 col-end-3 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                }
                if (i === 1 && item?.sockets[i].group === currentSocketGroup) {
                  return (
                    <>
                      <span className="z-0 grid w-1/3 h-3 col-start-2 col-end-4 row-start-4 row-end-5 mx-auto bg-yellow-400 "></span>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-4 row-end-5 z-50 col-start-3 col-end-4 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90  row-start-4 row-end-5 z-50 col-start-3 col-end-4 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                } else if (i === 1) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-4 row-end-5 z-50 col-start-3 col-end-4 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-4 row-end-5 z-50 col-start-3 col-end-4  rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                }
                if (i === 2 && item?.sockets[i].group === currentSocketGroup) {
                  return (
                    <>
                      <span className="z-0 grid w-3 col-start-3 col-end-4 row-start-4 row-end-6 mx-auto bg-yellow-400 h-1/3 "></span>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-5 row-end-6 z-50 col-start-3 col-end-4 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-5 row-end-6 z-50 col-start-3 col-end-4rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                } else if (i === 2) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-5 row-end-6 z-50 col-start-3 col-end-4 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90  row-start-5 row-end-6 z-50 col-start-3 col-end-4 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                }
              })}
              <span className="row-start-4 row-end-5"></span>
            </div>
          ) : null}
          {/* w-2 && h-2 - Helms, Gloves, Boots*/}
          {item?.w! === 2 &&
          item?.h! === 2 &&
          item?.inventoryId !== "Offhand" ? (
            <div className="absolute scale-0 group-hover:scale-100  w-full h-full grid grid-rows-[1px, _10fr, _10fr, 1px] grid-cols-[1px, _10fr, _10fr, 1px] items-center justify-center z-0 gap-x-3 gap-y-3 ">
              {item?.sockets?.map((s, i) => {
                const gem = socketedGems?.find((e) => e.socket === i);
                const currentSocketGroup = item?.sockets[i - 1]?.group;

                if (i === 0) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-2 row-end-3 z-50 col-start-2 col-end-3  ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-2 row-end-3 z-50 col-start-2 col-end-3 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                }
                if (i === 1 && item?.sockets[i].group === currentSocketGroup) {
                  return (
                    <>
                      <span className="z-0 grid w-1/3 h-3 col-start-2 col-end-4 row-start-2 row-end-3 mx-auto bg-yellow-400 "></span>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-2 row-end-3 z-50 col-start-3 col-end-4 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-2 row-end-3 z-50 col-start-3 col-end-4 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                } else if (i === 1) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-2 row-end-3 z-50 col-start-3 col-end-4 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-2 row-end-3 z-50 col-start-3 col-end-4   rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                }
                if (i === 2 && item?.sockets[i].group === currentSocketGroup) {
                  return (
                    <>
                      <span className="z-0 grid w-3 col-start-3 col-end-4 row-start-2 row-end-4 mx-auto bg-yellow-400 h-1/3 "></span>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-3 col-end-4 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-3 col-end-4 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                } else if (i === 2) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-3 col-end-4 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-3 col-end-4 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                }
                if (i === 3 && item?.sockets[i].group === currentSocketGroup) {
                  return (
                    <>
                      <span className="z-0 grid w-1/3 h-3 col-start-2 col-end-4 row-start-3 row-end-4 mx-auto bg-yellow-400 "></span>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-2 col-end-3 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-2 col-end-3 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                } else if (i === 3) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-2 col-end-3 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-2 col-end-3 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                }
              })}
              <span className="row-start-4 row-end-5"></span>
            </div>
          ) : null}

          {/* w-2 && h-3 - Body, Bows, 2 Handers, Scepters*/}
          {(item?.w! === 2 && item?.h! === 3) || item?.h! === 4 ? (
            <div
              className="absolute scale-0 group-hover:scale-100  w-full h-full grid grid-rows-7 
            grid-cols-[1px, _10fr, _10fr, 1px] items-center justify-center z-0 gap-x-3 gap-y-2 "
            >
              {item?.sockets?.map((s, i) => {
                const gem = socketedGems?.find((e) => e.socket === i);
                const currentSocketGroup = item?.sockets[i - 1]?.group;

                if (i === 0) {
                  return (
                    <>
                      <span className="row-span-1 row-start-1"></span>
                      <span className="row-span-1 row-start-5"></span>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-2 row-end-3 z-50 col-start-2 col-end-3 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-2 row-end-3 z-50 col-start-2 col-end-3 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                }
                if (i === 1 && item?.sockets[i].group === currentSocketGroup) {
                  return (
                    <>
                      <span className="z-0 grid w-1/3 h-3 col-start-2 col-end-4 row-start-2 row-end-3 mx-auto bg-yellow-400 "></span>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-2 row-end-3 z-50 col-start-3 col-end-4 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-2 row-end-3 z-50 col-start-3 col-end-4  rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                } else if (i === 1) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-2 row-end-3 z-50 col-start-3 col-end-4 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-2 row-end-3 z-50 col-start-3 col-end-4  rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                }
                if (i === 2 && item?.sockets[i].group === currentSocketGroup) {
                  return (
                    <>
                      <span className="z-0 grid w-3 col-start-3 col-end-4 row-start-2 row-end-4 mx-auto bg-yellow-400 h-1/3 "></span>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-3 col-end-4 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-3 col-end-4   rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                } else if (i === 2) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-3 col-end-4 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-3 col-end-4   rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                }
                if (i === 3 && item?.sockets[i].group === currentSocketGroup) {
                  return (
                    <>
                      <span className="z-0 grid w-1/3 h-3 col-start-2 col-end-4 row-start-3 row-end-4 mx-auto bg-yellow-400 "></span>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-2 col-end-3 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-2 col-end-3  rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                } else if (i === 3) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-2 col-end-3 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-3 row-end-4 z-50 col-start-2 col-end-3 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                }
                if (i === 4 && item?.sockets[i].group === currentSocketGroup) {
                  return (
                    <>
                      <span className="z-0 grid w-3 col-start-2 col-end-3 row-start-3 row-end-5 mx-auto bg-yellow-400 h-1/3 "></span>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-4 row-end-5 z-50 col-start-2 col-end-3 ${
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
                              className="scale-125sss"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-4 row-end-5 z-50 col-start-2 col-end-3 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                } else if (i === 4) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-4 row-end-5 z-50 col-start-2 col-end-3 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-4 row-end-5 z-50 col-start-2 col-end-3 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                }
                if (i === 5 && item?.sockets[i].group === currentSocketGroup) {
                  return (
                    <>
                      <span className="z-0 grid w-1/3 h-3 col-start-2 col-end-4 row-start-4 row-end-5 mx-auto bg-yellow-400 "></span>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-4 row-end-5 z-50 col-start-3 col-end-4 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-4 row-end-5 z-50 col-start-3 col-end-4rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                } else if (i === 5) {
                  return (
                    <>
                      {gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-4 row-end-5 z-50 col-start-2 col-end-3 ${
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
                              className="scale-150"
                              src={gem?.icon ?? ""}
                              alt={""}
                            />
                          </div>
                        </div>
                      )}
                      {!gem && (
                        <div
                          className={`flex justify-center scale-90 row-start-4 row-end-5 z-50 col-start-3 col-end-4 rounded-full 
                        `}
                          key={i}
                          onMouseEnter={() => {
                            setHoveredGem(gem);
                          }}
                          onMouseLeave={() => {
                            setHoveredGem(null);
                          }}
                        >
                          <div className="border-2 border-yellow-400 rounded-full w-7 h-7 bg-slate-700"></div>
                        </div>
                      )}
                    </>
                  );
                }
              })}
            </div>
          ) : null}
          {children}
        </div>
      )}
    </>
  );
}

export function ItemStatSeperator({ item }) {
  return (
    <>
      {" "}
      <div
        className={` m-3 w-1/3 h-[1px] mx-auto bg-gradient-to-r from-primary to-primary 
${item.frameType === 0 ? "via-grey-200" : null}
${item.frameType === 1 ? "via-indigo-600" : null} 
${item.frameType === 2 ? "via-yellow-300" : null} 
${item.frameType === 3 ? "via-orange-400" : null} 
${item.frameType === 4 ? "via-teal-800" : null}
${item.frameType === 9 ? "via-pink-400" : null} 
`}
      ></div>
    </>
  );
}

export function ItemStatDisplay({ item }) {
  return (
    <>
      <div
        className={`flex flex-col  bg-surface-primary w-96 text-center border-t-2 border-b-2 font-semibold text-base
          ${item.frameType === 0 ? "  border-color-normal border" : null}
          ${item.frameType === 1 ? "    border-indigo-600  " : null} 
          ${item.frameType === 2 ? " border-yellow-300 " : null} 
          ${item.frameType === 3 ? "   border-color-unique " : null} 
          ${item.frameType === 4 ? "  border-teal-700 " : null} 
          ${item.frameType === 9 ? "   border-pink-400 " : null} 
          `}
      >
        <div
          className={`text-lg font-bold mb-2
        ${
          item.frameType === 0
            ? "  text-content-normal bg-white bg-opacity-40 border-b-2 border-color-normal"
            : null
        }
        ${
          item.frameType === 1
            ? "    text-content-magic bg-indigo-800  bg-opacity-10 border-b-2 border-indigo-600"
            : null
        } 
        ${
          item.frameType === 2
            ? " text-content-rare bg-yellow-200 bg-opacity-10 border-b-2 border-yellow-300"
            : null
        } 
        ${
          item.frameType === 3
            ? " text-content-unique bg-orange-800 bg-opacity-10  border-b-2 border-color-unique"
            : null
        } 
        ${
          item.frameType === 4
            ? "    text-content-gem bg-teal-400 bg-opacity-10  border-b-2 border-teal-800"
            : null
        }
        ${
          item.frameType === 9
            ? "  text-pink-400 bg-pink-400 bg-opacity-25  border-b-2 border-pink-400"
            : null
        } 
        
        `}
        >
          {`${item?.name} ${item?.typeLine}`.trim()}
        </div>

        {!!item?.properties?.length && (
          <>
            <div className="flex flex-col items-center w-full">
              {item?.properties
                ?.filter((p) => p.values?.length > 0)
                .map((p, i) => (
                  <>
                    <div key={i} className="flex flex-row space-x-1">
                      <div className="text-slate-400">{p.name}:</div>
                      <div>{p.values?.[0]?.[0]}</div>
                    </div>
                  </>
                ))}
              <ItemStatSeperator item={item} />
            </div>
          </>
        )}
        {!!item?.enchantMods?.length && (
          <>
            <div className="p-1">
              {item?.enchantMods?.map((p, i) => (
                <>
                  <div key={i} className="text-blue-200">
                    {p}
                  </div>
                </>
              ))}
            </div>
            <ItemStatSeperator item={item} />
          </>
        )}
        {!!item?.implicitMods?.length && (
          <>
            <div className="flex flex-col items-center p-1 text-center ">
              {item?.implicitMods?.map((p, i) => (
                <>
                  <div className="text-blue-400" key={i}>
                    {p}
                  </div>
                </>
              ))}
            </div>
            <ItemStatSeperator item={item} />
          </>
        )}
        {(item?.fracturedMods?.length ?? 0) +
          (item?.explicitMods?.length ?? 0) +
          (item?.craftedMods?.length ?? 0) >
          0 && (
          <>
            <div className="flex flex-col mx-2">
              {item?.fracturedMods?.map((p, i) => (
                <>
                  <div key={i} className=" text-amber-200">
                    {p}
                  </div>
                </>
              ))}

              {item?.explicitMods?.map((p, i) => (
                <>
                  <div key={i} className="text-blue-400">
                    {p}
                  </div>
                </>
              ))}
              {item?.craftedMods?.map((p, i) => (
                <>
                  <div key={i} className="text-blue-200 ">
                    {p}
                  </div>
                </>
              ))}
            </div>
            <ItemStatSeperator item={item} />
          </>
        )}

        {!!item.corrupted && (
          <>
            <div className="text-red-700  bg-opacity-10">Corrupted</div>
          </>
        )}
        {!!item?.note && (
          <>
            <div>{item?.note}</div>
          </>
        )}
        {!!item?.valueChaos && (
          <>
            <div className="flex w-full p-1 text-center place-content-center place-items-center">
              <CurrencyValueDisplay
                pValue={item?.valueChaos}
                league={item?.league}
              />
            </div>
          </>
        )}

        {item?.identified === false && (
          <>
            <div className="flex w-full p-1 text-center place-content-center place-items-center text-red-600">
              Unidentified
            </div>
          </>
        )}
        {!!item?.crucible && <CrucibleMouseover item={item} />}
        <div className="pb-2"></div>
      </div>
    </>
  );
}

export function CrucibleMouseover({ item }) {
  const counts = {};

  const mappedNodes = {};
  Object.entries(item.crucible.nodes).forEach(([key, node]: any) => {
    const currentCount = (counts[node.orbit] ?? 0) + 1;
    counts[node.orbit] = currentCount;
    mappedNodes[key] = { ...node, y: currentCount * 30, x: node.orbit * 30 };
  });

  const connections: {
    sx: number;
    sy: number;
    ex: number;
    ey: number;
    color: string;
  }[] = [];
  Object.values(mappedNodes).forEach((node: any) => {
    for (const out of node.out) {
      const endNode = mappedNodes[out];
      connections.push({
        sx: node["x"],
        sy: node["y"],
        ex: endNode["x"],
        ey: endNode["y"],
        color: node["allocated"] && endNode["allocated"] ? "Orange" : "Grey",
      });
    }
  });

  return (
    <>
      <div>
        <svg
          width="100%"
          viewBox={`${-250} ${-30} ${600} ${200}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {connections.map((connection) => (
            <>
              <line
                x1={connection.sx}
                y1={connection.sy}
                x2={connection.ex}
                y2={connection.ey}
                stroke={connection.color}
                strokeWidth={3}
              />
            </>
          ))}
          {Object.values(mappedNodes).map((node: any) => (
            <>
              <circle
                fill={node["allocated"] ? "Orange" : "Grey"}
                cx={node["x"]}
                cy={node["y"]}
                r={10}
                data-id={node.skill}
              >
                <title>{node.stats.join("\n")}</title>
              </circle>
            </>
          ))}
        </svg>
        <div>
          {Object.values(mappedNodes)
            .filter((e: any) => e["allocated"])
            .map((node: any) => (
              <>
                <div>
                  {node.stats.map((s) => (
                    <>
                      <div>{s}</div>
                    </>
                  ))}
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
}
