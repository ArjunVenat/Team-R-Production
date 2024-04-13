import { Directions } from "../Interfaces/Directions.ts";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export async function SendDirections(request: Directions) {
  //Use auth0 react hook
  const { getAccessTokenSilently } = useAuth0();

  const data = JSON.stringify({
    startNodeID: request.start,
    endNodeID: request.end,
  });
  console.log(data);

  //ToDo: change api
  const token = await getAccessTokenSilently();
  const res = await axios.get("/api/map/pathfind", {
    params: {
      startnodeid: request.start,
      endnodeid: request.end,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status == 204) {
    console.log("no path found");
  }
  if (res.status == 200) {
    //console.log(res.data);
    console.log(res.data);
  }
}
