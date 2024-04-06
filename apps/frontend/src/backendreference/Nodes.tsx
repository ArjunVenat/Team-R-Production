import React, { useEffect, useState } from "react";
import axios from "axios";
import { Nodes } from "database";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
export default function NodeTable() {
  const [nodeData, setNodeData] = useState<Nodes[]>([]);
  useEffect(() => {
    async function fetch() {
      const res = await axios.get("/api/admin/allnodes");
      setNodeData(res.data);
    }
    fetch().then();
  }, []);
  const arrayNode = nodeData.map((node: Nodes) => (
    <TableRow
      key={node.NodeID}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>{node.NodeID}</TableCell>
      <TableCell>{node.Xcoord}</TableCell>
      <TableCell>{node.Ycoord}</TableCell>
      <TableCell>{node.Floor}</TableCell>
      <TableCell>{node.Building}</TableCell>
      <TableCell>{node.NodeType}</TableCell>
      <TableCell>{node.LongName}</TableCell>
      <TableCell>{node.ShortName}</TableCell>
    </TableRow>
  ));
  return (
    <Box flex={1}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>NodeID</TableCell>
              <TableCell>Xcoord</TableCell>
              <TableCell>Ycoord</TableCell>
              <TableCell>Floor</TableCell>
              <TableCell>Building</TableCell>
              <TableCell>NodeType</TableCell>
              <TableCell>LongName</TableCell>
              <TableCell>ShortName</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{arrayNode}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
