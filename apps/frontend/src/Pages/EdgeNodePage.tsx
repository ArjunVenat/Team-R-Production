import React from "react";
import EdgeTable from "../backendreference/Edges.tsx";
import { Box, Button, Card, Modal, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import NodeTable from "../backendreference/Nodes.tsx";
import EmployeeTable from "../backendreference/Employees.tsx";
import { useAuth0 } from "@auth0/auth0-react";
// import blueback from "../assets/blueback.png";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
// import swoosh from "../assets/swoosh.png";
// import UplaodCSV from "../components/UploadCSV.tsx";
import DownloadCSV from "../backendreference/DownloadCSV.tsx";
// import DownloadIcon from "@mui/icons-material/Download";
import BadgeIcon from "@mui/icons-material/Badge";
import UploadCSV from "../components/UploadCSV.tsx";

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

  const [open, setOpenModal] = useState(false);
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
                  label="Employee Table"
                  icon={
                    <BadgeIcon className="mx-2" style={{ fontSize: "2rem" }} />
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
            <div className="flex  items-center flex-col">
              <div className="mb-4 flex flex-row space-x-4">
                <Box>
                  <Button
                    onClick={() => setOpenModal(true)}
                    variant="outlined"
                    sx={{
                      color: "#012d5a",
                      borderColor: "#012d5a",
                      "&:hover": {
                        borderColor: "#f6bd38",
                        color: "#f6bd38",
                      },
                    }}
                  >
                    Upload Node CSV
                  </Button>
                </Box>
                <DownloadCSV type="nodes" />
              </div>
              <NodeTable />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={nodeTab} index={1}>
            <div className="flex  items-center flex-col">
              <div className="mb-4 flex flex-row space-x-4">
                <Box>
                  <Button
                    onClick={() => setOpenModal(true)}
                    variant="outlined"
                    sx={{
                      color: "#012d5a",
                      borderColor: "#012d5a",
                      "&:hover": {
                        borderColor: "#f6bd38",
                        color: "#f6bd38",
                      },
                    }}
                  >
                    Upload Edge CSV
                  </Button>
                </Box>
                <DownloadCSV type="edges" />
              </div>
              <EdgeTable />
            </div>
          </CustomTabPanel>
          <CustomTabPanel index={2} value={nodeTab}>
            <div className="flex  items-center flex-col">
              <div className="mb-4 flex flex-row space-x-4">
                <Box>
                  <Button
                    onClick={() => setOpenModal(true)}
                    variant="outlined"
                    sx={{
                      color: "#012d5a",
                      borderColor: "#012d5a",
                      "&:hover": {
                        borderColor: "#f6bd38",
                        color: "#f6bd38",
                      },
                    }}
                  >
                    Upload Employee CSV
                  </Button>
                </Box>
                <DownloadCSV type="employees" />
              </div>
              <EmployeeTable />
            </div>
          </CustomTabPanel>
          {/*<CustomTabPanel value={nodeTab} index={3}>*/}
          {/*  <div*/}
          {/*    className="flex items-center h-full w-full bg-cover bg-center bg-no-repeat"*/}
          {/*    // style={{*/}
          {/*    //     backgroundImage: `url(${swoosh})`,*/}
          {/*    //     // width: "100vw",*/}
          {/*    //     // height: "100vh",*/}
          {/*    // }}*/}
          {/*  >*/}
          {/*    <Stack spacing={4}>*/}
          {/*      <div className="text-center p-4">*/}
          {/*        /!*<h1 className="font-semibold text-xl">Upload CSV File:</h1>*!/*/}
          {/*        <UplaodCSV />*/}
          {/*      </div>*/}
          {/*      <div className="text-center text-lg">*/}
          {/*        /!*<h1 className="font-semibold text-xl">Download CSV File:</h1>*!/*/}
          {/*        <DownloadCSV />*/}
          {/*      </div>*/}
          {/*    </Stack>*/}
          {/*  </div>*/}
          {/*</CustomTabPanel>*/}

          <Modal open={open}>
            <div className="flex justify-center items-center h-screen">
              <Card
                className=" w-1/3 shadow-md rounded-lg p-10 mx-auto mt-5 h-[50vh] "
                style={{
                  backgroundColor: "white",
                  border: "10px solid #012D5A",
                }}
              >
                <div className="flex justify-start ">
                  <Button
                    style={{
                      backgroundColor: "#012D5A",
                      color: "white",
                      marginLeft: "auto",
                    }}
                    onClick={() => setOpenModal(false)}
                  >
                    Back
                  </Button>
                </div>
                <div className="flex items-center justify-center h-full mb-4">
                  <UploadCSV />
                </div>
              </Card>
            </div>
          </Modal>
        </div>
      </div>
    </Box>
  );
};

export default EdgeTablePage;
