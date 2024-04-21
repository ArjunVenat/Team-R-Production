import axios from "axios";
import { User } from "@auth0/auth0-react";
// import SuccessAlert from "./SuccessAlert.tsx";

export async function SubmitUserDB(request: User, token: string) {
  const data = JSON.stringify({
    userID: request.sub,
    email: request.email,
    emailVerified: request.email_verified,
    nickname: request.nickname,
    updatedAt: request.updated_at,
  });
  // SuccessAlert();
  console.log(data);
  //sends a post request
  const res = await axios.put("/api/admin/employee/add", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status == 200) {
    console.log("submitted request");

    // SuccessAlert();
  }
}
