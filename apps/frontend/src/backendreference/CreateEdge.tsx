import { Edges } from "database";
import axios from "axios";

export async function CreateEdgeDB(request: Edges, token: string) {
  const data = JSON.stringify({
    EdgeID: request.EdgeID,
    StartNodeID: request.StartNodeID,
    EndNodeID: request.EndNodeID,
  });
  console.log(data);
  //sends a post request
  const res = await axios.put("/api/admin/edge/add", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status == 200) {
    console.log("created edge");
    return res.data;
  }
}
