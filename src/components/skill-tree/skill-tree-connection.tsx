import { memo } from "react";

export function SkillTreeConnection({ connection, constants, selectedNodes }) {
  const { fromNode, toNode, isCurved } = connection;
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

  if (isCurved) {
    return (
      <>
        <path
          stroke={
            selectedNodes.has(fromNode.id) && selectedNodes.has(toNode.id)
              ? "red"
              : "black"
          }
          strokeWidth={6}
          d={`M ${x1} ${y1} A ${orbitRadius} ${orbitRadius}, 0, 0 ${sweepFlag}, ${x2} ${y2}`}
          key={`${fromNode.id},${toNode.id}`}
          fill="transparent"
          data-from={fromNode.id}
          data-to={toNode.id}
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
            selectedNodes.has(fromNode.id) && selectedNodes.has(toNode.id)
              ? "red"
              : "black"
          }
          strokeWidth={6}
          key={`${fromNode.id},${toNode.id}`}
          data-from={fromNode.id}
          data-to={toNode.id}
        />
      </>
    );
  }
}

export const MemoisedSkillTreeConnection = memo(SkillTreeConnection);
