import { Directions } from "./Directions.tsx";
import axios from "axios";

export async function sendDirections(request: Directions) {
    const data = JSON.stringify({
        start: request.start,
        end: request.end,
    });
    console.log(data);
    //sends a post request the /api/high-score
    //ToDo: change api
    const res = await axios.post("/api/high-score", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status == 200) {
        console.log("submitted request");
    }
}
