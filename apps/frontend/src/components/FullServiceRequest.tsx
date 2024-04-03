import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ServiceRequest } from "./ServiceRequest.tsx";
import { submitRequestDB } from "./SubmitRequest.tsx";
import {
  Button,
  Stack,
  TextField,
  // Typography,
  // Grid,
  Modal,
  Card,
} from "@mui/material";
import Flower1 from "./image/Flower1.png";
import Flower2 from "./image/Flower2.png";
import Flower3 from "./image/Flower3.png";
import Flower4 from "./image/Flower4.png";
import SideBar from "./SideBar.tsx";
import { RequestContext } from "../App.tsx";
import Autocomplete from "@mui/material/Autocomplete";
import { Nodes } from "database";
import axios from "axios";

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
    room: "",
    deliveryDate: "",
    type: availableServices[0],
    subType: "",
    details: "",
  };

  const [nodes, setNodes] = useState<Nodes[]>();

  // const [room, setRoom] = useState("");
  const Locations = nodes?.map((node: Nodes) => node.LongName) || [];

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/admin/allnodes");
      const allNodes = res.data;
      const nonHallwayNodes = allNodes.filter(
        (node: { LongName: string | string[] }) =>
          !node.LongName.includes("Hallway"),
      );
      setNodes(nonHallwayNodes);
      console.log("successfully got data from get request");
    }

    fetchData().then();
  }, []);

  /*useState for a single service request, where any changes update the specific key-value pair*/
  const [singleServiceRequest, setSingleServiceRequest] =
    useState<ServiceRequest>(defaultServiceRequest);

  /*requests handles the list of service requests, which is used for the list on the side of the page*/
  // const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const { requests, setRequests } = useContext(RequestContext);
  let contentComponent: JSX.Element | null = null;
  //Function to test if my request updates when submit an order
  //ToDo: Can delete once combine with actual submitRequest
  //ToDo: check for item having been selected
  const switchService = (service: string) => {
    switch (service) {
      case "Flowers":
        contentComponent = (
          <>
            <div className="mt-[-19rem] bg-white rounded-lg">
              <h2 className="mb-4 p-4 font-bold text-lg">
                Switch Content Section
              </h2>
              <div className="bg-white gap-2 rounded-lg p-8">
                <Stack direction="row" height="30vh">
                  <div>
                    <label className="">
                      <button
                        className={`${singleServiceRequest.subType === "Daffodil" ? "border-4 border-primary rounded-[2.8rem]" : ""}`}
                      >
                        <img
                          className=""
                          src={Flower1}
                          onClick={() =>
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              subType: "Daffodil",
                            })
                          }
                          alt="Flowers"
                        />
                      </button>
                    </label>
                    <label className="">
                      <button
                        className={`${singleServiceRequest.subType === "Carnation" ? "border-4 border-primary rounded-[2.8rem]" : ""}`}
                      >
                        <img
                          className=""
                          src={Flower2}
                          onClick={() =>
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              subType: "Carnation",
                            })
                          }
                          alt="Flowers"
                        />
                      </button>
                    </label>
                    <label className="">
                      <button
                        className={`${singleServiceRequest.subType === "Rose" ? "border-4 border-primary rounded-[2.8rem]" : ""}`}
                      >
                        <img
                          className=""
                          src={Flower3}
                          onClick={() =>
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              subType: "Rose",
                            })
                          }
                          alt="Flowers"
                        />
                      </button>
                    </label>
                    <label className="">
                      <button
                        className={`${singleServiceRequest.subType === "Lily" ? "border-4 border-primary rounded-[2.8rem]" : ""}`}
                      >
                        <img
                          className=""
                          src={Flower4}
                          onClick={() =>
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              subType: "Lily",
                            })
                          }
                          alt="Flowers "
                        />
                      </button>
                    </label>
                  </div>
                </Stack>
              </div>
            </div>
          </>
        );
        break;
      case "Food":
        contentComponent = (
          <Stack direction="row" height="9vh">
            <div className="mt-[-19rem] bg-white rounded-lg">
              <h2 className="mb-4 p-4 font-bold text-lg">
                Switch Content Section
              </h2>
              <div className="bg-white gap-2 rounded-lg "></div>
            </div>
          </Stack>
        );
        break;
      default:
        contentComponent = (
          <Stack direction="row" height="9vh">
            <div className="mt-[-19rem] bg-white rounded-lg">
              <h2 className="mb-4 p-4 font-bold text-lg">
                Switch Content Section
              </h2>
              <div className="bg-white gap-2 rounded-lg "></div>
            </div>
          </Stack>
        );
    }
    return contentComponent;
  };
  const submitRequest = () => {
    console.log("submitting");
    if (
      singleServiceRequest.name &&
      // !isNaN(singleServiceRequest.room) &&
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
  const clearRequests = () => {
    setRequests([]);
    setOpenSuccess(false); // Close the success modal if it's open
  };

  //ToDo: Comment here
  const [openSuccessMessage, setOpenSuccess] = useState(false);

  return (
    <div className="flex">
      <div className="inline-block">
        <SideBar />
      </div>

      <div className="inline-block w-[80%]">
        <div>
          <div className="inline-block w-[40%]">
            <div className="">
              <div className="bg-white rounded-lg p-5">
                <h2 className="mb-4 font-bold text-lg">Select Service Type</h2>
                <div className="flex flex-col space-y-4">
                  {availableServices.map((serviceOption: string) => (
                    <Button
                      key={serviceOption}
                      variant="contained"
                      onClick={() =>
                        setSingleServiceRequest({
                          ...singleServiceRequest,
                          type: serviceOption,
                        })
                      }
                    >
                      {serviceOption}
                    </Button>
                  ))}
                  <p className="text-sm">
                    Selected Service: {singleServiceRequest.type}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="inline-block w-[60%] ">{contentComponent}</div>
        </div>

        <div>
          <div className="inline-block w-[40%]">
            <div className="" style={{ height: "100%", paddingTop: "10%" }}>
              <div
                className="bg-white rounded-lg p-5 overflow-auto"
                style={{ maxHeight: "40vh" }}
              >
                <h2 className="mb-4 font-bold text-lg">My Requests</h2>
                <hr className="mb-4 border-solid border border-black" />
                {requests.map((request, index) => (
                  <div key={index} className="request-box mb-2">
                    <p>Service Type: {request.type}</p>
                    <p>Sub Type: {request.subType}</p>
                    <p>Name: {request.name}</p>
                    <p>Delivery Date: {request.deliveryDate}</p>
                    <p>Room: {request.room}</p>
                    <p>Details: {request.details}</p>

                    <Button
                      variant="contained"
                      onClick={() => cancelRequest(index)}
                    >
                      Cancel
                    </Button>
                    {index < requests.length - 1 && (
                      <hr
                        className="mb-4"
                        style={{ border: "1px solid black" }}
                      />
                    )}
                  </div>
                ))}
                <hr className="mb-4 border-solid border border-black" />
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenSuccess(true);
                  }}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>

          <div className="inline-block w-[60%]">
            <div className="content" id="content">
              {switchService(singleServiceRequest.type)}

              <div className="mt-[5rem]">
                <div
                  className="bg-white rounded-lg p-4"
                  style={{ height: "30vh" }}
                >
                  <h2 className="mb-4 font-bold text-lg">
                    {" "}
                    Service Request Form
                  </h2>
                  <div className="space-y-4">
                    <div className="form-item flex flex-col lg:flex-row lg:space-x-4">
                      <div className="flex-1">
                        <label htmlFor="room">Room:</label>

                        <Autocomplete
                          value={singleServiceRequest.room}
                          onChange={(
                            e: ChangeEvent<unknown>,
                            getRoom: string | null,
                          ) =>
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              room: getRoom!,
                            })
                          }
                          disablePortal
                          id="combo-box-end"
                          options={Locations}
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Room Name" />
                          )}
                        />
                        {/*<input className="border rounded-md px-2 py-1 w-full" type="number"*/}
                        {/*       id="room"*/}
                        {/*       value={singleServiceRequest.room}*/}
                        {/*       onChange={e => setSingleServiceRequest({*/}
                        {/*           ...singleServiceRequest,*/}
                        {/*           room: parseInt(e.target.value) || NaN*/}
                        {/*       })} placeholder="Room Number"/>*/}
                      </div>
                      <div className="flex-1">
                        <label htmlFor="name">Name:</label>
                        <input
                          className="border rounded-md px-2 py-1 w-full"
                          type="text"
                          id="name"
                          value={singleServiceRequest.name}
                          onChange={(e) =>
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              name: e.target.value,
                            })
                          }
                          placeholder="Name"
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="deliveryDate">Delivery Date:</label>
                        <input
                          className="border rounded-md px-2 py-1 w-full"
                          type="datetime-local"
                          id="deliveryDate"
                          value={singleServiceRequest.deliveryDate}
                          onChange={(e) =>
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              deliveryDate: e.target.value,
                            })
                          }
                          placeholder="Delivery Date"
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <label htmlFor="details">Details:</label>
                      <textarea
                        className="border rounded-md px-2 py-1 w-full"
                        id="details"
                        value={singleServiceRequest.details}
                        onChange={(e) =>
                          setSingleServiceRequest({
                            ...singleServiceRequest,
                            details: e.target.value,
                          })
                        }
                        placeholder="Please Enter Request Details Here"
                      />
                    </div>
                    <div className="form-item">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={submitRequest}
                      >
                        Submit Request
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for success message */}
      <Modal open={openSuccessMessage}>
        <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-md rounded-lg p-10">
          <h1
            id="successMessage"
            className="text-center text-green-600 text-xl mb-4"
          >
            Success! Request Submitted
          </h1>
          <Button onClick={() => clearRequests()}>Close</Button>
        </Card>
      </Modal>
    </div>
  );
}

export default ServiceRequestLog;
