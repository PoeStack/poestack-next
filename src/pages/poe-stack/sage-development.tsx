import { useEffect, useState } from "react";

import StyledButton from "@components/library/styled-button";
import StyledCard from "@components/library/styled-card";
import StyledInput from "@components/library/styled-input";
import PoeAccountConnectedGaurdPanel from "@components/poe-account-connected-guard-panel";
import { localStorageJwtName } from "@contexts/user-context";

export default function SageDevelopment() {
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [key, setKey] = useState(
    typeof window === "undefined"
      ? ""
      : localStorage.getItem(localStorageJwtName)
  );

  useEffect(() => {
    async function sendKeyToDevServer() {
      try {
        await fetch("http://localhost:8000/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: key,
          }),
        });
        setIsSuccess(true);
      } catch (e: unknown) {
        console.log(e);
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    }
    if (key) {
      void sendKeyToDevServer();
    }
  }, [key]);

  return (
    <PoeAccountConnectedGaurdPanel>
      <div>
        <StyledCard title={"Auth Key"}>
          <div className="font-bold">
            Syncing auth with your local PoeStack Sage
          </div>
          {isSuccess && (
            <div className="font-bold text-green-600">Syncing successful!</div>
          )}
          {error && <div className="text-red-600">Error: {error}</div>}
        </StyledCard>
      </div>
    </PoeAccountConnectedGaurdPanel>
  );
}
