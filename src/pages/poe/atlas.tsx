import { usePoeLeagueCtx } from "@contexts/league-context";
import StyledCard from "@components/styled-card";
import { useState } from "react";
import { GenericAggregation, PassiveTreeResponse } from "@generated/graphql";
import { gql, useQuery } from "@apollo/client";
import _ from "lodash";
import { StyledTooltip } from "@components/styled-tooltip";
import SortableTableHeader, {
  SortableTableColumns,
} from "@components/sortable-table-header";
import useSortableTable from "@hooks/use-sort-th-hook";

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

  const [aggregateData, setAggregateData] = useState<GenericAggregation | null>(
    null
  );
  useQuery(
    gql`
      query PopAggAtlasQuery($league: String!) {
        atlasPassiveTreeSnapshotPopularityAggregation(league: $league) {
          values {
            key
            value
          }
        }
      }
    `,
    {
      variables: { league: league },
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

  console.log(passiveTreeData);

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

  return (
    <>
      <div className="flex flex-col my-4 space-y-2 ">
        <StyledCard title={"Keystones"} className="flex-1">
          <AtlasNodePopularityTable
            nodes={keyStones}
            columns={columns}
            columnsSortMap={keystonesSortMap}
            updateSortMap={updateKeystonesMap}
          />
        </StyledCard>
        <StyledCard title={"Notables"} className="flex-1">
          <AtlasNodePopularityTable
            nodes={notables}
            columns={columns}
            columnsSortMap={notablesSortMap}
            updateSortMap={updateNotablesMap}
          />
        </StyledCard>
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
                <td>{+((node.value / total) * 100).toFixed(2)}%</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}
