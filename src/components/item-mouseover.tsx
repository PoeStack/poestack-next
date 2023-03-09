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
          className={`group relative flex w-full h-full mx-auto justify-center  
          

          ${
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
            className={`absolute top-10 left-28 scale-0 rounded z-50 text-xs text-white group-hover:scale-100`}
          >
            <div className="flex flex-col pl-10 space-x-2 lg:flex-row z-100">
              {hoveredGem && <ItemStatDisplay item={hoveredGem} />}
              <ItemStatDisplay item={item} />
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
                //console.log("currentSocketGroup", currentSocketGroup);

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
                //console.log("currentSocketGroup", currentSocketGroup);

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
                //console.log("currentSocketGroup", currentSocketGroup);

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
                //console.log("currentSocketGroup", currentSocketGroup);

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
                //console.log("GEM: ", gem);
                //console.log("currentSocketGroup", currentSocketGroup);

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
                //console.log("currentSocketGroup", currentSocketGroup);

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

export function ItemStatDisplay({ item }) {
  return (
    <>
      <div
        className={`flex flex-col  bg-color-primary w-96 text-center border-t-2 border-b-2 divide-y font-semibold text-base
          //! normal
          ${
            item.frameType === 0
              ? "  border-color-normal divide-color-normal border"
              : null
          }
          //! magic
          ${
            item.frameType === 1
              ? "    border border-color-magic  divide-color-magic"
              : null
          } 
          //! rare
          ${
            item.frameType === 2
              ? " border border-color-rare divide-color-rare "
              : null
          } 
          //! unique
          ${
            item.frameType === 3
              ? " border  border-color-unique divide-color-unique"
              : null
          } 
          //! foil
          ${
            item.frameType === 9
              ? "  border  border-pink-400 divide-pink-400"
              : null
          } 
          ${
            item.frameType === 4 && item.gemColor === "D"
              ? "  border  border-green-400 divide-green-400"
              : null
          } 
          ${
            item.frameType === 4 && item.gemColor === "I"
              ? "  border  border-blue-400 divide-blue-400"
              : null
          } 
          ${
            item.frameType === 4 && item.gemColor === "S"
              ? "  border  border-red-400 divide-red-400"
              : null
          } 
          //!gemred

          //!gemblue
          //!gemgreen
          
          
          `}
      >
        <div
          className={`text-lg font-bold
        ${
          item.frameType === 0
            ? "  text-content-normal bg-white bg-opacity-40 "
            : null
        }
        //! magic
        ${
          item.frameType === 1
            ? "    text-content-magic bg-indigo-800  bg-opacity-10"
            : null
        } 
        //! rare
        ${
          item.frameType === 2
            ? " text-content-rare bg-yellow-200 bg-opacity-10"
            : null
        } 
        //! unique
        ${
          item.frameType === 3
            ? " text-content-unique bg-orange-800 bg-opacity-10"
            : null
        } 
        //! foil
        ${
          item.frameType === 9
            ? "  text-pink-400 bg-pink-400 bg-opacity-25"
            : null
        } 
        ${
          item.frameType === 4 && item.gemColor === "D"
            ? "    text-green-400 bg-green-400 bg-opacity-10"
            : null
        } 
        ${
          item.frameType === 4 && item.gemColor === "I"
            ? "    text-blue-400 bg-blue-400 bg-opacity-10"
            : null
        } 
        ${
          item.frameType === 4 && item.gemColor === "S"
            ? "    text-red-400 bg-red-400 bg-opacity-10"
            : null
        } 
        `}
        >
          {`${item?.name} ${item?.typeLine}`.trim()}
        </div>
        {!!item?.properties?.length && (
          <>
            <div className="flex flex-col items-center w-full p-1">
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
            </div>
          </>
        )}
        {!!item?.enchantMods?.length && (
          <>
            <div className="p-1">
              {item?.enchantMods?.map((p, i) => (
                <>
                  <div key={i} className="text-blue-400">
                    {p}
                  </div>
                </>
              ))}
            </div>
          </>
        )}
        {!!item?.implicitMods?.length && (
          <>
            <div className="flex flex-col items-center p-1 text-center ">
              {item?.implicitMods?.map((p, i) => (
                <>
                  <div className="text-blue-200" key={i}>
                    {p}
                  </div>
                </>
              ))}
            </div>
          </>
        )}
        <div className="flex flex-col p-1">
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
        {!!item.corrupted && (
          <>
            <div className="p-1 text-red-700 bg-red-900 bg-opacity-10">
              Corrupted
            </div>
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
              <CurrencyValueDisplay valueChaos={item?.valueChaos} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
