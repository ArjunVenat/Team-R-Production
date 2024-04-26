import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edges, Nodes } from "database";
import { Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { useControls } from "react-zoom-pan-pinch";

// import ElevatorIcon from '@mui/icons-material/Elevator';
// import {SvgIcon} from "@mui/material";
// import {Icon} from "@mui/material";
// import { IconButton } from '@mui/material';
// import StairsTwoToneIcon from '@mui/icons-material/StairsTwoTone';
import ElevatorIcon from "../assets/image/Elevator_Icon.svg";
import { floors, defaultMap } from "./mapElements.ts";

export const EdgesCustomHook = () => {
  const [edgesData, setEdgesData] = useState<Edges[]>([]);
  return { edgesData, setEdgesData };
};

export default function SVGCanvas(props: {
  path?: Nodes[]; //Array of nodes representing the path to be highlighted
  currentMap: string; //The current map being displayed
  setCurrentMap?: (map: string) => void; //Function to set the current map
  newEdgeFlag?: boolean; //Flag for if a new edge has been made
  currentLevel: string; //The current level of the map
  nodeColor?: string; //color for rendering nodes
  edgeColor?: string; //color for rendering edges
  nodeClicked?: Nodes | undefined; //The currently clicked node
  handleNodeClicked?: (node: Nodes | undefined) => void; //Function to handle node clicks
  edgeClicked?: Edges | undefined; //The currently clicked edge
  handleEdgeClicked?: (
    edge: Edges | undefined,
    isMouseClicked: boolean,
  ) => void; //Function to handle edge clicks
  handleNodeHover?: (node: Nodes | undefined) => void; //Function to handle node hover events
  isHome: boolean; //Indicates whether the canvas is being used in the home page
  showPathOnly: boolean; //Indicates whether to show only the path or the entire map
  allnodes?: Nodes[]; //Array of all nodes in the map
  resetMapTransform: () => void; //reset map zoom/pan
  editNodeDB?: (
    nodeID: string,
    changeField: string,
    newVal: string,
  ) => Promise<void>;
}) {
  const [nodesData, setNodesData] = React.useState<Nodes[]>([]);
  const { edgesData, setEdgesData } = EdgesCustomHook();
  const [currentFloor, setCurrentFloor] = useState(props.currentLevel);
  const [hoverElevatorTooltip, setHoverElevatorTooltip] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [draggingNode, setDraggingNode] = useState<Nodes>();
  const controls = useControls();
  const { scale, positionX, positionY } = controls.instance.getContext().state;
  /**
   * This useEffect hook is responsible for updating the component's state with new node data.
   * If props.allnodes is provided, it updates the nodesData state with the new data.
   * @param {Nodes[]} props.allnodes - Array of all nodes in the map.
   */
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

  /**
   * This useEffect hook is responsible for fetching edge data from the server asynchronously
   * when props.path changes. If props.path is undefined, it fetches the edge data.
   * @param {Nodes[]} props.path - Array of nodes representing the path.
   */
  useEffect(() => {
    // Define an asynchronous function to fetch edge data from the server
    async function fetchEdges() {
      try {
        // Send a GET request to fetch edge data
        const res = await axios.get("/api/admin/alledges");
        if (res.status === 200) {
          // If the request is successful, update the edgesData state with the fetched data
          // console.log("Successfully fetched edges");
          setEdgesData(res.data);
        } else {
          // If the request fails, log an error message
          // console.error("Failed to fetch edges");
        }
      } catch (error) {
        // If an error occurs during the request, log the error
        // console.error("An error occurred while fetching edges:", error);
      }
    }

    // If props.path is undefined (no path is provided), fetch the edge data
    if (props.path === undefined) {
      fetchEdges().then();
    }
  }, [props.path, setEdgesData, props.newEdgeFlag]);

  //useEffect to set floor to current level
  useEffect(() => {
    setCurrentFloor(props.currentLevel);
  }, [props.currentLevel]);

  // console.log(props);

  /**
   * This function handles clicks on nodes in the SVG canvas.
   * It invokes the handleNodeClicked callback with the clicked node as an argument,
   * and resets the edge clicked state by invoking the handleEdgeClicked callback with undefined.
   * @param {Nodes} node - The clicked node.
   */
  function handleNodeClick(node: Nodes) {
    // If handleNodeClicked callback is provided, invoke it with the clicked node
    if (props.handleNodeClicked) {
      props.handleNodeClicked(node);
    }
    // If handleEdgeClicked callback is provided, reset the edge clicked state by invoking it with undefined
    if (props.handleEdgeClicked) {
      props.handleEdgeClicked(undefined, false);
    }
  }

  /**
   * This function handles hover events on elevator nodes in the SVG canvas.
   * It determines whether to display a popup indicating whether to go up or down
   * based on the node's position in the path array.
   * @param {Nodes} node - The hovered elevator node.
   * @param {Nodes[]} path - Array of nodes representing the path.
   */
  function handleElevatorHover(node: Nodes, path: Nodes[]) {
    // Find the index of the hovered node in the path array
    const idx = path.findIndex((pathNode) => pathNode.NodeID === node.NodeID);

    // Determine the type of popup to display based on the node's position in the path array
    // Set tool tip description use state
    if (getTypePopup(node, path) === -1) {
      // console.log("Click to go back to ", path[idx - 1].Floor);
      setHoverElevatorTooltip(
        `Click to return to Floor ${path[idx - 1].Floor}`,
      );
    } else if (getTypePopup(node, path) === 1) {
      // console.log("Click to go forwards to ", path[idx + 1].Floor);
      setHoverElevatorTooltip(
        `Click to proceed to Floor ${path[idx + 1].Floor}`,
      );
    }
  }

  /**
   * This function handles click events on elevator nodes in the SVG canvas.
   * It updates the current map based on the direction of elevator movement.
   * @param {Nodes} node - The clicked elevator node.
   * @param {number} nextFloor - The floor to which the elevator is moving (1 for going up, -1 for going down).
   * @param {Nodes[]} path - Array of nodes representing the path.
   */
  function handleElevatorClick(node: Nodes, nextFloor: number, path: Nodes[]) {
    // Find the index of the clicked node in the path array
    const idx = path.findIndex((pathNode) => pathNode.NodeID === node.NodeID);

    // Initialize the changedFloor variable with the current floor
    let changedFloor: string = path[0].Floor;

    // Determine the floor to switch to based on the direction of elevator movement
    if (nextFloor == 1) {
      // If the elevator is going up, switch to the next floor
      changedFloor = path[idx + 1].Floor;
    } else {
      // If the elevator is going down, switch to the previous floor
      changedFloor = path[idx - 1].Floor;
    }

    // Reset the map zoom and pan
    props.resetMapTransform();

    // Update the current map based on the changed floor
    props.setCurrentMap!(
      floors.find((floor) => floor.level === changedFloor)?.map || defaultMap,
    );
  }

  /**
   * This function determines the type of popup to display for elevator nodes in the SVG canvas.
   * @param {Nodes} node - The elevator node for which to determine the popup type.
   * @param {Nodes[]} path - Array of nodes representing the path.
   * @returns {number} Returns the type of popup: 0 for no floor change, 1 for next floor change, -1 for previous floor change.
   */
  function getTypePopup(node: Nodes, path: Nodes[]): number {
    // console.log(node);
    // console.log(path);

    // Initialize the popup type
    // 0 == no floor change, 1 == next floor change, -1 == previous floor change
    let popupType: number = 0;

    // Find the index of the node in the path array
    const idx = path.findIndex((pathNode) => pathNode.NodeID === node.NodeID);
    // console.log("idx:", idx);

    // If the node is found in the path array, determine its popup type based on its position
    if (idx !== -1) {
      // Check if the node is not the first or last node in the path
      if (idx !== 0 && idx !== path.length - 1) {
        const prevNode: Nodes = path[idx - 1];
        const nextNode: Nodes = path[idx + 1];
        // console.log(prevNode, nextNode);

        // If the node's floor differs from the previous node's floor, it indicates going down
        if (node.Floor !== prevNode.Floor) {
          popupType = -1;
        }
        // If the node's floor differs from the next node's floor, it indicates going up
        if (node.Floor !== nextNode.Floor) {
          popupType = 1;
        }
      }
      // If the node is the first node in the path, check the floor change relative to the next node
      else if (idx === 0) {
        const nextNode: Nodes = path[idx + 1];
        if (node.Floor !== nextNode.Floor) {
          popupType = 1;
        }
      }
      // If the node is the last node in the path, check the floor change relative to the previous node
      else if (idx === path.length - 1) {
        const prevNode: Nodes = path[idx - 1];
        if (node.Floor !== prevNode.Floor) {
          popupType = -1;
        }
      }
    }

    return popupType;
  }

  /**
   * This function determines the color of a node in the SVG canvas based on its properties and its relevance to the path.
   * @param {Nodes} node - The node for which to determine the color.
   * @returns {string} Returns the color code for the node.
   */
  const getNodeColor = (node: Nodes) => {
    // Check if props.path is defined and contains nodes
    if (props.path && props.path?.length > 0) {
      // Check if the node is an elevator or stairs
      const isElevatorOrStairs =
        node.NodeType === "ELEV" || node.NodeType === "STAI";

      // Check if the node is a relevant elevator or stairs
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

      // Determine the color based on node properties and relevance to the path
      if (props.path?.[0].NodeID === node.NodeID) {
        // If the node is the start of the path, color it chartreuse
        return "#3ECF04";
      } else if (props.path?.[props.path?.length - 1].NodeID === node.NodeID) {
        // If the node is the end of the path, color it red
        return "red";
      } else if (isElevatorOrStairs && isRelevantElevatorOrStairs) {
        // If the node is a relevant elevator or stairs, color it purple
        return "#009CA6";
      } else if (
        props.path?.some((pathNode) => pathNode.NodeID === node.NodeID)
      ) {
        // If the node is part of the path but not start or end, color it transparent
        return "transparent";
      }
    }
    // If none of the above conditions are met, return the default color "#003da6"
    return "#003da6";
  };

  function handleEdgeClick(edge: Edges) {
    if (props.handleEdgeClicked) {
      props.handleEdgeClicked(edge, true);
    }
    if (props.handleNodeClicked) {
      props.handleNodeClicked(undefined);
    }
  }

  //This variable filters the nodes data based on certain criteria
  const filteredNodes = nodesData.filter((node) => {
    // Check if the node is part of the path
    const isPartOfPath = props.path?.some(
      (pathNode) => pathNode.NodeID === node.NodeID,
    );

    // Check if the node is an elevator.
    const isElevator = node.NodeType === "ELEV";

    // Check if the elevator is relevant based on its position in the path
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
    // Return true if the node meets the filtering criteria, false otherwise
    return (
      node.Floor === props.currentLevel && // Node is on the current level
      (!props.showPathOnly || // Show all nodes or
        isPartOfPath || // node is part of the path or
        (isElevator && isRelevantElevator)) // node is a relevant elevator
    );
  });

  // console.log(filteredNodes);

  // function handleclickResetButton(node: Nodes){
  //     const idx = changeNodes.findIndex((pathNode) => pathNode.NodeID === node.NodeID);
  //     const filteredIdx = filteredNodes.findIndex((pathNode) => pathNode.NodeID === node.NodeID)
  //     //idx and filteredIdx should be the same theoretically
  //     setChangeNodes((changeNodes) => {
  //         changeNodes[idx] = filteredNodes[filteredIdx];
  //         return changeNodes;
  //     });
  // }

  /**
   * This function generates splices of the path based on floor changes.
   * @returns {Array<Array<Nodes>>} Returns an array containing arrays of nodes grouped by floor.
   */
  const splices = () => {
    // Check if props.path is defined
    if (props.path) {
      // Initialize an array to store splices of the path
      const pathSplicesList: Array<Array<Nodes>> = [];
      // Initialize an array to store nodes on the current floor
      let currentFloorSplice: Nodes[] = [props.path[0]];

      // Iterate through the path nodes to group them by floor
      for (let i = 0; i < props.path?.length - 1; i++) {
        // If the current node and the next node are on the same floor, add the next node to the current splice
        if (props.path[i].Floor === props.path[i + 1].Floor) {
          currentFloorSplice.push(props.path[i + 1]);
        } else {
          // If the next node is on a different floor, push the current splice to the pathSplicesList and start a new splice
          pathSplicesList.push(currentFloorSplice);
          currentFloorSplice = [props.path[i + 1]];
        }
      }
      // Push the last splice to the pathSplicesList
      pathSplicesList.push(currentFloorSplice);

      // Return the array containing arrays of nodes grouped by floor
      return pathSplicesList;
    }
    // Return an empty array if props.path is not defined
    return [[]];
  };

  // console.log(splices());

  //This returns array of edges that have both start and end nodes available in filteredNodes array
  const filteredEdges: Edges[] = edgesData.filter((edge) => {
    // Find the start node of the edge in the filteredNodes array
    const startNode = filteredNodes.filter(
      (node) => node.NodeID === edge.StartNodeID,
    )[0];
    // Find the end node of the edge in the filteredNodes array
    const endNode = filteredNodes.filter(
      (node) => node.NodeID === edge.EndNodeID,
    )[0];

    // Return true if both startNode and endNode are found, indicating that the edge is valid
    return startNode && endNode;
  });

  // console.log(filteredEdges);

  // function handleNodeDrag(event: React.DragEvent, node: Nodes){
  //     // event.stopPropagation();
  //     console.log(event.clientX, event.clientY, node.Xcoord, node.Ycoord);
  //     setNodesData((nodesData) => {
  //         const nodeToChange = nodesData[nodesData.findIndex((pathNode) => pathNode.NodeID === node.NodeID)];
  //         nodeToChange.Xcoord = event.clientX.toString();
  //         nodeToChange.Xcoord = event.clientX.toString();
  //         console.log(nodeToChange);
  //         return nodesData;
  //     });
  // }

  const handleMouseDown = (event: React.MouseEvent, node: Nodes) => {
    if (event.button == 0 && !props.isHome) {
      event.stopPropagation();
      // event.preventDefault();
      setIsDragging(true);
      setDraggingNode(node);
      // console.log(draggingNode);
      // console.log("started dragging");
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || draggingNode === undefined) {
      return;
    }
    const { clientX, clientY } = event;
    const dx = clientX - mousePosition.x;
    const dy = clientY - mousePosition.y;

    const mouseXOnMap = (clientX - positionX) / scale;
    const mouseYOnMap = (clientY - positionY) / scale;
    console.log(mouseXOnMap, mouseYOnMap);

    setNodesData((prevState) => {
      return prevState.map((prevNode) => {
        if (prevNode.NodeID === draggingNode.NodeID) {
          return {
            ...prevNode,
            Xcoord: (parseInt(prevNode.Xcoord) + dx).toString(),

            Ycoord: (parseInt(prevNode.Ycoord) + dy).toString(),
          };
        }
        return prevNode;
      });
    });
    setDraggingNode((prevState) => {
      if (prevState != undefined) {
        return {
          ...prevState,
          Xcoord: (parseInt(prevState.Xcoord) + dx).toString(),
          Ycoord: (parseInt(prevState.Ycoord) + dy).toString(),
        };
      }
      return undefined;
    });
    setMousePosition({ x: clientX, y: clientY });
    console.log(mousePosition);
  };
  const handleMouseUp = (event: React.MouseEvent) => {
    if (event.button == 0) {
      if (draggingNode) {
        console.log(draggingNode, "here");
        props.editNodeDB!(draggingNode.NodeID, "Xcoord", draggingNode.Xcoord);
        props.editNodeDB!(draggingNode.NodeID, "Ycoord", draggingNode.Ycoord);
        handleNodeClick(draggingNode);
      }
      setIsDragging(false);
      setDraggingNode(undefined);
      // console.log("stopped dragging");
    }
  };

  // useEffect(() => {
  //   // Attach event listeners when the component mounts
  //   window.addEventListener("mousemove", handleMouseDown);
  //   window.addEventListener("mouseup", handleMouseUp);
  //
  //   // Detach event listeners when the component unmounts
  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseDown);
  //     window.removeEventListener("mouseup", handleMouseUp);
  //   };
  // }, []);

  return (
    <svg
      height="100vh"
      width="auto"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 5000 3400"
      overflow="visible"
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseUp={(e) => handleMouseUp(e)}
    >
      <image href={props.currentMap} height="3400" width="5000" />
      {props.path && // Render the path only if props.path is defined
        splices()[0][0] && // Ensure the splices array is not empty
        splices().map((splice, index) => {
          if (splice.every((node) => node.Floor === currentFloor)) {
            const totalLength = splice.length;
            return splice.map((node, i) => {
              const nextNode = splice[i + 1];
              if (nextNode) {
                return (
                  <>
                    <path
                      d={`M ${splice[0].Xcoord},${splice[0].Ycoord} ${splice
                        .slice(1)
                        .map((node) => `L ${node.Xcoord},${node.Ycoord}`)
                        .join(" ")}`}
                      stroke="#012d5a"
                      strokeWidth="13"
                      fill="none"
                    />

                    <motion.path
                      key={`${index}`}
                      d={`M ${splice[0].Xcoord},${splice[0].Ycoord} ${splice
                        .slice(1)
                        .map((node) => `L ${node.Xcoord},${node.Ycoord}`)
                        .join(" ")}`}
                      stroke="#009CA6"
                      strokeWidth="4"
                      fill="none"
                      initial={{
                        pathLength: 0,
                        strokeDasharray: "100 50",
                        strokeDashoffset: "100",
                      }}
                      animate={{ pathLength: 2, strokeDashoffset: 0 }}
                      transition={{
                        duration: 0.5 * totalLength,
                        ease: "linear",
                        repeat: Infinity,
                        repeatDelay: 0.01,
                      }}
                    />
                  </>
                );
              }
              return null; // Return null if the conditions are not met (no line to render)
            });
          }
          return null;
        })}

      {/* Map over each edge in the filteredEdges array, defaulting to an empty array if filteredEdges is null or undefined */}
      {(filteredEdges ?? []).map((edge) => {
        const startNode = filteredNodes.filter(
          // Find the start node of the current edge in the filteredNodes array
          (node) => node.NodeID === edge.StartNodeID,
        )[0];
        const endNode = filteredNodes.filter(
          // Find the end node of the current edge in the filteredNodes array
          (node) => node.NodeID === edge.EndNodeID,
        )[0];
        return (
          //Create line that follow edges
          <g
            onClick={() => {
              handleEdgeClick(edge);
            }}
          >
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
          {props.path && // Check if props.path exists
          props.path.length > 1 && // Check if props.path has at least one node
          props.path.some((pathNode) => pathNode.NodeID === node.NodeID) && // Check if the current node is part of the path
          (getTypePopup(node, props.path!) == 1 || // Check if the current node goes up a floor OR
            getTypePopup(node, props.path!) == -1) ? ( // Check if the current node goes down a floor OR
            /* condition for if it is elevator or stairs && */
            <g>
              <circle
                r="15"
                cx={+node.Xcoord}
                cy={+node.Ycoord}
                fill={getNodeColor(node)}
              />
              {/* Set description for floor tool tip */}
              <Tooltip title={hoverElevatorTooltip} arrow>
                <image
                  onMouseOver={() => handleElevatorHover(node, props.path!)}
                  onClick={() =>
                    // Handle click event for elevator or stairs icon to switch the floor of map
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
              </Tooltip>
            </g>
          ) : (
            <Tooltip title={node.LongName} arrow>
              <circle
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() =>
                  props.handleNodeHover && props.handleNodeHover(node)
                }
                onMouseLeave={() => {
                  props.handleNodeHover && props.handleNodeHover(undefined);
                  // setIsDragging(false);
                }}
                onMouseDown={(e) => handleMouseDown(e, node)}
                cx={+node.Xcoord}
                cy={+node.Ycoord}
                r="10"
                fill={props.nodeColor ?? getNodeColor(node)}
                className={
                  "hover:stroke-[3px] hover:stroke-primary hover:fill-tertiary"
                }
              />
            </Tooltip>
          )}
        </g>
      ))}
    </svg>
  );
}
