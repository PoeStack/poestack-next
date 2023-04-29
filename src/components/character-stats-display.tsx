import React from "react";

import { CharacterSnapshotPobStats } from "../__generated__/graphql";
import StyledLoading from "./library/styled-loading";

export default function CharacterStatsDisplay({
  pobStats,
}: {
  pobStats: CharacterSnapshotPobStats | undefined | null;
}) {
  if (!pobStats) {
    return (
      <>
        <StyledLoading />
      </>
    );
  }

  return (
    <>
      <div>
        <div className="grid w-full h-full grid-cols-1 gap-x-3">
          <div>
            <h2 className="text-center">Attributes</h2>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Str:</h3>{" "}
              <h5 className="w-full mx-4 text-right text-red-500">
                {pobStats.str}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Int:</h3>{" "}
              <h5 className="w-full mx-4 text-right text-blue-500">
                {pobStats.int}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Dex:</h3>{" "}
              <h5 className="w-full mx-4 text-right text-green-400">
                {pobStats.dex}
              </h5>
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-center">Defenses</h2>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Life:</h3>
              <h5 className="w-full mx-4 text-right text-red-500">
                {pobStats.life}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>ES:</h3>
              <h5 className="w-full mx-4 text-right text-teal-300">
                {pobStats.energyShield}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Armour:</h3>
              <h5 className="w-full mx-4 text-right text-neutral-200">
                {pobStats.armour}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Evasion:</h3>
              <h5 className="w-full mx-4 text-right text-neutral-200">
                {pobStats.evasion}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Block:</h3>
              <h5 className="w-full mx-4 text-right text-neutral-200">
                {pobStats.blockChance}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3 className="w-60 ">Spell Block:</h3>
              <h5 className="w-full mx-4 text-right text-neutral-200">
                {pobStats.spellBlockChance}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Supression:</h3>
              <h5 className="w-full mx-4 text-right text-neutral-200">
                {pobStats.supression}
              </h5>
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-center">Resistances</h2>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Cold: </h3>{" "}
              <h5 className="w-full mx-4 text-right text-teal-500">
                {pobStats.coldResist}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Fire: </h3>{" "}
              <h5 className="w-full mx-4 text-right text-orange-400">
                {pobStats.fireResist}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Lightning: </h3>{" "}
              <h5 className="w-full mx-4 text-right text-yellow-300">
                {pobStats.lightningResist}
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Chaos: </h3>{" "}
              <h5 className="w-full mx-4 text-right text-pink-400">
                {pobStats.chaosResist}
              </h5>
            </div>
          </div>
          {/* <div className="mt-2">
            <h2 className="text-center">Charges Placeholder</h2>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Endurance: </h3>{" "}
              <h5 className="w-full mx-4 text-right text-rose-500">
                Placeholder
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Frenzy: </h3>{" "}
              <h5 className="w-full mx-4 text-right text-lime-400">
                Placeholder
              </h5>
            </div>
            <div className="flex flex-row hover:bg-color-primary-variant ">
              <h3>Power: </h3>{" "}
              <h5 className="w-full mx-4 text-right text-blue-300">
                Placeholder
              </h5>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
