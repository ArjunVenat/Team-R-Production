//This is the main page with the map, staff sign in, etc on the first slide in Figma.

import SideBar from "../components/SideBar.tsx";
import React, { useState, useEffect, ChangeEvent } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import SVGCanvas from "../components/SVGCanvas.tsx";
import axios from "axios";
import { Edges, Nodes } from "database";
import { TextField, Button, Box, Stack } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { CreateNodeDB } from "../backendreference/CreateNode.tsx";
import { CreateEdgeDB } from "../backendreference/CreateEdge.tsx";
import { EdgesCustomHook } from "../components/SVGCanvas.tsx";
import { FloorSelect, MapControls } from "../components/MapUtils.tsx";
import { defaultMap, floors } from "../components/mapElements.ts";

//import Table Items
import Table from "@mui/material/Table";
// import TableBody from '@mui/material/TableBody';
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
// import TableHead from '@mui/material/TableHead';
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import { appTheme } from "../Interfaces/MuiTheme.ts";
import { ThemeProvider } from "@mui/material";
import { rightSideBarStyle } from "../styles/RightSideBarStyle.ts";

let edgeFlag = false;

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

  const defaultNode: Nodes = {
    NodeID: "",
    Xcoord: "",
    Ycoord: "",
    Floor: "",
    Building: "",
    NodeType: "",
    LongName: "",
    ShortName: "",
  };

  const defaultEdge: Edges = {
    EdgeID: "",
    StartNodeID: "",
    EndNodeID: "",
  };

  const [nodesData, setNodesData] = useState<Nodes[]>([]);
  const { edgesData, setEdgesData } = EdgesCustomHook();
  const [currentMap, setCurrentMap] = useState(defaultMap);
  const [nodeClicked, setNodeClicked] = useState<Nodes>();
  const [edgeClicked, setEdgeClicked] = useState<Edges>();
  const [editableEdge, setEditableEdge] = useState<Edges | undefined>();
  const [editableNode, setEditableNode] = useState<Nodes | undefined>();
  const [isDirectionsClicked] = useState(false);
  const [path] = useState<Nodes[]>([]);
  const [addEdgeFormFlag, setAddEdgeFormFlag] = useState<boolean>(false);
  const [addEdgeID, setAddEdgeID] = useState<string>("");
  const [addEdgeStartID, setAddEdgeStartID] = useState<string>("");
  const [addEdgeEndID, setAddEdgeEndID] = useState<string>("");
  const [addNodeFormFlag, setAddNodeFormFlag] = useState<boolean>(false);
  const [addNodeID, setAddNodeID] = useState<string>("");

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

    //refresh DB
    const res = await axios.get("/api/admin/allnodes/All");
    const allNodes = res.data;
    setNodesData(allNodes);
  };

  const addNodeDB = async () => {
    setEdgeClicked(undefined);

    //Get access token
    const token = await getAccessTokenSilently();

    //Add a new node to databsae!
    const newNode = defaultNode;
    newNode.Floor = floors.find((floor) => floor.map === currentMap)!.level;
    newNode.NodeID = addNodeID;
    newNode.ShortName = newNode.NodeID + "-ShortName";
    newNode.LongName = newNode.NodeID + "-LongName";
    newNode.Xcoord = "0";
    newNode.Ycoord = "0";
    await CreateNodeDB(newNode, token);

    //Set new node
    handleNodeClick(newNode);

    //Refresh nodes data
    const updatedNodes: Nodes[] = nodesData;
    updatedNodes.push(newNode);
    setNodesData(updatedNodes);
  };

  const addEdgeDB = async () => {
    setNodeClicked(undefined);

    //Get access token
    const token = await getAccessTokenSilently();

    //Add a new edge to database
    const newEdge = defaultEdge;
    newEdge.EdgeID = addEdgeID;
    newEdge.StartNodeID = addEdgeStartID;
    newEdge.EndNodeID = addEdgeEndID;
    await CreateEdgeDB(newEdge, token);

    //Refresh edges data
    const updatedEdges: Edges[] = edgesData;
    updatedEdges.push(newEdge);
    setEdgesData(updatedEdges);
    edgeFlag = true;

    //Set new edge
    handleEdgeClicked(newEdge);
  };

  const delNodeDB = async (delType: string, nodeID: string) => {
    const token = await getAccessTokenSilently(); //Retrieve an access token asynchronously
    //Send DELETE request to update the node's information
    await axios.delete(`/api/admin/node/del/${delType}/${nodeID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const delEdgeDB = async (delType: string, edgeID: string) => {
    const token = await getAccessTokenSilently(); //Retrieve an access token asynchronously
    //Send DELETE request to update the node's information
    await axios.delete(`/api/admin/edge/del/${delType}/${edgeID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
              <TransformComponent>
                <SVGCanvas
                  key={currentMap}
                  currentMap={currentMap}
                  resetMapTransform={resetTransform}
                  newEdgeFlag={edgeFlag}
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
                  editNodeDB={editNodeDB}
                />
              </TransformComponent>
              <ThemeProvider theme={appTheme}>
                <MapControls
                  zoomIn={zoomIn}
                  zoomOut={zoomOut}
                  resetTransform={resetTransform}
                />
                <FloorSelect
                  setMap={setCurrentMap}
                  isDirectionsClicked={isDirectionsClicked}
                  path={path}
                  resetMapTransform={resetTransform}
                />{" "}
              </ThemeProvider>
            </section>
          )}
        </TransformWrapper>
      </main>
      <aside className={rightSideBarStyle}>
        <Stack direction="row" spacing={5} justifyContent="center">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="5vh"
            pt="3"
          >
            <Button
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
                setNodeClicked(undefined);
                setEdgeClicked(undefined);
                setAddEdgeFormFlag(false);
                setAddNodeID("");
                setAddNodeFormFlag(true);
              }}
            >
              Add Node
            </Button>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="5vh"
            pt="3"
          >
            <Button
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
                setNodeClicked(undefined);
                setEdgeClicked(undefined);
                setAddNodeFormFlag(false);
                setAddEdgeID("");
                setAddEdgeStartID("");
                setAddEdgeEndID("");
                setAddEdgeFormFlag(true);
              }}
            >
              Add Edge
            </Button>
          </Box>
        </Stack>
        {addEdgeFormFlag &&
          nodeClicked == undefined &&
          edgeClicked == undefined && (
            <div>
              <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                <Table sx={{ maxWidth: 350 }} aria-label="simple table">
                  <TableRow>
                    <TableCell align="left">Enter Edge ID:</TableCell>
                    <TableCell align="left">
                      <TextField
                        id="outlined-controlled"
                        label="Edge ID"
                        value={addEdgeID}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                          setAddEdgeID(event.target.value);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Enter Start Node:</TableCell>
                    <TableCell align="left">
                      <Autocomplete
                        value={addEdgeStartID}
                        onChange={(
                          e: ChangeEvent<unknown>,
                          getStartID: string | null,
                        ) => {
                          setAddEdgeStartID(getStartID!);
                        }}
                        disablePortal
                        id="combo-box-end"
                        options={nodesData.map((node: Nodes) => node.NodeID)}
                        renderInput={(params) => (
                          <TextField {...params} label="Start Node ID" />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Enter End Node:</TableCell>
                    <TableCell align="left">
                      <Autocomplete
                        value={addEdgeEndID}
                        onChange={(
                          e: ChangeEvent<unknown>,
                          getEndID: string | null,
                        ) => {
                          setAddEdgeEndID(getEndID!);
                        }}
                        disablePortal
                        id="combo-box-end"
                        options={nodesData.map((node: Nodes) => node.NodeID)}
                        renderInput={(params) => (
                          <TextField {...params} label="End Node ID" />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
              <Stack direction="row" spacing={5} justifyContent="center">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight="5vh"
                  pt="3"
                >
                  <Button
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
                      addEdgeDB().then();
                      edgeFlag = false;
                      setAddEdgeFormFlag(false);
                    }}
                  >
                    Add To Map
                  </Button>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight="5vh"
                  pt="3"
                >
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setAddEdgeFormFlag(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Stack>
            </div>
          )}
        {addNodeFormFlag &&
          nodeClicked == undefined &&
          edgeClicked == undefined && (
            <div>
              <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                <Table sx={{ maxWidth: 350 }} aria-label="simple table">
                  <TableRow>
                    <TableCell align="left">Enter Node ID:</TableCell>
                    <TableCell align="left">
                      <TextField
                        id="outlined-controlled"
                        label="Node ID"
                        value={addNodeID}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                          setAddNodeID(event.target.value);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
              <Stack direction="row" spacing={5} justifyContent="center">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight="5vh"
                  pt="3"
                >
                  <Button
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
                      addNodeDB().then();
                      edgeFlag = false;
                      setAddNodeFormFlag(false);
                    }}
                  >
                    Add To Map
                  </Button>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight="5vh"
                  pt="3"
                >
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setAddNodeFormFlag(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Stack>
            </div>
          )}
        {nodeClicked != undefined && nodeClicked != defaultNode && (
          <div className={"items- "}>
            <TableContainer
              sx={{ maxWidth: 350, marginBottom: 2 }}
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
                    <Autocomplete
                      value={nodeClicked?.Floor}
                      onChange={(
                        e: ChangeEvent<unknown>,
                        getNodeFloor: string | null,
                      ) => {
                        editNodeDB(
                          nodeClicked.NodeID,
                          "Floor",
                          getNodeFloor!,
                        ).then();
                        nodeClicked.Floor = getNodeFloor!;
                        setEditableNode({ ...nodeClicked });
                      }}
                      disablePortal
                      id="combo-box-end"
                      options={["L1", "L2", "1", "2", "3"]}
                      renderInput={(params) => (
                        <TextField {...params} label="Floor" />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Building:</TableCell>
                  <TableCell align="left">
                    <Autocomplete
                      value={nodeClicked?.Building}
                      onChange={(
                        e: ChangeEvent<unknown>,
                        getNodeBuilding: string | null,
                      ) => {
                        editNodeDB(
                          nodeClicked.NodeID,
                          "Building",
                          getNodeBuilding!,
                        ).then();
                        nodeClicked.Building = getNodeBuilding!;
                        setEditableNode({ ...nodeClicked });
                      }}
                      disablePortal
                      id="combo-box-end"
                      options={[
                        "15 Francis",
                        "45 Francis",
                        "BTM",
                        "Shapiro",
                        "Tower",
                      ]}
                      renderInput={(params) => (
                        <TextField {...params} label="Building" />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Node Type:</TableCell>
                  <TableCell align="left">
                    <Autocomplete
                      value={nodeClicked?.NodeType}
                      onChange={(
                        e: ChangeEvent<unknown>,
                        getNodeType: string | null,
                      ) => {
                        editNodeDB(
                          nodeClicked.NodeID,
                          "NodeType",
                          getNodeType!,
                        ).then();
                        nodeClicked.NodeType = getNodeType!;
                        setEditableNode({ ...nodeClicked });
                      }}
                      disablePortal
                      id="combo-box-end"
                      options={[
                        "BATH",
                        "CONF",
                        "DEPT",
                        "ELEV",
                        "EXIT",
                        "HALL",
                        "INFO",
                        "LABS",
                        "REST",
                        "RETL",
                        "SERV",
                        "STAI",
                        "STAI",
                      ]}
                      renderInput={(params) => (
                        <TextField {...params} label="Node Type" />
                      )}
                    />
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
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="5vh"
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  delNodeDB("Single", nodeClicked.NodeID).then();
                  setNodeClicked(undefined);
                  nodeClicked.NodeID = "";
                  nodeClicked.Xcoord = "";
                  nodeClicked.Ycoord = "";
                  nodeClicked.Floor = "";
                  nodeClicked.Building = "";
                  nodeClicked.NodeType = "";
                  nodeClicked.LongName = "";
                  nodeClicked.ShortName = "";
                  setEditableNode({ ...nodeClicked });
                  setAddEdgeFormFlag(false);
                }}
              >
                Delete Node
              </Button>
            </Box>
          </div>
        )}
        {edgeClicked != undefined && edgeClicked != defaultEdge && (
          <div>
            <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
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
                    <Autocomplete
                      value={editableEdge?.StartNodeID}
                      onChange={(
                        e: ChangeEvent<unknown>,
                        getStartID: string | null,
                      ) => {
                        editEdgeDB(
                          edgeClicked.EdgeID,
                          "StartNodeID",
                          getStartID!,
                        ).then();
                        edgeClicked.StartNodeID = getStartID!;
                        setEditableEdge({ ...edgeClicked });
                      }}
                      disablePortal
                      id="combo-box-end"
                      options={nodesData
                        .filter(
                          (node: Nodes) =>
                            node.NodeID != edgeClicked.StartNodeID,
                        )
                        .map((node: Nodes) => node.NodeID)}
                      renderInput={(params) => (
                        <TextField {...params} label="Start Node ID" />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">End Node:</TableCell>
                  <TableCell align="left">
                    <Autocomplete
                      value={editableEdge?.EndNodeID}
                      onChange={(
                        e: ChangeEvent<unknown>,
                        getEndID: string | null,
                      ) => {
                        editEdgeDB(
                          edgeClicked.EdgeID,
                          "EndNodeID",
                          getEndID!,
                        ).then();
                        edgeClicked.EndNodeID = getEndID!;
                        setEditableEdge({ ...edgeClicked });
                      }}
                      disablePortal
                      id="combo-box-end"
                      options={nodesData
                        .filter(
                          (node: Nodes) => node.NodeID != edgeClicked.EndNodeID,
                        )
                        .map((node: Nodes) => node.NodeID)}
                      renderInput={(params) => (
                        <TextField {...params} label="End Node ID" />
                      )}
                    />
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="5vh"
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  delEdgeDB("Single", edgeClicked.EdgeID).then();
                  setEdgeClicked(undefined);
                  edgeClicked.EdgeID = "";
                  edgeClicked.EndNodeID = "";
                  edgeClicked.StartNodeID = "";
                  setEditableEdge({ ...edgeClicked });
                  setAddEdgeFormFlag(false);
                }}
              >
                Delete Edge
              </Button>
            </Box>
          </div>
        )}
        {nodeClicked === undefined &&
          edgeClicked === undefined &&
          !addNodeFormFlag &&
          !addEdgeFormFlag && (
            <div>
              <p>Click on a Node or Edge to view its details</p>
            </div>
          )}
      </aside>
    </div>
  );
}
