import React from "react";
import NodeTable from "../backendreference/Nodes.tsx";
import SideBar from "../components/SideBar.tsx";
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
