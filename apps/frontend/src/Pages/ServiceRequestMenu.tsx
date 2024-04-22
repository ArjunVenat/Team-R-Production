import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IconButton } from "@mui/material";
import Sidebar from "../components/SideBar.tsx";

export interface ListOfServices {
  availableServices: string[];
}

export function ServiceRequestMenu({ availableServices }: ListOfServices) {
  // Use the Auth0 React hook to handle authentication.
  const {
    //getAccessTokenSilently,
    isLoading,
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  // Check if authentication is not in progress and the user is not authenticated.
  if (!isLoading && !isAuthenticated) {
    // Redirect user to login page with return state to the current location.
    loginWithRedirect({
      appState: {
        returnTo: location.pathname,
      },
    }).then();
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex flex-col flex-grow items-center *:items-center">
        <h1 className="justify-self-start">Service Request Menu</h1>
        <div className="flex flex-grow flex-col justify-center w-fit">
          <div className="w-20">
            {" "}
            {/*sets the width of the grid, controls wrap-around*/}
            <div className="flex flex-wrap">
              {availableServices.map((service) => (
                <IconButton>{service}</IconButton>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
