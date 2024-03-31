import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import ExampleRoute from "./routes/ExampleRoute.tsx";
import MainPage from "./components/MainPage.tsx";
import NavigationScreen from "./components/NavigationScreen.tsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div />,
      element: <Root />,
      children: [
        {
          path: "",
          element: <MainPage />,
        }, {
          path: "testing",
              element: <NavigationScreen />
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
