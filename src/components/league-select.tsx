import React from "react";
import StyledSelect from "./styled-select";
import { POE_LEAGUES } from "../contexts/league-context";

export default function LeagueSelect({ onLeagueChanged }) {
  return (
    <>
      <StyledSelect
        items={POE_LEAGUES}
        onSelectChange={function (e: any): void {
          onLeagueChanged(e);
        }}
        initalValue={"Sanctum"}
      />
    </>
  );
}
