import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import StyledCard from "./library/styled-card";

export default function UserActivityGuard({ children }) {
  const [locked, setLocked] = useState<boolean>(false);

  let timeout: NodeJS.Timeout | null = null;
  function restartAutoReset() {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      setLocked(true);
    }, 1000 * 60 * 60 * 4);
  }

  restartAutoReset();
  useEffect(() => {
    window.addEventListener("mousemove", restartAutoReset);
    return () => {
      window.removeEventListener("mousemove", restartAutoReset);
    };
  }, []);

  if (locked) {
    return (
      <>
        <StyledCard>
          <div>Session Expired</div>
          <div>Please reload the page.</div>
        </StyledCard>
      </>
    );
  }

  return <>{children}</>;
}
