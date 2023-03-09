import React, { useReducer, useState } from "react";
import { gql, TypedDocumentNode, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import {
  AtlasPassiveSnapshotResponse,
  CharacterSnapshotSearchResponseEntry,
  PoeCharacter,
} from "@generated/graphql";
import { useRouter } from "next/router";
import StyledCard from "@components/styled-card";
import StyledButton from "@components/styled-button";
import _ from "lodash";
import LoadingIndicator from "@components/loading-indicator";
import SortableTableHeader, {
  SortableTableColumns,
  SortableTableHeaderProps,
} from "@components/sortable-table-header";
import {
  StyledTooltip,
  StyledSkillImageTooltip,
} from "@components/styled-tooltip";
import useSortableTable from "@hooks/use-sort-th-hook";
import { usePoeStackAuth } from "@contexts/user-context";
import AtlasPassivesTree from "@components/trees/atlas-passives-tree";
import { usePoeLeagueCtx } from "@contexts/league-context";
import LeagueSelect from "../../../components/league-select";
import { chart } from "highcharts";
import { DIV_ICON } from "@components/currency-value-display";

const getCharactersForUser: TypedDocumentNode<{
  poeCharacters: CharactersFragment[];
}> = gql`
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
`;

const getCharacterSnapshots: TypedDocumentNode<{
  characterSnapshotsSearch: { snapshots: CharactersSnapshotsFragment[] };
}> = gql`
  query PullCharacterSnapshotsQuery($search: CharacterSnapshotSearch!) {
    characterSnapshotsSearch(search: $search) {
      snapshots {
        name
        level
        characterClass
        mainSkillKey
        characterId
        snapshotId
        league
        totalValueDivine
      }
    }
  }
`;

/**
 * Columns used by the characters table.
 */
const columns: SortableTableColumns = [
  {
    key: "name",
    text: "Name",
  },
  {
    key: "level",
    text: "Level",
  },
  {
    key: "mainSkillKey",
    text: "Skill",
  },
  {
    key: "league",
    text: "League",
  },
  {
    key: "totalValueDivine",
    text: "Base Cost",
  },
];

/**
 * Response shape of each character entry
 */
type CharactersFragment = Pick<
  PoeCharacter,
  | "id"
  | "userId"
  | "name"
  | "lastLeague"
  | "createdAtTimestamp"
  | "lastSnapshotTimestamp"
>;

/**
 * Response shape of each snapshot entry
 */
type CharactersSnapshotsFragment = Pick<
  CharacterSnapshotSearchResponseEntry,
  | "name"
  | "level"
  | "characterClass"
  | "mainSkillKey"
  | "characterId"
  | "snapshotId"
  | "totalValueDivine"
> & { league: string };

/**
 * Model used for joining a {@link CharactersFragment} and a {@link CharactersSnapshotsFragment}
 */
type CharacterByUser = CharactersFragment & CharactersSnapshotsFragment;

/**
 * Model used to represent the entire set of joins of {@link CharacterByUser}
 */
type CharactersByUser = Array<CharacterByUser>;

/**
 * Action to set the {@link CharactersFragment} entries of the entire data set.
 */
type SetCharactersByUser = {
  type: "characters";
  characters: Array<CharactersFragment>;
};

/**
 * Action to set the {@link CharactersSnapshotsFragment} entries of the entire data set.
 */
type SetSnapshots = {
  type: "snapshots";
  snapshots: Array<CharactersSnapshotsFragment>;
};

/**
 * The valid actions for the data set reducer.
 */
type CharactersByUserActions = SetCharactersByUser | SetSnapshots;

/**
 * Route for all characters of a specific user.
 */
export default function CharactersByUser() {
  const router = useRouter();
  const { userId } = router.query;

  const { profile } = usePoeStackAuth();

  const { league } = usePoeLeagueCtx();

  const isCurrentUser = !!(profile?.userId && profile.userId === userId);

  const [characters, setCharacters] = useReducer(
    (state: CharactersByUser, action: CharactersByUserActions) => {
      if (action.type === "characters") {
        state = action.characters.map((char) => ({
          ...char,
          level: 0,
          characterClass: "",
          mainSkillKey: "",
          league: "",
          characterId: char.id,
        }));
      } else if (action.type === "snapshots") {
        /*
         * This is just a naive search through the snapshots for each character.
         * If there are issues this could be a good spot for performance improvements.
         */
        state = state.map((char) => {
          const charSnapshot = action.snapshots.find(
            (snapshot) => snapshot.characterId === char.id
          );
          if (charSnapshot) {
            return {
              ...char,
              ...charSnapshot,
            };
          } else {
            return char;
          }
        });
      }
      return state;
    },
    []
  );

  const { refetch: refetchPoeCharacters, loading: loadingCharactersById } =
    useQuery(getCharactersForUser, {
      skip: !userId,
      variables: { userId: userId },
      onCompleted(data) {
        setCharacters({ type: "characters", characters: data.poeCharacters });
      },
    });

  const [userAtlasPassiveResponse, setUserAtlasPassiveResponse] =
    useState<AtlasPassiveSnapshotResponse | null>(null);
  useQuery(
    gql`
      query AtlasPassiveSnapshotsByUser($userId: String!) {
        atlasPassiveSnapshotsByUser(userId: $userId) {
          results {
            league
            userId
            systemSnapshotTimestamp
            createdAtTimestamp
            hashes
            source
          }
        }
      }
    `,
    {
      skip: !userId,
      variables: { userId: userId },
      onCompleted(data) {
        setUserAtlasPassiveResponse(data.atlasPassiveSnapshotsByUser);
      },
    }
  );

  const { refetch: refetchCharSnapshots, loading: loadingCharSnapshots } =
    useQuery(getCharacterSnapshots, {
      variables: {
        search: {
          includedCharacterIds: characters.map((c) => c.id),
        },
      },
      onCompleted(response) {
        setCharacters({
          type: "snapshots",
          snapshots: response.characterSnapshotsSearch.snapshots,
        });
      },
    });

  const [takeSnapshot] = useMutation(
    gql`
      mutation RefreshPoeCharacters {
        refreshPoeCharacters
      }
    `,
    {
      onCompleted(data, clientOptions) {
        refetchPoeCharacters({ userId: userId });
        refetchCharSnapshots({
          search: { includedCharacterIds: characters.map((c) => c.id) },
        });
      },
    }
  );

  const [columnsSortMap, updateSortMap] = useSortableTable(
    columns,
    (key, dir) => {
      /* handling sorting here */
    }
  );

  return (
    <>
      {loadingCharactersById && loadingCharSnapshots ? (
        <LoadingIndicator />
      ) : (
        <div className="flex flex-col my-4 space-x-2 space-y-2 md:mx-4 lg:mx-20">
          <StyledCard title="Characters" className="flex-1 ">
            <div className="flex flex-col space-y-10 ">
              <CharactersByUserTable
                characters={characters}
                columns={columns}
                columnDirections={columnsSortMap}
                onSortChange={updateSortMap}
              />
            </div>
            {isCurrentUser ? (
              <div className=" flex justify-center  w-full">
                <div className="relative group">
                  <div className="absolute inset-0 bg-slate-500 mb-2 mt-2 rounded-lg group-hover:blur-sm w-32 "></div>
                  <button
                    className="relative mb-2 mt-2"
                    onClick={() => {
                      takeSnapshot();
                    }}
                  >
                    <a className="flex flex-row rounded-md  w-32 px-3.5 py-1.5 text-base items-center justify-center font-semibold leading-7 text-content-base shadow-sm bg-surface-secondary hover:text-content-accent ">
                      <h4>Refresh</h4>
                    </a>
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </StyledCard>

          <StyledCard title="Atlas Passives">
            <div className="flex flex-col space-y-2 mx-40 bg-surface-primary-variant">
              <LeagueSelect />
              <AtlasPassivesTree
                version={"3.20"}
                selectedNodes={
                  userAtlasPassiveResponse?.results?.find(
                    (e) => e.league === league
                  )?.hashes
                }
              />
            </div>
          </StyledCard>
        </div>
      )}
    </>
  );
}

/**
 * Props for {@link CharactersByUserTable}
 */
type StyledCharactersSummaryTableProps = {
  characters: CharactersByUser;
} & SortableTableHeaderProps;

/**
 * Table of a brief summary of characters on the {@link CharactersByUser} page.
 */
function CharactersByUserTable({
  characters,
  columns,
  columnDirections,
  onSortChange,
}: StyledCharactersSummaryTableProps) {
  return (
    <div className="flex w-full h-full">
      <StyledCard>
        <table className="">
          <SortableTableHeader
            columns={columns}
            columnDirections={columnDirections}
            onSortChange={onSortChange}
          />

          <tbody className="">
            {characters.map((snapshot) => (
              <tr
                className="hover:bg-skin-primary border-y-2 border-slate-700/50 h-12"
                key={snapshot.id}
              >
                <td>
                  <Link
                    href={`/poe/character/${snapshot.characterId}${
                      snapshot.snapshotId
                        ? `?snapshotId=${snapshot.snapshotId}`
                        : ""
                    }`}
                    className="pl-3 lg:pl-10 hover:text-skin-accent hover:underline"
                  >
                    {snapshot?.name}
                  </Link>
                </td>
                <td>
                  <ul className="flex flex-row items-center justify-center space-x-2">
                    {snapshot.level > 0 && (
                      <>
                        <div className="text-center">{snapshot.level}</div>
                        <div>
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
                        </div>
                      </>
                    )}
                  </ul>
                </td>

                <td className="relative flex justify-center h-full ">
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
                          src={`/assets/poe/skill_icons/${encodeURIComponent(
                            snapshot.mainSkillKey
                          )}.png`}
                          alt=""
                          width={39}
                          height={30}
                        />
                      </StyledSkillImageTooltip>
                    </li>
                  ) : null}
                </td>
                <td className="">
                  {snapshot.league ? (
                    <div className="flex flex-row justify-center">
                      {snapshot.league}
                    </div>
                  ) : null}
                </td>
                <td className="flex justify-center items-center ">
                  {snapshot.totalValueDivine ? (
                    <div className="grid grid-cols-2 my-auto">
                      <div>{+snapshot.totalValueDivine.toFixed(1)}</div>
                      <div>
                        <Image src={DIV_ICON} alt={""} width={30} height={30} />
                      </div>
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledCard>
    </div>
  );
}
