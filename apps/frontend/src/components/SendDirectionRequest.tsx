import { Directions } from "../Interfaces/Directions.ts";
import axios from "axios";

// This function sends a request to the backend to find directions between
// two nodes and has an array of nodes of the path between them passed in
export async function SendDirections(request: Directions) {
  // Convert the request data to JSON format.
  const data = JSON.stringify({
    startNodeID: request.start,
    endNodeID: request.end,
  });
  console.log(data);

  //ToDo: change api
  // Send a GET request to the server's map API endpoint to find directions.
  const res = await axios.get("/api/map/pathfind", {
    params: {
      startnodeid: request.start,
      endnodeid: request.end,
    },
  });

  // If no path is found, log a message indicating that.
  if (res.status == 204) {
    console.log("no path found");
  }

  // If the request is successful (status code 200), log the response data.
  if (res.status == 200) {
    //console.log(res.data);
    console.log(res.data);
  }
}
