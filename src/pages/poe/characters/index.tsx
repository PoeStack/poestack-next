import { gql, useMutation, useQuery } from "@apollo/client";

import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/router";
import StyledCard from "../../../components/styled-card";
import {
  CharacterSnapshotSearchResponse,
  CharacterSnapshotSearchAggregationsResponse,
} from "../../../__generated__/resolvers-types";
import { usePoeLeagueCtx } from "../../../contexts/league-context";
import CharacterAggreationDisplay from "../../../components/character-aggregation-display";

export default function Characters() {
  const router = useRouter();

  const { league, setLeague } = usePoeLeagueCtx();

  const [searchResponse, setSearchResponse] = useState<
    CharacterSnapshotSearchResponse | undefined | null
  >(null);

  const [aggregationSearchResponse, setAggregationSearchResponse] = useState<
    CharacterSnapshotSearchAggregationsResponse | undefined | null
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
        characterSnapshotsSearchAggregations(search: $search) {
          characterClassAggregation {
            values {
              key
              value
            }
          }
          keystoneAggregation {
            values {
              key
              value
            }
          }
          mainSkillAggreagtion {
            values {
              value
              key
            }
          }
        }
      }
    `,
    {
      variables: { search: { league: league } },
      onCompleted(data) {
        setSearchResponse(data.characterSnapshotsSearch);
        setAggregationSearchResponse(data.characterSnapshotsSearchAggregations);
      },
    }
  );

  if (!searchResponse) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="flex flex-row space-x-2">
        <div className="flex flex-col space-y-2 w-1/6">
          <StyledCard title="Skills">
            <CharacterAggreationDisplay
              aggregation={aggregationSearchResponse?.mainSkillAggreagtion}
            />
          </StyledCard>
          <StyledCard title="Class">
            <CharacterAggreationDisplay
              aggregation={aggregationSearchResponse?.characterClassAggregation}
            />
          </StyledCard>
          <StyledCard title="Keystones">
            <CharacterAggreationDisplay
              aggregation={aggregationSearchResponse?.keystoneAggregation}
            />
          </StyledCard>
        </div>
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
      </div>
    </>
  );
}
