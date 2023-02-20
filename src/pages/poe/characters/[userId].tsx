import React, { useReducer } from "react";
import { gql, TypedDocumentNode, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import {
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
  query Query($search: CharacterSnapshotSearch!) {
    characterSnapshotsSearch(search: $search) {
      snapshots {
        name
        level
        characterClass
        mainSkillKey
        characterId
        snapshotId
        league
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

  const isCurrentUser = !!(profile?.userId && profile.userId === userId);

  const [characters, setCharacters] = useReducer(
    (state: CharactersByUser, action: CharactersByUserActions) => {
      if (action.type === "characters") {
        state = action.characters.map((char) => ({
          ...char,
          level: 0,
          characterClass: "",
          mainSkillKey: "",
          characterId: "",
          league: "",
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
        <div className="flex flex-col space-x-2 space-y-2">
          <StyledCard title="Characters" className="flex-1">
            <div className="flex flex-col space-y-10">
              <CharactersByUserTable
                characters={characters}
                columns={columns}
                columnDirections={columnsSortMap}
                onSortChange={updateSortMap}
              />
            </div>
            {isCurrentUser ? (
              <StyledButton
                text={"Refresh"}
                onClick={() => {
                  takeSnapshot();
                }}
              />
            ) : (
              <></>
            )}
          </StyledCard>

          <StyledCard title="Atlas Passives">
            <AtlasPassivesTree version={"3.20"}/>
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
    <StyledCard title="Characters" className="flex-1">
      <table>
        <SortableTableHeader
          columns={columns}
          columnDirections={columnDirections}
          onSortChange={onSortChange}
        />
        <tbody className="">
          {characters.map((snapshot) => (
            <tr
              className="hover:bg-skin-primary border-y-2 border-slate-700/50"
              key={snapshot.id}
            >
              <td>
                <Link
                  href={`/poe/character/${snapshot.characterId}?snapshotId=${snapshot.snapshotId}`}
                  className="hover:text-skin-accent hover:underline pl-3"
                >
                  {snapshot?.name}
                </Link>
              </td>
              <td>
                <ul className="flex flex-row space-x-2 justify-left items-center">
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
              <td>
                {snapshot.league ? (
                  <div className="text-left">{snapshot.league}</div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledCard>
  );
}
