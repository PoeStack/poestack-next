import React from "react";
import { CharacterSnapshotPobStats } from "../__generated__/resolvers-types";
import StyledButton from "./styled-button";

export default function CharacterStatsDisplay({
  pobStats,
}: {
  pobStats: CharacterSnapshotPobStats | undefined | null;
}) {
  console.log("pobStats", pobStats);

  if (!pobStats) {
    return <>Loading...</>;
  }

  return (
    <>
      <div>
        <div className="grid grid-cols-4 gap-x-1">
          <div>
            <div>Life: {pobStats.life}</div>
            <div>Energy Shield: {pobStats.energyShield}</div>
            <div>Armour: {pobStats.armour}</div>
            <div>Evasion: {pobStats.evasion}</div>
          </div>

          <div>
            <div>Str: {pobStats.str}</div>
            <div>Int: {pobStats.int}</div>
            <div>Dex: {pobStats.dex}</div>
          </div>

          <div>
            <div>Cold Res: {pobStats.coldResist}</div>
            <div>Fire Res: {pobStats.fireResist}</div>
            <div>Lightning Res: {pobStats.lightningResist}</div>
            <div>Chaos Res: {pobStats.chaosResist}</div>
          </div>

          <div>
            <div>Block: {pobStats.blockChance}</div>
            <div>Spell Block: {pobStats.spellBlockChance}</div>
          </div>
        </div>
        <div>
          <StyledButton
            text={"Copy POB Code"}
            onClick={() => {
              navigator.clipboard.writeText(pobStats?.pobCode ?? "not found");
            }}
          />
        </div>
      </div>
    </>
  );
}
