import { useRouter } from "next/router";
import { useEffect } from "react";

import { usePoeStackAuth } from "@contexts/user-context";

export default function Connected() {
  const router = useRouter();

  const { code, state } = router.query;
  const { connect, jwt } = usePoeStackAuth();

  useEffect(() => {
    if (code?.length) {
      const codeRaw = code.toString()
      const stateRaw = state?.toString() ?? ""
    

      if (
        !stateRaw.includes("dawncode")
      ) {
          connect(codeRaw);
        if(   typeof window !== "undefined" &&
        localStorage.getItem("variable-redirect")) {
              router.push(localStorage.getItem("variable-redirect")!.toString());
        }
    
      } else {
         router.push(`https://bulk.poestack.com/ggg/connect?code=${codeRaw}`);
      }
    }
  }, [code, connect, router]);

  return (
    <>
      <div>
        <div className="h-56 grid grid-cols-3 gap-4 content-end">
          <h1 className="text-3xl font-bold">
            Your account has been connected!
          </h1>
        </div>
      </div>
    </>
  );
}
