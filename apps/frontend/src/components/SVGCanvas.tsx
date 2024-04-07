import React, { useEffect } from "react";
import axios from "axios";
import { Nodes } from "database";
import { Edges } from "database";

export default function SVGCanvas(props: {
  path?: Nodes[];
  currentMap: string;
  currentLevel: string;
  nodeColor?: string;
  edgeColor?: string;
  nodeClicked?: Nodes | undefined;
  handleNodeClicked?: (node: Nodes | undefined) => void;
  edgeClicked?: Edges | undefined;
  handleEdgeClicked?: (edge: Edges | undefined) => void;
  handleNodeHover?: (node: Nodes | undefined) => void;
}) {
  const [nodesData, setNodesData] = React.useState<Nodes[]>([]);
  const [edgesData, setEdgesData] = React.useState<Edges[]>([]);

  useEffect(() => {
    fetchNodes();
  }, []);

  useEffect(() => {
    if (props.path === undefined) {
      fetchEdges();
    }
  }, [props.path]);

  // console.log(props);

  async function fetchNodes() {
    try {
      const res = await axios.get("/api/admin/allnodes");
      if (res.status === 200) {
        console.log("Successfully fetched nodes");
        setNodesData(res.data);
      } else {
        console.error("Failed to fetch nodes");
      }
    } catch (error) {
      console.error("An error occurred while fetching nodes:", error);
    }
  }

  async function fetchEdges() {
    try {
      const res = await axios.get("/api/admin/alledges");
      if (res.status === 200) {
        console.log("Successfully fetched edges");
        setEdgesData(res.data);
      } else {
        console.error("Failed to fetch nodes");
      }
    } catch (error) {
      console.error("An error occurred while fetching nodes:", error);
    }
  }

  function handleNodeClick(node: Nodes) {
    if (props.handleNodeClicked) {
      props.handleNodeClicked(node);
    }
    if (props.handleEdgeClicked) {
      props.handleEdgeClicked(undefined);
    }
  }
  function handleEdgeClick(edge: Edges) {
    if (props.handleEdgeClicked) {
      props.handleEdgeClicked(edge);
    }
    if (props.handleNodeClicked) {
      props.handleNodeClicked(undefined);
    }
  }

  const filteredNodes = nodesData.filter(
    (node) => node.Floor === props.currentLevel,
  );

  const filteredEdges: Edges[] = edgesData.filter((edge) => {
    const startNode = filteredNodes.filter(
      (node) => node.NodeID === edge.StartNodeID,
    )[0];
    const endNode = filteredNodes.filter(
      (node) => node.NodeID === edge.EndNodeID,
    )[0];
    return startNode && endNode;
  });

  console.log(filteredEdges);

  return (
    <svg
      height="100vh"
      width="auto"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 5000 3400"
    >
      <image href={props.currentMap} height="3400" width="5000" />
      {(props.path ?? []).map((node, i) => {
        if (i < (props.path ?? []).length - 1) {
          const nextNode = (props.path ?? [])[i + 1];
          return (
            <line
              x1={node.Xcoord}
              y1={node.Ycoord}
              x2={nextNode.Xcoord}
              y2={nextNode.Ycoord}
              stroke={props.edgeColor ?? "blue"}
              strokeWidth="5"
            />
          );
        }
        return null;
      })}

      {(filteredEdges ?? []).map((edge) => {
        const startNode = filteredNodes.filter(
          (node) => node.NodeID === edge.StartNodeID,
        )[0];
        const endNode = filteredNodes.filter(
          (node) => node.NodeID === edge.EndNodeID,
        )[0];
        return (
          <g onClick={() => handleEdgeClick(edge)}>
            <line
              x1={startNode.Xcoord}
              y1={startNode.Ycoord}
              x2={endNode.Xcoord}
              y2={endNode.Ycoord}
              stroke={props.edgeColor ?? "blue"}
              strokeWidth="5"
            />
          </g>
        );
        return null;
      })}
      {filteredNodes.map((node) => (
        <g
          onClick={() => handleNodeClick(node)}
          onMouseEnter={() =>
            props.handleNodeHover && props.handleNodeHover(node)
          }
          onMouseLeave={() =>
            props.handleNodeHover && props.handleNodeHover(undefined)
          }
        >
          <circle
            cx={node.Xcoord}
            cy={node.Ycoord}
            r="10"
            fill={props.nodeColor ?? "red"}
          />
        </g>
      ))}
    </svg>
  );
}
