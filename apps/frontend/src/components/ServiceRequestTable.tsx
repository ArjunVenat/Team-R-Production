import * as React from "react";
import { useState, useEffect } from "react";
// import { RequestContext } from "../App";
// import {useNavigate} from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./SideBar.tsx";
import {FlowerRequest} from "database";
import axios from "axios";


function ServiceRequestTable() {
  // const { requests } = useContext(RequestContext);

  // const navigate = useNavigate();
    const [flowerData, setFlowerData] = useState<FlowerRequest[]>([]);
    useEffect(() => {
        async function fetch() {
            const res = await axios.get("/api/service/create");
            setFlowerData(res.data);
        }
        fetch().then();
    }, []);

    console.log(flowerData);

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
              <th className="border border-slate-300">Service Type</th>
              <th className="border border-slate-300">Sub Type</th>
              <th className="border border-slate-300">Name</th>
              <th className="border border-slate-300">Delivery Date</th>
              <th className="border border-slate-300">Room</th>
              {/*<th className="border border-slate-300">Details</th>*/}
            </tr>
          </thead>
          <tbody>
            {flowerData.map((row, index) => (
              <tr key={index}>
                <td className="border border-slate-300 text-center">
                  Flowers
                </td>
                <td className="border border-slate-300 text-center">
                  {row.FlowerType }
                </td>
                <td className="border border-slate-300 text-center">
                  {row.RecipientName }
                </td>
                <td className="border border-slate-300 text-center">
                  {row.DeliveryDate.toString() }
                </td>
                <td className="border border-slate-300 text-center">
                  {row.DestinationLongID}
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
