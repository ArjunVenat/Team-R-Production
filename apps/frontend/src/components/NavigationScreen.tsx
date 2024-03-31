import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {Button} from "@mui/material";
import {Directions} from "./Directions.tsx";
import {sendDirections} from "./SendDirectionRequest.tsx";
import axios from "axios";
import {Nodes} from "database";

import {ChangeEvent} from "react";

// interface Location {
//     label: string;
//     nodeID: string;
// }
export default function NavigationScreen() {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [points, setPoints] = useState<Directions>({start: "", end: ""});
    const [nodes, setNodes] = useState<Nodes[]>();

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get("/api/map/allnodes");
            setNodes(res.data);
            console.log("successfully got data from get request");
        }

        fetchData().then();
    }, []);
    console.log(nodes);

    const Locations = nodes?.map((node) => node.LongName) || [];

    function getDirections() {
        setPoints({start: start, end: end});
        sendDirections(points).then();
    }

    return (
        <>
            <h1> Enter your start and end locations</h1>
            <div className="container">
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
            </div>

            <div className="form-item">
                <Button variant="contained" color="success" onClick={getDirections}>
                    Get Directions
                </Button>
            </div>
        </>
    );
}
