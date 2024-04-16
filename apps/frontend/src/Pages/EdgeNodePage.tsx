import React from "react";
import EdgeTable from "../backendreference/Edges.tsx";
import SideBar from "../components/SideBar.tsx";
import { Box, Select } from "@mui/material";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import NodeTable from "../backendreference/Nodes.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import blueback from "../assets/blueback.png";

const EdgeTablePage = () => {
  //Use auth0 react hook
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  if (!isLoading && !isAuthenticated) {
    loginWithRedirect({
      appState: {
        returnTo: location.pathname,
      },
    }).then();
  }

  const [isNode, setIsNode] = useState<boolean>(false);
  return (
    <Box display="flex">
      <SideBar />

      <div
        className="overflow-y-auto h-screen flex-grow justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${blueback})`,
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className="">
          <div className="p-4">
            <h1 className=" text-5xl text-primary font-bold p-2 text-center">
              View Node or Edge Tables
            </h1>
            <div className="ml-4">
              <Select
                className="w-1/4"
                sx={{ fontWeight: "bold" }}
                value={isNode.toString()}
                onChange={(event) => setIsNode(JSON.parse(event.target.value))}
              >
                <MenuItem value="false">Edge Table</MenuItem>
                <MenuItem value="true">Node Table</MenuItem>
              </Select>
            </div>
          </div>
        </div>
        <div>{isNode ? <NodeTable /> : <EdgeTable />}</div>
      </div>
    </Box>
  );
};

export default EdgeTablePage;
