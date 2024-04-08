import React from "react";
import EdgeTable from "../backendreference/Edges.tsx";
import SideBar from "../components/SideBar.tsx";
import { Box, Select } from "@mui/material"; // Assuming NodeTable component is defined in NodeTable.tsx
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import NodeTable from "../backendreference/Nodes.tsx";

const EdgeTablePage = () => {
  const [isNode, setIsNode] = useState<boolean>(false);
  return (
    <Box display="flex">
      <SideBar />
      <div className="overflow-y-auto h-screen flex-grow">
        {isNode ? <NodeTable /> : <EdgeTable />}
      </div>
      <aside className="bg-primary text-secondary">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-xl bg-transparent p-2 text-center">
            View Node or Edge Tavles
          </h1>
          <div>
            <Select
              value={isNode}
              onChange={(event) => setIsNode(event.target.value)}
              sx={{
                backgroundColor: "#012d5a",
                color: "white",
                "&:hover": {
                  backgroundColor: "white",
                  color: "#012d5a",
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              }}
            >
              <MenuItem value={false}>Edge Table</MenuItem>
              <MenuItem value={true}>Node Table</MenuItem>
            </Select>
          </div>
        </div>
      </aside>
    </Box>
  );
};

export default EdgeTablePage;
