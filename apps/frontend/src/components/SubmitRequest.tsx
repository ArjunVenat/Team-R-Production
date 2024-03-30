import { ServiceRequest } from "./ServiceRequest.tsx";
import axios from "axios";
import SuccessAlert from "./SuccessAlert.tsx";
export async function submitRequestDB(request: ServiceRequest) {
    const data = JSON.stringify({
        time: new Date(),
        name: request.name,
        room: request.room,
        deliveryDate: request.deliveryDate,
        type: request.type,
        details: request.details,
    });
    SuccessAlert();
    console.log(data);
    //sends a post request the /api/high-score
    const res = await axios.post("/service/create", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status == 200) {
        console.log("submitted request");

        SuccessAlert();
    }
}
