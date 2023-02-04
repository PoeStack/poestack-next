import { gql, useMutation, useQuery } from "@apollo/client";

import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/router";
import StyledCard from "../../../components/styled-card";
import { CharacterSnapshotSearchResponse } from "../../../__generated__/resolvers-types";

export default function Characters() {
  const router = useRouter();

  const [searchResponse, setSearchResponse] = useState<
    CharacterSnapshotSearchResponse | undefined | null
  >(null);
  useQuery(
    gql`
      query Snapshots($search: CharacterSnapshotSearch!) {
        characterSnapshotsSearch(search: $search) {
          snapshots {
            characterId
            timestamp
            characterClass
            level
            poeCharacter {
              name
            }
          }
          hasMore
        }
      }
    `,
    {
      variables: { search: {} },
      onCompleted(data) {
        setSearchResponse(data.characterSnapshotsSearch);
      },
    }
  );

  if (!searchResponse) {
    return <>Loading...</>;
  }

  return (
    <>
      <StyledCard title="Characters">
        <table>
          <thead>
            <th>Name</th>
            <th>Ascendancy</th>
            <th>Level</th>
          </thead>
          <tbody>
            {searchResponse.snapshots.map((snapshot) => (
              <>
                <tr>
                  <td>
                    <Link href={`/poe/character/${snapshot.characterId}`}>
                      {snapshot.poeCharacter?.name}
                    </Link>
                  </td>
                  <td>{snapshot.characterClass}</td>
                  <td>{snapshot.level}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </StyledCard>
    </>
  );
}
