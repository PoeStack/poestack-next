import React from "react";
import { usePoeStackAuth } from "../contexts/user-context";
import Link from "next/link";
import StyledDropdown from "./styled-dropdown";

export default function GggAuthBtn() {
  const { profile, logout } = usePoeStackAuth();

  return (
    <>
      <div>
        {profile ? (
          <StyledDropdown
            items={[
              {
                text: "Logout",
                onClick: () => {
                  logout();
                },
              },
            ]}
            text={profile.poeProfileName ?? "Issue"}
          />
        ) : (
          <Link href="https://www.pathofexile.com/oauth/authorize?client_id=poestack&response_type=code&scope=account:profile account:stashes account:characters account:league_accounts&state=teststate1000&redirect_uri=https://poestack.com/ggg/connected&prompt=consent">
            Connect POE Account
          </Link>
        )}
      </div>
    </>
  );
}
