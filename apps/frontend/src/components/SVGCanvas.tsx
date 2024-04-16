import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edges, Nodes } from "database";
// import ElevatorIcon from '@mui/icons-material/Elevator';
// import {SvgIcon} from "@mui/material";
// import {Icon} from "@mui/material";
// import { IconButton } from '@mui/material';
// import StairsTwoToneIcon from '@mui/icons-material/StairsTwoTone';
import ElevatorIcon from "../assets/image/Elevator_Icon.svg";
import lowerLevel1Map from "../assets/maps/00_thelowerlevel1.png";
import lowerLevel2Map from "../assets/maps/00_thelowerlevel2.png";
import firstFloorMap from "../assets/maps/01_thefirstfloor.png";
import secondFloorMap from "../assets/maps/02_thesecondfloor.png";
import thirdFloorMap from "../assets/maps/03_thethirdfloor.png";
import { motion } from "framer-motion";
export default function SVGCanvas(props: {
  path?: Nodes[];
  currentMap: string;
  setCurrentMap?: (map: string) => void;
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
  allnodes?: Nodes[];
}) {
  const [nodesData, setNodesData] = React.useState<Nodes[]>([]);
  const [edgesData, setEdgesData] = React.useState<Edges[]>([]);
  const [currentFloor, setCurrentFloor] = useState(props.currentLevel);
  useEffect(() => {
    if (props.allnodes) setNodesData(props.allnodes);

    // async function fetchNodes() {
    //   try {
    //     const res = await axios.get("/api/admin/allnodes/All");
    //     if (res.status === 200) {
    //       console.log("Successfully fetched nodes");
    //       setNodesData(res.data);
    //     } else {
    //       console.error("Failed to fetch nodes");
    //     }
    //   } catch (error) {
    //     console.error("An error occurred while fetching nodes:", error);
    //   }
    // }

    // fetchNodes();
  }, [props.allnodes]);

  useEffect(() => {
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

    if (props.path === undefined) {
      fetchEdges();
    }
  }, [props.path]);

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

  function handleElevatorHover(node: Nodes, path: Nodes[]) {
    const idx = path.findIndex((pathNode) => pathNode.NodeID === node.NodeID);
    if (getTypePopup(node, path) === -1) {
      console.log("Click to go back to ", path[idx - 1].Floor);
    } else if (getTypePopup(node, path) === 1) {
      console.log("Click to go forwards to ", path[idx + 1].Floor);
    }
  }

  function handleElevatorClick(node: Nodes, nextFloor: number, path: Nodes[]) {
    const idx = path.findIndex((pathNode) => pathNode.NodeID === node.NodeID);
    let changedFloor: string = path[0].Floor;
    if (nextFloor == 1) {
      changedFloor = path[idx + 1].Floor;
    } else {
      changedFloor = path[idx - 1].Floor;
    }
    switch (changedFloor) {
      case "L1":
        props.setCurrentMap!(lowerLevel1Map);
        break;
      case "L2":
        props.setCurrentMap!(lowerLevel2Map);
        break;
      case "1":
        props.setCurrentMap!(firstFloorMap);
        break;
      case "2":
        props.setCurrentMap!(secondFloorMap);
        break;
      case "3":
        props.setCurrentMap!(thirdFloorMap);
        break;
      default:
        props.setCurrentMap!(lowerLevel1Map);
    }
  }

  function getTypePopup(node: Nodes, path: Nodes[]): number {
    console.log(node);
    console.log(path);
    //0 == no floor change, 1 == next floor change, -1 == prev floor change
    const idx = path.findIndex((pathNode) => pathNode.NodeID === node.NodeID);
    console.log("idx:", idx);

    if (idx != -1) {
      if (idx != 0 && idx != path.length - 1) {
        const prevNode: Nodes = path[idx - 1];
        const nextNode: Nodes = path[idx + 1];
        console.log(prevNode, nextNode);
        if (node.Floor != prevNode.Floor) {
          return -1;
        }
        if (node.Floor != nextNode.Floor) {
          return 1;
        }
      } else if (idx === 0) {
        const nextNode: Nodes = path[idx + 1];
        if (node.Floor != nextNode.Floor) {
          return 1;
        }
      } else if (idx === path.length - 1) {
        const prevNode: Nodes = path[idx - 1];
        if (node.Floor != prevNode.Floor) {
          return -1;
        }
      }
    }
    return 0;
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
        splices().map((splice, index) => {
          if (splice.every((node) => node.Floor === currentFloor)) {
            const totalLength = splice.length;
            return splice.map((node, i) => {
              const nextNode = splice[i + 1];
              if (nextNode) {
                return (
                  <motion.path
                    key={`${index}`}
                    d={`M ${splice[0].Xcoord},${splice[0].Ycoord} ${splice
                      .slice(1)
                      .map((node) => `L ${node.Xcoord},${node.Ycoord}`)
                      .join(" ")}`}
                    stroke={props.edgeColor ?? "blue"}
                    strokeWidth="5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: totalLength }}
                    transition={{
                      duration: 2 * totalLength,
                      ease: "linear",
                      repeat: Infinity,
                      repeatDelay: Math.floor(totalLength / 4),
                    }}
                  />
                );
              }
              return null;
            });
          }
          // return null;
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
        <g>
          {props.path &&
          props.path.length > 0 &&
          props.path.some((pathNode) => pathNode.NodeID === node.NodeID) &&
          (getTypePopup(node, props.path!) == 1 ||
            getTypePopup(node, props.path!) == -1) ? (
            /* condition for if it is elevator or stairs && */
            // (<rect x={node.Xcoord} y={node.Ycoord} stroke={"red"} fill={"transparent"} width={"30"} height={"30"}/>):
            <g>
              <circle
                r="15"
                cx={+node.Xcoord}
                cy={+node.Ycoord}
                fill={getNodeColor(node)}
              />
              <image
                onMouseOver={() => handleElevatorHover(node, props.path!)}
                onClick={() =>
                  handleElevatorClick(
                    node,
                    getTypePopup(node, props.path!),
                    props.path!,
                  )
                }
                key={node.NodeID}
                href={ElevatorIcon}
                x={+node.Xcoord - 30}
                y={+node.Ycoord - 30}
                width="60"
                height="60"
              />
            </g>
          ) : (
            <circle
              onClick={() => handleNodeClick(node)}
              onMouseEnter={() =>
                props.handleNodeHover && props.handleNodeHover(node)
              }
              onMouseLeave={() =>
                props.handleNodeHover && props.handleNodeHover(undefined)
              }
              cx={node.Xcoord}
              cy={node.Ycoord}
              r="10"
              fill={props.nodeColor ?? getNodeColor(node)}
            />
          )}
        </g>
      ))}
    </svg>
  );
}
