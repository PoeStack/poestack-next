import { gql, useMutation, useQuery } from "@apollo/client";

import Link from "next/link";
import { PoeCharacter } from "../../../../__generated__/resolvers-types";
import { useState } from "react";
import { useRouter } from "next/router";
import StyledCard from "../../../../components/styled-card";
import StyledButton from "../../../../components/styled-button";

export default function Characters() {
  const router = useRouter();
  const { userId } = router.query;

  const [poeCharacters, setPoeCharacters] = useState<PoeCharacter[]>([]);

  const { refetch: refetchPoeCharacters } = useQuery(
    gql`
      query PoeCharacters($userId: String!) {
        poeCharacters(userId: $userId) {
          id
          userId
          createdAtTimestamp
          lastSnapshotTimestamp
          name
        }
      }
    `,
    {
      skip: !userId,
      variables: { userId: userId },
      onCompleted(data) {
        setPoeCharacters(data.poeCharacters);
      },
    }
  );

  const [takeSnapshot] = useMutation(
    gql`
      mutation TakeCharacterSnapshot {
        refreshPoeCharacters
      }
    `,
    {
      onCompleted(data, clientOptions) {
        refetchPoeCharacters();
      },
    }
  );

  return (
    <>
      <StyledCard title="Characters">
        <div className="flex flex-col space-y-4">
          <div>
            This is very beta, there are many things that need to be
            added/improved feel free to try it out though. Snapshots will likely
            be cleared out a few times before it is fully released.
          </div>
          <div>
            {poeCharacters?.map((character) => (
              <>
                <div>
                  <Link href={`/poe/characters/${userId}/${character.id}`}>
                    {character.name}
                  </Link>
                </div>
              </>
            ))}
          </div>
          <StyledButton
            text={"Refresh"}
            onClick={() => {
              takeSnapshot();
            }}
          />
        </div>
      </StyledCard>
    </>
  );
}
