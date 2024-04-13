import * as React from "react";
import { useState, useEffect } from "react";
// import { RequestContext } from "../App";
// import {useNavigate} from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Sidebar from "../components/SideBar.tsx";
import { GeneralRequest } from "database";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function ServiceRequestTable() {
  //Use auth0 react hook
  const {
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
  } = useAuth0();
  if (!isLoading && !isAuthenticated) {
    loginWithRedirect({
      appState: {
        returnTo: location.pathname,
      },
    }).then();
  }

  // const { requests } = useContext(RequestContext);

  // const navigate = useNavigate();
  const [requestData, setrequestData] = useState<GeneralRequest[]>([]);
  useEffect(() => {
    async function fetch() {
      const token = await getAccessTokenSilently();
      const res = await axios.get("/api/service/create/All", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setrequestData(res.data);
    }
    fetch().then();
  }, [getAccessTokenSilently]);

  const deleteService = async (service: GeneralRequest) => {
    const token = await getAccessTokenSilently();
    const res = await axios.post(
      `api/admin/service/del/${service.RequestID}`,
      "",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const index = requestData.indexOf(service);
    requestData.splice(index, 1);
    setrequestData([...requestData]);

    if (res.status == 200) {
      console.log("request deleted");
    }
  };

  const updateServiceStatus = async (
    service: GeneralRequest,
    newStatus: string,
  ) => {
    const token = await getAccessTokenSilently();
    const res = await axios
      .post(`/api/admin/service/edit/${service.RequestID}/${newStatus}`, "", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then();
    const index = requestData.indexOf(service);
    const requestData2: GeneralRequest[] = [...requestData];
    requestData2[index].Status = newStatus;
    setrequestData(requestData2);

    if (res.status == 200) {
      console.log("request status changed");
    }
  };
  const [selectedTable, setSelectedTable] = useState("Flowers");

  return (
    <Box display="flex">
      <Sidebar />

      <div className="overflow-y-auto h-screen flex-grow">
        <div>
          <h1 className="text-2xl font-bold p-2 text-center">
            Service Request Tables
          </h1>
          <div className="ml-4">
            <Select
              value={selectedTable}
              onChange={(event) => setSelectedTable(event.target.value)}
            >
              <MenuItem value="Flowers">Flowers Service Request</MenuItem>
              <MenuItem value="Gifts">Gifts Service Request</MenuItem>
              <MenuItem value="Maintenance">
                Maintenance Service Request
              </MenuItem>
              <MenuItem value="Medicine">Medicine Service Request</MenuItem>
              <MenuItem value="Medical Equipment">
                Medical Equipment Service Request
              </MenuItem>
            </Select>
          </div>
        </div>

        {selectedTable === "Flowers" && (
          <div>
            <table className="mt-5 border border-slate-400 w-full">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-2">Service Type</th>
                  <th className="border border-slate-300 p-2">Sub Type</th>
                  <th className="border border-slate-300 p-2">Name</th>
                  <th className="border border-slate-300 p-2">Delivery Date</th>
                  <th className="border border-slate-300 p-2">Room</th>
                  <th className="border border-slate-300 p-2">Priority</th>
                  <th className="border border-slate-300 p-2">Details</th>
                  <th className="border border-slate-300 p-2">
                    Size of Bouquet
                  </th>
                  <th className="border border-slate-300 p-2">Status</th>
                  <th className="border border-slate-300 p-2">Actions</th>
                  {/*<th className="border border-slate-300">Details</th>*/}
                </tr>
              </thead>
              <tbody>
                {requestData.length > 0 &&
                  requestData
                    .filter((row) => row.RequestType === "Flowers")
                    .map((row, index) => (
                      <tr key={index}>
                        <td className="border border-slate-300 text-center p-2">
                          {row.RequestType}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Details1}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.RequesterName}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.DeliveryDate.toString()}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.LocationNodeID}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Priority}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Details1}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Details2}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          <FormControl fullWidth>
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <Select
                              label="Status"
                              sx={{ width: 100 }}
                              value={row.Status}
                              onChange={(e) => {
                                updateServiceStatus(
                                  row,
                                  e.target.value as string,
                                ).then();
                              }}
                            >
                              <MenuItem value="Unassigned">Unassigned</MenuItem>
                              <MenuItem value="Assigned">Assigned</MenuItem>
                              <MenuItem value="InProgress">InProgress</MenuItem>
                              <MenuItem value="Closed">Closed</MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteService(row)}
                          >
                            Delete
                          </Button>
                        </td>
                        {/*<td className="border border-slate-300 text-center">*/}
                        {/*  {row. }//flowers doesnt store details */}
                        {/*</td>*/}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedTable === "Gifts" && (
          <div>
            <table className="mt-5 border border-slate-400 w-full">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-2">Service Type</th>
                  <th className="border border-slate-300 p-2">Sub Type</th>
                  <th className="border border-slate-300 p-2">Name</th>
                  <th className="border border-slate-300 p-2">Delivery Date</th>
                  <th className="border border-slate-300 p-2">Room</th>
                  <th className="border border-slate-300 p-2">Priority</th>
                  <th className="border border-slate-300 p-2">Message</th>
                  <th className="border border-slate-300 p-2">Wrapped</th>
                  <th className="border border-slate-300 p-2">Status</th>
                  <th className="border border-slate-300 p-2">Actions</th>
                  {/*<th className="border border-slate-300">Details</th>*/}
                </tr>
              </thead>
              <tbody>
                {requestData.length > 0 &&
                  requestData
                    .filter((row) => row.RequestType === "Gifts")
                    .map((row, index) => (
                      <tr key={index}>
                        <td className="border border-slate-300 text-center p-2">
                          {row.RequestType}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Details1}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.RequesterName}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.DeliveryDate.toString()}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.LocationNodeID}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Priority}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Details1}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Details3}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          <FormControl fullWidth>
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <Select
                              label="Status"
                              sx={{ width: 100 }}
                              value={row.Status}
                              onChange={(e) => {
                                updateServiceStatus(
                                  row,
                                  e.target.value as string,
                                ).then();
                              }}
                            >
                              <MenuItem value="Unassigned">Unassigned</MenuItem>
                              <MenuItem value="Assigned">Assigned</MenuItem>
                              <MenuItem value="InProgress">InProgress</MenuItem>
                              <MenuItem value="Closed">Closed</MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteService(row)}
                          >
                            Delete
                          </Button>
                        </td>
                        {/*<td className="border border-slate-300 text-center">*/}
                        {/*  {row. }//flowers doesnt store details */}
                        {/*</td>*/}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedTable === "Maintenance" && (
          <div>
            <table className="mt-5 border border-slate-400 w-full">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-2">Service Type</th>
                  <th className="border border-slate-300 p-2">Name</th>
                  <th className="border border-slate-300 p-2">Delivery Date</th>
                  <th className="border border-slate-300 p-2">Room</th>
                  <th className="border border-slate-300 p-2">Priority</th>
                  <th className="border border-slate-300 p-2">Details</th>
                  <th className="border border-slate-300 p-2">
                    Type of maintenance
                  </th>
                  <th className="border border-slate-300 p-2">
                    Hazardous Material
                  </th>
                  <th className="border border-slate-300 p-2">Status</th>
                  <th className="border border-slate-300 p-2">Actions</th>
                  {/*<th className="border border-slate-300">Details</th>*/}
                </tr>
              </thead>
              <tbody>
                {requestData.length > 0 &&
                  requestData
                    .filter((row) => row.RequestType === "Maintenance")
                    .map((row, index) => (
                      <tr key={index}>
                        <td className="border border-slate-300 text-center p-2">
                          {row.RequestType}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.RequesterName}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.DeliveryDate.toString()}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.LocationNodeID}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Priority}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Details1}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Details2}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Details3}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          <FormControl fullWidth>
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <Select
                              label="Status"
                              sx={{ width: 100 }}
                              value={row.Status}
                              onChange={(e) => {
                                updateServiceStatus(
                                  row,
                                  e.target.value as string,
                                ).then();
                              }}
                            >
                              <MenuItem value="Unassigned">Unassigned</MenuItem>
                              <MenuItem value="Assigned">Assigned</MenuItem>
                              <MenuItem value="InProgress">InProgress</MenuItem>
                              <MenuItem value="Closed">Closed</MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteService(row)}
                          >
                            Delete
                          </Button>
                        </td>
                        {/*<td className="border border-slate-300 text-center">*/}
                        {/*  {row. }//flowers doesnt store details */}
                        {/*</td>*/}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedTable === "Medicine" && (
          <div>
            <table className="mt-5 border border-slate-400 w-full">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-2">Service Type</th>
                  <th className="border border-slate-300 p-2">Name</th>
                  <th className="border border-slate-300 p-2">Delivery Date</th>
                  <th className="border border-slate-300 p-2">Room</th>
                  <th className="border border-slate-300 p-2">Priority</th>
                  <th className="border border-slate-300 p-2">Details</th>
                  <th className="border border-slate-300 p-2">Dosage</th>
                  <th className="border border-slate-300 p-2">Route</th>
                  <th className="border border-slate-300 p-2">Status</th>
                  <th className="border border-slate-300 p-2">Actions</th>
                  {/*<th className="border border-slate-300">Details</th>*/}
                </tr>
              </thead>
              <tbody>
                {requestData.length > 0 &&
                  requestData
                    .filter((row) => row.RequestType === "Medicine")
                    .map((row, index) => (
                      <tr key={index}>
                        <td className="border border-slate-300 text-center p-2">
                          {row.RequestType}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.RequesterName}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.DeliveryDate.toString()}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.LocationNodeID}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Priority}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Details1}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Details2}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Details3}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          <FormControl fullWidth>
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <Select
                              label="Status"
                              sx={{ width: 100 }}
                              value={row.Status}
                              onChange={(e) => {
                                updateServiceStatus(
                                  row,
                                  e.target.value as string,
                                ).then();
                              }}
                            >
                              <MenuItem value="Unassigned">Unassigned</MenuItem>
                              <MenuItem value="Assigned">Assigned</MenuItem>
                              <MenuItem value="InProgress">InProgress</MenuItem>
                              <MenuItem value="Closed">Closed</MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteService(row)}
                          >
                            Delete
                          </Button>
                        </td>
                        {/*<td className="border border-slate-300 text-center">*/}
                        {/*  {row. }//flowers doesnt store details */}
                        {/*</td>*/}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedTable === "Medical Equipment" && (
          <div>
            <table className="mt-5 border border-slate-400 w-full">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-2">Service Type</th>
                  <th className="border border-slate-300 p-2">Name</th>
                  <th className="border border-slate-300 p-2">Delivery Date</th>
                  <th className="border border-slate-300 p-2">Room</th>
                  <th className="border border-slate-300 p-2">Priority</th>
                  <th className="border border-slate-300 p-2">Details</th>
                  <th className="border border-slate-300 p-2">Quantity</th>
                  <th className="border border-slate-300 p-2">
                    Requires Supervision
                  </th>
                  <th className="border border-slate-300 p-2">Status</th>
                  <th className="border border-slate-300 p-2">Actions</th>
                  {/*<th className="border border-slate-300">Details</th>*/}
                </tr>
              </thead>
              <tbody>
                {requestData.length > 0 &&
                  requestData
                    .filter((row) => row.RequestType === "Medical Equipment")
                    .map((row, index) => (
                      <tr key={index}>
                        <td className="border border-slate-300 text-center p-2">
                          {row.RequestType}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.RequesterName}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.DeliveryDate.toString()}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.LocationNodeID}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Priority}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Details1}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Details2}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          {row.Details3}
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          <FormControl fullWidth>
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <Select
                              label="Status"
                              sx={{ width: 100 }}
                              value={row.Status}
                              onChange={(e) => {
                                updateServiceStatus(
                                  row,
                                  e.target.value as string,
                                ).then();
                              }}
                            >
                              <MenuItem value="Unassigned">Unassigned</MenuItem>
                              <MenuItem value="Assigned">Assigned</MenuItem>
                              <MenuItem value="InProgress">InProgress</MenuItem>
                              <MenuItem value="Closed">Closed</MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td className="border border-slate-300 text-center p-2">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteService(row)}
                          >
                            Delete
                          </Button>
                        </td>
                        {/*<td className="border border-slate-300 text-center">*/}
                        {/*  {row. }//flowers doesnt store details */}
                        {/*</td>*/}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Box>
  );
}

export default ServiceRequestTable;
