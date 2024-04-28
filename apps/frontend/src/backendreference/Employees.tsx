import React, { useEffect, useState } from "react";
import axios from "axios";
import { Employee } from "database";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
export default function EmployeeTable() {
  const { getAccessTokenSilently } = useAuth0();

  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  useEffect(() => {
    async function fetch() {
      //get token
      const token = await getAccessTokenSilently();

      //Get all employees (if admin)
      const res = await axios.get("/api/admin/allEmployees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployeeData(res.data);
    }
    fetch().then();
  }, [getAccessTokenSilently]);
  const arrayEmployees = employeeData.map((employee: Employee) => (
    <TableRow
      key={employee.userID}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>{employee.userID}</TableCell>
      <TableCell>{employee.nickname}</TableCell>
      <TableCell>{employee.email}</TableCell>
      <TableCell>{employee.emailVerified}</TableCell>
      <TableCell>{employee.updatedAt.toString()}</TableCell>
    </TableRow>
  ));
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
                Nickname
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                Email Verified
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
              >
                Last Updated
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
            {arrayEmployees}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
