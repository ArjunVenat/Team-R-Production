import React, {useEffect, useState} from "react";
import axios from "axios";
import {Edges} from "database";
export default function EdgeTable() {
    const [edgeData, setEdgeData] = useState<Edges[]>([]);
    useEffect(() => {
        async function fetch() {
            const res = await axios.get("/api/admin/alledges");
            setEdgeData(res.data);
        }
        fetch().then();
    }, []);
    const arrayEdge = edgeData.map((edge: Edges) =>
        <tr>
            <td>{edge.EdgeID}</td>
            <td>{edge.StartNodeID}</td>
            <td>{edge.EndNodeID}</td>
        </tr>
    );
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Edge ID</th>
                    <th>Start Node ID</th>
                    <th>End Node ID</th>
                </tr>
                </thead>
                <tbody>
                {arrayEdge}
                </tbody>
            </table>
        </div>
    );
}
