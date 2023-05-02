import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { usePoeStackAuth } from "@contexts/user-context";
import { Adsense } from "@ctrl/react-adsense";

export default function FixedAds() {
  const { profile } = usePoeStackAuth();
  const router = useRouter();

  const [key, setKey] = useState(router.pathname);

  useEffect(() => {
    setKey(router.pathname);
  }, [setKey, router.pathname]);

  if (profile?.patreonTier) {
    return <></>;
  }

  return (
    <>
      <div key={`key_${key}`}>
        <div className="fixed z-50 top-[15%] right-0 w-[180px] h-[500px]">
          <Adsense
            client="ca-pub-1917075558725173"
            slot="4469612839"
            style={{ display: "block" }}
            format="auto"
            responsive="true"
          />
        </div>
        <div className="fixed z-50 top-[15%] left-0 w-[180px] h-[500px]">
          <Adsense
            client="ca-pub-1917075558725173"
            slot="4469612839"
            style={{ display: "block" }}
            format="auto"
            responsive="true"
          />
        </div>
        <div className="fixed z-50 bottom-0 right-0 w-[500px] h-[500px] ">
          <Adsense
            client="ca-pub-1917075558725173"
            slot="4522170456"
            style={{ display: "block" }}
            format="auto"
            responsive="true"
          />
        </div>
      </div>
    </>
  );
}
