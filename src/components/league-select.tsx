import React from "react";
import { POE_LEAGUES, usePoeLeagueCtx } from "../contexts/league-context";
import StyledSelect2 from "./styled-select-2";

export default function LeagueSelect() {
  const { league, setLeague } = usePoeLeagueCtx();

  return (
    <>
      <StyledSelect2
        items={POE_LEAGUES}
        onSelectChange={(e) => setLeague(e)}
        selected={league}
      />
    </>
  );
}
