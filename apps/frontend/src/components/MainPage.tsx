//This is the main page with the map, staff sign in, etc on the first slide in Figma.

import SideBar from "./SideBar";
import React, { ChangeEvent, useEffect, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Canvas from "./Canvas.tsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Nodes } from "database";
import { Stack } from "react-bootstrap";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function MainPage() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [nodes, setNodes] = useState<Nodes[]>();
  const [path, setPath] = React.useState<Nodes[]>([]);

  const navigate = useNavigate();
  const routeChange = (path: string) => {
    const newPath = `/${path}`;
    navigate(newPath);
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

  const Locations = nodes?.map((node: Nodes) => node.LongName) || [];

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
    routeChange("home");
  }

  return (
    <div
      id="MainPage"
      className="flex h-screen overflow-hidden flex-row bg-[#d6d8d5]"
    >
      {/*<NavigationScreen/>*/}
      <SideBar />
      <>
        <Stack>
          <div
            className="grid"
            style={{
              display: "flex",
              alignItems: "center",
              minWidth: "80vw",
            }}
          >
            <div
              className="grid"
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "grid",
              }}
            >
              <div>
                <div
                  style={{ position: "absolute", zIndex: 1, right: 0, top: 0 }}
                >
                  <h1
                    className="text-xl"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                  >
                    {" "}
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
                    disablePortal
                    id="combo-box-start"
                    options={Locations}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Start Location"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
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
                    disablePortal
                    id="combo-box-end"
                    options={Locations}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="End Location"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                      />
                    )}
                  />

                  <div className="form-item">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={getDirections}
                    >
                      Get Directions
                    </Button>
                  </div>
                </div>
                <main className="flex content-center justify-center leading-none">
                  <div id={"map"} className="max-w-full">
                    <TransformWrapper
                      alignmentAnimation={{ sizeX: 0, sizeY: 0 }}
                    >
                      <TransformComponent>
                        <Canvas path={path}></Canvas>
                      </TransformComponent>
                    </TransformWrapper>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </Stack>
      </>
    </div>
  );
}

export default MainPage;
