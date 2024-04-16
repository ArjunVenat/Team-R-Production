import React from "react";
import SideBar from "../components/SideBar.tsx";
import { Stack } from "@mui/material";
import UplaodCSV from "../components/UploadCSV.tsx";
import DownloadCSV from "../backendreference/DownloadCSV.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import blueback from "../assets/blueback.png";

export default function UploadDownloadCSV() {
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
      <Stack direction="row">
        <SideBar />
        <div
          className="flex justify-center items-center h-screen w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${blueback})`,
            width: "100vw",
            height: "100vh",
          }}
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
      </Stack>
    </>
  );
}
