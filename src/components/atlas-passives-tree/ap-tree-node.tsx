import { memo } from "react";

/**
 * Props for {@link APTreeNode}
 */
export type APTreeNodeProps = {
  fillColor: string,
  x: number,
  y: number,
  size: number,
  hash: string,
  tooltip: string
}

/**
 * Draw a skill tree node. 
 */
export default function APTreeNode({
  fillColor,
  x,
  y,
  size,
  hash,
  tooltip
}: APTreeNodeProps) {
  return (
    <circle
      fill={fillColor}
      cx={x}
      cy={y}
      r={size}
      data-id={hash}>
      <title>{tooltip}</title>
    </circle>
  );
}

//fill={selectedNodes && selectedNodes.has(node.hash) ? "red" : "black"}

export const MemoisedAPTreeNode = memo(APTreeNode);
