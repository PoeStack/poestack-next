import { useRouter } from "next/router";
import { useState } from "react";

import { gql, useMutation } from "@apollo/client";
import StyledButton from "@components/library/styled-button";
import StyledInput from "@components/library/styled-input";
import { localStorageJwtName, usePoeStackAuth } from "@contexts/user-context";

export default function Admin() {
  const router = useRouter();
  const { profile } = usePoeStackAuth();

  const [userId, setUserId] = useState<string>("");

  const [loginAsUser] = useMutation(
    gql`
      mutation LoginAs($userId: String!) {
        loginAs(userId: $userId)
      }
    `,
    {
      variables: {
        userId: userId,
      },
      onCompleted(data) {
        localStorage.setItem(localStorageJwtName, data?.loginAs ?? "");
        router.reload();
      },
    }
  );

  if (!profile?.roles?.includes("admin")) {
    return <>No Access</>;
  }

  return (
    <>
      <div>
        <StyledInput
          value={userId}
          onChange={(e) => {
            setUserId(e);
          }}
        />
        <StyledButton text={"Login"} onClick={() => loginAsUser()} />
      </div>
    </>
  );
}
