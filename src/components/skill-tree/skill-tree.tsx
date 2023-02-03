import { MemoisedSkillTreeConnection } from "./skill-tree-connection";
import { MemoisedSkillTreeNode } from "./skill-tree-node";

export default function SkillTree({ data, selectedNodes }) {
  const minX = data.min_x;
  const minY = data.min_y;
  const maxX = data.max_x;
  const maxY = data.max_y;
  const width = maxX - minX;
  const height = maxY - minY;

  const nodeFilter = (node) => {
    return node.render;
  };

  const connectionFilter = (connection) => {
    return nodeFilter(connection.fromNode) && nodeFilter(connection.toNode);
  };

  return (
    <>
      <svg
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox={`${minX} ${minY} ${width} ${height}`}
      >
        {Object.keys(data.connectionMap)
          .map((fromNodeId) => data.connectionMap[fromNodeId])
          .reduce(
            (acc, cur) =>
              cur.reduce((innerAcc, innerCur) => [...innerAcc, innerCur], acc),
            []
          )
          .filter(connectionFilter)
          .map((connection) => (
            <>
              <MemoisedSkillTreeConnection
                connection={connection}
                constants={data.constants}
                selectedNodes={selectedNodes}
              />
            </>
          ))}

        {Object.values(data.nodeMap)
          .filter(nodeFilter)
          .map((node) => (
            <>
              <MemoisedSkillTreeNode
                node={node}
                selectedNodes={selectedNodes}
              />
            </>
          ))}
      </svg>
    </>
  );
}
