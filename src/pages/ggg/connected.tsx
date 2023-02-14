import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import { usePoeStackAuth } from "@contexts/user-context";

export default function Connected() {
  const router = useRouter();

  const { code, state } = router.query;
  const { connect, jwt } = usePoeStackAuth();

  useEffect(() => {
    if (code?.length) {
      connect(code.toString());
    }
  }, [code, connect]);

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
