import React, { useEffect, useState } from "react";
import axios from "axios";
import { Nodes } from "database";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
export default function NodeTable() {
  const [nodeData, setNodeData] = useState<Nodes[]>([]);
  useEffect(() => {
    async function fetch() {
      const res = await axios.get("/api/admin/allnodes/All");
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
    <Box className="w-4/5 mx-auto">
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="bg-primary">
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                NodeID
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                Xcoord
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                Ycoord
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                Floor
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                Building
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                NodeType
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                LongName
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                ShortName
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-white bg-opacity-60 backdrop-blur-md">
            {arrayNode}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
