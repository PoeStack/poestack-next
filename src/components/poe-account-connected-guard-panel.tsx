import { usePoeStackAuth } from "@contexts/user-context";
import { useRouter } from "next/router";

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
            className="text-content-accent cursor-pointer"
            onClick={() => {
              localStorage.setItem("variable-redirect", router.asPath);
              router.push(
                "https://www.pathofexile.com/oauth/authorize?client_id=poestack&response_type=code&scope=account:profile account:stashes account:characters account:league_accounts&state=closeafter&redirect_uri=https://poestack.com/ggg/connected&prompt=consent"
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
