//This is the main page with the map, staff sign in, etc on the first slide in Figma.

import SideBar from "../components/SideBar.tsx";
import React, { ChangeEvent, useEffect, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
// import Canvas from "./Canvas.tsx";
import SVGCanvas from "../components/SVGCanvas.tsx";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Nodes } from "database";
//import { Stack } from "react-bootstrap";
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
  { name: "Lower Level 1", map: lowerLevel1Map, level: "L1" },
  { name: "Lower Level 2", map: lowerLevel2Map, level: "L2" },
  { name: "First Floor", map: firstFloorMap, level: "1" },
  { name: "Second Floor", map: secondFloorMap, level: "2" },
  { name: "Third Floor", map: thirdFloorMap, level: "3" },
];

export default function MainPage() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [nodes, setNodes] = useState<Nodes[]>();
  const [path, setPath] = React.useState<Nodes[]>([]);
  const [currentMap, setCurrentMap] = useState(lowerLevel1Map);
  const [hoveredNode, setHoveredNode] = useState<Nodes | undefined>();
  const [clickedNode, setClickedNode] = React.useState<Nodes | undefined>();

  // const navigate = useNavigate();
  // const routeChange = (path: string) => {
  //   const newPath = `/${path}`;
  //   navigate(newPath);
  // };

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/admin/allnodes/NoHall");
      const allNodes = res.data;
      setNodes(allNodes);
      console.log("successfully got data from get request");
    }

    fetchData().then();
  }, []);
  console.log(nodes);

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

  async function getDirections() {
    const startNodeArray = nodes?.filter(
      (node: Nodes) => node.LongName === start,
    );
    const endNodeArray = nodes?.filter((node: Nodes) => node.LongName === end);
    if (
      startNodeArray &&
      startNodeArray.length > 0 &&
      endNodeArray &&
      endNodeArray.length > 0
    ) {
      const startNode: string = startNodeArray[0]["NodeID"];
      // console.log("starting node floor" + startNodeArray[0].Floor);
      const startingFloor: string = startNodeArray[0].Floor;
      console.log("starting floor:" + startingFloor);
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
      const endNode: string = endNodeArray[0]["NodeID"];
      const res = await axios.get("/api/map/pathfind", {
        params: {
          startNodeID: startNode,
          endNodeID: endNode,
        },
      });
      if (res.status === 200) {
        console.log("Successfully fetched path");
      } else {
        console.error("Failed to fetch path");
      }
      console.log(res.data);
      setPath(res.data);
    } else {
      console.error("Start or end node not found");
    }
    // routeChange("home");
  }

  return (
    <div
      id="MainPage"
      className="flex h-screen overflow-hidden flex-row bg-[#d6d8d5]"
    >
      <SideBar />
      <main className="flex content-center justify-center leading-none relative">
        <div id="map" className="relative">
          <TransformWrapper alignmentAnimation={{ sizeX: 0, sizeY: 0 }}>
            {({ zoomIn, zoomOut, resetTransform }) => (
              <section>
                <ThemeProvider theme={appTheme}>
                  <ButtonGroup
                    variant="contained"
                    className="flex absolute top-1 left-1 z-10"
                  >
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
                    <Select
                      value={currentMap}
                      onChange={(event) => setCurrentMap(event.target.value)}
                      sx={{
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
                      {floors.map((floor, index) => (
                        <MenuItem key={index} value={floor.map}>
                          {floor.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </ButtonGroup>
                </ThemeProvider>
                <TransformComponent>
                  <SVGCanvas
                    key={currentMap}
                    path={path}
                    currentMap={currentMap}
                    currentLevel={
                      floors.find((floor) => floor.map === currentMap)?.level ||
                      ""
                    }
                    handleNodeHover={setHoveredNode}
                    handleNodeClicked={setClickedNode}
                    isHome={true}
                  />
                </TransformComponent>
              </section>
            )}
          </TransformWrapper>
        </div>
      </main>
      <aside className="bg-primary text-secondary flex-shrink fixed top-0 right-0 h-full rounded-l-xl">
        <h1 className="text-xl bg-transparent p-2 text-center">
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
            variant="contained"
            color="success"
            onClick={getDirections}
          >
            Get Directions
          </Button>
        </div>
        {hoveredNode && (
          <div
            style={{
              backgroundColor: "#012d5a",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              margin: "10px 0",
            }}
          >
            <p>Hovered Node:</p>
            <p>NodeID: {hoveredNode.NodeID}</p>
            <p>Name: {hoveredNode.LongName}</p>
          </div>
        )}
        {clickedNode && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              width: "fit-content",
              backgroundColor: "#012d5a",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              margin: "10px 0",
            }}
          >
            <p>Clicked Node:</p>
            <p>NodeID: {clickedNode.NodeID}</p>
            <p>Name: {clickedNode.LongName}</p>
          </div>
        )}
      </aside>
    </div>
  );
}
