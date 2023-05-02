import { useState } from "react";

import StyledButton from "@components/library/styled-button";
import StyledCard from "@components/library/styled-card";
import StyledInput from "@components/library/styled-input";
import PoeAccountConnectedGaurdPanel from "@components/poe-account-connected-guard-panel";
import { localStorageJwtName } from "@contexts/user-context";

export default function Development() {
  const [key, setKey] = useState(
    typeof window === "undefined"
      ? ""
      : localStorage.getItem(localStorageJwtName)
  );

  return (
    <>
      <div>
        <StyledCard title={"Auth Key"}>
          <div className=" font-bold">
            This key is for local development only, if anyone including people
            assocatied with PoeStack are asking for this key do not give it to
            them and report them in the Discord.
          </div>
          <StyledButton
            text={"Copy Key"}
            onClick={() => {
              const key =
                localStorage.getItem(localStorageJwtName) ?? "not found";
              navigator.clipboard.writeText(key);
            }}
          />

          <div className="w-full">
            <StyledInput
              type="password"
              value={key}
              onChange={(e) => {
                setKey(e);
              }}
            />
            <StyledButton
              text={"Update Key"}
              onClick={() => {
                localStorage.setItem(localStorageJwtName, key ?? "");
              }}
            />
          </div>
        </StyledCard>
      </div>
    </>
  );
}
