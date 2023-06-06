import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";

import StyledLoading from "@components/library/styled-loading";

import { usePoeStackAuth } from "./user-context";
import { LadderViewVectorRecord } from "@generated/graphql";
import { gql, useLazyQuery } from "@apollo/client";
import { LadderViewVectorParser } from "@utils/ladder-view-vector-parser";

export interface LadderViewSettings {
  league: string | undefined | null;
}

const defaultLadderViewSettings: LadderViewSettings = {
  league: "Crucible",
};

export interface LadderViewContext {
  ladderViewSettings: LadderViewSettings;
  setLadderViewSettings: (e: LadderViewSettings) => void;
  vectorRecords: LadderViewVectorRecord[];
  load: () => void;
}

const initalContext: LadderViewContext = {
  ladderViewSettings: defaultLadderViewSettings,
  setLadderViewSettings: (e: LadderViewSettings) => {},
  vectorRecords: [],
  load: () => {},
};

export const LadderViewContext = createContext(initalContext);

export function LadderViewContextProvider({ children }: { children: any }) {
  const { profile } = usePoeStackAuth();

  const router = useRouter();
  const { league } = router.query;
  const [ladderViewSettings, setLadderViewSettings] =
    useState<LadderViewSettings>(defaultLadderViewSettings);

  const [vectorRecords, setVectorRecords] = useState<LadderViewVectorRecord[]>(
    []
  );
  const [fetchVectors] = useLazyQuery(
    gql`
      query LadderViewVectorRecords($league: String!) {
        ladderViewVectorRecords(league: $league) {
          timestamp
        }
      }
    `,
    {
      variables: { league: ladderViewSettings.league },
    }
  );

  const [characters, setCharacters] = useState<any[]>([]);

  const value: LadderViewContext = {
    ladderViewSettings: ladderViewSettings,
    setLadderViewSettings: setLadderViewSettings,
    vectorRecords: vectorRecords,
    load: () => {
      fetchVectors({
        onCompleted(data) {
          setVectorRecords(data.ladderViewVectorRecords);
          const vRecord = data.ladderViewVectorRecords[0];
          if (vRecord) {
            new LadderViewVectorParser().loadCharacters(
              ladderViewSettings.league!,
              vRecord.timestamp
            );
          }
        },
      });
    },
  };

  return (
    <LadderViewContext.Provider value={value}>
      {children}
    </LadderViewContext.Provider>
  );
}

export const useLadderViewContext = () => useContext(LadderViewContext);
