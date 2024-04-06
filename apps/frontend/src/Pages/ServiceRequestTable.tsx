import * as React from "react";
import { useState, useEffect } from "react";
// import { RequestContext } from "../App";
// import {useNavigate} from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../components/SideBar.tsx";
import { GeneralRequest } from "database";
import axios from "axios";

function ServiceRequestTable() {
  // const { requests } = useContext(RequestContext);

  // const navigate = useNavigate();
  const [requestData, setRequestData] = useState<GeneralRequest[]>([]);
  useEffect(() => {
    async function fetch() {
      const res = await axios.get("/api/service/create/All");
      setRequestData(res.data);
    }
    fetch().then();
  }, []);

  console.log(requestData);

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
        <table className="border-collapse border border-slate-400 w-full">
          <thead>
            <tr>
              <th className="border border-slate-300">Request ID</th>
              <th className="border border-slate-300">Requester Name</th>
              <th className="border border-slate-300">Request Type</th>
              <th className="border border-slate-300">Priority Level</th>
              <th className="border border-slate-300">Location Node ID</th>
              <th className="border border-slate-300">Details 1</th>
              <th className="border border-slate-300">Details 2</th>
              <th className="border border-slate-300">Details 3</th>
              <th className="border border-slate-300">Delivery Date</th>
              <th className="border border-slate-300">Status</th>
              {/*<th className="border border-slate-300">Details</th>*/}
            </tr>
          </thead>
          <tbody>
            {requestData.map((row, index) => (
              <tr key={index}>
                <td className="border border-slate-300 text-center">
                  {row.RequestID}
                </td>
                <td className="border border-slate-300 text-center">
                  {row.RequesterName}
                </td>
                <td className="border border-slate-300 text-center">
                  {row.RequestType}
                </td>
                <td className="border border-slate-300 text-center">
                  {row.Priority}
                </td>
                <td className="border border-slate-300 text-center">
                  {row.LocationNodeID}
                </td>
                <td className="border border-slate-300 text-center">
                  {row.Details1}
                </td>
                <td className="border border-slate-300 text-center">
                  {row.Details2}
                </td>
                <td className="border border-slate-300 text-center">
                  {row.Details3}
                </td>
                <td className="border border-slate-300 text-center">
                  {row.DeliveryDate.toString()}
                </td>
                <td className="border border-slate-300 text-center">
                  {row.Status}
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
