import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edges, Nodes } from "database";
import { Tooltip } from "@mui/material";

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
export default function SVGCanvas(props: {
  path?: Nodes[]; //Array of nodes representing the path to be highlighted
  currentMap: string; //The current map being displayed
  setCurrentMap?: (map: string) => void; //Function to set the current map
  currentLevel: string; //The current level of the map
  nodeColor?: string; //color for rendering nodes
  edgeColor?: string; //color for rendering edges
  nodeClicked?: Nodes | undefined; //The currently clicked node
  handleNodeClicked?: (node: Nodes | undefined) => void; //Function to handle node clicks
  edgeClicked?: Edges | undefined; //The currently clicked edge
  handleEdgeClicked?: (edge: Edges | undefined) => void; //Function to handle edge clicks
  handleNodeHover?: (node: Nodes | undefined) => void; //Function to handle node hover events
  isHome: boolean; //Indicates whether the canvas is being used in the home page
  showPathOnly: boolean; //Indicates whether to show only the path or the entire map
  allnodes?: Nodes[]; //Array of all nodes in the map
}) {
  const [nodesData, setNodesData] = React.useState<Nodes[]>([]);
  const [edgesData, setEdgesData] = React.useState<Edges[]>([]);
  const [currentFloor, setCurrentFloor] = useState(props.currentLevel);

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
          console.log("Successfully fetched edges");
          setEdgesData(res.data);
        } else {
          // If the request fails, log an error message
          console.error("Failed to fetch edges");
        }
      } catch (error) {
        // If an error occurs during the request, log the error
        console.error("An error occurred while fetching edges:", error);
      }
    }

    // If props.path is undefined (no path is provided), fetch the edge data
    if (props.path === undefined) {
      fetchEdges();
    }
  }, [props.path]);

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
      props.handleEdgeClicked(undefined);
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
    if (getTypePopup(node, path) === -1) {
      console.log("Click to go back to ", path[idx - 1].Floor);
    } else if (getTypePopup(node, path) === 1) {
      console.log("Click to go forwards to ", path[idx + 1].Floor);
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


    // Update the current map based on the changed floor

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

  /**
   * This function determines the type of popup to display for elevator nodes in the SVG canvas.
   * @param {Nodes} node - The elevator node for which to determine the popup type.
   * @param {Nodes[]} path - Array of nodes representing the path.
   * @returns {number} Returns the type of popup: 0 for no floor change, 1 for next floor change, -1 for previous floor change.
   */
  function getTypePopup(node: Nodes, path: Nodes[]): number {
    console.log(node);
    console.log(path);

    // Initialize the popup type
    // 0 == no floor change, 1 == next floor change, -1 == previous floor change
    let popupType: number = 0;

    // Find the index of the node in the path array
    const idx = path.findIndex((pathNode) => pathNode.NodeID === node.NodeID);
    console.log("idx:", idx);

    // If the node is found in the path array, determine its popup type based on its position
    if (idx !== -1) {
      // Check if the node is not the first or last node in the path
      if (idx !== 0 && idx !== path.length - 1) {
        const prevNode: Nodes = path[idx - 1];
        const nextNode: Nodes = path[idx + 1];
        console.log(prevNode, nextNode);

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
        return "chartreuse";
      } else if (props.path?.[props.path?.length - 1].NodeID === node.NodeID) {
        // If the node is the end of the path, color it red
        return "red";
      } else if (isElevatorOrStairs && isRelevantElevatorOrStairs) {
        // If the node is a relevant elevator or stairs, color it purple
        return "purple";
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
      props.handleEdgeClicked(edge);
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

  console.log(filteredNodes);

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

  console.log(splices());

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

  console.log(filteredEdges);

  return (
    <svg
      height="100vh"
      width="auto"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 5000 3400"
      overflow="visible"
    >
      <image href={props.currentMap} height="3400" width="5000" />
      {props.path && // Conditional rendering: Render the following content only if props.path is truthy
        splices()[0][0] && // Check if the first splice exists and contains at least one node
        splices().map((splice) => {
          // Map over each splice in the array returned by the splices function
          return splice
            .filter((node) => node.Floor === currentFloor) // Filter nodes in the current splice that are on the current floor
            .map((node, i, filteredPath) => {
              // Map over the filtered nodes in the current splice
              if (i < filteredPath.length - 1) {
                // Check if the current node is not the last node in the filtered path
                const nextNode = filteredPath[i + 1]; // Get the next node in the filtered path
                if (node && nextNode) {
                  // Check if both the current node and the next node exist
                  // Render a line connecting the current node to the next node
                  return (
                    <line
                      key={`${node.NodeID} ${nextNode.NodeID}`}
                      x1={nextNode.Xcoord}
                      y1={nextNode.Ycoord}
                      x2={node.Xcoord}
                      y2={node.Ycoord}
                      stroke={props.edgeColor ?? "blue"} // Use props.edgeColor if provided, otherwise default to "blue"
                      strokeWidth="5"
                    />
                  );
                }
              }
              return null; // Return null if the conditions are not met (no line to render)
            });
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
      })}
      {filteredNodes.map((node) => (
        <g>
          {props.path && // Check if props.path exists
          props.path.length > 0 && // Check if props.path has at least one node
          props.path.some((pathNode) => pathNode.NodeID === node.NodeID) && // Check if the current node is part of the path
          (getTypePopup(node, props.path!) == 1 || // Check if the current node goes up a floor OR
            getTypePopup(node, props.path!) == -1) ? ( // Check if the current node goes down a floor OR
            /* condition for if it is elevator or stairs && */
            // (<rect x={node.Xcoord} y={node.Ycoord} stroke={"red"} fill={"transparent"} width={"30"} height={"30"}/>):
            <g>
              <circle
                r="15"
                cx={node.Xcoord}
                cy={node.Ycoord}
                fill={getNodeColor(node)}
              />
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
            </g>
          ) : (
            <Tooltip title={node.LongName} arrow>
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
