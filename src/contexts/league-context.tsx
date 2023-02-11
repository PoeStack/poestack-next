import { useRouter } from "next/router";
import { createContext, useContext, useState, useEffect } from "react";

const initalContext: {
  league: string;
  setLeague: any;
} = {
  league: "Sanctum",
  setLeague: (league: string) => {},
};

export const POE_LEAGUES = [
  "Sanctum",
  "Ziz Sanctum HCSSF Class Gauntlet",
  "Hardcore Sanctum",
  "Standard",
  "Hardcore",
  "Ruthless Sanctum",
  "HC Ruthless Sanctum",
];

export const PoeStackLeagueContext = createContext(initalContext);

export function PoeStackLeagueProvider({ children }) {
  const router = useRouter();

  const [league, setLeague] = useState(
    router.query.league?.toString() ?? POE_LEAGUES[0]
  );

  const value = {
    league: league,
    setLeague: setLeague,
  };

  useEffect(() => {
    console.log("league update", league, router.query.league);
    if (router.query.league && league !== router.query.league) {
      router.replace({
        query: {
          ...router.query,
          league: league,
        },
      });
    }
  }, [league, router]);

  return (
    <PoeStackLeagueContext.Provider value={value}>
      {children}
    </PoeStackLeagueContext.Provider>
  );
}

export const usePoeLeagueCtx = () => useContext(PoeStackLeagueContext);
