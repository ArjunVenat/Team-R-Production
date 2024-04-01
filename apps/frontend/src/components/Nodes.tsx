import React, {useEffect, useState} from "react";
import axios from "axios";
import {Nodes} from "database";
export default function NodeTable() {
    const [nodeData, setNodeData] = useState<Nodes[]>([]);
    useEffect(() => {
        async function fetch() {
            const res = await axios.get("/api/admin/allnodes");
            setNodeData(res.data);
        }
        fetch().then();
    }, []);
    const arrayNode = nodeData.map((node: Nodes) =>
        <tr>
            <td>{node.NodeID}</td>
            <td>{node.Xcoord}</td>
            <td>{node.Ycoord}</td>
            <td>{node.Floor}</td>
            <td>{node.Building}</td>
            <td>{node.NodeType}</td>
            <td>{node.LongName}</td>
            <td>{node.ShortName}</td>
        </tr>
    );
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>NodeID</th>
                    <th>Xcoord</th>
                    <th>Ycoord</th>
                    <th>Floor</th>
                    <th>Building</th>
                    <th>LongName</th>
                    <th>ShortName</th>
                </tr>
                </thead>
                <tbody>
                {arrayNode}
                </tbody>
            </table>
        </div>
    );
}
