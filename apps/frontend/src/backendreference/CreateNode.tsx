import { Nodes } from "database";
import axios from "axios";

export async function CreateNodeDB(request: Nodes, token: string) {
  const data = JSON.stringify({
    NodeID: request.NodeID,
    Xcoord: request.Xcoord,
    Ycoord: request.Ycoord,
    Floor: request.Floor,
    Building: request.Building,
    NodeType: request.NodeType,
    LongName: request.LongName,
    ShortName: request.ShortName,
  });
  console.log(data);
  //sends a post request
  const res = await axios.put("/api/admin/node/add", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status == 200) {
    console.log("created node");
    return res.data;
  }
}
