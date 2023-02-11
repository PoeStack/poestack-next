import { memo } from "react";
import { PassiveTreeNode } from "../../__generated__/graphql";

export default function SkillTreeNode({
  node,
  selectedNodes,
}: {
  node: PassiveTreeNode;
  selectedNodes: Set<string>;
}) {
  return (
    <>
      <circle
        fill={selectedNodes.has(node.hash) ? "red" : "black"}
        cx={node.x}
        cy={node.y}
        r={node.size}
        data-id={node.hash}
      />
    </>
  );
}

export const MemoisedSkillTreeNode = memo(SkillTreeNode);
