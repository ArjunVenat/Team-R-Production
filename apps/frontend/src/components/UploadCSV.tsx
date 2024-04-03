import React, { FormEvent, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar.tsx";
import { Stack, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import SuccessAlert from "./SuccessAlert.tsx";

// received help from Dan from team o. He fixed some errors.
export default function UploadCSV() {
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const navigate = useNavigate();
  const routeChange = (path: string) => {
    const newPath = `/${path}`;
    navigate(newPath);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (selectedFile != undefined) {
      console.log(selectedFile.name);
      formData.append("uploadFile.csv", selectedFile);

      console.log(formData);

      const response = await axios.post("/api/admin/csv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status == 200) {
        console.log("submitted csv successfully");

        //ToDo: Test this!!!
        // SuccessAlert();
        routeChange("home");
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <SideBar />
      <div
        className="grid"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "80vw",
        }}
      >
        <div
          className="grid"
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "grid",
          }}
        >
          <form
            onSubmit={(event) => {
              handleSubmit(event).then();
            }}
          >
            <input type="file" onChange={handleFileSelect} />
            <br />
            <Box mt={5}>
              <Button variant="contained" color="success" type="submit">
                Upload File
              </Button>
            </Box>
          </form>
        </div>
      </div>
    </Stack>
  );
}
