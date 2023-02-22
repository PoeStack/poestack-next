import { useState, useEffect, Dispatch } from "react";
import { gql, useQuery } from "@apollo/client";
import client from "poe-stack-apollo-client";
import { Maybe } from "graphql/jsutils/Maybe";
import Link from "next/link";
import Image from "next/image";
import { usePoeLeagueCtx } from "@contexts/league-context";
import CharacterAggregationDisplay from "@components/character-aggregation-display";
import StyledCard from "@components/styled-card";
import StyledDatepicker from "@components/styled-datepicker";
import StyledInput from "@components/styled-input";
import {
  StyledTooltip,
  StyledSkillImageTooltip,
} from "@components/styled-tooltip";
import SortableTableHeader, {
  SortableTableHeaderProps,
  SortableTableColumns,
} from "@components/sortable-table-header";
import useSortableTable from "@hooks/use-sort-th-hook";
import { GeneralUtils } from "@utils/general-util";
import {
  CharacterSnapshotSearch,
  CharacterSnapshotSearchResponse,
  CharacterSnapshotSearchAggregationsResponse,
  GenericAggregation,
} from "@generated/graphql";
import { useRouter } from "next/router";
import { usePoeStackAuth } from "@contexts/user-context";
import { DIV_ICON } from "@components/currency-value-display";
import LeagueSelect from "@components/league-select";

