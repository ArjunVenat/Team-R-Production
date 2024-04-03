import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edges } from "database";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function EdgeTable() {
  const [edgeData, setEdgeData] = useState<Edges[]>([]);
  useEffect(() => {
    async function fetch() {
      const res = await axios.get("/api/admin/alledges");
      setEdgeData(res.data);
    }
    fetch().then();
  }, []);
  const arrayEdge = edgeData.map((edge: Edges) => (
    <TableRow
      key={edge.EdgeID}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>{edge.EdgeID}</TableCell>
      <TableCell>{edge.StartNodeID}</TableCell>
      <TableCell>{edge.EndNodeID}</TableCell>
    </TableRow>
  ));
  return (
    <Box flex={1}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Edge ID</TableCell>
              <TableCell>Start Node ID</TableCell>
              <TableCell>End Node ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{arrayEdge}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
