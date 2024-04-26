import { ReactNode } from "react";
import { primaryButtonStyle } from "../styles/muiStyles.ts";
import { Box, Button } from "@mui/material";

export function UpDownBox(props: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center min-w-80vw">
      <div className="grid justify-center items-center">
        <div className="backdrop-blur-md rounded-lg p-10 bg-translucentGrey">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export function DownloadCSVItem(props: {
  children: ReactNode | string;
  clickHandler: () => void;
}) {
  return (
    <Box mt={5}>
      <Button
        onClick={props.clickHandler}
        variant="outlined"
        sx={primaryButtonStyle}
        type="submit"
      >
        {props.children}
      </Button>
    </Box>
  );
}
