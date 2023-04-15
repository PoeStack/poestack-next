import React from "react";
import { usePoeStackAuth } from "../contexts/user-context";
import StyledDropdown from "./styled-dropdown";
import StyledButton from "./styled-button";
import { useRouter } from "next/router";

export default function GggAuthBtn() {
  const router = useRouter();
  const { profile, logout } = usePoeStackAuth();

  if (!profile) {
    return (
      <StyledButton
        text={"Connect POE Account"}
        onClick={() => {
          localStorage.setItem("variable-redirect", router.asPath);
          router.push(
            "https://www.pathofexile.com/oauth/authorize?client_id=poestack&response_type=code&scope=account:profile account:stashes account:characters account:league_accounts&state=teststate1000&redirect_uri=https://poestack.com/ggg/connected&prompt=consent"
          );
        }}
      />
    );
  }

  return (
    <StyledDropdown
      items={[
        {
          text: "Logout",
          onClick: logout,
        },
      ]}
      text={profile.poeProfileName ?? "Issue"}
    />
  );
}
