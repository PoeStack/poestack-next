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
        <div className="grid grid-cols-6">
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
