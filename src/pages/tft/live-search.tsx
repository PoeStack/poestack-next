import { useRouter } from "next/router";
import { useState } from "react";

import TftGuardPanel from "@components/item-table/tft-guard-panel";
import TftLiveSearcgFiveWays from "@components/tft-live-search/five-ways";
import { TftLiveSearchCompasses } from "@components/tft-live-search/tft-live-search-compasses";
import { TftLiveSearchMessageHistory } from "@components/tft-live-search/tft-live-search-message-history";
import {
  TftLiveSearchContextProvider,
  useTftLiveSearchCtx,
} from "@contexts/tft-live-search-context";

export default function TftLiveSearch() {
  const router = useRouter();
  const { tag } = router.query;

  return (
    <>
      <TftGuardPanel>
        <TftLiveSearchContextProvider tag={tag?.toString()!}>
          <TftLiveSearchSwitchPanel />
        </TftLiveSearchContextProvider>
      </TftGuardPanel>
    </>
  );
}

export function TftLiveSearchSwitchPanel() {
  const router = useRouter();
  const { tag } = router.query;

  const { tftLiveSearchSettings } = useTftLiveSearchCtx();

  const tags = {
    "five-ways": TftLiveSearcgFiveWays,
    compasses: TftLiveSearchCompasses,
  };

  return (
    <>
      {tftLiveSearchSettings.messageHistoryOpen ? (
        <TftLiveSearchMessageHistory />
      ) : (
        <>{tags[tag?.toString()!]!()}</>
      )}
    </>
  );
}
