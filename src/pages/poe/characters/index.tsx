import { gql, useMutation, useQuery } from "@apollo/client";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StyledCard from "../../../components/styled-card";
import {
  CharacterSnapshotSearchResponse,
  CharacterSnapshotSearchAggregationsResponse,
} from "../../../__generated__/resolvers-types";
import { usePoeLeagueCtx } from "../../../contexts/league-context";
import CharacterAggregationDisplay from "../../../components/character-aggregation-display";
import StyledInput from "../../../components/styled-input";
import {
  CharacterSnapshotSearch,
  CharacterSnapshotUniqueAggregationKeysResponse,
} from "../../../__generated__/resolvers-types";
import { GeneralUtils } from "../../../utils/general-util";
import {
  StyledSkillImageTooltip,
  StyledTooltip,
} from "../../../components/styled-tooltip";

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
    includedItemKeys: [],
    excludedItemKeys: [],
  });

  const [localSearchString, setLocalSearchString] = useState<string>("");

  const [unqiueKeysResponse, setUnqiueKeysResponse] = useState<
    CharacterSnapshotUniqueAggregationKeysResponse | null | undefined
  >(null);

  const [searchResponse, setSearchResponse] = useState<
    CharacterSnapshotSearchResponse | undefined | null
  >(null);
  const [aggregationSearchResponse, setAggregationSearchResponse] = useState<
    CharacterSnapshotSearchAggregationsResponse | undefined | null
  >(null);
  const { refetch: reftechGeneralSearch } = useQuery(
    gql`
      query Snapshots($search: CharacterSnapshotSearch!) {
        characterSnapshotsSearch(search: $search) {
          snapshots {
            characterId
            name
            level
            mainSkillKey
            characterClass
            energyShield
            life
          }
          hasMore
        }
        characterSnapshotsSearchAggregations(search: $search) {
          totalMatches
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
      variables: { search: { ...search, ...{ league: league } } },
      onCompleted(data) {
        setSearchResponse({
          ...searchResponse,
          ...data.characterSnapshotsSearch,
        });
        setAggregationSearchResponse({
          ...aggregationSearchResponse,
          ...data.characterSnapshotsSearchAggregations,
        });
      },
    }
  );

  const { refetch: reftechItemSearch } = useQuery(
    gql`
      query Snapshots($search: CharacterSnapshotSearch!) {
        characterSnapshotsSearchAggregations(search: $search) {
          itemKeyAggreagtion {
            values {
              value
              key
            }
          }
        }
      }
    `,
    {
      variables: { search: { ...search, ...{ league: league } } },
      onCompleted(data) {
        setAggregationSearchResponse({
          ...aggregationSearchResponse,
          ...data.characterSnapshotsSearchAggregations,
        });
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
          itemKeys
        }
      }
    `,
    {
      variables: { league: league },
      onCompleted(data) {
        setUnqiueKeysResponse(data.characterSnapshotsUniqueAggregationKeys);
      },
    }
  );

  useEffect(() => {
    reftechGeneralSearch();
    reftechItemSearch();
  }, [search, reftechGeneralSearch, reftechItemSearch, league]);

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
      <div className="flex flex-row space-x-2 ">
        <div className="flex flex-col space-y-2 w-1/6 lg:w-1/5">
          <StyledCard title={"Search"}>
            <StyledInput
              value={localSearchString}
              onChange={(e) => {
                setLocalSearchString(e);
              }}
              placeholder="Search Filters..."
            />
          </StyledCard>
          <StyledCard title="Skills" className="h-[400px]">
            <CharacterAggregationDisplay
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
              totalMatches={aggregationSearchResponse?.totalMatches ?? 0}
              localSearchString={localSearchString}
            />
          </StyledCard>
          <StyledCard title="Class" className="h-[400px]">
            <CharacterAggregationDisplay
              aggregation={aggregationSearchResponse?.characterClassAggregation}
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
              totalMatches={aggregationSearchResponse?.totalMatches ?? 0}
              localSearchString={localSearchString}
            />
          </StyledCard>
          <StyledCard title="Items" className="h-[400px]">
            <CharacterAggregationDisplay
              aggregation={aggregationSearchResponse?.itemKeyAggreagtion}
              onSelectionChanged={(item) => {
                updateIncludeExclude(
                  item,
                  "includedItemKeys",
                  "excludedItemKeys"
                );
              }}
              includedRows={search.includedItemKeys!}
              excludedRows={search.excludedItemKeys!}
              allKeys={unqiueKeysResponse?.itemKeys ?? []}
              totalMatches={aggregationSearchResponse?.totalMatches ?? 0}
              localSearchString={localSearchString}
            />
          </StyledCard>
          <StyledCard title="Keystones" className="h-[400px]">
            <CharacterAggregationDisplay
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
              totalMatches={aggregationSearchResponse?.totalMatches ?? 0}
              localSearchString={localSearchString}
            />
          </StyledCard>
        </div>
        <StyledCard title="Characters" className="flex-1">
          <table>
            {/* Setup for adding click sort like PoeNinja */}
            <thead className="text-left">
              <tr>
                <th className="pl-2">Name</th>
                <th className="pl-2">Level</th>
                <th className="pl-2">Skill</th>
                <th className="pl-2">Life</th>
                <th className="pl-2">Es</th>
              </tr>
            </thead>
            <tbody className="">
              {searchResponse.snapshots.map((snapshot) => (
                <>
                  <tr className="hover:bg-skin-primary border-y-2 border-slate-700/50">
                    <td>
                      <Link
                        href={`/poe/character/${snapshot.characterId}`}
                        className="hover:text-skin-accent hover:underline pl-3"
                      >
                        {snapshot?.name}
                      </Link>
                    </td>
                    <td>
                      <ul className="flex flex-row space-x-3 justify-left">
                        <li className="text-center list-none w-1/5">
                          {snapshot.level}
                        </li>
                        <li className="list-none">
                          <StyledTooltip
                            texts={[`${snapshot.characterClass}`]}
                            placement="right"
                            className="bg-slate-800"
                          >
                            <Image
                              src={`/assets/poe/classes/${snapshot.characterClass}.png`}
                              alt={snapshot.characterClass}
                              width={39}
                              height={30}
                            />
                          </StyledTooltip>
                        </li>
                      </ul>
                    </td>

                    <td>
                      {snapshot.mainSkillKey ? (
                        <li className="list-none">
                          <StyledSkillImageTooltip
                            texts={[`${snapshot.mainSkillKey}`]}
                            placement="left"
                            title="Skills"
                            imageString={snapshot.mainSkillKey}
                            className="bg-slate-800"
                          >
                            <Image
                              src={`/assets/poe/skill_icons/${snapshot.mainSkillKey}.png`}
                              alt=""
                              width={39}
                              height={30}
                            />
                          </StyledSkillImageTooltip>
                        </li>
                      ) : null}
                    </td>

                    <td className="font-semibold text-red-600">
                      {snapshot.life}
                    </td>
                    <td className="font-semibold text-teal-300">
                      {snapshot.energyShield}
                    </td>
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
