import { memo } from "react";

/**
 * Props for {@link TreeNode}
 */
export type TreeNodeProps = {
  fillColor: string,
  x: number,
  y: number,
  size: number,
  hash: string,
  tooltip: string
}

/**
 * Draw a node on a {@link NodesTree}. 
 */
export default function TreeNode({
  fillColor,
  x,
  y,
  size,
  hash,
  tooltip
}: TreeNodeProps) {
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

/**
 * Memoized {@link TreeNode}
 */
export const MemoisedTreeNode = memo(TreeNode);
