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
        <TftLiveSearchContextProvider tag={tag?.toString() ?? "compasses"}>
          <TftLiveSearchSwitchPanelWrapper />
        </TftLiveSearchContextProvider>
      </TftGuardPanel>
    </>
  );
}

export function TftLiveSearchSwitchPanelWrapper() {
  const { tftLiveSearchSettings } = useTftLiveSearchCtx();

  return (
    <>
      {tftLiveSearchSettings.messageHistoryOpen ? (
        <TftLiveSearchMessageHistory />
      ) : (
        <TftLiveSearchSwitchPanel />
      )}
    </>
  );
}

export function TftLiveSearchSwitchPanel() {
  const router = useRouter();
  const { tag } = router.query;

  if (tag === "five-ways") {
    return <TftLiveSearcgFiveWays />;
  }

  return <TftLiveSearchCompasses />;
}
