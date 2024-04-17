import React from "react";
import EdgeTable from "../backendreference/Edges.tsx";
import SideBar from "../components/SideBar.tsx";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import NodeTable from "../backendreference/Nodes.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import blueback from "../assets/blueback.png";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

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

  const [nodeTab, setNodeTab] = useState<number>(0);
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
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={nodeTab}
                onChange={(event, newValue) => setNodeTab(newValue)}
                aria-label="basic tabs example"
              >
                <Tab label="Edge Table" />
                <Tab label="Node Table" />
              </Tabs>
            </Box>
            <CustomTabPanel value={nodeTab} index={0}>
              <NodeTable />
            </CustomTabPanel>
            <CustomTabPanel value={nodeTab} index={1}>
              <EdgeTable />
            </CustomTabPanel>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default EdgeTablePage;
