//This is the main page with the map, staff sign in, etc on the first slide in Figma.

import SideBar from "../components/SideBar.tsx";
import React, { useState, useEffect } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
// import Canvas from "./Canvas.tsx";
import SVGCanvas from "../components/SVGCanvas.tsx";
import axios from "axios";
import { Edges, Nodes } from "database";
import { Button, ButtonGroup, MenuItem, Stack } from "@mui/material";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import lowerLevel1Map from "../assets/maps/00_thelowerlevel1.png";
import lowerLevel2Map from "../assets/maps/00_thelowerlevel2.png";
import firstFloorMap from "../assets/maps/01_thefirstfloor.png";
import secondFloorMap from "../assets/maps/02_thesecondfloor.png";
import thirdFloorMap from "../assets/maps/03_thethirdfloor.png";
import Select from "@mui/material/Select";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/MapEditing.css";
// import { EditableEdgeContext } from "../App.tsx";

//import Table Items
import Table from "@mui/material/Table";
// import TableBody from '@mui/material/TableBody';
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
// import TableHead from '@mui/material/TableHead';
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { appTheme } from "../Interfaces/MuiTheme.ts";
import { ThemeProvider } from "@mui/material";

const floors = [
  { name: "Lower Level 2", map: lowerLevel2Map, level: "L2" },
  { name: "Lower Level 1", map: lowerLevel1Map, level: "L1" },
  { name: "First Floor", map: firstFloorMap, level: "1" },
  { name: "Second Floor", map: secondFloorMap, level: "2" },
  { name: "Third Floor", map: thirdFloorMap, level: "3" },
];

