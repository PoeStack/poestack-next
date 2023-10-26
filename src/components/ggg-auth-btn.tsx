import { useRouter } from "next/router";
import React from "react";

import { usePoeStackAuth } from "../contexts/user-context";
import StyledButton from "./library/styled-button";
import StyledDropdown from "./library/styled-dropdown";

export default function GggAuthBtn() {
  const router = useRouter();
  const { profile, logout } = usePoeStackAuth();

  if (!profile) {
    return (
      <StyledButton className="py-1.5 px-2"
        text={"Connect POE Account"}
        onClick={() => {
          localStorage.setItem("variable-redirect", router.asPath);
          router.push(
            "https://www.pathofexile.com/oauth/authorize?client_id=poestack&response_type=code&scope=account:profile account:stashes account:characters account:leagues account:league_accounts&state=teststate1000&redirect_uri=https://poestack.com/ggg/connected&prompt=consent"
          );
        }}
      />
    );
  }

  return (
    <StyledDropdown
      items={[
        {
          text: "Settings",
          onClick: () => {
            router.push("/poe-stack/settings");
          },
        },
        {
          text: "Logout",
          onClick: logout,
        },
      ]}
      text={profile.poeProfileName ? `POE connected: ${profile.poeProfileName}` : "Issue"}
    />
  );
}
