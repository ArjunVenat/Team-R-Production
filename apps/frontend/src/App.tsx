import React, {createContext, useState} from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import ExampleRoute from "./routes/ExampleRoute.tsx";
import MainPage from "./components/MainPage.tsx";
import NavigationScreen from "./components/NavigationScreen.tsx";
import SignInPage from "./components/SignInPage";
import FullServiceRequest from "./components/FullServiceRequest.tsx";
import EdgeTablePage from "./components/EdgePage.tsx";
import NodeTablePage from "./components/NodePage.tsx";
import Canvas from "./components/Canvas.tsx";
import Snackbar from "@mui/material/Snackbar";
import {Alert} from "@mui/material";
import { ServiceRequest } from "./components/ServiceRequest.tsx";
import ServiceRequestTable from "./components/ServiceRequestTable.tsx";

type appContextType = {
    requests: ServiceRequest[],
    setRequests: (state: ServiceRequest[]) => void
};

export const RequestContext = createContext<appContextType | null>(null);

import UploadCSV from "./components/UploadCSV.tsx";
function App() {
  const guestOptions: string[] = ["Flowers", "Religious", "Food", "other"]; //options for service requests
  const [snackbar, setSnackbar] = React.useState({severity: 'success', open: false, message: ''});
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div />,
      element: <Root />,
      children: [
        {
          path: "",
          element: <SignInPage setSnackBar={setSnackbar} />,
        },
        {
          path: "navigation",
          element: <NavigationScreen />,
        },
        {
          path: "home",
          element: <MainPage/>
        },
        {
          path: "servicerequest",
          element: <FullServiceRequest availableServices={guestOptions}  />
        },
          {
              path: "service-request-table",
              element: <ServiceRequestTable  />
          },
        {
          path: "edge-table",
          element: <EdgeTablePage/>
        },
        {
          path: "node-table",
          element: <NodeTablePage/>
        },
          {
              path: "upload-csv",
              element: <UploadCSV/>
          },
          {
              path: "canvas",
              element: <Canvas />
          }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
  function Root() {
    return (
      <RequestContext.Provider value={{ requests, setRequests }}>
        <div className="w-full flex flex-col gap-5">
        <Outlet />
        <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => setSnackbar(prevState => ({...prevState, open: false}))}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        >
            <Alert
                severity={snackbar.severity}
                variant="filled"
                sx={{width: '100%'}}
            >
                {snackbar.message}
            </Alert>
        </Snackbar>
      </div>
      </RequestContext.Provider>
    );
  }
}

export default App;
