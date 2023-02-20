import React, { useMemo } from "react";
import {
  PassiveTreeConnection,
  PassiveTreeNode,
  PassiveTreeResponse,
} from "@generated/graphql";
import { TreeNodeProps, MemoisedTreeNode } from "./tree-node";
import { TreeConnectionProps, MemoisedTreeConnection } from "./tree-connection";
import ZoomableSVG from "./zoomable-svg";
import { ResetEventEmitter } from "./reset-zoom-event-emitter";

/**
 * Generate an array of props suitable for creating {@link MemoisedTreeNode MemoisedTreeNodes}
 * @param treeData the data to create the nodes from
 * @param nodes the data representing any selected nodes
 * @returns An array of {@link TreeNodeProps}
 */
function createNodeProps(treeData: PassiveTreeResponse | undefined, nodes: Set<string>): Array<TreeNodeProps> {
  if(treeData){
    return Object.values<PassiveTreeNode>(treeData.nodeMap).map((node) =>
    ({
      fillColor: nodes.has(node.hash) ? "red" : "black",
      x: node.x,
      y: node.y,
      size: node.size,
      hash: node.hash,
      tooltip: node.stats.reduce((tip,line)=>`${tip}\n${line}`,"") || ""
    }));
  }
  return [];
}

/**
 * Generate an array of props suitable for creating {@link MemoisedTreeNode MemoisedTreeConnection}
 * @param treeData the data to create the connections from
 * @param nodes the data representing connections between selected nodes
 * @returns An array of {@link TreeConnectionProps}
 */
function createConnectionProps(treeData: PassiveTreeResponse | undefined, nodes: Set<string>): Array<TreeConnectionProps> {
  if(treeData){
    return treeData.connectionMap.map((connection: PassiveTreeConnection) => {
      const fromNode = treeData.nodeMap[connection.fromNode];
      const toNode = treeData.nodeMap[connection.toNode];
      const skillsInOrbit = treeData.constants.skillsPerOrbit[fromNode.orbit!];
      const radius = treeData.constants.orbitRadii[fromNode.orbit!];
      const sweep = (toNode.orbitIndex! - fromNode.orbitIndex! > skillsInOrbit / 2)? 0 : 1;
      const strokeColor = nodes.has(fromNode.hash) && nodes.has(toNode.hash)? "red" : "black";

      return {
        fromX: fromNode.x,
        fromY: fromNode.y,
        toX: toNode.x,
        toY: toNode.y,
        orbit: {
          radius: radius,
          fromIndex: fromNode.orbitIndex,
          toIndex: toNode.orbitIndex
        },
        skillsInOrbit: skillsInOrbit,
        sweep: sweep,
        strokeColor: strokeColor,
        from: fromNode.hash,
        to: toNode.hash,
        curved: connection.curved  
      }
    });
  }
  else { return []; }
}

/**
 * Props for {@link NodeTree}
 */
type NodeTreeProps = { 
    treeData: PassiveTreeResponse; 
    selectedNodes?: Array<number>;
    resetZoomEmitter?: ResetEventEmitter; 
};

/**
 * Displays a node tree with optional marked paths and nodes.
 */
export default function NodesTree({ treeData, selectedNodes, resetZoomEmitter }: NodeTreeProps) {
  const memoizedSelectedNodes = useMemo(
    () => new Set<string>(selectedNodes ? selectedNodes.map(num=>num.toString()) : []), 
    [selectedNodes]);

  const memoizedNodeProps = useMemo(
    ()=>createNodeProps(treeData, memoizedSelectedNodes),
    [treeData, memoizedSelectedNodes]);

  const memoizedConnectionProps = useMemo(
    ()=>createConnectionProps(treeData, memoizedSelectedNodes),
    [treeData, memoizedSelectedNodes]);

  const minX = treeData?.constants.minX || 0;
  const minY = treeData?.constants.minY || 0;
  const maxX = treeData?.constants.maxX || 0;
  const maxY = treeData?.constants.maxY || 0;
  const width = maxX - minX;
  const height = maxY - minY;

  return (
    <ZoomableSVG {...{ minX, minY, height, width }}
      scaleLimit={[0.25, 10]}
      resetZoomEmitter={resetZoomEmitter}>
      {
        memoizedConnectionProps.map((props, index) => (
          <MemoisedTreeConnection key={index} {...props} />))
      }
      {
        memoizedNodeProps.map((props, index) => (
          <MemoisedTreeNode key={index} {...props} />))
      }
    </ZoomableSVG>)
}
