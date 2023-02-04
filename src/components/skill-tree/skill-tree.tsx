import {
  PassiveTreeNode,
  PassiveTreeResponse,
} from "../../__generated__/resolvers-types";
import { MemoisedSkillTreeConnection } from "./skill-tree-connection";
import { MemoisedSkillTreeNode } from "./skill-tree-node";

export default function SkillTree({
  data,
  selectedNodes,
}: {
  data: PassiveTreeResponse;
  selectedNodes: Set<string>;
}) {
  const minX = data.constants.minX;
  const minY = data.constants.minY;
  const maxX = data.constants.maxX;
  const maxY = data.constants.maxY;
  const width = maxX - minX;
  const height = maxY - minY;

  return (
    <>
      <svg
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox={`${minX} ${minY} ${width} ${height}`}
      >
        {data.connectionMap.map((connection) => (
          <>
            <MemoisedSkillTreeConnection
              connection={connection}
              constants={data.constants}
              selectedNodes={selectedNodes}
              nodeMap={data.nodeMap}
            />
          </>
        ))}

        {Object.values(data.nodeMap).map((node) => (
          <>
            <MemoisedSkillTreeNode
              node={node as PassiveTreeNode}
              selectedNodes={selectedNodes}
            />
          </>
        ))}
      </svg>
    </>
  );
}
