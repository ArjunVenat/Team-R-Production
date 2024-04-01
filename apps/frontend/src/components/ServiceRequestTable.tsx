import * as React from 'react';
import {useContext} from "react";
import RequestContext from "../App";
import {useNavigate} from "react-router-dom";

function ServiceRequestTable() {

    const { requests } = useContext(RequestContext);
    const navigate = useNavigate();

    return (
        <div className="bg-white p-5">
            <div className="flex justify-between items-center mb-5">
                <button onClick={() => navigate(-1)} className="bg-blue-700 hover:bg-blue-800 text-white rounded transition duration-300 ease-in-out transform hover:scale-105">Back</button>
                <div className="text-2xl text-center">
                    Service Request
                </div>
                <div></div>
            </div>
            <table className="border-collapse border border-slate-400 w-full">
                <thead>
                <tr>
                    <th className="border border-slate-300">Service Type</th>
                    <th className="border border-slate-300">Name</th>
                    <th className="border border-slate-300">Delivery Date</th>
                    <th className="border border-slate-300">Room</th>
                    <th className="border border-slate-300">Details</th>
                </tr>
                </thead>
                <tbody>
                {
                    requests.map((row, index) => (
                        <tr key={index}>
                            <td className="border border-slate-300 text-center">{row.type}</td>
                            <td className="border border-slate-300 text-center">{row.name}</td>
                            <td className="border border-slate-300 text-center">{row.deliveryDate}</td>
                            <td className="border border-slate-300 text-center">{row.room}</td>
                            <td className="border border-slate-300 text-center">{row.details}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default ServiceRequestTable;
