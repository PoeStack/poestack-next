import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

import { gql, useMutation } from "@apollo/client";
import { StashViewTab } from "@models/stash-view-models";
import { StashViewUtil } from "@utils/stash-view-util";

import { usePoeLeagueCtx } from "./league-context";
import { usePoeStackAuth } from "./user-context";

const initalContext: { stashTabs: StashViewTab[] | null } = { stashTabs: null };

export const StashViewTabContext = createContext(initalContext);

export function StashViewTabProvider({ children }) {
  const { league } = usePoeLeagueCtx();
  const { profile } = usePoeStackAuth();

  const [stashTabs, setStashTabs] = useState<StashViewTab[] | null>(null);

  const [refreshTabs] = useMutation(
    gql`
      mutation StashViewRefreshTabs($league: String!) {
        stashViewRefreshTabs(league: $league)
      }
    `,
    {
      variables: { league: league },
      onCompleted() {
        StashViewUtil.fetchStashTabs(league, profile?.opaqueKey!).then((v) =>
          setStashTabs(v)
        );
      },
    }
  );

  useEffect(() => {
    if (league && profile?.opaqueKey) {
      StashViewUtil.fetchStashTabs(league, profile?.opaqueKey!).then((v) => {
        if (v) {
          setStashTabs(v);
        } else {
          refreshTabs();
        }
      });
    }
  }, [league, profile?.opaqueKey]);

  const value = {
    stashTabs: stashTabs,
  };

  return (
    <StashViewTabContext.Provider value={value}>
      {children}
    </StashViewTabContext.Provider>
  );
}

export const useStashViewTabs = () => useContext(StashViewTabContext);
