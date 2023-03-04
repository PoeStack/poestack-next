import React from "react";
import { CharacterSnapshotPobStats } from "../__generated__/graphql";

export default function CharacterStatsDisplay({
  pobStats,
}: {
  pobStats: CharacterSnapshotPobStats | undefined | null;
}) {
  //console.log("pobStats", pobStats);

  if (!pobStats) {
    return <>Loading...</>;
  }

  return (
    <>
      <div>
        <div className="grid grid-cols-1 gap-x-3 w-full h-full">
          <div>
            <h2 className="text-center">Attributes</h2>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Str:</h3>{" "}
              <h5 className="mx-4 text-red-500 text-right w-full">
                {pobStats.str}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Int:</h3>{" "}
              <h5 className="mx-4 text-blue-500 text-right w-full">
                {pobStats.int}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Dex:</h3>{" "}
              <h5 className="mx-4 text-green-400 text-right w-full">
                {pobStats.dex}
              </h5>
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-center">Defenses</h2>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Life:</h3>
              <h5 className="mx-4 text-red-500 text-right w-full">
                {pobStats.life}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>ES:</h3>
              <h5 className="mx-4 text-teal-300 text-right w-full">
                {pobStats.energyShield}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Armour:</h3>
              <h5 className="mx-4 text-amber-400 text-right w-full">
                {pobStats.armour}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Evasion:</h3>
              <h5 className="mx-4 text-emerald-500 text-right w-full">
                {pobStats.evasion}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Block:</h3>
              <h5 className="mx-4 text-neutral-300 text-right w-full">
                {pobStats.blockChance}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3 className="w-60 ">Spell Block:</h3>
              <h5 className="mx-4 text-purple-400 text-right w-full">
                {pobStats.spellBlockChance}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Supression:</h3>
              <h5 className="mx-4 text-emerald-300 text-right w-full">
                {pobStats.supression}
              </h5>
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-center">Resistances</h2>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Cold: </h3>{" "}
              <h5 className="mx-4 text-teal-500 text-right w-full">
                {pobStats.coldResist}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Fire: </h3>{" "}
              <h5 className="mx-4 text-orange-400 text-right w-full">
                {pobStats.fireResist}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Lightning: </h3>{" "}
              <h5 className="mx-4 text-yellow-300 text-right w-full">
                {pobStats.lightningResist}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Chaos: </h3>{" "}
              <h5 className="mx-4 text-pink-500 text-right w-full">
                {pobStats.chaosResist}
              </h5>
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-center">Charges Placeholder</h2>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Endurance: </h3>{" "}
              <h5 className="mx-4 text-rose-500 text-right w-full">
                {pobStats.coldResist}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Frenzy: </h3>{" "}
              <h5 className="mx-4 text-lime-400 text-right w-full">
                {pobStats.fireResist}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Power: </h3>{" "}
              <h5 className="mx-4 text-blue-300 text-right w-full">
                {pobStats.lightningResist}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
