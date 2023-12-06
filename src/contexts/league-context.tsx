import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const initalContext: {
  league: string;
  setLeague: any;
} = {
  league: "Affliction",
  setLeague: (league: string) => {},
};

export const POE_LEAGUES = [
  "Affliction",
  "Hardcore Affliction",
  "Sanctum",
  "SSF Standard",
  "Standard",
  "Hardcore",
];

export const PoeStackLeagueContext = createContext(initalContext);

export function PoeStackLeagueProvider({ children }) {
  const router = useRouter();

  const [league, setLeague] = useState(
    router.query.league?.toString() ?? POE_LEAGUES[0]
  );

  const value = {
    league: league,
    setLeague: (nextLeague) => {
      if (router.query.league && nextLeague !== router.query.league) {
        router.replace({
          query: {
            ...router.query,
            league: nextLeague,
          },
        });
      }
      setLeague(nextLeague);
    },
  };

  useEffect(() => {
    if (router.query.league && router.query.league !== league) {
      setLeague(router.query.league.toString());
    }
  }, [router.query.league, league]);

  return (
    <PoeStackLeagueContext.Provider value={value}>
      {children}
    </PoeStackLeagueContext.Provider>
  );
}

export const usePoeLeagueCtx = () => useContext(PoeStackLeagueContext);
