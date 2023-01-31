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
  "Hardcore Sanctum",
  "Standard",
  "Hardcore",
  "Ruthless Sanctum",
  "HC Ruthless Sanctum",
];

export const PoeStackLeagueContext = createContext(initalContext);

export function PoeStackLeagueProvider({ children }) {
  const [league, setLeague] = useState(POE_LEAGUES[0]);

  const value = {
    league: league,
    setLeague: setLeague,
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLeague(localStorage.getItem("selected-league") ?? POE_LEAGUES[0]);
    }
  }, []);

  useEffect(() => {
    if (league) {
      localStorage.setItem("selected-league", league);
    }
  }, [league]);

  return (
    <PoeStackLeagueContext.Provider value={value}>
      {children}
    </PoeStackLeagueContext.Provider>
  );
}

export const usePoeLeagueCtx = () => useContext(PoeStackLeagueContext);
