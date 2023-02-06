import { gql, useMutation, useQuery } from "@apollo/client";

import Link from "next/link";
import { PoeCharacter } from "../../../../__generated__/resolvers-types";
import { useState } from "react";
import { useRouter } from "next/router";
import StyledCard from "../../../../components/styled-card";
import StyledButton from "../../../../components/styled-button";
import { usePoeLeagueCtx } from "../../../../contexts/league-context";

export default function Characters() {
  const router = useRouter();
  const { userId } = router.query;

  const { league, setLeague } = usePoeLeagueCtx();

  const [poeCharacters, setPoeCharacters] = useState<PoeCharacter[]>([]);

  const { refetch: refetchPoeCharacters } = useQuery(
    gql`
      query PoeCharacters($league: String!, $userId: String!) {
        poeCharacters(league: $league, userId: $userId) {
          id
          userId
          name
          createdAtTimestamp
          lastSnapshotTimestamp
        }
      }
    `,
    {
      skip: !userId || !league,
      variables: { userId: userId, league: league },
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
      <div className="flex flex-row space-x-2">
        <StyledCard title="Characters">
          <div className="flex flex-col space-y-4">
            <div>
              This is very beta, there are many things that need to be
              added/improved feel free to try it out though. Snapshots will
              likely be cleared out a few times before it is fully released.
            </div>
            <div>
              {poeCharacters?.map((character) => (
                <>
                  <div>
                    <Link href={`/poe/character/${character.id}`}>
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
      </div>
    </>
  );
}
