import { useState } from "react";
import "./FullServiceRequest.css";
import { ServiceRequest } from "./ServiceRequest.tsx";
import { submitRequestDB } from "./SubmitRequest.tsx";
import {
  Button,
  // Stack,
  // TextField,
  // Typography,
  // Grid,
  Modal,
  Card,
} from "@mui/material";
import Flower1 from "./image/Flower1.png";
import Flower2 from "./image/Flower2.png";
import Flower3 from "./image/Flower3.png";
import Flower4 from "./image/Flower4.png";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   borderRadius: 10,
//   padding: "50px",
//   width: "fit-content",
//   height: "fit-content",
// };

//Define interface for each service request
//ToDo: add type of service request to update with name, room, date

export interface ListOfServices {
  availableServices: string[];
}

//Define functions for "My Request" log
function ServiceRequestLog({ availableServices }: ListOfServices) {
  /*DefaultServiceRequest is the default state of the Service Request object, where everything is empty*/
  const defaultServiceRequest: ServiceRequest = {
    name: "",
    room: NaN,
    deliveryDate: "",
    type: availableServices[0],
    details: "",
  };

  /*useState for a single service request, where any changes update the specific key-value pair*/
  const [singleServiceRequest, setSingleServiceRequest] =
    useState<ServiceRequest>(defaultServiceRequest);

  /*requests handles the list of service requests, which is used for the list on the side of the page*/
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
    let contentComponent: JSX.Element | null = null;
  //Function to test if my request updates when submit an order
  //ToDo: Can delete once combine with actual submitRequest
  //ToDo: check for item having been selected
    const switchService = (service: string) => {
        switch (service) {
            case 'Flowers':
                contentComponent = (
                    <>

                        <div className="mt-[-25rem] bg-gray-100 rounded-lg" >
                            <h2 className="mb-4 p-3 font-bold text-lg">Switch Content Section</h2>
                            <div>
                                <div className=" bg-gray-100  object-right gap-2 columns-3 rounded-lg " style={{paddingLeft: '30%'}}>

                                    <form
                                        className=" transition duration-200 ease-in-out hover:scale-20 focus:ring-transparent">
                                        <img className=" " src={Flower1} alt="Flowers"/>
                                    </form>
                                    <form
                                        className="   hover:scale-20 focus:ring-transparent">
                                        <img className="" src={Flower2} alt="Flowers"/>
                                    </form>
                                    <form
                                        className=" hover:scale-20 ">
                                        <img className="" src={Flower3} alt="Flowers"/>
                                    </form>
                                    <form
                                        className="transition duration-300 ease-in-out  hover:scale-20">
                                        <img className="" src={Flower4} alt="Flowers "/>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </>
                );
                break;
            case 'Food':
                contentComponent = (
                    <div className="mt-[-25rem] bg-gray-100 rounded-lg" style={{height: '40vh'}}>
                        <div className="mt-[-25rem] bg-gray-100 rounded-lg" style={{height: '40vh'}}>
                            <h2 className="mb-4 p-3 font-bold text-lg">Switch Content Section</h2>
                            <div>
                            </div>
                        </div>
                    </div>

                );
                break;
            default:
                contentComponent = (

                    <div className="mt-[-25rem] bg-gray-100 rounded-lg" style={{height: '40vh'}}>
                        <div className="mt-[-25rem] bg-gray-100 rounded-lg" style={{height: '40vh'}}>
                            <h2 className="mb-4 p-3 font-bold text-lg">Switch Content Section</h2>
                            <div>
                            </div>
                        </div>
                    </div>
                );
        }
        return contentComponent;
    };
  const submitRequest = () => {
      console.log("submitting");
      if (
      singleServiceRequest.name &&
      !isNaN(singleServiceRequest.room) &&
      singleServiceRequest.deliveryDate
    ) {
        setRequests([...requests, singleServiceRequest]);
      submitRequestDB(singleServiceRequest).then();
      clearForm();
    }
  };

  //ToDo: Can delete once combine with actual submitRequest
  const clearForm = () => {
    setSingleServiceRequest(defaultServiceRequest);
  };

  //cancels specific request in My Request column
  const cancelRequest = (index: number) => {
    const updatedRequests = requests.filter((_, i) => i !== index);
    setRequests(updatedRequests);
  };

  //ToDo: Comment here
  const [openSuccessMessage, setOpenSuccess] = useState(false);

    return (
        <>
            <div className="grid grid-cols-2 gap-4 items-start p-4 bg-gray-300 rounded-lg" style={{ paddingTop: '8%' }}>

                <div className="col-span-1" style={{ paddingLeft: '20%' }}>
                    <div className="bg-gray-100 rounded-lg p-5" style={{ maxWidth: '60%' }}>
                        <h2 className="mb-4 font-bold text-lg">Select Service Type</h2>
                        <div className="flex flex-col space-y-4">
                            {availableServices.map((serviceOption: string) => (
                                <Button key={serviceOption} variant="contained" onClick={() => setSingleServiceRequest({
                                    ...singleServiceRequest,
                                    type: serviceOption
                                })}>
                                    {serviceOption}
                                </Button>
                            ))}
                            <p className="text-sm">Selected Service: {singleServiceRequest.type}</p>
                        </div>
                    </div>
                </div>

                <div className="col-span-1" style={{paddingRight: '20%'}}>
                    {contentComponent}
                </div>

                <div className="col-span-1" style={{ height: '80%', paddingTop: '10%', paddingLeft: '20%' }}>
                    <div className="bg-gray-100 rounded-lg p-5 overflow-auto" style={{ maxHeight: '80%', maxWidth: '60%' }}>
                        <h2 className="mb-4 font-bold text-lg">My Requests</h2>
                        <hr className="mb-4 border-solid border border-black" />
                        {requests.map((request, index) => (
                            <div key={index} className="request-box mb-2">
                                <p>Service Type: {request.type}</p>
                                <p>Name: {request.name}</p>
                                <p>Delivery Date: {request.deliveryDate}</p>
                                <p>Room: {request.room}</p>
                                <p>Details: {request.details}</p>
                                <Button variant="contained" onClick={() => cancelRequest(index)}>Cancel</Button>
                                {index < requests.length - 1 && <hr className="mb-4" style={{ border: '1px solid black' }} />}
                            </div>
                        ))}
                        <hr className="mb-4 border-solid border border-black" />
                        <Button variant="contained" onClick={() => { setOpenSuccess(true); }}>Done</Button>
                    </div>
                </div>
                <div className="content" id="content">
                    {switchService(singleServiceRequest.type)}

                    <div className="col-span-1 mt-10" style={{ paddingRight: '10%' }}>
                        <div className="bg-gray-100 rounded-lg p-4" style={{ height: '30vh' }}>
                            <h2 className="mb-4 font-bold text-lg">Service Request Form</h2>
                            <div className="space-y-4">
                                <div className="form-item flex flex-col lg:flex-row lg:space-x-4">
                                    <div className="flex-1">
                                        <label htmlFor="room">Room:</label>
                                        <input className="border rounded-md px-2 py-1 w-full" type="number" id="room"
                                               value={singleServiceRequest.room} onChange={e => setSingleServiceRequest({
                                            ...singleServiceRequest,
                                            room: parseInt(e.target.value) || NaN
                                        })} placeholder="Room Number" />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="name">Name:</label>
                                        <input className="border rounded-md px-2 py-1 w-full" type="text" id="name"
                                               value={singleServiceRequest.name} onChange={e => setSingleServiceRequest({
                                            ...singleServiceRequest,
                                            name: e.target.value
                                        })} placeholder="Name" />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="deliveryDate">Delivery Date:</label>
                                        <input className="border rounded-md px-2 py-1 w-full" type="date" id="deliveryDate"
                                               value={singleServiceRequest.deliveryDate}
                                               onChange={e => setSingleServiceRequest({
                                                   ...singleServiceRequest,
                                                   deliveryDate: e.target.value
                                               })} placeholder="Delivery Date" />
                                    </div>
                                </div>
                                <div className="form-item">
                                    <label htmlFor="details">Details:</label>
                                    <textarea className="border rounded-md px-2 py-1 w-full" id="details"
                                              value={singleServiceRequest.details} onChange={e => setSingleServiceRequest({
                                        ...singleServiceRequest,
                                        details: e.target.value
                                    })} placeholder="Please Enter Request Details Here" />
                                </div>
                                <div className="form-item">
                                    <Button variant="contained" color="success" onClick={submitRequest}>Submit
                                        Request</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            {/* Modal for success message */}
            <Modal open={openSuccessMessage}>
                <Card
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-md rounded-lg p-10">
                    <h1 id="successMessage" className="text-center text-green-600 text-xl mb-4">Success! Request
                        Submitted</h1>
                    <Button onClick={() => clearRequests()}>Close</Button>
                </Card>
            </Modal>
        </>
    );
}

export default ServiceRequestLog;
