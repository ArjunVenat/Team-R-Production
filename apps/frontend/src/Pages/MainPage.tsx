//This is the main page with the map, staff sign in, etc on the first slide in Figma.

import SideBar from "../components/SideBar.tsx";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import SVGCanvas from "../components/SVGCanvas.tsx";
import axios from "axios";
import { Nodes } from "database";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "../Interfaces/MuiTheme.ts";
import { useAuth0 } from "@auth0/auth0-react";
import { FloorSelect, MapControls } from "../components/MapUtils.tsx";
import { autocompleteStyle, buttonStyle } from "../styles/muiStyles.ts";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import StraightIcon from "@mui/icons-material/Straight";
import SyncIcon from "@mui/icons-material/Sync";
import {
  floors,
  pathfindingAlgorithms,
  defaultMap,
} from "../components/mapElements.ts";
import { rightSideBarStyle } from "../styles/RightSideBarStyle.ts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function MainPage() {
  //Use auth0 react hook
  const { getAccessTokenSilently } = useAuth0();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [nodes, setNodes] = useState<Nodes[]>();
  const [path, setPath] = useState<Nodes[]>([]);
  const [currentMap, setCurrentMap] = useState(defaultMap);
  const [clickTimes, setClickTimes] = useState<number>(0);
  const [pathfindingAlgorithm, setPathfindingAlgorithm] = useState(
    "/api/map/pathfind/a-star",
  );
  const [showPathOnly, setShowPathOnly] = useState(false);
  const [isDirectionsClicked, setIsDirectionsClicked] = useState(false);
  // const navigate = useNavigate();
  // const routeChange = (path: string) => {
  //   const newPath = `/${path}`;
  //   navigate(newPath);
  // };

  useEffect(() => {
    //async function to fetch data from the server
    async function fetchData() {
      // Send a GET request to retrieve all nodes from the server
      const res = await axios.get("/api/admin/allnodes/NoHall");
      const allNodes = res.data;
      // Update node state with the fetched node data
      setNodes(allNodes);
      console.log("successfully got data from get request");
    }

    // Call the fetchData function when the component mounts or when getAccessTokenSilently changes
    fetchData().then();
  }, [getAccessTokenSilently]);
  console.log(nodes);

  // Function to sort the long names of nodes alphabetically
  const Locations = nodes?.map((node: Nodes) => node.LongName) || [];
  Locations.sort((longname1, longname2) => {
    if (longname1 > longname2) {
      return 1;
    } else if (longname1 < longname2) {
      return -1;
    } else {
      return 0;
    }
  });

  // function to erase paths draw, make non-path nodes visible, and clear locations
  const resetCanvas = () => {
    setShowPathOnly(false);
    setPath([]); // Clear the path
    setStart(""); // Clear the start location
    setEnd(""); // Clear the end location
  };

  // Asynchronous function to retrieve directions between two nodes
  async function getDirections() {
    // Resetting state variables
    setShowPathOnly(false);
    setPath([]);

    // Filtering nodes array to find start and end nodes based on their long names
    const startNodeArray = nodes?.filter(
      (node: Nodes) => node.LongName === start,
    );
    const endNodeArray = nodes?.filter((node: Nodes) => node.LongName === end);

    // Checking if start and end nodes are found
    if (
      startNodeArray &&
      startNodeArray.length > 0 &&
      endNodeArray &&
      endNodeArray.length > 0
    ) {
      // Extracting start node ID and starting floor
      const startNode: string = startNodeArray[0]["NodeID"];
      const startingFloor: string = startNodeArray[0].Floor;

      // Setting current map based on the starting floor
      setCurrentMap(
        floors.find((floor) => floor.level === startingFloor)?.map ||
          defaultMap,
      );

      // Extracting end node ID
      const endNode: string = endNodeArray[0]["NodeID"];

      // Fetching path data from the backend using pathfinding algorithm
      const res = await axios.get(pathfindingAlgorithm, {
        params: {
          startNodeID: startNode,
          endNodeID: endNode,
        },
      });
      setShowPathOnly(true);
      if (res.status === 200) {
        console.log("Successfully fetched path");
      } else {
        console.error("Failed to fetch path");
      }
      console.log(res.data);
      setPath(res.data); // Update state with retrieved path data
    } else {
      console.error("Start or end node not found");
    }
  }

  const pathToText = (
    prevNode: Nodes | { Ycoord: number; Xcoord: number },
    startNode: Nodes,
    endNode: Nodes,
  ) => {
    // Normalization
    const px = Number(prevNode.Xcoord);
    const py = Number(prevNode.Ycoord);
    const sx = Number(startNode.Xcoord);
    const sy = Number(startNode.Ycoord);
    const ex = Number(endNode.Xcoord);
    const ey = Number(endNode.Ycoord);
    // straight
    if (
      (px === -1 && py === -1) ||
      (px === sx && sx === ex) ||
      (py === sy && sy === ey)
    ) {
      return (
        <>
          <StraightIcon />
          Continue forward toward {endNode.ShortName}
        </>
      );
    }

    // turn left
    if (
      (py === sy && px < sx && sx === ex && sy > ey) ||
      (px === sx && py > sy && sy === ey && sx > ex) ||
      (py === sy && px > sx && sx === ex && sy < ey) ||
      (px === sx && py < sy && sy === ey && sx < ex)
    ) {
      return (
        <>
          <TurnLeftIcon />
          <div>Turn left and continue to {endNode.ShortName}</div>
        </>
      );
    }

    // turn right
    if (
      (py === sy && px < sx && sx === ex && sy < ey) ||
      (px === sx && py > sy && sy === ey && sx < ex) ||
      (py === sy && px > sx && sx === ex && sy > ey) ||
      (px === sx && py < sy && sy === ey && sx > ex)
    ) {
      return (
        <>
          <TurnRightIcon />
          <div>Turn right and continue to {endNode.ShortName}</div>
        </>
      );
    }
  };

  const groupPath: { [key: string]: Nodes[] } = useMemo(() => {
    const floorMap: {
      [key: string]: Nodes[];
    } = {};
    path.forEach((item) => {
      (floorMap[item.Floor] || (floorMap[item.Floor] = [])).push(item);
    });
    return floorMap;
  }, [path]);
  console.log(groupPath);

  const sortedFloors = Object.keys(groupPath).sort((a, b) => {
    const floorA = parseInt(a, 10);
    const floorB = parseInt(b, 10);

    if (path[0].Floor === a) return -1;
    if (path[0].Floor === b) return 1;
    return floorA - floorB;
  });

  return (
    <div
      id="MainPage"
      className="flex h-screen overflow-hidden flex-row bg-[#d6d8d5]"
    >
      <SideBar />
      <main className="flex content-center justify-center leading-none relative">
        <TransformWrapper alignmentAnimation={{ sizeX: 0, sizeY: 0 }}>
          {}
          {({ zoomIn, zoomOut, resetTransform }) => (
            <section id="map">
              <TransformComponent>
                <SVGCanvas
                  key={currentMap}
                  path={path}
                  currentMap={currentMap}
                  setCurrentMap={setCurrentMap}
                  resetMapTransform={resetTransform}
                  currentLevel={
                    floors.find((floor) => floor.map === currentMap)?.level ||
                    ""
                  }
                  handleNodeClicked={(node) => {
                    const newClickTimes = clickTimes + 1;
                    setClickTimes(newClickTimes);
                    if (newClickTimes % 2 === 1) {
                      setStart(node ? node.LongName : "");
                    } else {
                      setEnd(node ? node.LongName : "");
                    }
                  }}
                  isHome={true}
                  showPathOnly={showPathOnly}
                  allnodes={nodes}
                />
              </TransformComponent>
              <ThemeProvider theme={appTheme}>
                <MapControls
                  zoomIn={zoomIn}
                  resetTransform={resetTransform}
                  zoomOut={zoomOut}
                >
                  {/*Selecting pathfind algorithm*/}
                  <Select
                    value={pathfindingAlgorithm}
                    onChange={
                      (event) => setPathfindingAlgorithm(event.target.value) // select the proper API call for pathfinding
                    }
                    sx={[
                      {
                        boxShadow:
                          "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
                      },
                      { ...buttonStyle },
                    ]}
                  >
                    {pathfindingAlgorithms.map((algorithm) => (
                      <MenuItem value={algorithm.path}>
                        {algorithm.name}
                      </MenuItem>
                    ))}
                  </Select>
                </MapControls>
                <FloorSelect
                  setMap={setCurrentMap}
                  isDirectionsClicked={isDirectionsClicked}
                  path={path}
                  resetMapTransform={resetTransform}
                />{" "}
              </ThemeProvider>

              <aside className={rightSideBarStyle}>
                <h1 className="text-xl bg-transparent text-center">
                  Enter your start and end locations:
                </h1>
                <Autocomplete
                  value={start}
                  onChange={(
                    event: ChangeEvent<unknown>,
                    getStart: string | null,
                  ) => {
                    return setStart(getStart!);
                  }}
                  id="origin"
                  options={Locations}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Start Location"
                      sx={autocompleteStyle}
                    />
                  )}
                />
                <Autocomplete
                  value={end}
                  onChange={(
                    event: ChangeEvent<unknown>,
                    getEnd: string | null,
                  ) => {
                    setEnd(getEnd!);
                  }}
                  id="destination"
                  options={Locations}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="End Location"
                      sx={autocompleteStyle}
                    />
                  )}
                />
                <div className="flex justify-center gap-3">
                  <Button
                    className="content-center"
                    variant="contained"
                    color="success"
                    onClick={() => {
                      getDirections();
                      setIsDirectionsClicked(true);
                      resetTransform();
                    }}
                  >
                    Get Directions
                  </Button>
                  <Button
                    className="content-center"
                    variant="outlined"
                    sx={{
                      color: "white",
                      borderColor: "white",
                      "&:hover": {
                        borderColor: "#f6bd38",
                        color: "#f6bd38",
                      },
                    }}
                    onClick={() => {
                      resetCanvas();
                      setIsDirectionsClicked(false);
                      resetTransform();
                    }}
                  >
                    Reset Map
                  </Button>
                </div>

                {path.length > 0 && (
                  <Box maxWidth={330}>
                    <Box mb={2} display="flex" gap={1} alignItems="center">
                      <SyncIcon />
                      {end} from {start}
                    </Box>
                    {sortedFloors.map((key) => (
                      <Accordion
                        key={key}
                        onChange={() => {
                          const matchedFloor = floors.find(
                            (floor) => floor.level === key,
                          );
                          setCurrentMap(matchedFloor ? matchedFloor.map : "");
                        }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          Floor {key}
                        </AccordionSummary>
                        <AccordionDetails
                          style={{ overflow: "auto", maxHeight: "200px" }}
                        >
                          {groupPath[key].map((item, index) => {
                            return (
                              <Box
                                mb={2}
                                display="flex"
                                gap={1}
                                alignItems="center"
                                key={index}
                              >
                                {index !== groupPath[key].length - 1 ? (
                                  pathToText(
                                    index !== 0
                                      ? groupPath[key][index - 1]
                                      : { Xcoord: -1, Ycoord: -1 },
                                    item,
                                    groupPath[key][index + 1],
                                  )
                                ) : (
                                  <div />
                                )}
                              </Box>
                            );
                          })}
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Box>
                )}
              </aside>
            </section>
          )}
        </TransformWrapper>
      </main>
    </div>
  );
}
