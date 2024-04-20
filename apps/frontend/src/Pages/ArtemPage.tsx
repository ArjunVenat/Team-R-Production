import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ArtemPage = () => {
  //Use auth0 react hook
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  if (!isLoading && !isAuthenticated) {
    loginWithRedirect({
      appState: {
        returnTo: location.pathname,
      },
    }).then();
  }

  return (
    <>
      <h1> Hello Artem</h1>
    </>
  );
};

export default ArtemPage;
