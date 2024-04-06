import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { Alert } from "@mui/material";

export default function SuccessAlert() {
  const [state, setState] = React.useState(true);

  return (
    <>
      <Slide direction={"up"} in={state} mountOnEnter unmountOnExit>
        <Snackbar
          open={state}
          autoHideDuration={3000}
          onClose={() => setState(false)}
        >
          <Alert
            onClose={() => setState(false)}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            This is a success Alert inside a Snackbar!
          </Alert>
        </Snackbar>
      </Slide>
    </>
  );
}
