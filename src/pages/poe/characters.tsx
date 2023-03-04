import { useState, useEffect, Dispatch } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
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
import StyledButton from "../../components/styled-button";
import { POE_LEAGUES } from "../../contexts/league-context";
import { myLoader } from "../../utils/general-util";

const ssrFullSearch = gql`
  query FullCharacterSnapshotsSearchAggregations(
    $aggregationTypes: [String!]!
    $search: CharacterSnapshotSearch!
  ) {
    characterSnapshotsSearchAggregations(
      aggregationTypes: $aggregationTypes
      search: $search
    ) {
      itemKeyAggreagtion {
        values {
          value
          key
        }
      }
      totalMatches
      mainSkillAggreagtion {
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
      characterClassAggregation {
        values {
          value
          key
        }
      }
    }
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
  }
`;

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
  }
`;

const aggregationSearch = gql`
  query CharacterSnapshotsSearchAggregations(
    $aggregationTypes: [String!]!
    $search: CharacterSnapshotSearch!
  ) {
    characterSnapshotsSearchAggregations(
      aggregationTypes: $aggregationTypes
      search: $search
    ) {
      itemKeyAggreagtion {
        values {
          value
          key
        }
      }
      totalMatches
      mainSkillAggreagtion {
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
      characterClassAggregation {
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
  const { customLadderGroupId, league } = router.query;

  const [search, setSearch] = useState<CharacterSnapshotSearch>({
    league: league?.toString() ?? POE_LEAGUES[0],
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

  const [itemAggregations, setItemAggregations] = useState<
    CharacterSnapshotSearchAggregationsResponse | undefined | null
  >(initialSearchResponse?.characterSnapshotsSearchAggregations);

  const [reftechGeneralSearch] = useLazyQuery(generalSearch, {
    fetchPolicy: "cache-and-network",
    variables: { search: search },
    onCompleted(data) {
      setCharacters({
        ...characters,
        ...data.characterSnapshotsSearch,
      });
    },
  });

  const [reftechAggregationSearch] = useLazyQuery(aggregationSearch, {
    fetchPolicy: "cache-and-network",
    variables: {
      search: search,
      aggregationTypes: ["nodes", "mainSkills", "classes"],
    },
    onCompleted(data) {
      setAggregations({
        ...aggregations,
        ...data.characterSnapshotsSearchAggregations,
      });
    },
  });

  const [reftechItemAggregationSearch] = useLazyQuery(aggregationSearch, {
    fetchPolicy: "cache-and-network",
    variables: {
      search: search,
      aggregationTypes: ["items"],
    },
    onCompleted(data) {
      setItemAggregations({
        ...aggregations,
        ...data.characterSnapshotsSearchAggregations,
      });
    },
  });

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

  function refireSearches() {
    reftechGeneralSearch();
    reftechAggregationSearch();
    reftechItemAggregationSearch();
  }

  function updateIncludeExclude(
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

    refireSearches();
  }

  function onSkillChange(mainSkill: { key: string; value: any }) {
    updateIncludeExclude(mainSkill, "includedMainSkills", "excludedMainSkills");
  }

  function onClassChange(characterClass: { key: string; value: any }) {
    updateIncludeExclude(
      characterClass,
      "includedCharacterClasses",
      "excludedCharacterClasses"
    );
  }

  function onItemChange(item: { key: string; value: any }) {
    updateIncludeExclude(item, "includedItemKeys", "excludedItemKeys");
  }

  function onKeystoneChange(keyStone: { key: string; value: any }) {
    updateIncludeExclude(
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
    refireSearches();
  }

  /**
   * Change the sorting behavior of the characters table.
   * @param column The name of the column to change sorting direction on.
   */
  function onCharactersSortChange(column: string) {
    updateSortMap(column);
    refireSearches();
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
      aggregation: itemAggregations?.itemKeyAggreagtion,
      onSelectionChanged: onItemChange,
      includedRows: search.includedItemKeys!,
      excludedRows: search.excludedItemKeys!,
      keys: unqiueKeysResponse?.itemKeys,
      matches: itemAggregations?.totalMatches,
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

  /*
   !! Below is the Main Component that ties everything together
   */

  return (
    <div className="flex flex-col my-4 space-x-2 overflow-x-hidden overscroll-x-contain lg:grid-cols-2 lg:flex lg:flex-row md:mx-4 lg:mx-20 ">
      {/* Column 1 on Desktop */}
      <div className="flex flex-row w-full lg:flex-col lg:w-1/5 ">
        <div className="mb-2">
          <StyledMultiSearch
            totalMatches={aggregations?.totalMatches ?? 0}
            value={localSearchString}
            onValueChange={onSearchValueChange}
            onDateChange={onDateChange}
            onLeagueChange={(e) => {
              setSearch({ ...search, league: e });
              refireSearches();
            }}
          />
        </div>
        <div className="hidden space-y-2 lg:block">
          {aggregatorPanels.map((props) => (
            <StyledAggregatorPanel key={props.title} {...props} />
          ))}
        </div>
      </div>

      {/* Column 2 on Desktop */}
      <div className="w-full row-start-2 overscroll-x-contain lg:flex lg:flex-row lg:mx-20">
        <StyledCharactersSummaryTable
          characters={characters}
          columns={columns}
          columnDirections={columnsSortMap}
          onSortChange={onCharactersSortChange}
        />
      </div>

      {/* note for push + mobile filters demo */}
      {/* <button
        className="fixed w-20 h-10 bg-orange-400 rounded-lg z-100 right-5 bottom-10 "
        onClick={() => setFilters(!filters)}
      >
        Filter Here
      </button> */}
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
  const [imageSize, setImageSize] = useState({
    width: 1,
    height: 1,
  });

  return (
    <StyledCard className="grid grid-cols-2 grid-rows-2 lg:flex lg:flex-1">
      <table className="">
        <SortableTableHeader
          columns={columns}
          columnDirections={columnDirections}
          onSortChange={onSortChange}
        />
        <tbody>
          {characters.snapshots.map((snapshot) => (
            <tr
              className="h-20 hover:bg-skin-primary border-y-2 border-slate-700/50"
              key={snapshot.characterId}
            >
              <td>
                <Link
                  href={`/poe/character/${snapshot.characterId}?snapshotId=${snapshot.snapshotId}`}
                  className="pl-3 text-lg hover:text-content-accent hover:underline"
                >
                  {snapshot?.name}
                </Link>
              </td>
              <td>
                <ul className="grid grid-cols-3  grid-rows-1 items-center space-x-2 justify-center">
                  <div className="col-start-1 col-end-1">
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
                                width={50}
                                height={60}
                              />
                            </StyledTooltip>
                          </a>
                        </Link>
                      </>
                    ) : null}
                  </div>
                  <div className="text-center col-start-2 col-end-3">
                    <div className="flex flex-row items-center ml-3">
                      {snapshot.level}
                    </div>
                  </div>
                  <div className="text-center col-start-3 col-end-4">
                    <div className="flex flex-row items-center">
                      <StyledTooltip
                        texts={[`${snapshot.characterClass}`]}
                        placement="top"
                        className="bg-slate-800"
                      >
                        <Image
                          src={`/assets/poe/classes/${snapshot.characterClass}.png`}
                          alt={snapshot.characterClass}
                          width={50}
                          height={60}
                        />
                      </StyledTooltip>
                    </div>
                  </div>
                </ul>
              </td>

              <td className="flex flex-row  mx-auto  justify-center h-full w-full items-center pr-4 pt-5">
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
                        width={35}
                        height={35}
                      />
                    </StyledSkillImageTooltip>
                  </li>
                ) : null}
              </td>

              <td className="w-10 pr-8 font-semibold text-right text-red-600 ">
                {snapshot.life}
              </td>
              <td className="w-10 pr-8 font-semibold text-right text-teal-300">
                {snapshot.energyShield}
              </td>
              <td className="font-semibold">
                {!!snapshot.topItems && (
                  <div className="flex flex-row items-center space-x-4  justify-center">
                    {snapshot.topItems.map((e) => {
                      return (
                        <>
                          <div>
                            <StyledTooltip
                              texts={[e.name]}
                              placement={"top"}
                              className="capitalize"
                            >
                              <div className="">
                                <Image
                                  loader={myLoader}
                                  src={e.icon}
                                  alt={e.name}
                                  priority={false}
                                  width={25}
                                  height={20}
                                />
                              </div>
                            </StyledTooltip>
                          </div>
                        </>
                      );
                    })}
                  </div>
                )}
              </td>
              <td className="font-semibold">
                {!!snapshot.totalValueDivine && (
                  <div className="grid w-32 grid-cols-2">
                    <div className="grid items-center justify-end">
                      {+snapshot.totalValueDivine.toFixed(1)}
                    </div>
                    <div className="pl-2 ">
                      <Image src={DIV_ICON} alt={""} width={30} height={30} />
                    </div>
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
  onLeagueChange: (e: any) => void;
};

/**
 * Styled search input for filtering aggregates on the {@link Characters} page
 */
function StyledMultiSearch({
  value,
  totalMatches,
  onValueChange,
  onDateChange,
  onLeagueChange,
}: StyledMultiSearchProps) {
  const { profile } = usePoeStackAuth();
  const router = useRouter();

  return (
    <StyledCard
      title={`Search - ${totalMatches} Characters`}
      className="focus:border-color-accent border-color-base"
    >
      <div className="w-full space-y-2 overflow-x-hidden lg:flex lg:flex-col">
        <StyledInput
          value={value}
          onChange={onValueChange}
          placeholder="Search Filters..."
        />
        <StyledDatepicker onSelectionChange={onDateChange} />

        <LeagueSelect
          onChange={(e) => {
            onLeagueChange(e);
          }}
        />

        {!!profile?.userId && (
          <StyledButton
            text={"My Custom Ladders"}
            onClick={() => {
              router.push(`/poe/custom-ladders?userId=${profile?.userId}`);
            }}
          />
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
    <StyledCard className="h-[400px] ">
      <div className="mb-2 font-bold">{title}</div>
      <CharacterAggregationDisplay
        values={aggregation?.values}
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

  const { league, customLadderGroupId } = query;

  const baseSearch = {
    league: league ?? "Sanctum",
    includedKeyStoneNames: [],
    excludedKeyStoneNames: [],
    includedCharacterClasses: [],
    excludedCharacterClasses: [],
    includedMainSkills: [],
    excludedMainSkills: [],
    includedItemKeys: [],
    excludedItemKeys: [],
    customLadderGroupId: customLadderGroupId,
    skip: 0,
    limit: 100,
    sortKey: "level",
    sortDirection: "desc",
  };

  const generalSearchResult: any = await client.query({
    query: ssrFullSearch,
    fetchPolicy: "network-only",
    variables: {
      search: baseSearch,
      aggregationTypes: ["items", "nodes", "mainSkills", "classes"],
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
