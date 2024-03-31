import React, {useEffect, useState} from "react";
import axios from "axios";
import {Edge} from "database";
export default function EdgeTable() {
    const [edgeData, setEdgeData] = useState<Edge[]>([]);
    useEffect(() => {
        async function fetch() {
            const res = await axios.get("/api/edges/read");
            setEdgeData(res.data);
        }
        fetch().then();
    }, []);
    const arrayEdge = edgeData.map((edge: Edge) =>
        <tr>
            <td>{edge.edgeID}</td>
            <td>{edge.startNodeID}</td>
            <td>{edge.endNodeID}</td>
        </tr>
    );
