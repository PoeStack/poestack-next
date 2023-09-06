import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";

import StyledLoading from "@components/library/styled-loading";

import { usePoeStackAuth } from "./user-context";
import { LadderViewVectorRecord } from "@generated/graphql";
import { gql, useLazyQuery } from "@apollo/client";
import { LadderViewVectorParser } from "@utils/ladder-view-vector-parser";
import { LadderViewVectorFields } from "@models/ladder-view-models";

export interface LadderViewSettings {
  league: string | undefined | null;
}

const defaultLadderViewSettings: LadderViewSettings = {
  league: "Ancestor",
};

export interface LadderViewContext {
  ladderViewSettings: LadderViewSettings;
  setLadderViewSettings: (e: LadderViewSettings) => void;
  vectorRecords: LadderViewVectorRecord[];
  allCharacters: LadderViewVectorFields[];
  load: () => void;
}

const initalContext: LadderViewContext = {
  ladderViewSettings: defaultLadderViewSettings,
  setLadderViewSettings: (e: LadderViewSettings) => {},
  vectorRecords: [],
  allCharacters: [],
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

  const [characters, setCharacters] = useState<LadderViewVectorFields[]>([]);

  const value: LadderViewContext = {
    ladderViewSettings: ladderViewSettings,
    setLadderViewSettings: setLadderViewSettings,
    vectorRecords: vectorRecords,
    allCharacters: characters,
    load: () => {
      fetchVectors({
        onCompleted(data) {
          setVectorRecords(data.ladderViewVectorRecords);
          const vRecord = data.ladderViewVectorRecords[0];
          if (vRecord) {
            const parser = new LadderViewVectorParser();
            parser
              .loadCharacters(ladderViewSettings.league!, vRecord.timestamp)
              .then(() => {
                setCharacters(parser.entries);
              });
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
