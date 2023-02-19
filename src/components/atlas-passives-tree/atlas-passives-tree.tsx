import { useEffect, useMemo, useState } from "react";
import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import {
  PassiveTreeConnection,
  PassiveTreeNode,
  PassiveTreeResponse,
} from "@generated/graphql";
import { usePoeLeagueCtx } from "@contexts/league-context";
import LoadingIndicator from "@components/loading-indicator";
import { APTreeNodeProps, MemoisedAPTreeNode } from "./ap-tree-node";
import {
  APTreeConnectionProps,
  MemoisedAPTreeConnection,
} from "./ap-tree-connection";

const atlasPassivesLayoutQuery: TypedDocumentNode<{
  atlasTree: PassiveTreeResponse;
}> = gql`
  query CompAtlasTree($passiveTreeVersion: String!) {
    atlasTree(passiveTreeVersion: $passiveTreeVersion) {
      constants {
        minX
        minY
        maxX
        maxY
        skillsPerOrbit
        orbitRadii
      }
      nodeMap
      connectionMap
    }
  }
`;

function createNodeProps(
  treeData: PassiveTreeResponse | undefined,
  nodes: Set<string>
): Array<APTreeNodeProps> {
  if (treeData) {
    return Object.values<PassiveTreeNode>(treeData.nodeMap).map((node) => ({
      fillColor: nodes.has(node.hash) ? "red" : "black",
      x: node.x,
      y: node.y,
      size: node.size,
      hash: node.hash,
      tooltip: node.stats.reduce((tip, line) => `${tip}\n${line}`, "") || "",
    }));
  }
  return [];
}

function createConnectionProps(
  treeData: PassiveTreeResponse | undefined,
  nodes: Set<string>
): Array<APTreeConnectionProps> {
  if (treeData) {
    return treeData.connectionMap.map((connection: PassiveTreeConnection) => {
      const fromNode = treeData.nodeMap[connection.fromNode];
      const toNode = treeData.nodeMap[connection.toNode];
      const skillsInOrbit = treeData.constants.skillsPerOrbit[fromNode.orbit!];
      const radius = treeData.constants.orbitRadii[fromNode.orbit!];
      const sweep =
        toNode.orbitIndex! - fromNode.orbitIndex! > skillsInOrbit / 2 ? 0 : 1;
      const strokeColor =
        nodes.has(fromNode.hash) && nodes.has(toNode.hash) ? "red" : "black";

      return {
        fromX: fromNode.x,
        fromY: fromNode.y,
        toX: toNode.x,
        toY: toNode.y,
        orbit: {
          radius: radius,
          fromIndex: fromNode.orbitIndex,
          toIndex: toNode.orbitIndex,
        },
        skillsInOrbit: skillsInOrbit,
        sweep: sweep,
        strokeColor: strokeColor,
        from: fromNode.hash,
        to: toNode.hash,
        curved: connection.curved,
      };
    });
  } else {
    return [];
  }
}

/**
 * Displays the Atlas Passives tree.
 * If {@argument selectedNodes} is passed it will highlight the {@link Set}.
 *
 * @todo Currently highlighting is turned off in the child components
 * {@link MemoisedAPTreeNode} and {@link MemoisedAPTreeConnection}
 */
export default function AtlasPassivesTree({
  selectedNodes,
  version,
}: {
  selectedNodes?: Array<number>;
  version: string;
}) {
  const { league } = usePoeLeagueCtx();

  const [treeData, setTreeData] = useState<PassiveTreeResponse>();

  const { refetch, loading } = useQuery(atlasPassivesLayoutQuery, {
    skip: true,
    variables: {
      passiveTreeVersion: version,
      league: league,
    },
    onCompleted({ atlasTree }) {
      setTreeData(atlasTree);
      if (atlasTree) {
        localStorage.setItem(
          `${version}_atlas_passives_tree_data`,
          JSON.stringify(atlasTree)
        );
      }
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined" && !treeData) {
      const localData = localStorage.getItem(
        `${version}_atlas_passives_tree_data`
      );
      if (localData) {
        setTreeData(JSON.parse(localData));
      } else {
        refetch();
      }
    }
  }, [treeData, refetch, version]);

  const memoizedSelectedNodes = useMemo(
    () =>
      new Set<string>(
        selectedNodes ? selectedNodes.map((num) => num.toString()) : []
      ),
    [selectedNodes]
  );

  const memoizedNodeProps = useMemo(
    () => createNodeProps(treeData, memoizedSelectedNodes),
    [treeData, memoizedSelectedNodes]
  );

  const memoizedConnectionProps = useMemo(
    () => createConnectionProps(treeData, memoizedSelectedNodes),
    [treeData, memoizedSelectedNodes]
  );

  const minX = treeData?.constants.minX || 0;
  const minY = treeData?.constants.minY || 0;
  const maxX = treeData?.constants.maxX || 0;
  const maxY = treeData?.constants.maxY || 0;
  const width = maxX - minX;
  const height = maxY - minY;

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <svg
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          viewBox={`${minX} ${minY} ${width} ${height}`}
        >
          {memoizedConnectionProps.map((props, index) => (
            <MemoisedAPTreeConnection key={index} {...props} />
          ))}
          {memoizedNodeProps.map((props, index) => (
            <MemoisedAPTreeNode key={index} {...props} />
          ))}
        </svg>
      )}
    </>
  );
}
