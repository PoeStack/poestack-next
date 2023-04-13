import React, { useEffect, useState } from "react";
import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import { PassiveTreeResponse } from "@generated/graphql";
import { usePoeLeagueCtx } from "@contexts/league-context";
import LoadingIndicator from "@components/loading-indicator";
import NodesTree from "./nodes-tree/nodes-tree";
import StyledButton from "@components/styled-button";
import createResetZoomEventEmitter, {
  ResetEventEmitter,
} from "./nodes-tree/reset-zoom-event-emitter";
import StyledLoading from "@components/styled-loading";

const passiveSkillsLayoutQuery: TypedDocumentNode<{
  passiveTree: PassiveTreeResponse;
}> = gql`
  query PassiveTree($passiveTreeVersion: String!) {
    passiveTree(passiveTreeVersion: $passiveTreeVersion) {
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

/**
 * Displays the Passives Skill tree for the given version.
 *
 * If selectedNodes are passed it will highlight the nodes and
 * connections between them.
 */
export default function SkillTree({
  selectedNodes,
  version,
}: {
  selectedNodes?: Array<number>;
  version: string;
}) {
  const { league } = usePoeLeagueCtx();

  const [treeData, setTreeData] = useState<PassiveTreeResponse>();

  const [resetEmitter, setResetEmitter] = useState<ResetEventEmitter>();

  const { refetch, loading } = useQuery(passiveSkillsLayoutQuery, {
    skip: true,
    variables: {
      passiveTreeVersion: version,
      league: league,
    },
    onCompleted({ passiveTree }) {
      setTreeData(passiveTree);
      if (passiveTree) {
        localStorage.setItem(
          `${version}_passive_tree_data`,
          JSON.stringify(passiveTree)
        );
      }
    },
  });

  useEffect(() => {
    setResetEmitter(createResetZoomEventEmitter());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !treeData) {
      const localData = localStorage.getItem(`${version}_passive_tree_data`);
      if (localData) {
        setTreeData(JSON.parse(localData));
      } else {
        refetch();
      }
    }
  }, [treeData, refetch, version]);

  return (
    <>
      {loading || !treeData ? (
        <StyledLoading />
      ) : (
        <>
          <div className="h-full ">
            <NodesTree
              treeData={treeData}
              selectedNodes={selectedNodes}
              resetZoomEmitter={resetEmitter}
            />
          </div>
          <StyledButton
            className={"w-32 flex flex-col items-center mx-auto"}
            text={"Reset View"}
            onClick={() => {
              resetEmitter?.dispatch();
            }}
          />
        </>
      )}
    </>
  );
}