const generalSearch = gql`
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
        snapshotId
        twitchProfileName
        pobDps
        totalValueDivine
        topItems
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
      itemKeyAggreagtion {
        values {
          value
          key
        }
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
    key: "life",
    text: "Life",
  },
  {
    key: "energyShield",
    text: "Es",
  },
  {
    key: "",
    text: "Top Uniques",
  },
  {
    key: "totalValueDivine",
    text: "Base Cost",
  },
  {
    key: "pobDps",
    text: "Dps",
  },
];

/**
 * Characters page
 */
export default function Characters({
  initialSearchResponse,
  unqiueKeysResponse,
}) {
  const router = useRouter();
  const { customLadderGroupId } = router.query;

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
    customLadderGroupId: customLadderGroupId?.toString(),
    skip: 0,
    limit: 100,
    sortKey: "level",
    sortDirection: "desc",
  });

  const [localSearchString, setLocalSearchString] = useState<string>("");

  const [characters, setCharacters] = useState<
    CharacterSnapshotSearchResponse | undefined | null
  >(initialSearchResponse?.characterSnapshotsSearch);

  const [aggregations, setAggregations] = useState<
    CharacterSnapshotSearchAggregationsResponse | undefined | null
  >(initialSearchResponse?.characterSnapshotsSearchAggregations);

  const { refetch: reftechGeneralSearch } = useQuery(generalSearch, {
    skip: true,
    fetchPolicy: "cache-first",
    variables: { search: search },
    onCompleted(data) {
      setCharacters({
        ...characters,
        ...data.characterSnapshotsSearch,
      });
      setAggregations({
        ...aggregations,
        ...data.characterSnapshotsSearchAggregations,
      });
    },
  });

  useEffect(() => {
    if (league !== search.league) {
      setSearch({ ...search, league: league });
    } else {
      reftechGeneralSearch();
    }
  }, [search, reftechGeneralSearch, league]);

  const [columnsSortMap, updateSortMap] = useSortableTable(
    columns,
    (key, dir) => {
      setSearch((p) => ({
        ...p,
        sortKey: key ?? "level",
        sortDirection: dir,
      }));
    }
  );

  if (!characters) {
    return <>Loading...</>;
  }

  /*
   * Define callbacks as functions instead of consts
   * to skip revaluation on every component view update.
   */

  function updateIncludeExclude(
    search: CharacterSnapshotSearch,
    setSearch: Dispatch<any>,
    entry: { key: string; value: any },
    includedKey: string,
    excludedKey: string
  ): void {
    if (search[includedKey]?.includes(entry.key)) {
      setSearch({
        ...search,
        ...{
          [excludedKey]: [...search[excludedKey]!, entry.key],
          [includedKey]: search[includedKey]!.filter(
            (e: string) => e !== entry.key
          ),
        },
      });
    } else if (search[excludedKey]?.includes(entry.key)) {
      setSearch({
        ...search,
        ...{
          [excludedKey]: search[excludedKey]!.filter(
            (e: string) => e !== entry.key
          ),
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
  }

  function onSkillChange(mainSkill: { key: string; value: any }) {
    updateIncludeExclude(
      search,
      setSearch,
      mainSkill,
      "includedMainSkills",
      "excludedMainSkills"
    );
  }

  function onClassChange(characterClass: { key: string; value: any }) {
    updateIncludeExclude(
      search,
      setSearch,
      characterClass,
      "includedCharacterClasses",
      "excludedCharacterClasses"
    );
  }

  function onItemChange(item: { key: string; value: any }) {
    updateIncludeExclude(
      search,
      setSearch,
      item,
      "includedItemKeys",
      "excludedItemKeys"
    );
  }

  function onKeystoneChange(keyStone: { key: string; value: any }) {
    updateIncludeExclude(
      search,
      setSearch,
      keyStone,
      "includedKeyStoneNames",
      "excludedKeyStoneNames"
    );
  }

  function onSearchValueChange(e) {
    setLocalSearchString(e);
  }

  function onDateChange(d) {
    setSearch({
      ...search,
      ...{ timestampEndInclusive: d.toISOString() },
    });
  }

  /**
   * Change the sorting behavior of the characters table.
   * @param column The name of the column to change sorting direction on.
   */
  function onCharactersSortChange(column: string) {
    updateSortMap(column);
  }

  /*
   * These models are used to create the individual
   * aggregation panels
   */

  const aggregatorPanels: Array<StyledAggregatorPanelModel> = [
    {
      title: "Skills",
      aggregation: aggregations?.mainSkillAggreagtion,
      onSelectionChanged: onSkillChange,
      includedRows: search.includedMainSkills!,
      excludedRows: search.excludedMainSkills!,
      keys: unqiueKeysResponse?.mainSkillKeys,
      matches: aggregations?.totalMatches,
      searchString: localSearchString,
    },
    {
      title: "Class",
      aggregation: aggregations?.characterClassAggregation,
      onSelectionChanged: onClassChange,
      includedRows: search.includedCharacterClasses!,
      excludedRows: search.excludedCharacterClasses!,
      keys: unqiueKeysResponse?.characterClassKeys,
      matches: aggregations?.totalMatches,
      searchString: localSearchString,
    },
    {
      title: "Items",
      aggregation: aggregations?.itemKeyAggreagtion,
      onSelectionChanged: onItemChange,
      includedRows: search.includedItemKeys!,
      excludedRows: search.excludedItemKeys!,
      keys: unqiueKeysResponse?.itemKeys,
      matches: aggregations?.totalMatches,
      searchString: localSearchString,
    },
    {
      title: "Keystones",
      aggregation: aggregations?.keystoneAggregation,
      onSelectionChanged: onKeystoneChange,
      includedRows: search.includedKeyStoneNames!,
      excludedRows: search.excludedKeyStoneNames!,
      keys: unqiueKeysResponse?.keystoneKeys,
      matches: aggregations?.totalMatches,
      searchString: localSearchString,
    },
  ];

  return (
    <div className="flex flex-row space-x-2 ">
      <div className="flex flex-col space-y-2 w-1/6 lg:w-1/5">
        <StyledMultiSearch
          totalMatches={aggregations?.totalMatches ?? 0}
          value={localSearchString}
          onValueChange={onSearchValueChange}
          onDateChange={onDateChange}
        />

        {aggregatorPanels.map((props) => (
          <StyledAggregatorPanel key={props.title} {...props} />
        ))}
      </div>

      <StyledCharactersSummaryTable
        characters={characters}
        columns={columns}
        columnDirections={columnsSortMap}
        onSortChange={onCharactersSortChange}
      />
    </div>
  );
}

/*
 * Sub components for the characters page
 */

/**
 * Props for {@link StyledCharactersSummaryTable}
 */
type StyledCharactersSummaryTableProps = {
  characters: CharacterSnapshotSearchResponse;
} & SortableTableHeaderProps;

/**
 * Table of a brief summary of characters on the {@link Characters} page.
 */
function StyledCharactersSummaryTable({
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
          {characters.snapshots.map((snapshot) => (
            <tr
              className="hover:bg-skin-primary border-y-2 border-slate-700/50"
              key={snapshot.characterId}
            >
              <td>
                <Link
                  href={`/poe/character/${snapshot.characterId}?snapshotId=${snapshot.snapshotId}`}
                  className="hover:text-content-accent hover:underline pl-3"
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
                  {snapshot.twitchProfileName ? (
                    <>
                      <Link
                        href={`https://twitch.tv/${snapshot.twitchProfileName}`}
                        legacyBehavior
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-content-accent"
                        >
                          <StyledTooltip
                            texts={[
                              GeneralUtils.capitalize(
                                snapshot.twitchProfileName
                              )!,
                            ]}
                            placement={"right"}
                          >
                            <Image
                              src={`/assets/common/twitch_logo.png`}
                              alt={"twitch"}
                              width={39}
                              height={39}
                            />
                          </StyledTooltip>
                        </a>
                      </Link>
                    </>
                  ) : null}
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

              <td className="font-semibold text-red-600">{snapshot.life}</td>
              <td className="font-semibold text-teal-300">
                {snapshot.energyShield}
              </td>
              <td className="font-semibold">
                {!!snapshot.topItems && (
                  <div className="flex flex-row">
                    {snapshot.topItems.map((e) => (
                      <>
                        <div>
                          <StyledTooltip texts={[e.name]} placement={"left"}>
                            <Image
                              src={e.icon}
                              alt={e.name}
                              width={25}
                              height={25}
                            />
                          </StyledTooltip>
                        </div>
                      </>
                    ))}
                  </div>
                )}
              </td>
              <td className="font-semibold">
                {!!snapshot.totalValueDivine && (
                  <div className="flex flex-row">
                    <div>{+snapshot.totalValueDivine.toFixed(1)}</div>
                    <Image src={DIV_ICON} alt={""} width={30} height={30} />
                  </div>
                )}
              </td>
              <td className="font-semibold">
                {!!snapshot.pobDps &&
                  GeneralUtils.compactNumberFormat(snapshot.pobDps)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledCard>
  );
}

