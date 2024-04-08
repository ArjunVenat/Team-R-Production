import React from "react";
import SideBar from "../components/SideBar.tsx";
import { Stack } from "@mui/material";
import UplaodCSV from "../components/UploadCSV.tsx";
import DownloadCSV from "../backendreference/DownloadCSV.tsx";

export default function UploadDownloadCSV() {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <SideBar />
        <div className="flex justify-center items-center h-screen">
          <Stack spacing={4}>
            <div className="text-center text-lg">
              <h1>Upload CSV File:</h1>
              <UplaodCSV />
            </div>
            <div className="text-center text-lg">
              <h1>Download CSV File:</h1>
              <DownloadCSV />
            </div>
          </Stack>
        </div>
      </Stack>
    </>
  );
}
