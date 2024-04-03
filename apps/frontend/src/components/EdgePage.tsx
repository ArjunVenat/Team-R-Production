import React from "react";
import EdgeTable from "./Edges.tsx";
import SideBar from "./SideBar.tsx";
import { Box } from "@mui/material"; // Assuming NodeTable component is defined in NodeTable.tsx

const EdgeTablePage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <EdgeTable />
    </Box>
  );
};

export default EdgeTablePage;
