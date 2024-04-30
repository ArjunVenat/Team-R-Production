import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doctor } from "database";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
export default function DoctorTable() {
  const { getAccessTokenSilently } = useAuth0();

  const [doctorData, setDoctorData] = useState<Doctor[]>([]);
  useEffect(() => {
    async function fetch() {
      //get token
      const token = await getAccessTokenSilently();

      //Get all employees (if admin)
      const res = await axios.get("/api/admin/allDoctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctorData(res.data);
    }
    fetch().then();
  }, [getAccessTokenSilently]);

  let arrayDoctors;
  if (doctorData) {
    arrayDoctors = doctorData?.map((doctor: Doctor) => (
      <TableRow
        key={doctor.userID}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>{doctor.userID}</TableCell>
        <TableCell>{doctor.name}</TableCell>
        <TableCell>{doctor.department}</TableCell>
        <TableCell>{doctor.yearsWorked}</TableCell>
        <TableCell>{doctor.rating.valueOf()}</TableCell>
        <TableCell>{doctor.specialtyTraining ? "Yes" : "No"}</TableCell>
        <TableCell>{doctor.boardCertification ? "Yes" : "No"}</TableCell>
        <TableCell>{doctor.languages}</TableCell>
      </TableRow>
    ));
  }
  return (
    <Box className="w-4/5 mx-auto">
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              style={{
                backgroundColor: "#677c8f",
                color: "white",
              }}
            >
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                User ID
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                Department
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                Years Worked
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                Rating
              </TableCell>

              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                Specialty Training
              </TableCell>

              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                Board Certification
              </TableCell>

              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                Languages
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            style={{
              borderWidth: 2,
              borderColor: "white",
              backgroundColor: "rgb(103,124,143, 0.15)",
            }}
          >
            {arrayDoctors}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
