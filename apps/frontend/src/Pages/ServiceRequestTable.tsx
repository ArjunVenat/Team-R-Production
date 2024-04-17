import * as React from "react";
import { useState, useEffect } from "react";
// import { RequestContext } from "../App";
// import {useNavigate} from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import Sidebar from "../components/SideBar.tsx";
import { GeneralRequest } from "database";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import blueback from "../assets/blueback.png";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

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
  const [selectedTable, setSelectedTable] = useState(0);

  return (
    <Box display="flex">
      <Sidebar />

      <div
        className="overflow-y-auto flex-grow justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${blueback})`,
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className="p-4">
          <h1 className="mt-2 text-5xl text-primary font-bold p-2 text-center">
            Service Request Tables
          </h1>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={selectedTable}
              onChange={(event, newValue) => setSelectedTable(newValue)}
              aria-label="basic tabs example"
            >
              <Tab label=" Flowers " />
              <Tab label=" Gifts " />
              <Tab label=" Maintenance " />
              <Tab label=" Medicine " />
              <Tab label=" Medical Equipment " />
            </Tabs>
          </Box>
          <CustomTabPanel value={selectedTable} index={0}>
            <div>
              <table className="w-full bg-white bg-opacity-60 backdrop-blur-md w-4/5 mx-auto">
                <thead>
                  <tr className="text-xl">
                    <th className="bg-primary border-black p-2 text-white">
                      Service Type
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Sub Type
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Name
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Delivery Date
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Room
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Priority
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Details
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Size of Bouquet
                    </th>
                    <th className="bg-primary border-black w-10 text-white">
                      Status
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Actions
                    </th>
                    {/*<th className="border border-black">Details</th>*/}
                  </tr>
                </thead>
                <tbody>
                  {requestData.length > 0 &&
                    requestData
                      .filter((row) => row.RequestType === "Flowers")
                      .map((row, index) => (
                        <tr key={index}>
                          <td className="border-black text-center p-2">
                            {row.RequestType}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Details1}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.RequesterName}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.DeliveryDate.toString()}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.LocationNodeID}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Priority}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Details1}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Details2}
                          </td>
                          <td className="border-black text-center p-2">
                            <FormControl fullWidth>
                              <Select
                                sx={{ width: 200 }}
                                value={row.Status}
                                onChange={(e) => {
                                  updateServiceStatus(
                                    row,
                                    e.target.value as string,
                                  ).then();
                                }}
                              >
                                <MenuItem value="Unassigned">
                                  Unassigned
                                </MenuItem>
                                <MenuItem value="Assigned">Assigned</MenuItem>
                                <MenuItem value="InProgress">
                                  InProgress
                                </MenuItem>
                                <MenuItem value="Closed">Closed</MenuItem>
                              </Select>
                            </FormControl>
                          </td>
                          <td className="border-black text-center p-2">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => deleteService(row)}
                            >
                              Delete
                            </Button>
                          </td>
                          {/*<td className="border border-black text-center">*/}
                          {/*  {row. }//flowers doesnt store details */}
                          {/*</td>*/}
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={selectedTable} index={1}>
            <div>
              <table className="w-full bg-white bg-opacity-60 backdrop-blur-md w-4/5 mx-auto">
                <thead>
                  <tr className="text-xl">
                    <th className="bg-primary border-black p-2 text-white">
                      Service Type
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Sub Type
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Name
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Delivery Date
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Room
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Priority
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Message
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Wrapped
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Status
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Actions
                    </th>
                    {/*<th className="border border-black">Details</th>*/}
                  </tr>
                </thead>
                <tbody>
                  {requestData.length > 0 &&
                    requestData
                      .filter((row) => row.RequestType === "Gifts")
                      .map((row, index) => (
                        <tr key={index}>
                          <td className="border-black text-center p-2">
                            {row.RequestType}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Details1}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.RequesterName}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.DeliveryDate.toString()}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.LocationNodeID}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Priority}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Details1}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Details3}
                          </td>
                          <td className="border-black text-center p-2">
                            <FormControl fullWidth>
                              <Select
                                sx={{ width: 200 }}
                                value={row.Status}
                                onChange={(e) => {
                                  updateServiceStatus(
                                    row,
                                    e.target.value as string,
                                  ).then();
                                }}
                              >
                                <MenuItem value="Unassigned">
                                  Unassigned
                                </MenuItem>
                                <MenuItem value="Assigned">Assigned</MenuItem>
                                <MenuItem value="InProgress">
                                  InProgress
                                </MenuItem>
                                <MenuItem value="Closed">Closed</MenuItem>
                              </Select>
                            </FormControl>
                          </td>
                          <td className="border-black text-center p-2">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => deleteService(row)}
                            >
                              Delete
                            </Button>
                          </td>
                          {/*<td className="border border-black text-center">*/}
                          {/*  {row. }//flowers doesnt store details */}
                          {/*</td>*/}
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={selectedTable} index={2}>
            <div>
              <table className="w-full bg-white bg-opacity-60 backdrop-blur-md w-4/5 mx-auto">
                <thead>
                  <tr className="text-xl">
                    <th className="bg-primary border-black p-2 text-white">
                      Service Type
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Name
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Delivery Date
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Room
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Priority
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Details
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Type of maintenance
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Hazardous Material
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Status
                    </th>
                    <th className="bg-primary border-black p-2 text-white">
                      Actions
                    </th>
                    {/*<th className="border border-black">Details</th>*/}
                  </tr>
                </thead>
                <tbody>
                  {requestData.length > 0 &&
                    requestData
                      .filter((row) => row.RequestType === "Maintenance")
                      .map((row, index) => (
                        <tr key={index}>
                          <td className="border-black text-center p-2">
                            {row.RequestType}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.RequesterName}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.DeliveryDate.toString()}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.LocationNodeID}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Priority}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Details1}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Details2}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Details3}
                          </td>
                          <td className="border-black text-center p-2">
                            <FormControl fullWidth>
                              <Select
                                sx={{ width: 200 }}
                                value={row.Status}
                                onChange={(e) => {
                                  updateServiceStatus(
                                    row,
                                    e.target.value as string,
                                  ).then();
                                }}
                              >
                                <MenuItem value="Unassigned">
                                  Unassigned
                                </MenuItem>
                                <MenuItem value="Assigned">Assigned</MenuItem>
                                <MenuItem value="InProgress">
                                  InProgress
                                </MenuItem>
                                <MenuItem value="Closed">Closed</MenuItem>
                              </Select>
                            </FormControl>
                          </td>
                          <td className="border-black text-center p-2">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => deleteService(row)}
                            >
                              Delete
                            </Button>
                          </td>
                          {/*<td className="border border-black text-center">*/}
                          {/*  {row. }//flowers doesnt store details */}
                          {/*</td>*/}
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={selectedTable} index={3}>
            <div>
              <table className="w-full bg-white bg-opacity-60 backdrop-blur-md w-4/5 mx-auto">
                <thead>
                  <tr className="text-xl">
                    <th className="bg-primary text-white border-black p-2">
                      Service Type
                    </th>
                    <th className="bg-primary text-white border-black p-2">
                      Name
                    </th>
                    <th className="bg-primary text-white border-black p-2">
                      Delivery Date
                    </th>
                    <th className="bg-primary text-white border-black p-2">
                      Room
                    </th>
                    <th className="bg-primary text-white border-black p-2">
                      Priority
                    </th>
                    <th className="bg-primary text-white border-black p-2">
                      Details
                    </th>
                    <th className="bg-primary text-white border-black p-2">
                      Dosage
                    </th>
                    <th className="bg-primary text-white border-black p-2">
                      Route
                    </th>
                    <th className="bg-primary text-white border-black p-2">
                      Status
                    </th>
                    <th className="bg-primary text-white border-black p-2">
                      Actions
                    </th>
                    {/*<th className="border border-black">Details</th>*/}
                  </tr>
                </thead>
                <tbody>
                  {requestData.length > 0 &&
                    requestData
                      .filter((row) => row.RequestType === "Medicine")
                      .map((row, index) => (
                        <tr key={index}>
                          <td className="border-black text-center p-2">
                            {row.RequestType}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.RequesterName}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.DeliveryDate.toString()}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.LocationNodeID}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Priority}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Details1}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Details2}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Details3}
                          </td>
                          <td className="border-black text-center p-2">
                            <FormControl fullWidth>
                              <Select
                                sx={{ width: 200 }}
                                value={row.Status}
                                onChange={(e) => {
                                  updateServiceStatus(
                                    row,
                                    e.target.value as string,
                                  ).then();
                                }}
                              >
                                <MenuItem value="Unassigned">
                                  Unassigned
                                </MenuItem>
                                <MenuItem value="Assigned">Assigned</MenuItem>
                                <MenuItem value="InProgress">
                                  InProgress
                                </MenuItem>
                                <MenuItem value="Closed">Closed</MenuItem>
                              </Select>
                            </FormControl>
                          </td>
                          <td className="border-black text-center p-2">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => deleteService(row)}
                            >
                              Delete
                            </Button>
                          </td>
                          {/*<td className="border border-black text-center">*/}
                          {/*  {row. }//flowers doesnt store details */}
                          {/*</td>*/}
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={selectedTable} index={4}>
            <div>
              <table className="w-full bg-white bg-opacity-60 backdrop-blur-md w-4/5 mx-auto">
                <thead>
                  <tr className="text-xl">
                    <th className="bg-primary text-white border-black p-2">
                      Service Type
                    </th>
                    <th className="bg-primary text-white border-black p-2">
                      Name
                    </th>
                    <th className="bg-primary text-white border-black p-2">
                      Delivery Date
                    </th>
                    <th className="bg-primary text-white border-black p-2">
                      Room
                    </th>
                    <th className="bg-primary text-white border-black p-2">
                      Priority
                    </th>
                    <th className="bg-primary text-white border-black p-2">
                      Details
                    </th>
                    <th className="bg-primary text-white border-black p-2">
                      Quantity
                    </th>
                    <th className="bg-primary text-white border-black p-2">
                      Requires Supervision
                    </th>
                    <th className="bg-primary text-white border-black p-2">
                      Status
                    </th>
                    <th className="bg-primary text-white border-black p-2">
                      Actions
                    </th>
                    {/*<th className="border border-black">Details</th>*/}
                  </tr>
                </thead>
                <tbody>
                  {requestData.length > 0 &&
                    requestData
                      .filter((row) => row.RequestType === "Medical Equipment")
                      .map((row, index) => (
                        <tr key={index}>
                          <td className="border-black text-center p-2">
                            {row.RequestType}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.RequesterName}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.DeliveryDate.toString()}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.LocationNodeID}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Priority}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Details1}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Details2}
                          </td>
                          <td className="border-black text-center p-2">
                            {row.Details3}
                          </td>
                          <td className="border-black text-center p-2">
                            <FormControl fullWidth>
                              <Select
                                sx={{ width: 200 }}
                                value={row.Status}
                                onChange={(e) => {
                                  updateServiceStatus(
                                    row,
                                    e.target.value as string,
                                  ).then();
                                }}
                              >
                                <MenuItem value="Unassigned">
                                  Unassigned
                                </MenuItem>
                                <MenuItem value="Assigned">Assigned</MenuItem>
                                <MenuItem value="InProgress">
                                  InProgress
                                </MenuItem>
                                <MenuItem value="Closed">Closed</MenuItem>
                              </Select>
                            </FormControl>
                          </td>
                          <td className="border-black text-center p-2">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => deleteService(row)}
                            >
                              Delete
                            </Button>
                          </td>
                          {/*<td className="border border-black text-center">*/}
                          {/*  {row. }//flowers doesnt store details */}
                          {/*</td>*/}
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </CustomTabPanel>
        </div>
      </div>
    </Box>
  );
}

export default ServiceRequestTable;
