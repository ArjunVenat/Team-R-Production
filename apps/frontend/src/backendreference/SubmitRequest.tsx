import { ServiceRequest } from "../Interfaces/ServiceRequest.ts";
import axios from "axios";
// import SuccessAlert from "./SuccessAlert.tsx";

export async function submitRequestDB(request: ServiceRequest) {
  const data = JSON.stringify({
    RequesterName: request.requesterName,
    RequestType: request.requestType,
    Priority: request.priority,
    LocationNodeID: request.locationNodeID,
    Details1: request.details1,
    Details2: request.details2,
    Details3: request.details3,
    DeliveryDate: request.deliveryDate + ":00.000Z",
    Status: request.status,
  });
  // SuccessAlert();
  console.log(data);
  //sends a post request
  const res = await axios.post("/api/service/create", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status == 200) {
    console.log("submitted request");

    // SuccessAlert();
  }
}
