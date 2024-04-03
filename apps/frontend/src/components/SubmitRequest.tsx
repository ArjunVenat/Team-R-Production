import { ServiceRequest } from "./ServiceRequest.ts";
import axios from "axios";
// import SuccessAlert from "./SuccessAlert.tsx";

export async function submitRequestDB(request: ServiceRequest) {
  const data = JSON.stringify({
    Time: new Date(),
    DeliveryDate: request.deliveryDate + ":00.000Z",
    RecipientName: request.name,
    FlowerType: request.subType,
    UserID: 123456,
    DestinationLongID: request.room,
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
