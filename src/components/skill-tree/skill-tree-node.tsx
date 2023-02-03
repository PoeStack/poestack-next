import { memo } from "react";

export default function SkillTreeNode({ node, selectedNodes }) {
  return (
    <>
      <circle
        fill={selectedNodes.has(node.id) ? "red" : "black"}
        cx={node.x}
        cy={node.y}
        r={45}
        data-id={node.id}
      />
    </>
  );
}

export const MemoisedSkillTreeNode = memo(SkillTreeNode);
