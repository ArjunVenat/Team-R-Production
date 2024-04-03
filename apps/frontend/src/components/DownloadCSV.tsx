import axios from "axios";
import SideBar from "./SideBar.tsx";
import { Stack, Button, Box } from "@mui/material";

//received help from Dan from team o. He fixed some errors.
export default function DownloadCSV() {
  async function fetchEdges() {
    // make an http get request to backend
    const res = await axios.get("/api/admin/csv/Edges");

    //make a new blob
    const receiveEdges = new Blob([res.data], {
      type: "text/csv;encoding:utf-8",
    });
    downloadBlob(receiveEdges, "edges.csv");
  }

  async function fetchNodes() {
    // make an http get request to backend
    const res = await axios.get("/api/admin/csv/Nodes");

    //make a new blob
    const receiveNodes = new Blob([res.data], {
      type: "text/csv;encoding:utf-8",
    });
    downloadBlob(receiveNodes, "nodes.csv");
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
          <div className="border-2 border-blue rounded-lg p-10">
            <Stack direction="row" spacing={5}>
              <Box mt={5}>
                <Button
                  onClick={fetchNodes}
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  Download Nodes File
                </Button>
              </Box>

              <Box mt={5}>
                <Button
                  onClick={fetchEdges}
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  Download Edges File
                </Button>
              </Box>
            </Stack>
          </div>
        </div>
      </div>
    </Stack>
  );
}
