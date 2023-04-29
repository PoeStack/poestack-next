import StyledCard from "@components/library/styled-card";
import StyledButton from "@components/library/styled-button";
import TftGuardPanel from "../../components/item-table/tft-guard-panel";
import TftOneClickMessageHistoryCard from "@components/tft-oneclick-message-history-card";
import { TftOneClickInstructions } from "@components/tft-one-click-instructions";
import { useRouter } from "next/router";
import { StashViewContextProvider } from "@contexts/stash-view-context";
import TftBulkToolPanel from "@components/tft-bulk-tool-panel";
import StyledSquareResponsiveAd from "@components/ads/styled-square-responsive-ad";

export default function BulkTool() {
  const router = useRouter();

  return (
    <>
      <div>
        <StyledSquareResponsiveAd />
        <TftGuardPanel>
          <div className="flex flex-col space-y-4">
            <StyledCard title="Tool">
              <StashViewContextProvider cacheId={"tft-bulk-tool-1"}>
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
                <StyledButton
                  text={"Connect Discord"}
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
