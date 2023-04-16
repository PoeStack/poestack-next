import React from 'react';
import { POE_LEAGUES, usePoeLeagueCtx } from '@contexts/league-context';
import Select from '@components/core/select';

interface LeagueSelectProps {
  onChange?: (e: string) => void;
  leagueFilter?: (e: string) => boolean;
}

export default function LeagueSelect({
  onChange = () => {},
  leagueFilter = (e) => true,
}: LeagueSelectProps) {
  const { league, setLeague } = usePoeLeagueCtx();
  const data = POE_LEAGUES.filter(leagueFilter);

  return (
    <Select
      options={data}
      onChange={(newLeague) => {
        setLeague(newLeague);
        onChange?.(newLeague);
      }}
      selected={league}
    />
  );
}