export default function MapEditing() {
  //Use auth0 react hook
  const {
    getAccessTokenSilently,
    isLoading,
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();
  if (!isLoading && !isAuthenticated) {
    loginWithRedirect({
      appState: {
        returnTo: location.pathname,
      },
    }).then();
  }

  const [nodesData, setNodesData] = useState<Nodes[]>([]);
  const [currentMap, setCurrentMap] = useState(lowerLevel1Map);
  const [nodeClicked, setNodeClicked] = useState<Nodes>();
  const [edgeClicked, setEdgeClicked] = useState<Edges>();
  const [editableEdge, setEditableEdge] = useState<Edges | undefined>();
  const [editableNode, setEditableNode] = useState<Nodes | undefined>();

  // handles nodeClicked and editableNode useState whenever node is clicked
  const handleNodeClick = (node: Nodes | undefined) => {
    setNodeClicked(node);
    if (node) {
      setEditableNode({ ...node }); // Handles clicked node and sets it as editable
    }
  };

  // handles edgeClicked and editableEdge useState whenever edge is clicked
  const handleEdgeClicked = (edge: Edges | undefined) => {
    setEdgeClicked(edge);
    if (edge) {
      setEditableEdge({ ...edge });
    }
  };

  //

  useEffect(() => {
    async function fetchData() {
      // GET request from backend to populate nodes data
      const res = await axios.get("/api/admin/allnodes/All");
      const allNodes = res.data;
      setNodesData(allNodes);
      console.log("successfully got data from get request");
    }
    // Call the fetchData function when the component mounts or when setEditableNode or setEditableEdge change
    fetchData().then();
  }, [setEditableNode, setEditableEdge]);
  console.log(nodesData);

  //This function asynchronously edits a node's information in the database
  const editNodeDB = async (
    nodeID: string,
    changeField: string,
    newVal: string,
  ) => {
    const token = await getAccessTokenSilently(); //Retrieve an access token asynchronously
    //Send POST request to update the node's information
    await axios.post(
      `/api/admin/node/edit/${nodeID}/${changeField}/${newVal}`,
      "",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  };

  //This function asynchronously edits a node's information in the database
  const editEdgeDB = async (
    edgeID: string,
    changeField: string,
    newVal: string,
  ) => {
    const token = await getAccessTokenSilently(); //Retrieve an access token asynchronously
    //Send POST request to update the node's information
    await axios.post(
      `/api/admin/edge/edit/${edgeID}/${changeField}/${newVal}`,
      "",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  };

  return (
    <div
      id="MainPage"
      className="flex h-screen overflow-hidden flex-row bg-[#d6d8d5]"
    >
      <SideBar />
      <main className="flex content-center justify-center leading-none relative">
        <TransformWrapper alignmentAnimation={{ sizeX: 0, sizeY: 0 }}>
          {({ zoomIn, zoomOut, resetTransform }) => (
            <section>
              <ThemeProvider theme={appTheme}>
                <div id="controls">
                  <ButtonGroup variant="contained">
                    <Button
                      onClick={() => zoomOut()}
                      children={<ZoomOutIcon />}
                      className="p-1"
                      sx={{
                        borderTopLeftRadius: "0.75rem",
                        borderBottomLeftRadius: "0.75rem",
                      }}
                    />
                    <Button
                      onClick={() => resetTransform()}
                      children={"Reset"}
                    />
                    <Button
                      onClick={() => zoomIn()}
                      children={<ZoomInIcon />}
                      className="p-1"
                      sx={{
                        borderTopRightRadius: "0.75rem",
                        borderBottomRightRadius: "0.75rem",
                      }}
                    />
                  </ButtonGroup>
                  <ButtonGroup
                    orientation="vertical"
                    variant="contained"
                    sx={{
                      position: "fixed",
                      bottom: 0,
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
                </div>
              </ThemeProvider>
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
                  handleEdgeClicked={handleEdgeClicked}
                  edgeClicked={edgeClicked}
                  nodeColor={"orange"}
                  edgeColor={"green"}
                  isHome={false}
                  showPathOnly={false}
                  allnodes={nodesData}
                />
              </TransformComponent>
            </section>
          )}
        </TransformWrapper>
      </main>
      <aside className="bg-primary text-secondary flex-shrink fixed top-0 right-0 h-full">
        <Stack>
          <h1 className="text-xl bg-transparent p-2 text-center">
            Clicked Node/Edge Information:
          </h1>
          {nodeClicked != undefined && (
            <div className={"items- "}>
              <TableContainer
                sx={{ margin: 5, maxWidth: 350, overflow: "auto" }}
                component={Paper}
              >
                <Table sx={{ maxWidth: 350 }} aria-label="simple table">
                  <TableRow>
                    <TableCell align="left">Node ID:</TableCell>
                    <TableCell align="left">{editableNode?.NodeID}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">X Coord:</TableCell>
                    <TableCell align="left">
                      <input
                        value={editableNode?.Xcoord || ""}
                        onChange={(e) => {
                          editNodeDB(
                            nodeClicked.NodeID,
                            "Xcoord",
                            e.target.value,
                          ).then();
                          nodeClicked.Xcoord = e.target.value;
                          setEditableNode({ ...nodeClicked });
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Y Coord:</TableCell>
                    <TableCell align="left">
                      <input
                        value={editableNode?.Ycoord || ""}
                        onChange={(e) => {
                          editNodeDB(
                            nodeClicked.NodeID,
                            "Ycoord",
                            e.target.value,
                          ).then();
                          nodeClicked.Ycoord = e.target.value;
                          setEditableNode({ ...nodeClicked });
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Floor:</TableCell>
                    <TableCell align="left">
                      <Select
                        label="Floor"
                        sx={{ width: 100 }}
                        value={editableNode?.Floor}
                        onChange={(e) => {
                          editNodeDB(
                            nodeClicked.NodeID,
                            "Floor",
                            e.target.value,
                          ).then();
                          nodeClicked.Floor = e.target.value;
                          setEditableNode({ ...nodeClicked });
                        }}
                      >
                        <MenuItem value="L2">L2</MenuItem>
                        <MenuItem value="L1">L1</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Building:</TableCell>
                    <TableCell align="left">
                      <Select
                        label="Building"
                        sx={{ width: 130 }}
                        value={editableNode?.Building}
                        onChange={(e) => {
                          editNodeDB(
                            nodeClicked.NodeID,
                            "Building",
                            e.target.value,
                          ).then();
                          nodeClicked.Building = e.target.value;
                          setEditableNode({ ...nodeClicked });
                        }}
                      >
                        <MenuItem value="15 Francis">15 Francis</MenuItem>
                        <MenuItem value="45 Francis">45 Francis</MenuItem>
                        <MenuItem value="BTM">BTM</MenuItem>
                        <MenuItem value="Shapiro">Shapiro</MenuItem>
                        <MenuItem value="Tower">Tower</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Node Type:</TableCell>
                    <TableCell align="left">
                      <Select
                        label="NodeType"
                        sx={{ width: 100 }}
                        value={editableNode?.NodeType}
                        onChange={(e) => {
                          editNodeDB(
                            nodeClicked.NodeID,
                            "NodeType",
                            e.target.value,
                          ).then();
                          nodeClicked.NodeType = e.target.value;
                          setEditableNode({ ...nodeClicked });
                        }}
                      >
                        <MenuItem value="BATH">BATH</MenuItem>
                        <MenuItem value="CONF">CONF</MenuItem>
                        <MenuItem value="DEPT">DEPT</MenuItem>
                        <MenuItem value="ELEV">ELEV</MenuItem>
                        <MenuItem value="EXIT">EXIT</MenuItem>
                        <MenuItem value="HALL">HALL</MenuItem>
                        <MenuItem value="INFO">INFO</MenuItem>
                        <MenuItem value="LABS">LABS</MenuItem>
                        <MenuItem value="REST">REST</MenuItem>
                        <MenuItem value="RETL">RETL</MenuItem>
                        <MenuItem value="SERV">SERV</MenuItem>
                        <MenuItem value="STAI">STAI</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Long Name:</TableCell>
                    <TableCell align="left">
                      <input
                        value={editableNode?.LongName || ""}
                        onChange={(e) => {
                          editNodeDB(
                            nodeClicked.NodeID,
                            "LongName",
                            e.target.value,
                          ).then();
                          nodeClicked.LongName = e.target.value;
                          setEditableNode({ ...nodeClicked });
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Short Name:</TableCell>
                    <TableCell align="left">
                      <input
                        value={editableNode?.ShortName || ""}
                        onChange={(e) => {
                          editNodeDB(
                            nodeClicked.NodeID,
                            "ShortName",
                            e.target.value,
                          ).then();
                          nodeClicked.ShortName = e.target.value;
                          setEditableNode({ ...nodeClicked });
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>

              {/*<p>NodeID: {nodeClicked.NodeID}</p>*/}
              {/*<p>Xcoord: {nodeClicked.Xcoord}</p>*/}
              {/*<p>Ycoord: {nodeClicked.Ycoord}</p>*/}
              {/*<p>Floor: {nodeClicked.Floor}</p>*/}
              {/*<p>Building: {nodeClicked.Building}</p>*/}
              {/*<p>NodeType: {nodeClicked.NodeType}</p>*/}
              {/*<p>LongName: {nodeClicked.LongName}</p>*/}
              {/*<p>ShortName: {nodeClicked.ShortName}</p>*/}
            </div>
          )}
          {edgeClicked != undefined && (
            <div>
              <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 350 }} aria-label="simple table">
                  <TableRow>
                    <TableCell align="left">Edge ID:</TableCell>
                    <TableCell align="left">
                      {edgeClicked?.EdgeID || ""}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Start Node:</TableCell>
                    <TableCell align="left">
                      <Select
                        label="StartNodeID"
                        sx={{ width: 150 }}
                        value={editableEdge?.StartNodeID}
                        onChange={(e) => {
                          editEdgeDB(
                            edgeClicked.EdgeID,
                            "StartNodeID",
                            e.target.value,
                          ).then();
                          edgeClicked.StartNodeID = e.target.value;
                          setEditableEdge({ ...edgeClicked });
                        }}
                      >
                        {nodesData.length > 0 &&
                          nodesData
                            .filter(
                              (node: Nodes) =>
                                node.NodeID != edgeClicked.EndNodeID,
                            )
                            .map((node) => (
                              <MenuItem value={node.NodeID}>
                                {node.NodeID}
                              </MenuItem>
                            ))}
                      </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">End Node:</TableCell>
                    <TableCell align="left">
                      <Select
                        label="EndNodeID"
                        sx={{ width: 150 }}
                        value={editableEdge?.EndNodeID}
                        onChange={(e) => {
                          editEdgeDB(
                            edgeClicked.EdgeID,
                            "EndNodeID",
                            e.target.value,
                          ).then();
                          edgeClicked.EndNodeID = e.target.value;
                          setEditableEdge({ ...edgeClicked });
                        }}
                      >
                        {nodesData.length > 0 &&
                          nodesData
                            .filter(
                              (node: Nodes) =>
                                node.NodeID != edgeClicked.StartNodeID,
                            )
                            .map((node) => (
                              <MenuItem value={node.NodeID}>
                                {node.NodeID}
                              </MenuItem>
                            ))}
                      </Select>
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>

              {/*<p>EdgeID: {edgeClicked.EdgeID}</p>*/}
              {/*<p>StartNodeID: {edgeClicked.StartNodeID}</p>*/}
              {/*<p>EndNodeID: {edgeClicked.EndNodeID}</p>*/}
            </div>
          )}
          {nodeClicked === undefined && edgeClicked === undefined && (
            <div>
              <p>Click on a Node or Edge to view its details</p>
            </div>
          )}
        </Stack>
      </aside>
    </div>
  );
}
