import StyledButton from "@components/styled-button";
import StyledCard from "@components/styled-card";
import ThemeChanger from "@components/theme-changer";
import { usePoeStackAuth } from "@contexts/user-context";
import { useRouter } from "next/router";

export default function PoeStackSettings() {
  const router = useRouter();
  const { profile, logout } = usePoeStackAuth();

  return (
    <>
      <StyledCard>
        <div className="flex flex-col space-y-2">
          <div className="text-lg">Settings</div>
          <div>
            <div>Theme</div>
            <ThemeChanger />
          </div>
          <div>
            <div>Connect Patreon</div>
            <StyledButton
              text={"Connect"}
              onClick={() => {
                router.push(
                  "https://www.patreon.com/oauth2/authorize?response_type=code&client_id=E5M8jm9CyVp1tRXqkZEFCDS3iHrAP2MJYPzgvMbxBBRrB_ZFO_Hdu50wSxqzrrBC&redirect_uri=https://poestack.com/patreon/connected"
                );
              }}
            />
          </div>
          <div>
            <div>Clear Cache</div>
            <StyledButton
              text={"Clear"}
              onClick={() => {
                localStorage.clear();
              }}
            />
          </div>
        </div>
      </StyledCard>
    </>
  );
}
