import { useState } from "react";
import "./FullServiceRequest.css";
import { ServiceRequest } from "./ServiceRequest.tsx";
import { submitRequestDB } from "./SubmitRequest.tsx";
import SideBar from "./SideBar.tsx";

import {
  Button,
  Stack,
  TextField,
  Typography,
  Grid,
  Modal,
  Card,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 10,
  padding: "50px",
  width: "fit-content",
  height: "fit-content",
};

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

  //Function to test if my request updates when submit an order
  //ToDo: Can delete once combine with actual submitRequest
  //ToDo: check for item having been selected

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
    <Stack direction = "row" spacing={2}>
        <SideBar/>
        {/* Topmost div which is a container Grid*/}
        {/* Overriding default material-ui styling by specifying columnSpacing, marginX, and width*/}
        <Grid
            container
            className="container"
            columnSpacing={4}
            marginX={0}
            width={"100%"}
        >
            {/*Grid container which holds the buttons and takes up 1/4 of the width */}
            <Grid
                container
                xs={3}
                className="availableServices"
                direction={"column"}
                alignItems="center"
                justifyContent={"center"}
            >
                <h3>Select Service Type</h3>

                {/*map the possible options to buttons*/}
                <Stack spacing={4}>
                    {availableServices.map((serviceOption) => {
                        // For every serviceOption display a button where the onclick function modifies the singleServiceRequest with the type set to the serviceOption
                        return (
                            <Button
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
                        );
                    })}
                    {/*Display the selected service option*/}
                    <Typography>
                        Selected Service: {singleServiceRequest.type}
                    </Typography>
                </Stack>
            </Grid>

            {/*Middle column, which takes up 5/12th of the width*/}

            <Grid item xs={5}>
                <Stack direction={"column"} spacing={4}>
                    <div className="service-form">
                        <h2>Service Request Form</h2>
                        {/* The details of the request, which will later be replaced with something specific based on what button is clicked */}
                        {/* On change will load in all key value pairs in singleServiceRequest but replace one specific key value pair */}
                        <div className="form-item">
                            <label htmlFor="details">Details:</label>
                            <TextField
                                variant={"filled"}
                                multiline
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

                        {/* Stack for the form items */}
                        <Stack spacing={4}>
                            {/* TextField to enter the Room number, which disallows non-numeric characters */}
                            <div className="form-item">
                                <label htmlFor="room">Room:</label>
                                <TextField
                                    variant={"filled"}
                                    type="number"
                                    id="room"
                                    value={singleServiceRequest.room}
                                    onChange={(e) =>
                                        setSingleServiceRequest({
                                            ...singleServiceRequest,
                                            room: parseInt(e.target.value) || NaN,
                                        })
                                    }
                                    placeholder="Room Number"
                                />
                            </div>

                            {/* TextField to enter the name */}
                            <div className="form-item">
                                <label htmlFor="name">Name:</label>
                                <TextField
                                    variant={"filled"}
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

                            {/* TextField to enter the the date for when to deliver the service*/}
                            <div className="form-item">
                                <label htmlFor="deliveryDate">Delivery Date:</label>
                                <TextField
                                    variant={"filled"}
                                    type="date"
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

                            {/* Submit button for the form */}
                            <div className="form-item">
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={submitRequest}
                                >
                                    Submit Request
                                </Button>
                            </div>
                        </Stack>
                    </div>
                </Stack>
            </Grid>

            {/*My Request Format*/}
            <Grid
                className={"service-request-log"}
                item
                xs={4}
                sx={{ margin: "auto" }}
            >
                {/* List of submitted service requests */}
                <div className="my-requests">
                    <h3>My Requests</h3>
                    <hr />
                    {requests.map((request, index) => (
                        <div className="request-box" key={index}>
                            {/* Service Request info */}
                            {/*ToDo: make service request updatable*/}
                            <p>Service Type: {request.type}</p>

                            <p>Name: {request.name}</p>
                            <p>Delivery Date: {request.deliveryDate}</p>
                            <p>Room: {request.room}</p>
                            <p>Details: {request.details}</p>

                            {/* Button to cancel individual requests */}
                            <Button
                                variant="contained"
                                onClick={() => cancelRequest(index)}
                            >
                                Cancel
                            </Button>

                            {/* Divider line */}
                            {index < requests.length - 1 && <hr />}
                        </div>
                    ))}
                    <hr />
                    {/* Done button to clear all requests assuming they are submitted*/}
                    {/*ToDo: connect to a pop up that says "requests successfully submitted" and return to initial page (map?)*/}
                    <Button variant="contained" onClick={() => setOpenSuccess(true)}>
                        Done
                    </Button>

                    {/*ToDo: Comment here*/}
                    <Modal open={openSuccessMessage}>
                        <Card sx={modalStyle}>
                            <h1 id="successMessage">Success! Request Submitted</h1>
                            <Button onClick={() => setOpenSuccess(false)}>Close</Button>
                        </Card>
                    </Modal>
                </div>
            </Grid>
        </Grid>
    </Stack>

    </>
  );
}

export default ServiceRequestLog;
