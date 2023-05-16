import "moment-timezone";

import PoeAccountConnectedGaurdPanel from "@components/poe-account-connected-guard-panel";
import StashViewLayout from "@components/stash-view/stash-view-layout";
import { StashViewContextProvider } from "@contexts/stash-view-context";

export default function StashView() {
  return (
    <>
      <PoeAccountConnectedGaurdPanel>
        <StashViewContextProvider cacheId={"stash-view-page"}>
          <StashViewLayout />
        </StashViewContextProvider>
      </PoeAccountConnectedGaurdPanel>
    </>
  );
}
