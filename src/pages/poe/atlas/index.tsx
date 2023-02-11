import { usePoeLeagueCtx } from "../../../contexts/league-context";
import StyledCard from "../../../components/styled-card";
import { useState } from "react";
import {
  GenericAggregation,
  PassiveTreeResponse,
} from "../../../__generated__/graphql";
import { gql, useQuery } from "@apollo/client";
import _ from "lodash";

export default function Characters() {
  const { league } = usePoeLeagueCtx();

  const [aggregateData, setAggregateData] = useState<GenericAggregation | null>(
    null
  );
  useQuery(
    gql`
      query Query($league: String!) {
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
        console.log(data);
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

  return (
    <>
      <div className="flex flex-col space-y-2">
        <StyledCard title={"Keystones"} className="flex-1">
          <AtlasNodePopularityTable nodes={keyStones} />
        </StyledCard>
        <StyledCard title={"Notables"} className="flex-1">
          <AtlasNodePopularityTable nodes={notables} />
        </StyledCard>
      </div>
    </>
  );
}

function AtlasNodePopularityTable({ nodes }) {
  const total = _.sumBy(nodes, (e: any) => e.value);

  return (
    <>
      <table>
        <thead>
          <th>Node</th>
          <th>Usage</th>
        </thead>
        <tbody>
          {nodes.map((node) => (
            <>
              <tr>
                <td>{node.node.name}</td>
                <td>{+((node.value / total) * 100).toFixed(2)}%</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}