/**
 * Props for {@link StyledMultiSearch}
 */
type StyledMultiSearchProps = {
  value: string;
  totalMatches: number;
  onValueChange: (e: any) => void;
  onDateChange: (e: any) => void;
};

/**
 * Styled search input for filtering aggregates on the {@link Characters} page
 */
function StyledMultiSearch({
  value,
  totalMatches,
  onValueChange,
  onDateChange,
}: StyledMultiSearchProps) {
  const { profile } = usePoeStackAuth();

  return (
    <StyledCard
      title={`Search - ${totalMatches} Characters`}
      className="focus:border-color-accent border-color-base"
    >
      <div className="flex flex-col space-y-2">
        <StyledInput
          value={value}
          onChange={onValueChange}
          placeholder="Search Filters..."
        />
        <StyledDatepicker onSelectionChange={onDateChange} />

        <LeagueSelect />

        {!!profile?.userId && (
          <Link href={`/poe/custom-ladders?userId=${profile?.userId}`}>
            Custom Ladders
          </Link>
        )}
      </div>
    </StyledCard>
  );
}

type StyledAggregatorPanelProps = {
  title: string;
  aggregation: GenericAggregation | undefined | null;
  onSelectionChanged: (e: { key: string; value: any }) => void;
  includedRows?: any[];
  excludedRows?: any[];
  keys: string[];
  matches?: Maybe<number>;
  searchString: string;
};

/**
 * A model of the {@link StyledAggregatorPanel} props to instantiate
 * with.
 */
export type StyledAggregatorPanelModel = StyledAggregatorPanelProps;

/**
 * Panel for  showing aggregate usage of
 * passed fields on the {@link Characters} page.
 */
function StyledAggregatorPanel({
  title,
  aggregation,
  onSelectionChanged,
  includedRows,
  excludedRows,
  keys,
  matches,
  searchString,
}: StyledAggregatorPanelProps) {
  keys = keys ? keys : [];
  matches = matches ? matches : 0;

  return (
    <StyledCard title={title} className="h-[400px]">
      <CharacterAggregationDisplay
        aggregation={aggregation}
        onSelectionChanged={onSelectionChanged}
        includedRows={includedRows}
        excludedRows={excludedRows}
        allKeys={keys}
        totalMatches={matches}
        localSearchString={searchString}
      />
    </StyledCard>
  );
}

/*
 * For ssr
 */

const uniqueKeysQuery = gql`
  query CharacterSnapshotsUniqueAggregationKeys($league: String!) {
    characterSnapshotsUniqueAggregationKeys(league: $league) {
      characterClassKeys
      keystoneKeys
      mainSkillKeys
      itemKeys
    }
  }
`;

export async function getServerSideProps({ req, res, query }) {
  res.setHeader(
    "Cache-Control",
    "no-store, s-maxage=60, stale-while-revalidate=800000"
  );

  const resp = {
    props: {},
  };

  const { league } = query;

  const generalSearchResult: any = await client.query({
    query: generalSearch,
    fetchPolicy: "network-only",
    variables: {
      search: {
        league: league ?? "Sanctum",
        includedKeyStoneNames: [],
        excludedKeyStoneNames: [],
        includedCharacterClasses: [],
        excludedCharacterClasses: [],
        includedMainSkills: [],
        excludedMainSkills: [],
        includedItemKeys: [],
        excludedItemKeys: [],
        skip: 0,
        limit: 100,
        sortKey: "level",
        sortDirection: "desc",
      },
    },
  });
  if (generalSearchResult?.data) {
    resp.props["initialSearchResponse"] = generalSearchResult?.data;
  }

  const unqiueKeysResult: any = await client.query({
    query: uniqueKeysQuery,
    variables: {
      league: league,
    },
  });
  if (unqiueKeysResult?.data?.characterSnapshotsUniqueAggregationKeys) {
    resp.props["unqiueKeysResponse"] =
      unqiueKeysResult?.data?.characterSnapshotsUniqueAggregationKeys;
  }

  return resp;
}
