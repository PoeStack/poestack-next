import { gql, useMutation, useQuery } from "@apollo/client";

import Link from "next/link";
import { PoeCharacter } from "@generated/graphql";
import { useState } from "react";
import { useRouter } from "next/router";
import StyledCard from "@components/styled-card";
import StyledButton from "@components/styled-button";
import _ from "lodash";

export default function Characters() {
  const router = useRouter();
  const { userId } = router.query;

  const [poeCharacters, setPoeCharacters] = useState<PoeCharacter[]>([]);

  const { refetch: refetchPoeCharacters } = useQuery(
    gql`
      query CharactersPoeCharacters($userId: String!) {
        poeCharacters(userId: $userId) {
          id
          userId
          name
          lastLeague
          createdAtTimestamp
          lastSnapshotTimestamp
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
      mutation RefreshPoeCharacters {
        refreshPoeCharacters
      }
    `,
    {
      onCompleted(data, clientOptions) {
        refetchPoeCharacters();
      },
    }
  );

  const characterGroups = _.groupBy(poeCharacters, (e) => e.lastLeague);

  return (
    <>
      <div className="flex flex-row space-x-2">
        <StyledCard title="Characters" className="flex-1">
          <div className="flex flex-col space-y-10">
            {Object.entries(characterGroups)?.map(([league, characters]) => (
              <>
                <div>
                  <h3>{league}</h3>
                  {characters.map((character) => (
                    <>
                      <div>
                        <Link href={`/poe/character/${character.id}`}>
                          {character.name}
                        </Link>
                      </div>
                    </>
                  ))}
                </div>
              </>
            ))}
          </div>
          <div className="w-2/5 h-10 flex flex-row justify-center mx-auto">
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
