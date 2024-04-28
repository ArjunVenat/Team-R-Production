import React, { createContext, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/SideBar.tsx";
// import ExampleRoute from "./routes/ExampleRoute.tsx";
import MainPage from "./Pages/MainPage.tsx";
import SignInPage from "./Pages/SignInPage.tsx";
import MapEditing from "./Pages/MapEditing.tsx";
//import FullServiceRequest from "./components/FullServiceRequest.tsx";
import EdgeNodePage from "./Pages/EdgeNodePage.tsx";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { ServiceRequest } from "./Interfaces/ServiceRequest.ts";
import ServiceRequestTable from "./Pages/ServiceRequestTable.tsx";
import ChatPage from "./Pages/ChatPage.tsx";
import St4t5Page from "./Pages/StatsPage.tsx";
import AboutPage from "./Pages/AboutPage.tsx";
// import DownloadCSV from "./backendreference/DownloadCSV.tsx";
// import UploadCSV from "./Pages/UploadCSV.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
// import {useAuth0} from "@auth0/auth0-react";
//this is for the login and logout pages using auth0, too tired to figure out how to call them, prob super ez idk
import { useNavigate } from "react-router-dom";
import { ServiceRequestMenu } from "./Pages/ServiceRequestMenu.tsx";
import PDMPage from "./Pages/PDMPage.tsx";
//definition of context for service requests
type appContextType = {
  requests: ServiceRequest[];
  setRequests: (state: ServiceRequest[]) => void;
};

type colorblindContextType = {
  colorblind: string;
  setColorblind: (state: string) => void;
};

export const RequestContext = createContext<appContextType>({
  requests: [],
  setRequests: (state) => state,
});

export const ColorblindContext = createContext<colorblindContextType>({
  colorblind: "none",
  setColorblind: (state) => state,
});

function App() {
  //actual list of options for service reqs
  //TODO: Add 6th option for iteration 4
  const guestOptions: string[] = [
    "Flowers",
    "Gifts",
    "Entertainment",
    "Medicine",
    "Maintenance",
    "Medical Equipment",
  ];
  const [snackbar, setSnackbar] = React.useState({
    severity: "success",
    open: false,
    message: "",
  });
  //state to manage Snackbar messages, sparsely implemented
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [colorblind, setColorblind] = useState<string>("none");
  //state to manage service requests
  const router = createBrowserRouter([
    //router config
    {
      path: "/",
      errorElement: <div />,
      element: <Root />,
      children: [
        {
          path: "",
          element: <SignInPage />,
        },
        {
          path: "home",
          element: <MainPage />,
        },
        {
          path: "editmap",
          element: <MapEditing />,
        },
        {
          path: "servicerequest",
          element: <ServiceRequestMenu />,
        },
        {
          path: "service-request-table",
          element: <ServiceRequestTable availableServices={guestOptions} />,
        },
        {
          path: "node-edge-table",
          element: <EdgeNodePage />,
        },
        {
          path: "stats",
          element: <St4t5Page />,
        },
        {
          path: "about",
          element: <AboutPage />,
        },
        {
          path: "chat",
          element: <ChatPage />,
        },
        {
          path: "doctor-match",
          element: <PDMPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
  function Root() {
    const navigate = useNavigate();
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { loginWithRedirect, logout } = useAuth0();
    // logout({
    //   logoutParams: {
    //     returnTo: window.location.origin,
    //   },
    // });
    // baby's first await logic break
    //Root component to handle Auth0 authentication and give context
    return (
      <Auth0Provider
        useRefreshTokens
        cacheLocation="localstorage"
        domain="redrockverify.us.auth0.com"
        clientId="z3HAzFMCeeSU9GehHltcf0LJYZQy0aew"
        onRedirectCallback={(appState) => {
          navigate(appState?.returnTo || window.location.pathname);
        }}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "/api",
          scope: "openid profile email offline_access",
        }}
      >
        <ColorblindContext.Provider value={{ colorblind, setColorblind }}>
          <RequestContext.Provider value={{ requests, setRequests }}>
            <div className="flex flex-grow">
              {useLocation().pathname !== "/" && <Sidebar />}
              <div className="flex flex-col flex-grow gap-5">
                <Outlet />
                <Snackbar
                  open={snackbar.open}
                  autoHideDuration={3000}
                  onClose={() =>
                    setSnackbar((prevState) => ({ ...prevState, open: false }))
                  }
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert variant="filled" sx={{ width: "100%" }}>
                    {snackbar.message}
                  </Alert>
                </Snackbar>
              </div>
            </div>
          </RequestContext.Provider>
        </ColorblindContext.Provider>
      </Auth0Provider>
    );
  }
}

export default App;
