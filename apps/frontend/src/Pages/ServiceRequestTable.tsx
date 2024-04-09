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

function ServiceRequestTable() {
  // const { requests } = useContext(RequestContext);

  // const navigate = useNavigate();
  const [requestData, setrequestData] = useState<GeneralRequest[]>([]);
  useEffect(() => {
    async function fetch() {
      const res = await axios.get("/api/service/create/All");
      setrequestData(res.data);
    }
    fetch().then();
  }, []);

  const deleteService = async (service: GeneralRequest) => {
    await axios.post(`api/admin/service/del/${service.RequestID}`);
    const index = requestData.indexOf(service);
    requestData.splice(index, 1);
    setrequestData([...requestData]);
  };

  const updateServiceStatus = async (
    service: GeneralRequest,
    newStatus: string,
  ) => {
    await axios
      .post(`/api/admin/service/edit/${service.RequestID}/${newStatus}`)
      .then();
    const index = requestData.indexOf(service);
    const requestData2: GeneralRequest[] = [...requestData];
    requestData2[index].Status = newStatus;
    setrequestData(requestData2);
  };

  return (
    <Box display="flex">
      <Sidebar />
      <div className="bg-white p-5 flex-1">
        <div className="flex justify-between items-center mb-5">
          {/*<button onClick={() => navigate(-1)}*/}
          {/*        className="bg-blue-700 hover:bg-blue-800 text-white rounded transition duration-300 ease-in-out transform hover:scale-105">Back*/}
          {/*</button>*/}
          <div className="text-2xl text-center">Service Request</div>
          <div></div>
        </div>
        <div className="text-xl mb-2">Flowers Service Request</div>
        <table className="border-collapse border border-slate-400 w-full">
          <thead>
            <tr>
              <th className="border border-slate-300 p-2">Service Type</th>
              <th className="border border-slate-300 p-2">Sub Type</th>
              <th className="border border-slate-300 p-2">Name</th>
              <th className="border border-slate-300 p-2">Delivery Date</th>
              <th className="border border-slate-300 p-2">Room</th>
              <th className="border border-slate-300 p-2">Priority</th>
              <th className="border border-slate-300 p-2">Details</th>
              <th className="border border-slate-300 p-2">Size of Bouquet</th>
              <th className="border border-slate-300 p-2">Status</th>
              <th className="border border-slate-300 p-2">Actions</th>
              {/*<th className="border border-slate-300">Details</th>*/}
            </tr>
          </thead>
          <tbody>
            {requestData
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
        <div className="text-xl mb-2">Gifts Service Request</div>
        <table className="border-collapse border border-slate-400 w-full">
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
            {requestData
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

        <div className="text-xl mb-2 mt-3">Maintenance Service Request</div>
        <table className="border-collapse border border-slate-400 w-full">
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
            {requestData
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

        <div className="text-xl mb-2 mt-3">Medicine Service Request</div>
        <table className="border-collapse border border-slate-400 w-full">
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
            {requestData
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

        <div className="text-xl mb-2 mt-3">Medical Equipment</div>
        <table className="border-collapse border border-slate-400 w-full">
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
            {requestData
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
    </Box>
  );
}

export default ServiceRequestTable;
