import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";

import StyledLoading from "@components/library/styled-loading";

import { usePoeStackAuth } from "./user-context";
import { LadderViewVectorRecord } from "@generated/graphql";
import { gql, useLazyQuery } from "@apollo/client";

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
  async function loadCharacters(timestamp: string) {
    const bucket = `https://poe-stack-ladder-view.nyc3.digitaloceanspaces.com/v1/vectors/${ladderViewSettings.league}/vectors/${timestamp}`;
    const headerResp = await fetch(`${bucket}/header.json`);
    const valuesResp = await fetch(`${bucket}/values.json`);

    if (headerResp.ok && valuesResp.ok) {
      const header = await headerResp.json();
      const values = await valuesResp.json();
      const entries: any[][] = [];
      for (let chunk = 0; chunk < Math.min(header.totalChunks, 3); chunk++) {
        const chunkResp = await fetch(`${bucket}/entries_${chunk}.json`);
        if (chunkResp.ok) {
          const chunkJson = await chunkResp.json();
          entries.push(...chunkJson.entries);
        }
      }
    }
  }

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
            loadCharacters(vRecord.timestamp);
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
