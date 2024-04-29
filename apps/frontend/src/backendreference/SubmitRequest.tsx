import { ServiceRequest } from "../Interfaces/ServiceRequest.ts";
import axios from "axios";
// import PopupAlert from "./PopupAlert.tsx";

export async function submitRequestDB(request: ServiceRequest, token: string) {
  const data = JSON.stringify({
    RequesterName: request.requesterName,
    RequestType: request.requestType,
    Priority: request.priority,
    LocationNodeID: request.locationNodeID,
    EmployeeID: request.employeeID,
    Details1: request.details1,
    Details2: request.details2,
    Details3: request.details3,
    DeliveryDate: request.deliveryDate + ":00.000Z",
    Status: request.status,
  });
  // PopupAlert();
  console.log(data);
  //sends a post request
  const res = await axios.post("/api/service/create", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status == 200) {
    console.log("submitted request");

    // PopupAlert();
  }
}
