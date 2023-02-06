import { gql, useMutation, useQuery } from "@apollo/client";

import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StyledCard from "../../../components/styled-card";
import {
  CharacterSnapshotSearchResponse,
  CharacterSnapshotSearchAggregationsResponse,
} from "../../../__generated__/resolvers-types";
import { usePoeLeagueCtx } from "../../../contexts/league-context";
import CharacterAggreationDisplay from "../../../components/character-aggregation-display";
import {
  CharacterSnapshotSearch,
  CharacterSnapshotUniqueAggregationKeysResponse,
} from "../../../__generated__/resolvers-types";

export default function Characters() {
  const router = useRouter();

  const { league } = usePoeLeagueCtx();

  const [search, setSearch] = useState<CharacterSnapshotSearch>({
    league: league,
    includedKeyStoneNames: [],
    excludedKeyStoneNames: [],
    includedCharacterClasses: [],
    excludedCharacterClasses: [],
    includedMainSkills: [],
    excludedMainSkills: [],
  });

  const [unqiueKeysResponse, setUnqiueKeysResponse] = useState<
    CharacterSnapshotUniqueAggregationKeysResponse | null | undefined
  >(null);

  const [searchResponse, setSearchResponse] = useState<
    CharacterSnapshotSearchResponse | undefined | null
  >(null);
  const [aggregationSearchResponse, setAggregationSearchResponse] = useState<
    CharacterSnapshotSearchAggregationsResponse | undefined | null
  >(null);
  const { refetch: reftechSearch } = useQuery(
    gql`
      query Snapshots($search: CharacterSnapshotSearch!) {
        characterSnapshotsSearch(search: $search) {
          snapshots {
            characterId
            name
            level
            characterClass
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
      variables: { search: search },
      onCompleted(data) {
        setSearchResponse(data.characterSnapshotsSearch);
        setAggregationSearchResponse(data.characterSnapshotsSearchAggregations);
      },
    }
  );

  useQuery(
    gql`
      query CharacterSnapshotsUniqueAggregationKeys($league: String!) {
        characterSnapshotsUniqueAggregationKeys(league: $league) {
          characterClassKeys
          keystoneKeys
          mainSkillKeys
        }
      }
    `,
    {
      variables: { league: "Sanctum" },
      onCompleted(data) {
        setUnqiueKeysResponse(data.characterSnapshotsUniqueAggregationKeys);
      },
    }
  );

  useEffect(() => {
    console.log("search", search);
    reftechSearch();
  }, [search, reftechSearch]);

  const updateIncludeExclude = (entry, includedKey, excludedKey) => {
    if (search[includedKey]?.includes(entry.key)) {
      setSearch({
        ...search,
        ...{
          [excludedKey]: [...search[excludedKey]!, entry.key],
          [includedKey]: search[includedKey]!.filter((e) => e !== entry.key),
        },
      });
    } else if (search[excludedKey]?.includes(entry.key)) {
      setSearch({
        ...search,
        ...{
          [excludedKey]: search[excludedKey]!.filter((e) => e !== entry.key),
        },
      });
    } else {
      setSearch({
        ...search,
        ...{
          [includedKey]: [...search[includedKey]!, entry.key],
        },
      });
    }
  };

  if (!searchResponse) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="flex flex-row space-x-2">
        <div className="flex flex-col space-y-2 w-1/6">
          <StyledCard title="Skills" className="h-[400px]">
            <div className="overflow-y-auto pr-3">
              <CharacterAggreationDisplay
                aggregation={aggregationSearchResponse?.mainSkillAggreagtion}
                onSelectionChanged={(mainSkill) => {
                  updateIncludeExclude(
                    mainSkill,
                    "includedMainSkills",
                    "excludedMainSkills"
                  );
                }}
                includedRows={search.includedMainSkills!}
                excludedRows={search.excludedMainSkills!}
                allKeys={unqiueKeysResponse?.mainSkillKeys ?? []}
              />
            </div>
          </StyledCard>
          <StyledCard title="Class" className="h-[400px]">
            <div className="overflow-y-auto pr-3">
              <CharacterAggreationDisplay
                aggregation={
                  aggregationSearchResponse?.characterClassAggregation
                }
                onSelectionChanged={(characterClass) => {
                  updateIncludeExclude(
                    characterClass,
                    "includedCharacterClasses",
                    "excludedCharacterClasses"
                  );
                }}
                includedRows={search.includedCharacterClasses!}
                excludedRows={search.excludedCharacterClasses!}
                allKeys={unqiueKeysResponse?.characterClassKeys ?? []}
              />
            </div>
          </StyledCard>
          <StyledCard title="Keystones" className="h-[400px]">
            <div className="overflow-y-auto pr-3">
              <CharacterAggreationDisplay
                aggregation={aggregationSearchResponse?.keystoneAggregation}
                onSelectionChanged={(keyStone) => {
                  updateIncludeExclude(
                    keyStone,
                    "includedKeyStoneNames",
                    "excludedKeyStoneNames"
                  );
                }}
                includedRows={search.includedKeyStoneNames!}
                excludedRows={search.excludedKeyStoneNames!}
                allKeys={unqiueKeysResponse?.keystoneKeys ?? []}
              />
            </div>
          </StyledCard>
        </div>
        <StyledCard title="Characters" className="flex-1">
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
                        {snapshot?.name}
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
