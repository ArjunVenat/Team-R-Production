import React from "react";
import NodeTable from "./Nodes.tsx";
import SideBar from "./SideBar.tsx";
import { Box } from "@mui/material"; // Assuming NodeTable component is defined in NodeTable.tsx

const NodeTablePage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <div className="overflow-y-auto h-screen">
        <NodeTable />
      </div>
    </Box>
  );
};

export default NodeTablePage;
