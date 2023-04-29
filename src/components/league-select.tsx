import React from "react";

import { POE_LEAGUES, usePoeLeagueCtx } from "../contexts/league-context";
import StyledSelect2 from "./library/styled-select-2";

export default function LeagueSelect({
  onChange = () => {},
  leagueFilter = (e) => true,
}: {
  onChange?: (e: string) => void;
  leagueFilter?: (e: string) => boolean;
}) {
  const { league, setLeague } = usePoeLeagueCtx();

  return (
    <>
      <StyledSelect2
        items={POE_LEAGUES.filter(leagueFilter)}
        onSelectChange={(e) => {
          setLeague(e);
          onChange?.(e);
        }}
        selected={league}
      />
    </>
  );
}
