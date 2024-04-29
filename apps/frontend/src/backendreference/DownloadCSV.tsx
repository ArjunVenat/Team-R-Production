import axios from "axios";
// import SideBar from "../components/SideBar.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { primaryButtonStyle } from "../styles/muiStyles.ts";
import { ReactNode } from "react";
import { Button } from "@mui/material";

interface Props {
  type: string;
}

export function DownloadCSVItem(props: {
  children: ReactNode | string;
  clickHandler: () => void;
}) {
  return (
    <Button
      onClick={props.clickHandler}
      variant="outlined"
      sx={primaryButtonStyle}
      type="submit"
    >
      {props.children}
    </Button>
  );
}

//received help from Dan from team o. He fixed some errors.
export default function DownloadCSV(props: Props) {
  //Use auth0 react hook
  const { getAccessTokenSilently } = useAuth0();

  async function fetchEdges() {
    // make an http get request to backend
    const token = await getAccessTokenSilently();
    const res = await axios.get("/api/admin/csv/Edges", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //make a new blob
    const receiveEdges = new Blob([res.data], {
      type: "text/csv;encoding:utf-8",
    });
    downloadBlob(receiveEdges, "edges.csv");
  }

  async function fetchNodes() {
    // make an http get request to backend
    const token = await getAccessTokenSilently();
    const res = await axios.get("/api/admin/csv/Nodes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //make a new blob
    const receiveNodes = new Blob([res.data], {
      type: "text/csv;encoding:utf-8",
    });
    downloadBlob(receiveNodes, "nodes.csv");
  }

  async function fetchEmployees() {
    // make an http get request to backend
    const token = await getAccessTokenSilently();
    const res = await axios.get("/api/admin/csv/Employee", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //make a new blob
    const receiveEmployees = new Blob([res.data], {
      type: "text/csv;encoding:utf-8",
    });
    downloadBlob(receiveEmployees, "employees.csv");
  }

  async function fetchDoctors() {
    const token = await getAccessTokenSilently();
    const res = await axios.get("/api/admin/csv/Doctor", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const receiveDoctors = new Blob([res.data], {
      type: "text/csv;encoding:utf-8",
    });
    downloadBlob(receiveDoctors, "doctors.csv");
  }

  function downloadBlob(blob: Blob, filePath: string) {
    const blobURL = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = blobURL;
    link.download = filePath;

    document.body.appendChild(link);

    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      }),
    );

    document.body.removeChild(link);
  }

  return (
    <>
      {props.type === "nodes" && (
        <DownloadCSVItem
          clickHandler={fetchNodes}
          children="Download Nodes File"
        />
      )}

      {props.type === "edges" && (
        <DownloadCSVItem
          clickHandler={fetchEdges}
          children="Download Edges File"
        />
      )}

      {props.type == "employees" && (
        <DownloadCSVItem
          clickHandler={fetchEmployees}
          children="Download Employees File"
        />
      )}

      {props.type == "doctor" && (
        <DownloadCSVItem
          clickHandler={fetchDoctors}
          children="Download Doctors File"
        />
      )}
    </>
  );
}
