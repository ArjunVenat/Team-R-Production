import React from "react";
import EdgeTable from "../backendreference/Edges.tsx";
import SideBar from "../components/SideBar.tsx";
import { Box } from "@mui/material"; // Assuming NodeTable component is defined in NodeTable.tsx

const EdgeTablePage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <div className="overflow-y-auto h-screen">
        <EdgeTable />
      </div>
    </Box>
  );
};

export default EdgeTablePage;
