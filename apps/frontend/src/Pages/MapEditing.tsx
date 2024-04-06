//This is the main page with the map, staff sign in, etc on the first slide in Figma.

import SideBar from "../components/SideBar.tsx";
import React, { useEffect, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
// import Canvas from "./Canvas.tsx";
import SVGCanvas from "../components/SVGCanvas.tsx";
import axios from "axios";
import { Nodes } from "database";
//import { Stack } from "react-bootstrap";
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

const floors = [
  { name: "Lower Level 1", map: lowerLevel1Map, level: "L1" },
  { name: "Lower Level 2", map: lowerLevel2Map, level: "L2" },
  { name: "First Floor", map: firstFloorMap, level: "1" },
  { name: "Second Floor", map: secondFloorMap, level: "2" },
  { name: "Third Floor", map: thirdFloorMap, level: "3" },
];

export default function MapEditing() {
  const [nodes, setNodes] = useState<Nodes[]>();
  const [currentMap, setCurrentMap] = useState(lowerLevel1Map);
  const [nodeClicked, setNodeClicked] = useState<Nodes>();

  const handleNodeClick = (node: Nodes | undefined) => {
    setNodeClicked(node);
    console.log("node Xcoord: ", node?.Xcoord, "node Ycoord: ", node?.Ycoord);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/admin/allnodes");
      const allNodes = res.data;
      const nonHallwayNodes = allNodes.filter(
        (node: { LongName: string | string[] }) =>
          !node.LongName.includes("Hallway"),
      );
      setNodes(nonHallwayNodes);
      console.log("successfully got data from get request");
    }

    fetchData().then();
  }, []);
  console.log(nodes);

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
                <ButtonGroup
                  variant="contained"
                  color="primary"
                  className="flex absolute top-1 left-1 z-10"
                >
                  <Button
                    onClick={() => zoomOut()}
                    children={<ZoomOutIcon />}
                    className="p-1"
                  />
                  <Button onClick={() => resetTransform()} children={"Reset"} />
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
                <TransformComponent>
                  <SVGCanvas
                    key={currentMap}
                    currentMap={currentMap}
                    currentLevel={
                      floors.find((floor) => floor.map === currentMap)?.level ||
                      ""
                    }
                    handleNodeClicked={handleNodeClick}
                    nodeClicked={nodeClicked}
                  />
                </TransformComponent>
              </section>
            )}
          </TransformWrapper>
        </div>
      </main>
      <aside className="bg-primary text-secondary w-screen">
        <h1 className="text-xl bg-transparent p-2 text-center">
          Clicked Node Information:
        </h1>
        {nodeClicked && (
          <div>
            <p>NodeID: {nodeClicked.NodeID}</p>
            <p>Xcoord: {nodeClicked.Xcoord}</p>
            <p>Ycoord: {nodeClicked.Ycoord}</p>
            <p>Floor: {nodeClicked.Floor}</p>
            <p>Building: {nodeClicked.Building}</p>
            <p>NodeType: {nodeClicked.NodeType}</p>
            <p>LongName: {nodeClicked.LongName}</p>
            <p>ShortName: {nodeClicked.ShortName}</p>
          </div>
        )}
        {nodeClicked === undefined && (
          <div>
            <p>NodeID: _________</p>
            <p>Xcoord: _________</p>
            <p>Ycoord: _________</p>
            <p>Floor: _________</p>
            <p>Building: _________</p>
            <p>NodeType: _________</p>
            <p>LongName: _________</p>
            <p>ShortName: _________</p>
          </div>
        )}
      </aside>
    </div>
  );
}
