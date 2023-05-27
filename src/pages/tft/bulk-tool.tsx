import { useRouter } from "next/router";

import FixedAds from "@components/ads/styled-square-responsive-ad";
import StyledButton from "@components/library/styled-button";
import StyledCard from "@components/library/styled-card";
import StyledLoading from "@components/library/styled-loading";
import TftBulkToolPanel from "@components/tft-bulk-tool-panel";
import { TftOneClickInstructions } from "@components/tft-one-click-instructions";
import TftOneClickMessageHistoryCard from "@components/tft-oneclick-message-history-card";
import { StashViewContextProvider } from "@contexts/stash-view-context";
import { usePoeStackAuth } from "@contexts/user-context";

import TftGuardPanel from "../../components/item-table/tft-guard-panel";

export default function BulkTool() {
  const router = useRouter();
  const { league } = router.query;
  const { profile } = usePoeStackAuth();

  if (!profile?.userId || !league) {
    return <StyledLoading />;
  }

  return (
    <>
      <div>
        <TftGuardPanel>
          <div className="flex flex-col space-y-4">
            <StyledCard title="Tool">
              <StashViewContextProvider
                cacheId={`bulk_tool_page_${profile?.userId}_${league}_v_1`}
              >
                <TftBulkToolPanel />
              </StashViewContextProvider>
            </StyledCard>
            <StyledCard>
              <TftOneClickMessageHistoryCard />
            </StyledCard>
            <TftOneClickInstructions />
            <StyledCard>
              <div className="flex flex-col space-y-2 w-fit">
                <div>Settings (Optional)</div>
                <div>
                  Current Discord: {`${profile?.discordUsername}`} (
                  {profile?.discordUserId})
                </div>
                <StyledButton
                  text={"Connect a Different Discord"}
                  onClick={() => {
                    localStorage.setItem("variable-redirect", router.asPath);
                    router.push(
                      "https://discord.com/api/oauth2/authorize?client_id=1075074940275019836&redirect_uri=https%3A%2F%2Fpoestack.com%2Fdiscord%2Fconnected&response_type=code&scope=identify"
                    );
                  }}
                />
              </div>
            </StyledCard>
          </div>
        </TftGuardPanel>
      </div>
    </>
  );
}
