import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Stack } from "@mui/material";
import { Directions } from "./Directions.tsx";
import { sendDirections } from "./SendDirectionRequest.tsx";
import axios from "axios";
import { Nodes } from "database";
import SideBar from "./SideBar.tsx";
import { useNavigate } from "react-router-dom";

import { ChangeEvent } from "react";

// interface Location {
//     label: string;
//     nodeID: string;
// }
export default function NavigationScreen() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [points, setPoints] = useState<Directions>({ start: "", end: "" });
  const [nodes, setNodes] = useState<Nodes[]>();


  const navigate = useNavigate();
  const routeChange = (path: string) => {
    const newPath = `/${path}`;
    navigate(newPath);
  };



    useEffect(() => {
        async function fetchData() {
            const res = await axios.get("/api/admin/allnodes");
            const allNodes = res.data;
            const nonHallwayNodes = allNodes.filter((node: { LongName: string | string[]; }) => !node.LongName.includes("Hallway"));
            setNodes(nonHallwayNodes);
            console.log("successfully got data from get request");
        }

        fetchData().then();
    }, []);
  console.log(nodes);

    const Locations = nodes?.map((node: Nodes) => node.LongName) || [];


    function getDirections() {
        const startNodeArray = nodes?.filter((node: Nodes) => node.LongName === start);
        const endNodeArray = nodes?.filter((node: Nodes) => node.LongName === end);
        if (startNodeArray && startNodeArray.length > 0 && endNodeArray && endNodeArray.length > 0) {
            const startNode: string = startNodeArray[0]["NodeID"];
            const endNode: string = endNodeArray[0]["NodeID"];
            setPoints({start: startNode, end: endNode});
            sendDirections(points).then();
        } else {
            console.error('Start or end node not found');
        }
        routeChange("home");
    }

  return (
    <>
        <Stack direction="row" spacing={2}>
            <SideBar/>
            <div className="grid" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '80vw'
                }}>
                <div className="grid" style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: "grid"
                    }}>
                    <div className = 'flex justify-center items-center h-full'>
                            <Stack direction="column" spacing={4}>
                                <h1 className="text-xl"> Enter your start and end locations:</h1>
                                <Autocomplete
                                    value={start}
                                    onChange={(event: ChangeEvent<unknown>, getStart: string | null) => {
                                        return setStart(getStart!);
                                    }}
                                    disablePortal
                                    id="combo-box-start"
                                    options={Locations}
                                    sx={{width: 300}}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Start Location"/>
                                    )}
                                />

                                <Autocomplete
                                    value={end}
                                    onChange={(event: ChangeEvent<unknown>, getEnd: string | null) => {
                                        setEnd(getEnd!);
                                    }}
                                    disablePortal
                                    id="combo-box-end"
                                    options={Locations}
                                    sx={{width: 300}}
                                    renderInput={(params) => (
                                        <TextField {...params} label="End Location"/>
                                    )}
                                />

                                <div className="form-item">
                                    <Button variant="contained" color="success" onClick={getDirections}>
                                        Get Directions
                                    </Button>
                                </div>
                        </Stack>
                    </div>


                </div>

            </div>
        </Stack>
    </>
);
}
