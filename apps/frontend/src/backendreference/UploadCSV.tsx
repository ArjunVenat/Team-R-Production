import React, { FormEvent, useState } from "react";
import axios from "axios";
import { Button, Box, Alert } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { primaryButtonStyle } from "../styles/muiStyles.ts";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";

// received help from Dan from team o. He fixed some errors.
export default function UploadCSV() {
  const [[showSnackbar, success, message], setSnackbar] = useState([
    false,
    false,
    "",
  ]);
  //Use auth0 react hook
  const { getAccessTokenSilently } = useAuth0(); // Using Auth0 hook to get access token

  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State to store selected file

  // Function to handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(); // Create FormData object to store form data
    const token = await getAccessTokenSilently(); // Get access token for authentication

    if (selectedFile != undefined) {
      console.log(selectedFile.name);
      formData.append("uploadFile.csv", selectedFile); // Append selected file to FormData object

      console.log(formData);

      try {
        // Send POST request backend server to upload the file
        const response = await axios.post("/api/admin/csv", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status == 200) {
          console.log("submitted csv successfully");
          setSnackbar([true, true, "CSV file uploaded successfully"]);
        } else {
          console.log("failed to submit csv");
          setSnackbar([true, false, "CSV file upload failed"]);
        }
      } catch {
        console.log("failed to submit csv");
        setSnackbar([true, false, "CSV file upload failed"]);
      }
    }
  };

  // Function to handle file selection useState
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <>
      <>
        <form
          onSubmit={(event) => {
            handleSubmit(event).then();
          }}
        >
          <h1 className="font-semibold text-xl mb-10 text-primary">
            Upload CSV File:
          </h1>
          <input type="file" onChange={handleFileSelect} />
          <br />
          <Box mt={5}>
            <Button variant="outlined" sx={primaryButtonStyle} type="submit">
              Upload File
            </Button>
          </Box>
        </form>
      </>
      <Slide direction={"down"} in={showSnackbar} mountOnEnter unmountOnExit>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => setSnackbar([false, false, ""])}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            variant="filled"
            sx={{ width: "100%" }}
            severity={success ? "success" : "error"}
          >
            {message}
          </Alert>
        </Snackbar>
      </Slide>
    </>
  );
}
