//This is the main page with the map, staff sign in, etc on the first slide in Figma.

import SideBar from "../components/SideBar.tsx";
import React, { ChangeEvent, useEffect, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
// import Canvas from "./Canvas.tsx";
import SVGCanvas from "../components/SVGCanvas.tsx";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Nodes } from "database";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button, ButtonGroup } from "@mui/material";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

import ZoomInIcon from "@mui/icons-material/ZoomIn";
import lowerLevel1Map from "../assets/maps/00_thelowerlevel1.png";
import lowerLevel2Map from "../assets/maps/00_thelowerlevel2.png";
import firstFloorMap from "../assets/maps/01_thefirstfloor.png";
import secondFloorMap from "../assets/maps/02_thesecondfloor.png";
import thirdFloorMap from "../assets/maps/03_thethirdfloor.png";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "../Interfaces/MuiTheme.ts";
import "../styles/MainPage.css";
import { useAuth0 } from "@auth0/auth0-react";

const autocompleteStyle = {
  "& .MuiInputBase-input": { color: "white" },
  "& label.Mui-focused": { color: "white" },
  "& .MuiInputLabel-outlined": { color: "white" },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "& .MuiAutocomplete-popupIndicator": { color: "white" },
  "& .MuiAutocomplete-clearIndicator": { color: "white" },
};

const floors = [
  { name: "Lower Level 2", map: lowerLevel2Map, level: "L2" },
  { name: "Lower Level 1", map: lowerLevel1Map, level: "L1" },
  { name: "First Floor", map: firstFloorMap, level: "1" },
  { name: "Second Floor", map: secondFloorMap, level: "2" },
  { name: "Third Floor", map: thirdFloorMap, level: "3" },
];

export default function MainPage() {
  //Use auth0 react hook
  const { getAccessTokenSilently } = useAuth0();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [nodes, setNodes] = useState<Nodes[]>();
  const [path, setPath] = useState<Nodes[]>([]);
  const [currentMap, setCurrentMap] = useState(lowerLevel1Map);
  const [clickTimes, setClickTimes] = useState<number>(0);
  const [pathfindingAlgorithm, setPathfindingAlgorithm] =
    useState("/api/map/pathfind");
  const [showPathOnly, setShowPathOnly] = useState(false);
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

  // handle map change use state
  function handleMapChange(newMap: string) {
    setCurrentMap(newMap);
  }

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
      switch (startingFloor) {
        case "L1":
          setCurrentMap(lowerLevel1Map);
          break;
        case "L2":
          setCurrentMap(lowerLevel2Map);
          break;
        case "1":
          setCurrentMap(firstFloorMap);
          break;
        case "2":
          setCurrentMap(secondFloorMap);
          break;
        case "3":
          setCurrentMap(thirdFloorMap);
          break;
        default:
          setCurrentMap(lowerLevel1Map);
      }
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
                  setCurrentMap={handleMapChange}
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
                <div
                  id="zoom-and-algorithm"
                  className="absolute top-1 left-1 flex gap-1.5"
                >
                  <ButtonGroup variant="contained">
                    <Button
                      onClick={() => zoomOut()}
                      children={<ZoomOutIcon />}
                      className="p-1"
                    />
                    <Button
                      onClick={() => resetTransform()}
                      children={"Reset"}
                    />
                    <Button
                      onClick={() => zoomIn()}
                      children={<ZoomInIcon />}
                      className="p-1"
                    />
                  </ButtonGroup>
                  {/*Selecting pathfind algorithm*/}
                  <Select
                    value={pathfindingAlgorithm}
                    onChange={
                      (event) => setPathfindingAlgorithm(event.target.value) // select the proper API call for pathfinding
                    }
                    sx={{
                      boxShadow:
                        "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
                      backgroundColor: "primary.main",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                      "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    }}
                  >
                    <MenuItem value="/api/map/pathfind">A*</MenuItem>
                    <MenuItem value="/api/map/pathfind/bfs">
                      Breadth-First Search
                    </MenuItem>
                    <MenuItem value="/api/map/pathfind/dfs">
                      Depth-First Search
                    </MenuItem>
                    <MenuItem value="/api/map/pathfind/dijkstra">
                      Dijkstra's
                    </MenuItem>
                  </Select>
                </div>
                <ButtonGroup
                  orientation="vertical"
                  variant="contained"
                  sx={{
                    position: "absolute",
                    bottom: "0.25rem",
                    left: "0.25rem",
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                    "& .MuiButton-root": {
                      borderColor: "white",
                    },
                  }}
                >
                  {floors.map((floor, index) => (
                    <Button
                      key={index}
                      onClick={() => setCurrentMap(floor.map)}
                    >
                      {floor.level}
                    </Button>
                  ))}
                </ButtonGroup>
              </ThemeProvider>
            </section>
          )}
        </TransformWrapper>
      </main>
      <aside className="bg-primary/65 backdrop-blur-sm text-secondary flex-shrink fixed top-0 right-0 h-full">
        <h1 className="text-xl bg-transparent p-2 text-center ">
          Enter your start and end locations:
        </h1>
        <Autocomplete
          className="p-2"
          value={start}
          onChange={(event: ChangeEvent<unknown>, getStart: string | null) => {
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
          className="p-2"
          value={end}
          onChange={(event: ChangeEvent<unknown>, getEnd: string | null) => {
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

        <div className="flex justify-center">
          <Button
            className="content-center"
            style={{ marginRight: "5px" }}
            variant="contained"
            color="success"
            onClick={getDirections}
          >
            Get Directions
          </Button>
          <Button
            className="content-center"
            style={{ marginLeft: "5px" }}
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderColor: "#f6bd38",
              },
            }}
            onClick={resetCanvas}
          >
            Reset Map
          </Button>
        </div>
      </aside>
    </div>
  );
}
