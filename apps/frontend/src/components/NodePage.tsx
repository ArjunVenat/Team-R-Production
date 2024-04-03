import React from "react";
import NodeTable from "./Nodes.tsx";
import SideBar from "./SideBar.tsx";
import { Box } from "@mui/material"; // Assuming NodeTable component is defined in NodeTable.tsx

const NodeTablePage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <NodeTable />
    </Box>
  );
};

export default NodeTablePage;
