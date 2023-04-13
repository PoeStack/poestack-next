import { useState, useEffect } from "react";
import { Maybe } from "graphql/jsutils/Maybe";
import Link from "next/link";
import Image from "next/image";
import CharacterAggregationDisplay from "@components/character-aggregation-display";
import StyledCard from "@components/styled-card";
import StyledDatepicker from "@components/styled-datepicker";
import StyledInput from "@components/styled-input";
import StyledLoading from "@components/styled-loading";
import {
  StyledTooltip,
  StyledSkillImageTooltip,
} from "@components/styled-tooltip";
import SortableTableHeader, {
  SortableTableColumns,
} from "@components/sortable-table-header";
import { GeneralUtils } from "@utils/general-util";
import { CustomLadderGroup, GenericAggregation } from "@generated/graphql";
import { useRouter } from "next/router";
import { usePoeStackAuth } from "@contexts/user-context";
import { DIV_ICON } from "@components/currency-value-display";
import LeagueSelect from "@components/league-select";
import StyledButton from "../../components/styled-button";
import { myLoader } from "../../utils/general-util";
import {
  LadderVector,
  LadderVectorEntry,
  LadderVectorSearch,
  LadderVectorUtil,
} from "@utils/ladder-vector";
import CharacterAggregationDisplay2 from "@components/character-aggregation-display-2";
import { gql, useQuery } from "@apollo/client";
import StyledPaginate from "@components/styled-paginate";

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
export default function Characters() {
  const router = useRouter();
  const { customLadderGroupId, league } = router.query;

  const [localSearchString, setLocalSearchString] = useState<string>("");

  const [timemachineDate, setTimemachineDate] = useState<Date | null>(null);

  const [baseVector, setBaseVector] = useState<LadderVector | null>(null);

  const [displayVector, setDisplayVector] = useState<LadderVector | null>(null);
  useEffect(() => {
    if (league) {
      if (timemachineDate) {
        timemachineDate.setUTCHours(0, 0, 0, 0);
      }
      fetch(
        `https://poe-stack-poe-ladder-vectors.nyc3.digitaloceanspaces.com/${league}/${
          !!timemachineDate ? timemachineDate?.toISOString() : "current"
        }.json`
      )
        .then((v) => {
          if (v.ok) {
            return v.json();
          }
        })
        .then((v) => {
          setBaseVector(LadderVectorUtil.parse(v));
        });
    }
  }, [league, timemachineDate]);

  const [ladderGroup, setLadderGroup] = useState<CustomLadderGroup | null>(
    null
  );
  useQuery(
    gql`
      query CustomLadderGroup($groupId: String!) {
        customLadderGroup(groupId: $groupId) {
          id
          name
          ownerUserId
          createdAtTimestamp
          members {
            poeProfileName
            userId
          }
        }
      }
    `,
    {
      variables: { groupId: customLadderGroupId },
      onCompleted(data) {
        setLadderGroup(data.customLadderGroup);
      },
      onError() {
        setLadderGroup(null);
      },
    }
  );

  useEffect(() => {
    if (baseVector) {
      setDisplayVector(
        LadderVectorUtil.executeSearch(baseVector, router.query, ladderGroup)
      );
    }
  }, [baseVector, router.query, ladderGroup]);

  function toggleAggregationSearch(searchKey: string, rowKey: string) {
    let nextQuery: string[] = [router.query[searchKey] ?? ""]
      .flatMap((e) => e)
      .filter((e) => e?.length);

    if (nextQuery.includes(rowKey)) {
      nextQuery[nextQuery.indexOf(rowKey)] = `!${rowKey}`;
    } else if (nextQuery.includes(`!${rowKey}`)) {
      nextQuery = nextQuery.filter((e) => e !== `!${rowKey}`);
    } else {
      nextQuery = [...nextQuery, rowKey];
    }
    router.push({ query: { ...router.query, [searchKey]: nextQuery } });
  }

  if (!displayVector) {
    return (
      <>
        <StyledLoading />
      </>
    );
  }

  return (
    <div className="flex flex-col sm:space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4">
      {/* Column 1 on Desktop */}
      <div className="flex flex-col basis-1/5 space-y-2 flex-wrap">
        <StyledMultiSearch
          totalMatches={displayVector?.entires?.length ?? 0}
          value={localSearchString}
          onValueChange={(e) => {
            setLocalSearchString(e);
          }}
          onDateChange={(e) => {
            setTimemachineDate(e);
          }}
          onLeagueChange={(e) => {}}
        />

        <StyledCard className="h-[400px] ">
          <div className="mb-2 font-bold">Classes</div>
          <CharacterAggregationDisplay2
            onRowClicked={(k) => {
              toggleAggregationSearch("class", k);
            }}
            aggregation={displayVector.classAggregation}
            localSearchString={localSearchString}
            query={router.query["class"]}
          />
        </StyledCard>
        <StyledCard className="h-[400px] ">
          <div className="mb-2 font-bold">Skills</div>
          <CharacterAggregationDisplay2
            onRowClicked={(k) => {
              toggleAggregationSearch("skill", k);
            }}
            aggregation={displayVector.mainSkillKeyAggregation}
            localSearchString={localSearchString}
            query={router.query["skill"]}
          />
        </StyledCard>
        <StyledCard className="h-[400px] ">
          <div className="mb-2 font-bold">Items</div>
          <CharacterAggregationDisplay2
            onRowClicked={(k) => {
              toggleAggregationSearch("item", k);
            }}
            aggregation={displayVector.itemKeyAggregation}
            localSearchString={localSearchString}
            query={router.query["item"]}
          />
        </StyledCard>
      </div>

      <StyledCharactersSummaryTable characters={displayVector} />
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
  characters: LadderVector;
};

/**
 * Table of a brief summary of characters on the {@link Characters} page.
 */

function StyledCharactersSummaryTable({
  characters,
}: StyledCharactersSummaryTableProps) {
  const [skipLimit, setSkipLimit] = useState({ skip: 0, limit: 25 });

  return (
    <StyledCard className="">
      <table className="">
        <SortableTableHeader
          columns={columns}
          columnDirections={{}}
          onSortChange={(e) => {}}
        />
        <tbody>
          {characters.entires
            .slice(skipLimit.skip, skipLimit.skip + skipLimit.limit)
            .map((snapshot) => (
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
                  <ul className="grid items-center justify-center grid-cols-3 grid-rows-1 space-x-2">
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
                    <div className="col-start-2 col-end-3 text-center">
                      <div className="flex flex-row items-center ml-3">
                        {snapshot.level}
                      </div>
                    </div>
                    <div className="col-start-3 col-end-4 text-center">
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

                <td className="flex flex-row items-center justify-center w-full h-full pt-5 pr-4">
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
                          loader={myLoader}
                          src={`/assets/poe/skill_icons/${encodeURIComponent(
                            snapshot?.mainSkillKey
                          )}.png`}
                          alt={snapshot?.mainSkillKey}
                          width={35}
                          height={35}
                          priority={false}
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
                  {!!snapshot.topItemNames && (
                    <div className="flex flex-row items-center justify-center space-x-4">
                      {snapshot.topItemNames.map((name, i) => {
                        return (
                          <>
                            <div>
                              <StyledTooltip
                                texts={[name]}
                                placement={"top"}
                                className="capitalize"
                              >
                                <div className="">
                                  <Image
                                    loader={myLoader}
                                    src={snapshot.topItemIcons[i]}
                                    alt={name}
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
                  <div className="flex flex-row items-center justify-center w-full pr-2 ">
                    {!!snapshot.pobDps &&
                      GeneralUtils.compactNumberFormat(snapshot.pobDps)}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <StyledPaginate
        currentSkip={skipLimit.skip}
        onSelectionChange={(skip: number, limit: number) => {
          setSkipLimit({ skip: skip, limit: limit });
        }}
        limit={skipLimit.limit}
        hasMore={true}
      />
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
      <div>{`Search - ${totalMatches} Characters`}</div>
      <div className="w-full space-y-2 lg:flex lg:flex-col">
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
  matches,
  searchString,
}: StyledAggregatorPanelProps) {
  matches = matches ? matches : 0;

  return (
    <StyledCard className="h-[400px] ">
      <div className="mb-2 font-bold">{title}</div>
      <CharacterAggregationDisplay
        values={aggregation?.values}
        onSelectionChanged={onSelectionChanged}
        includedRows={includedRows}
        excludedRows={excludedRows}
        allKeys={aggregation?.values?.map((e) => e.key!) ?? []}
        totalMatches={matches}
        localSearchString={searchString}
      />
    </StyledCard>
  );
}
