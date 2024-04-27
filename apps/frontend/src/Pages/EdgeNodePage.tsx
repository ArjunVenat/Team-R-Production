import React from "react";
import EdgeTable from "../backendreference/Edges.tsx";
import { Box, Tab, Tabs, Stack } from "@mui/material";
import { useState } from "react";
import NodeTable from "../backendreference/Nodes.tsx";
import { useAuth0 } from "@auth0/auth0-react";
// import blueback from "../assets/blueback.png";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
// import swoosh from "../assets/swoosh.png";
import UplaodCSV from "../components/UploadCSV.tsx";
import DownloadCSV from "../backendreference/DownloadCSV.tsx";
import DownloadIcon from "@mui/icons-material/Download";

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
      <div
        className="overflow-y-auto h-screen flex-grow justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundColor: `white`,
        }}
      >
        <div className="">
          <div className=" top-0 min-w-full pt-8 bg-primary">
            <Box
              sx={{
                backgroundColor: "#009CA6",
                borderColor: "white",
                display: "flex",
                justifyContent: "center",
                height: "10vh",
                alignItems: "center",
              }}
            >
              <Tabs
                TabIndicatorProps={{ style: { backgroundColor: "#f6bd39" } }}
                value={nodeTab}
                onChange={(event, newValue) => setNodeTab(newValue)}
                aria-label="basic tabs example"
              >
                <Tab
                  label="Node Table"
                  icon={
                    <ScatterPlotIcon
                      className="mx-2"
                      style={{ fontSize: "2rem" }}
                    />
                  }
                  sx={{
                    fontSize: "1rem",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    color: "white",
                    "&.Mui-selected": {
                      color: "#f6bd39",
                    },
                  }}
                />
                <Tab
                  label="Edge Table"
                  icon={
                    <LinearScaleIcon
                      className="mx-2"
                      style={{ fontSize: "2rem" }}
                    />
                  }
                  sx={{
                    fontSize: "1rem",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    color: "white",
                    "&.Mui-selected": {
                      color: "#f6bd39",
                    },
                  }}
                />
                <Tab
                  label="Upload/Download"
                  icon={
                    <DownloadIcon
                      className="mx-2"
                      style={{ fontSize: "2rem" }}
                    />
                  }
                  sx={{
                    fontSize: "1rem",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    color: "white",
                    "&.Mui-selected": {
                      color: "#f6bd39",
                    },
                  }}
                />
              </Tabs>
            </Box>
          </div>
          <CustomTabPanel value={nodeTab} index={0}>
            <NodeTable />
          </CustomTabPanel>
          <CustomTabPanel value={nodeTab} index={1}>
            <EdgeTable />
          </CustomTabPanel>
          <CustomTabPanel value={nodeTab} index={2}>
            <div
              className="flex items-center h-full w-full bg-cover bg-center bg-no-repeat"
              // style={{
              //     backgroundImage: `url(${swoosh})`,
              //     // width: "100vw",
              //     // height: "100vh",
              // }}
            >
              <Stack spacing={4}>
                <div className="text-center p-4">
                  {/*<h1 className="font-semibold text-xl">Upload CSV File:</h1>*/}
                  <UplaodCSV />
                </div>
                <div className="text-center text-lg">
                  {/*<h1 className="font-semibold text-xl">Download CSV File:</h1>*/}
                  <DownloadCSV />
                </div>
              </Stack>
            </div>
          </CustomTabPanel>
        </div>
      </div>
    </Box>
  );
};

export default EdgeTablePage;
