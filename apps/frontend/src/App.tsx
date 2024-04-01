import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import ExampleRoute from "./routes/ExampleRoute.tsx";
import MainPage from "./components/MainPage.tsx";
import NavigationScreen from "./components/NavigationScreen.tsx";
import SignInPage from "./components/SignInPage";
import FullServiceRequest from "./components/FullServiceRequest.tsx";
import EdgeTablePage from "./components/EdgePage.tsx";
import NodeTablePage from "./components/NodePage.tsx";
function App() {
  const guestOptions: string[] = ["Flowers", "Religious", "Food", "other"]; //options for service requests
  const router = createBrowserRouter([
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
          path: "testing",
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
          path: "edge-table",
          element: <EdgeTablePage/>
        },
        {
          path: "node-table",
          element: <NodeTablePage/>
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
  function Root() {
    return (
      <div className="w-full flex flex-col gap-5">
        <Outlet />
      </div>
    );
  }
}

export default App;
