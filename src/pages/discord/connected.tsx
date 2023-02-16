import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function Connected() {
  const router = useRouter();

  const { code, state } = router.query;

  const [updateCode] = useMutation(
    gql`
      mutation UpdateDiscordCode($code: String!) {
        updateDiscordCode(code: $code)
      }
    `
  );

  useEffect(() => {
    if (code?.length) {
      console.log("got code" + code);
      updateCode({ variables: { code: code } });
    }
  }, [code, updateCode]);

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
