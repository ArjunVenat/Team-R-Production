import React, { Dispatch, SetStateAction } from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { Alert } from "@mui/material";

export default function SuccessAlert(
  setSnackbar: Dispatch<SetStateAction<{ open: boolean }>>,
  snackbar: { severity: string; open: boolean; message: string },
) {
  return (
    <>
      <Slide direction={"up"} in={snackbar.open} mountOnEnter unmountOnExit>
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
      </Slide>
    </>
  );
}
