import { useRouter } from "next/router";

import { usePoeStackAuth } from "@contexts/user-context";

export default function PoeAccountConnectedGaurdPanel({ children }) {
  const router = useRouter();
  const { profile } = usePoeStackAuth();

  const poeAccountConnected = !!profile?.poeProfileName;

  if (!poeAccountConnected) {
    return (
      <>
        <div className="flex flex-col place-items-center">
          <div>You must connect your POE account to view this page.</div>

          <div
            className="cursor-pointer text-content-accent"
            onClick={() => {
              localStorage.setItem("variable-redirect", router.asPath);
              router.push(
                "https://www.pathofexile.com/oauth/authorize?client_id=poestack&response_type=code&scope=account:profile account:stashes account:characters account:leagues account:league_accounts&state=teststate1000&redirect_uri=https://poestack.com/ggg/connected&prompt=consent"
              );
            }}
          >
            Connect
          </div>
        </div>
      </>
    );
  }

  return <>{children}</>;
}
