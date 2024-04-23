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
    <Box className="w-4/5 mx-auto">
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              style={{
                backgroundColor: "#677c8f",
                color: "white",
              }}
            >
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                Edge ID
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                Start Node ID
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                End Node ID
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            style={{
              borderWidth: 2,
              borderColor: "white",
              backgroundColor: "rgb(103,124,143, 0.15)",
            }}
          >
            {arrayEdge}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
