import { useState, useEffect, Dispatch, useReducer } from "react";
import { gql, useQuery } from "@apollo/client";
import client from "../../../poe-stack-apollo-client";
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
  StyledSkillImageTooltip } from "@components/styled-tooltip";
import { GeneralUtils } from "@utils/general-util";
import { 
  CharacterSnapshotSearch, 
  CharacterSnapshotSearchResponse, 
  CharacterSnapshotSearchAggregationsResponse, 
  GenericAggregation } from "@generated/graphql";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";  

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
 * Characters page
 */
export default function Characters({
  initialSearchResponse,
  unqiueKeysResponse,
}) {
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

  const [characters, setCharacters] = useState<
    CharacterSnapshotSearchResponse | undefined | null
  >(initialSearchResponse?.characterSnapshotsSearch);

  const [aggregations, setAggregations] = useState<
    CharacterSnapshotSearchAggregationsResponse | undefined | null
  >(initialSearchResponse?.characterSnapshotsSearchAggregations);

  const { refetch: reftechGeneralSearch } = useQuery(generalSearch, {
    skip: true,
    variables: { search: { ...search, ...{ league: league } } },
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
    reftechGeneralSearch();
  }, [search, reftechGeneralSearch, league]);

  /*
   * Track column sorting directions
   */
  const [columnsDirections, updateColumnsDirections] = useReducer(
    (state: ColumnsSortingDirections, action: keyof ColumnsSortingDirections)=>{
      const newState = {...defaultColumnDirections};
      if(state[action] === "none") {
        newState[action] = "ascending";
      }
      else if(state[action] === "ascending") {
        newState[action] = "descending";
      }
      else if(state[action] === "descending") {
        newState[action] = "none";
      }
      return newState;
    },
    defaultColumnDirections
  );

  /*
   * Implement query sorting behaviors here
   */
  useEffect(() => {
    if(columnsDirections.name === "ascending" || columnsDirections.name === "descending") {
      // handle character name column ascending or descnding query change
      console.log(`Sort name by ${columnsDirections.name}`);
    }
    else if(columnsDirections.level === "ascending" || columnsDirections.level === "descending") {
      // handle character level column ascending or descnding query change
      console.log(`Sort level by ${columnsDirections.level}`);
    }
    else if(columnsDirections.skill === "ascending" || columnsDirections.skill === "descending") {
      // handle character skill column ascending or descnding query change
      console.log(`Sort skill by ${columnsDirections.skill}`);
    }
    else if(columnsDirections.life === "ascending" || columnsDirections.life === "descending") {
      // handle character life column ascending or descnding query change
      console.log(`Sort life by ${columnsDirections.life}`);
    }
    else if(columnsDirections.es === "ascending" || columnsDirections.es === "descending") {
      // handle character es column ascending or descnding query change
      console.log(`Sort es by ${columnsDirections.es}`);
    }
    else {
      // handle no column ascending or descnding query change
      console.log("No sorting");
    }
  }, [columnsDirections]);

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
  function onCharactersSortChange(column: keyof ColumnsSortingDirections) {
    updateColumnsDirections(column);
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
    <>
      <div className="flex flex-row space-x-2 ">
        <div className="flex flex-col space-y-2 w-1/6 lg:w-1/5">
          <StyledMultiSearch
            value={localSearchString}
            onValueChange={onSearchValueChange}
            onDateChange={onDateChange}
          />

          {aggregatorPanels.map((props) => (
            <StyledAggregatorPanel key={props.title} {...props} />
          ))}
        </div>

        <StyledCharactersSummaryTable characters={characters}
          columnDirections={columnsDirections}
          onSortChange={onCharactersSortChange}/>
      </div>
    </>
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
  columnDirections: ColumnsSortingDirections;
  onSortChange: (column: keyof ColumnsSortingDirections)=>void;
};

type SortingDirections = "none"|"ascending"|"descending";

type ColumnsSortingDirections = {
  name: SortingDirections,
  level: SortingDirections,
  skill: SortingDirections,
  life: SortingDirections,
  es: SortingDirections
};

const defaultColumnDirections: ColumnsSortingDirections = {
  name: "none",
  level: "none",
  skill: "none",
  life: "none",
  es: "none"
};

/**
 * Table of a brief summary of characters on the {@link Characters} page.
 */
function StyledCharactersSummaryTable({
  characters,
  columnDirections,
  onSortChange
}: StyledCharactersSummaryTableProps) {

  function onColumnHeaderClick(column: keyof ColumnsSortingDirections) {
    onSortChange(column);
  }

  function OrderIndicatorIcon({ direction }: { direction: SortingDirections }) {
    return (
      direction === "descending"?
        <ChevronDownIcon
          className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
          aria-hidden="true"
        /> :
        direction === "ascending"?
          <ChevronUpIcon
            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          /> :
            <div
              className="ml-2 -mr-1 h-5 w-5 text-violet-200"
              aria-hidden="true">
            </div>
    )
  }

  return (
    <StyledCard title="Characters" className="flex-1">
      <table>
        {/* Setup for adding click sort like PoeNinja */}
        <thead className="text-left">
          <tr>
            <th className="pl-2">
              <button className="flex flex-row"
                onClick={(e)=>{onColumnHeaderClick("name")}}>
                Name
                <OrderIndicatorIcon direction={columnDirections.name}/>
              </button>
            </th>
            <th className="pl-2">
              <button className="flex flex-row" 
                onClick={(e)=>{onColumnHeaderClick("level")}}>
                Level
                <OrderIndicatorIcon direction={columnDirections.level}/>
              </button>
            </th>
            <th className="pl-2">
              <button className="flex flex-row" 
                onClick={(e)=>{onColumnHeaderClick("skill")}}>                
                Skill
                <OrderIndicatorIcon direction={columnDirections.skill}/>
              </button>
            </th>
            <th className="pl-2">
              <button className="flex flex-row" 
                onClick={(e)=>{onColumnHeaderClick("life")}}> 
                Life
                <OrderIndicatorIcon direction={columnDirections.life}/>
              </button>
            </th>
            <th className="pl-2">
              <button className="flex flex-row" 
                onClick={(e)=>{onColumnHeaderClick("es")}}>
                Es
                <OrderIndicatorIcon direction={columnDirections.es}/>
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {characters.snapshots.map((snapshot) => (
            <tr
              className="hover:bg-skin-primary border-y-2 border-slate-700/50"
              key={snapshot.characterId}
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
                  {snapshot.twitchProfileName ? (
                    <>
                      <Link
                        href={`https://twitch.tv/${snapshot.twitchProfileName}`}
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
  onValueChange: (e: any) => void;
  onDateChange: (e: any) => void;
};

/**
 * Styled search input for filtering aggregates on the {@link Characters} page
 */
function StyledMultiSearch({
  value,
  onValueChange,
  onDateChange,
}: StyledMultiSearchProps) {
  return (
    <StyledCard title={"Search"}>
      <StyledInput
        value={value}
        onChange={onValueChange}
        placeholder="Search Filters..."
      />
      <StyledDatepicker onSelectionChange={onDateChange} />
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
