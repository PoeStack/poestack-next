import { usePoeLeagueCtx } from "@contexts/league-context";
import StyledCard from "@components/styled-card";
import { useState } from "react";
import {
  AtlasPassiveSnapshotSearch,
  GenericAggregation,
  PassiveTreeResponse,
} from "@generated/graphql";
import { gql, useQuery } from "@apollo/client";
import _ from "lodash";
import { StyledTooltip } from "@components/styled-tooltip";
import SortableTableHeader, {
  SortableTableColumns,
} from "@components/sortable-table-header";
import useSortableTable from "@hooks/use-sort-th-hook";
import LeagueSelect from "@components/league-select";
import AtlasPassivesTree from "@components/trees/atlas-passives-tree";
import CharacterAggregationDisplay from "../../components/character-aggregation-display";

const columns: SortableTableColumns = [
  {
    key: "node",
    text: "Node",
  },
  {
    key: "usage",
    text: "Usage",
  },
];

export default function Atlas() {
  const { league } = usePoeLeagueCtx();

  const [search, setSearch] = useState<AtlasPassiveSnapshotSearch>({
    league: league,
    includedHashes: [],
    excludedHashes: [],
  });

  const [aggregateData, setAggregateData] = useState<GenericAggregation | null>(
    null
  );
  useQuery(
    gql`
      query AtlasPassiveTreeSnapshotPopularityAggregation(
        $search: AtlasPassiveSnapshotSearch!
      ) {
        atlasPassiveTreeSnapshotPopularityAggregation(search: $search) {
          values {
            key
            value
          }
        }
      }
    `,
    {
      variables: { search: search },
      onCompleted(data) {
        setAggregateData(data.atlasPassiveTreeSnapshotPopularityAggregation);
      },
    }
  );

  const [passiveTreeData, setPassiveTreeData] =
    useState<PassiveTreeResponse | null>(null);
  useQuery(
    gql`
      query AtlasTree($passiveTreeVersion: String!) {
        atlasTree(passiveTreeVersion: $passiveTreeVersion) {
          nodeMap
        }
      }
    `,
    {
      variables: { passiveTreeVersion: "3.20" },
      onCompleted(data) {
        setPassiveTreeData(data.atlasTree);
      },
    }
  );

  const [keystonesSortMap, updateKeystonesMap] = useSortableTable(
    columns,
    (key, dir) => {
      /*  update the queries in here somehow */
    }
  );

  const [notablesSortMap, updateNotablesMap] = useSortableTable(
    columns,
    (key, dir) => {
      /*  update the queries in here somehow */
    }
  );

  if (!passiveTreeData || !aggregateData) {
    return <>loading...</>;
  }

  const keyStones = aggregateData.values
    .map((e) => ({
      ...e,
      ...{ node: passiveTreeData.nodeMap[e.key!] },
    }))
    .filter((e) => e.node && e.node.keystone);

  const notables = aggregateData.values
    .map((e) => ({
      ...e,
      ...{ node: passiveTreeData.nodeMap[e.key!] },
    }))
    .filter((e) => e.node && e.node.notable);

  const nodeColorOverrides = {};
  function addPop(values) {
    const totalNodeSelections = values.reduce(
      (p, c) => Math.max(c.value!, p),
      0
    );
    values.forEach((e) => {
      var hue = (1 - (1 - e.value! / totalNodeSelections) * 120).toString(10);
      nodeColorOverrides[e.key!] = ["hsl(", hue, ",100%,50%)"].join("");
    });
  }
  addPop(aggregateData.values);
  addPop(keyStones);
  addPop(notables);

  function updateAggFilter(node) {
    if (search.includedHashes?.includes(node.key)) {
      setSearch({
        ...search,
        excludedHashes: [...search.excludedHashes!, node.key],
        includedHashes: search.includedHashes?.filter((e) => e !== node.key),
      });
    } else if (search.excludedHashes?.includes(node.key)) {
      setSearch({
        ...search,
        excludedHashes: search.excludedHashes?.filter((e) => e !== node.key),
      });
    } else {
      setSearch({
        ...search,
        includedHashes: [...search.includedHashes!, node.key],
      });
    }
  }

  return (
    <>
      <div className="flex flex-col my-4 space-y-2 md:mx-4 lg:mx-20 ">
        <div className="flex flex-row space-x-2">
          <div className="flex flex-col space-y-2 min-w-[260px]">
            <StyledCard title={"Search"}>
              <LeagueSelect />
            </StyledCard>
            <StyledCard title="Keystones" className="h-[400px]">
              <CharacterAggregationDisplay
                values={keyStones}
                allKeys={keyStones.map((e) => e.key!)}
                totalMatches={keyStones.reduce((p, c) => p + c.value!, 0)}
                localSearchString={""}
                onSelectionChanged={(e) => {
                  updateAggFilter(e);
                }}
                includedRows={
                  search.includedHashes?.filter(
                    (e) => passiveTreeData.nodeMap[e]?.keystone
                  ) ?? []
                }
                excludedRows={
                  search.excludedHashes?.filter(
                    (e) => passiveTreeData.nodeMap[e]?.keystone
                  ) ?? []
                }
                keyToText={(e) => passiveTreeData.nodeMap[e.key ?? e]?.name}
              />
            </StyledCard>
            <StyledCard title="Notables" className="h-[400px]">
              <CharacterAggregationDisplay
                values={notables}
                allKeys={notables.map((e) => e.key!)}
                totalMatches={notables.reduce((p, c) => p + c.value!, 0)}
                localSearchString={""}
                onSelectionChanged={(e) => {
                  updateAggFilter(e);
                }}
                includedRows={
                  search.includedHashes?.filter(
                    (e) => passiveTreeData.nodeMap[e]?.notable
                  ) ?? []
                }
                excludedRows={
                  search.excludedHashes?.filter(
                    (e) => passiveTreeData.nodeMap[e]?.notable
                  ) ?? []
                }
                keyToText={(e) => passiveTreeData.nodeMap[e.key ?? e]?.name}
              />
            </StyledCard>
          </div>
          <StyledCard className="flex-1">
            <AtlasPassivesTree
              version={"3.20"}
              nodeColorOverrides={nodeColorOverrides}
            />
          </StyledCard>
        </div>
      </div>
    </>
  );
}

function AtlasNodePopularityTable({
  nodes,
  columns,
  columnsSortMap,
  updateSortMap,
}) {
  const total = _.sumBy(nodes, (e: any) => e.value);

  return (
    <>
      <table>
        <SortableTableHeader
          columns={columns}
          columnDirections={columnsSortMap}
          onSortChange={updateSortMap}
        />
        <tbody>
          {nodes.map((node) => (
            <>
              <tr>
                <StyledTooltip
                  texts={node.node.stats}
                  placement={"bottom-start"}
                >
                  <td className="cursor-default hover:text-content-accent">
                    {node.node.name}
                  </td>
                </StyledTooltip>
                <td className="">
                  {+((node.value / total) * 100).toFixed(2)}%
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}
