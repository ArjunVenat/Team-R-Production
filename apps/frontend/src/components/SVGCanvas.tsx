import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edges, Nodes } from "database";
import { useAuth0 } from "@auth0/auth0-react";

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
  isHome: boolean;
  showPathOnly: boolean;
}) {
  //Use auth0 react hook
  const { getAccessTokenSilently } = useAuth0();

  const [nodesData, setNodesData] = React.useState<Nodes[]>([]);
  const [edgesData, setEdgesData] = React.useState<Edges[]>([]);
  const [currentFloor, setCurrentFloor] = useState(props.currentLevel);

  useEffect(() => {
    async function fetchNodes() {
      try {
        const token = await getAccessTokenSilently();
        const res = await axios.get("/api/admin/allnodes/All", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

    fetchNodes();
  }, [getAccessTokenSilently]);

  useEffect(() => {
    async function fetchEdges() {
      try {
        const token = await getAccessTokenSilently();
        const res = await axios.get("/api/admin/alledges", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

    if (props.path === undefined) {
      fetchEdges();
    }
  }, [props.path, getAccessTokenSilently]);

  useEffect(() => {
    setCurrentFloor(props.currentLevel);
  }, [props.currentLevel]);

  // console.log(props);

  function handleNodeClick(node: Nodes) {
    if (props.handleNodeClicked) {
      props.handleNodeClicked(node);
    }
    if (props.handleEdgeClicked) {
      props.handleEdgeClicked(undefined);
    }
  }
  const getNodeColor = (node: Nodes) => {
    if (props.path && props.path?.length > 0) {
      const isElevatorOrStairs =
        node.NodeType === "ELEV" || node.NodeType === "STAI";

      let isRelevantElevatorOrStairs = false;
      if (isElevatorOrStairs) {
        for (let i = 0; i < props.path.length; i++) {
          if (
            props.path[i].NodeID === node.NodeID &&
            ((i > 0 && props.path[i].Floor !== props.path[i - 1].Floor) ||
              (i < props.path.length - 1 &&
                props.path[i].Floor !== props.path[i + 1].Floor))
          ) {
            isRelevantElevatorOrStairs = true;
            break;
          }
        }
      }

      if (props.path?.[0].NodeID === node.NodeID) {
        return "chartreuse";
      } else if (props.path?.[props.path?.length - 1].NodeID === node.NodeID) {
        return "red";
      } else if (isElevatorOrStairs && isRelevantElevatorOrStairs) {
        return "purple";
      } else if (
        props.path?.some((pathNode) => pathNode.NodeID === node.NodeID)
      ) {
        return "transparent";
      }
    }
    return "#003da6";
  };

  function handleEdgeClick(edge: Edges) {
    if (props.handleEdgeClicked) {
      props.handleEdgeClicked(edge);
    }
    if (props.handleNodeClicked) {
      props.handleNodeClicked(undefined);
    }
  }

  const filteredNodes = nodesData.filter((node) => {
    const isPartOfPath = props.path?.some(
      (pathNode) => pathNode.NodeID === node.NodeID,
    );

    const isElevator = node.NodeType === "ELEV";

    let isRelevantElevator = false;
    if (isElevator && props.path) {
      for (let i = 0; i < props.path.length - 1; i++) {
        if (
          props.path[i].NodeID === node.NodeID &&
          props.path[i].Floor !== props.path[i + 1].Floor
        ) {
          isRelevantElevator = true;
          break;
        }
      }
    }

    return (
      node.Floor === props.currentLevel &&
      (!props.showPathOnly ||
        isPartOfPath ||
        (isElevator && isRelevantElevator))
    );
  });

  console.log(filteredNodes);

  const splices = () => {
    if (props.path) {
      const pathSplicesList: Array<Array<Nodes>> = [];
      let currentFloorSplice: Nodes[] = [props.path[0]];
      for (let i = 0; i < props.path?.length - 1; i++) {
        if (props.path[i].Floor === props.path[i + 1].Floor) {
          currentFloorSplice.push(props.path[i + 1]);
        } else {
          pathSplicesList.push(currentFloorSplice);
          currentFloorSplice = [props.path[i + 1]];
        }
      }
      pathSplicesList.push(currentFloorSplice);
      // console.log("pathSplicesList: ", pathSplicesList);
      return pathSplicesList;
    }
    return [[]];
  };

  console.log(splices());

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
      <defs>
        <marker
          id="arrow"
          markerUnits="strokeWidth"
          orient="auto"
          refX="9"
          refY="3"
          markerWidth="5"
          markerHeight="5"
        >
          <path d="M0,3 L9,6 L9,0 z" fill="blue" />
        </marker>
      </defs>
      <image href={props.currentMap} height="3400" width="5000" />
      {props.path &&
        splices()[0][0] &&
        splices().map((splice) => {
          return splice
            .filter((node) => node.Floor === currentFloor)
            .map((node, i, filteredPath) => {
              if (i < filteredPath.length - 1) {
                const nextNode = filteredPath[i + 1];
                if (node && nextNode) {
                  return (
                    <line
                      key={`${node.NodeID} ${nextNode.NodeID}`}
                      x1={nextNode.Xcoord}
                      y1={nextNode.Ycoord}
                      x2={node.Xcoord}
                      y2={node.Ycoord}
                      stroke={props.edgeColor ?? "blue"}
                      strokeWidth="5"
                    />
                  );
                }
              }
              return null;
            });
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
            fill={props.nodeColor ?? getNodeColor(node)}
          />
        </g>
      ))}
    </svg>
  );
}
