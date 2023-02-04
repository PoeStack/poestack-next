import { memo } from "react";
import {
  PassiveTreeConnection,
  PassiveTreeConstants,
  PassiveTreeNode,
} from "../../__generated__/resolvers-types";

export function SkillTreeConnection({
  connection,
  constants,
  selectedNodes,
  nodeMap,
}: {
  connection: PassiveTreeConnection;
  constants: PassiveTreeConstants;
  selectedNodes: Set<string>;
  nodeMap: Record<string, PassiveTreeNode>;
}) {
  const fromNode = nodeMap[connection.fromNode];
  const toNode = nodeMap[connection.toNode];

  const orbitRadius = constants.orbitRadii[fromNode.orbit!];

  const x1 = fromNode.x;
  const y1 = fromNode.y;

  const x2 = toNode.x;
  const y2 = toNode.y;

  let sweepFlag = 1;

  if (
    Number.isInteger(fromNode.orbitIndex) &&
    Number.isInteger(toNode.orbitIndex)
  ) {
    const skillsInOrbit = constants.skillsPerOrbit[fromNode.orbit!];

    if (toNode.orbitIndex! - fromNode.orbitIndex! > skillsInOrbit / 2) {
      sweepFlag = 0;
    }
  }

  if (connection.curved) {
    return (
      <>
        <path
          stroke={
            selectedNodes.has(fromNode.hash) && selectedNodes.has(toNode.hash)
              ? "red"
              : "black"
          }
          strokeWidth={6}
          d={`M ${x1} ${y1} A ${orbitRadius} ${orbitRadius}, 0, 0 ${sweepFlag}, ${x2} ${y2}`}
          key={`${fromNode.hash},${toNode.hash}`}
          fill="transparent"
          data-from={fromNode.hash}
          data-to={toNode.hash}
        />
      </>
    );
  } else {
    return (
      <>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={
            selectedNodes.has(fromNode.hash) && selectedNodes.has(toNode.hash)
              ? "red"
              : "black"
          }
          strokeWidth={6}
          key={`${fromNode.hash},${toNode.hash}`}
          data-from={fromNode.hash}
          data-to={toNode.hash}
        />
      </>
    );
  }
}

export const MemoisedSkillTreeConnection = memo(SkillTreeConnection);
