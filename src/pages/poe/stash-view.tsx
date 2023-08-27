import "moment-timezone";
import { useRouter } from "next/router";

import StyledLoading from "@components/library/styled-loading";
import PoeAccountConnectedGuardPanel from "@components/poe-account-connected-guard-panel";
import StashViewLayout from "@components/stash-view/stash-view-layout";
import { StashViewContextProvider } from "@contexts/stash-view-context";
import { usePoeStackAuth } from "@contexts/user-context";

export default function StashView() {
  const { profile } = usePoeStackAuth();

  const router = useRouter();
  const { league } = router.query;

  if (!profile?.userId || !league) {
    return <StyledLoading />;
  }

  return (
    <>
      <PoeAccountConnectedGuardPanel>
        <StashViewContextProvider
          cacheId={`stash_view_page_${profile?.userId}_${league}_v_1`}
        >
          <StashViewLayout />
        </StashViewContextProvider>
      </PoeAccountConnectedGuardPanel>
    </>
  );
}
