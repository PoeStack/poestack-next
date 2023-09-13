import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { usePoeStackAuth } from "@contexts/user-context";
import { Adsense } from "@ctrl/react-adsense";
import useWindowDimensions from "@hooks/user-window-dimensions";

export default function FixedAds() {
  const { profile } = usePoeStackAuth();
  const { width } = useWindowDimensions();
  const router = useRouter();

  const [key, setKey] = useState(router.pathname);

  useEffect(() => {
    setKey(router.pathname);
  }, [setKey, router.pathname]);

  if (profile?.patreonTier || width < 900) {
    return <></>;
  }

  return (
    <>
      <div key={`key_${key}`}>
        <div className="fixed top-[15%] right-0 z-50 h-[300px] w-[130px]">
          <Adsense
            client="ca-pub-1917075558725173"
            slot="4469612839"
            style={{ display: "block" }}
            format="auto"
            responsive="true"
          />
        </div>
        <div className="fixed top-[15%] left-0 z-50 h-[300px] w-[130px]">
          <Adsense
            client="ca-pub-1917075558725173"
            slot="4469612839"
            style={{ display: "block" }}
            format="auto"
            responsive="true"
          />
        </div>
      </div>
    </>
  );
}
