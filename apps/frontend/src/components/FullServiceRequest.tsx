import { ChangeEvent, useContext, useEffect, useState } from "react";
import React from "react";
import { ServiceRequest } from "../Interfaces/ServiceRequest.ts";
import { submitRequestDB } from "../backendreference/SubmitRequest.tsx";
import {
  Button,
  Stack,
  TextField,
  // Typography,
  // Grid,
  Modal,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
} from "@mui/material";
import Flower1 from "../assets/image/Flower1.png";
import Flower2 from "../assets/image/Flower2.png";
import Flower3 from "../assets/image/Flower3.png";
import Flower4 from "../assets/image/Flower4.png";
import BalloonBasket from "../assets/image/BalloonBasket.png";
import Comfort from "../assets/image/Comfort.png";
import FruitBasket from "../assets/image/FruitBasket.png";
import GiftSet from "../assets/image/GiftSet.png";

import SideBar from "./SideBar.tsx";
import { RequestContext } from "../App.tsx";
import Autocomplete from "@mui/material/Autocomplete";
import { Nodes } from "database";
import axios from "axios";

// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import dayjs from "dayjs";

//Define interface for each service request
//ToDo: add type of service request to update with name, room, date

export interface ListOfServices {
  availableServices: string[];
}

//Define functions for "My Request" log
function ServiceRequestLog({ availableServices }: ListOfServices) {
  /*DefaultServiceRequest is the default state of the Service Request object, where everything is empty*/
  const defaultServiceRequest: ServiceRequest = {
    requesterName: "",
    requestType: "",
    priority: "",
    locationNodeID: "",
    details1: "",
    details2: "",
    details3: "",
    deliveryDate: "",
    status: "Unassigned",
  };

  const [nodes, setNodes] = useState<Nodes[]>();

  // const [room, setRoom] = useState("");
  const Locations = nodes?.map((node: Nodes) => node.LongName) || [];
  Locations.sort((longname1, longname2) => {
    if (longname1 > longname2) {
      return 1;
    } else if (longname1 < longname2) {
      return -1;
    } else {
      return 0;
    }
  });

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/admin/allnodes/NoHall");
      const allNodes = res.data;
      setNodes(allNodes);
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
            <div className="bg-white rounded-lg ">
              <h2 className="py-4 font-bold text-lg">Select Type</h2>
              <div className="bg-white gap-2 rounded-lg">
                <Stack direction="row">
                  <label className="mr-2">
                    <button
                      className={`${singleServiceRequest.details1 === "Daffodil" ? "border-4 border-primary rounded-[2.8rem]" : ""}`}
                    >
                      <img
                        className=""
                        src={Flower1}
                        onClick={() =>
                          setSingleServiceRequest({
                            ...singleServiceRequest,
                            details1: "Daffodil",
                          })
                        }
                        alt="Flowers"
                      />
                    </button>
                  </label>
                  <label className="mr-2">
                    <button
                      className={`${singleServiceRequest.details1 === "Carnation" ? "border-4 border-primary rounded-[2.8rem]" : ""}`}
                    >
                      <img
                        className=""
                        src={Flower2}
                        onClick={() =>
                          setSingleServiceRequest({
                            ...singleServiceRequest,
                            details1: "Carnation",
                          })
                        }
                        alt="Flowers"
                      />
                    </button>
                  </label>
                  <label className="mr-2">
                    <button
                      className={`${singleServiceRequest.details1 === "Rose" ? "border-4 border-primary rounded-[2.8rem]" : ""}`}
                    >
                      <img
                        className=""
                        src={Flower3}
                        onClick={() =>
                          setSingleServiceRequest({
                            ...singleServiceRequest,
                            details1: "Rose",
                          })
                        }
                        alt="Flowers"
                      />
                    </button>
                  </label>
                  <label className="mr-2">
                    <button
                      className={`${singleServiceRequest.details1 === "Lily" ? "border-4 border-primary rounded-[2.8rem]" : ""}`}
                    >
                      <img
                        className=""
                        src={Flower4}
                        onClick={() =>
                          setSingleServiceRequest({
                            ...singleServiceRequest,
                            details1: "Lily",
                          })
                        }
                        alt="Flowers "
                      />
                    </button>
                  </label>
                </Stack>
              </div>
            </div>
          </>
        );
        break;
      case "Gifts":
        contentComponent = (
          <>
            <div className="bg-white rounded-lg">
              <h2 className="py-4 font-bold text-lg">Select Type</h2>
              <div className="bg-white gap-2 rounded-lg">
                <Stack direction="row">
                  <label className="mr-2">
                    <button
                      className={`${singleServiceRequest.details1 === "Balloons" ? "border-4 border-primary rounded-[2.8rem]" : ""}`}
                    >
                      <img
                        className="rounded-[2.4rem] h-[152px] w-[157px] border border-black"
                        src={BalloonBasket}
                        onClick={() =>
                          setSingleServiceRequest({
                            ...singleServiceRequest,
                            details1: "Balloons",
                          })
                        }
                        alt="Gifts"
                      />
                    </button>
                  </label>
                  <label className="mr-2">
                    <button
                      className={`${singleServiceRequest.details1 === "Comfort Basket" ? "border-4 border-primary rounded-[2.8rem]" : ""}`}
                    >
                      <img
                        className="rounded-[2.4rem] h-[152px] w-[157px] border border-black"
                        src={Comfort}
                        onClick={() =>
                          setSingleServiceRequest({
                            ...singleServiceRequest,
                            details1: "Comfort Basket",
                          })
                        }
                        alt="Gifts"
                      />
                    </button>
                  </label>
                  <label className="mr-2">
                    <button
                      className={`${singleServiceRequest.details1 === "Fruit Basket" ? "border-4 border-primary rounded-[2.8rem]" : ""}`}
                    >
                      <img
                        className="rounded-[2.4rem] h-[152px] w-[157px] border border-black"
                        src={FruitBasket}
                        onClick={() =>
                          setSingleServiceRequest({
                            ...singleServiceRequest,
                            details1: "Fruit Basket",
                          })
                        }
                        alt="Gifts"
                      />
                    </button>
                  </label>
                  <label className="mr-2">
                    <button
                      className={`${singleServiceRequest.details1 === "Gift Set" ? "border-4 border-primary rounded-[2.8rem]" : ""}`}
                    >
                      <img
                        className="rounded-[2.4rem] h-[152px] w-[157px] border border-black"
                        src={GiftSet}
                        onClick={() =>
                          setSingleServiceRequest({
                            ...singleServiceRequest,
                            details1: "Gift Set",
                          })
                        }
                        alt="Gifts "
                      />
                    </button>
                  </label>
                </Stack>
              </div>
            </div>
          </>
        );

        break;
      default:
        break;
    }
    return contentComponent;
  };

  const submitRequest = () => {
    console.log("submitting");

    if (
      singleServiceRequest.requesterName &&
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
  // const cancelRequest = (index: number) => {
  //   const updatedRequests = requests.filter((_, i) => i !== index);
  //   setRequests(updatedRequests);
  // };
  const clearRequests = () => {
    setRequests([]);
    setOpenSuccess(false); // Close the success modal if it's open
  };

  //ToDo: Comment here
  const [openSuccessMessage, setOpenSuccess] = useState(false);

  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="flex h-screen ">
      <div className="inline-block flex-none">
        <SideBar />
      </div>

      <div className="flex-grow overflow-y-auto">
        <div className="bg-gray-400 bg-opacity-15 flex justify-center min-h-screen">
          <div className="bg-white rounded-lg p-5 w-2/4">
            <h2 className="mb-4 font-bold text-lg">Select Service Type</h2>

            <div className="flex flex-col space-y-4">
              <FormControl className="">
                <InputLabel id="select-service-type-label">
                  Service Type
                </InputLabel>
                <Select
                  labelId="select-service-type-label"
                  value={singleServiceRequest.requestType}
                  label="Service Type"
                  onChange={(e) => {
                    setSingleServiceRequest({
                      ...singleServiceRequest,
                      requestType: e.target.value as string,
                    });
                  }}
                >
                  {availableServices.map((serviceOption: string) => (
                    <MenuItem key={serviceOption} value={serviceOption}>
                      {serviceOption}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {switchService(singleServiceRequest.requestType)}

            <div className="my-5">
              <h2 className="font-bold text-lg">Priority</h2>

              <div className="">
                <RadioGroup
                  row
                  defaultValue="low"
                  name="priority-label"
                  value={singleServiceRequest.priority}
                  onChange={(e) => {
                    setSingleServiceRequest({
                      ...singleServiceRequest,
                      priority: e.target.value as string,
                    });
                  }}
                >
                  <FormControlLabel
                    value="Low"
                    control={<Radio />}
                    label="Low"
                  />
                  <FormControlLabel
                    value="Medium"
                    control={<Radio />}
                    label="Medium"
                  />
                  <FormControlLabel
                    value="High"
                    control={<Radio />}
                    label="High"
                  />
                  <FormControlLabel
                    value="Emergency"
                    control={<Radio />}
                    label="Emergency"
                  />
                </RadioGroup>
              </div>
            </div>

            <div className="content" id="content">
              <div className="mt-2">
                <div className="bg-white rounded-lg ">
                  <h2 className="mb-4 font-bold text-lg">
                    Service Request Form
                  </h2>
                  <div className="space-y-4">
                    <div className="form-item flex flex-col">
                      <div className="flex mb:flex-row">
                        <div className="flex-1 mb-3 ">
                          <TextField
                            className="border rounded-md px-2 py-1 w-3/4"
                            type="text"
                            id="name"
                            label="Name"
                            variant="outlined"
                            value={singleServiceRequest.requesterName}
                            onChange={(e) =>
                              setSingleServiceRequest({
                                ...singleServiceRequest,
                                requesterName: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="flex-1 mb-3">
                          <div className="flex flex-col">
                            <input
                              className="border border-gray-390 rounded-md px-2 py-4 w-3/4"
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
                              style={{
                                height: "3.5rem",
                                paddingBottom: "1rem",
                                paddingTop: "1rem",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <Autocomplete
                          value={
                            nodes?.filter(
                              (node) =>
                                node.LongName ===
                                singleServiceRequest.locationNodeID,
                            )[0]?.LongName
                          }
                          onChange={(
                            e: ChangeEvent<unknown>,
                            getRoom: string | null,
                          ) =>
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              locationNodeID: nodes!.filter(
                                (node) => node.LongName === getRoom,
                              )[0].NodeID,
                            })
                          }
                          disablePortal
                          id="combo-box-end"
                          options={Locations}
                          renderInput={(params) => (
                            <TextField {...params} label="Room Name" />
                          )}
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <TextField
                        className="w-full "
                        id="details"
                        label="Details"
                        multiline
                        maxRows={2}
                        value={singleServiceRequest.details1}
                        onChange={(e) =>
                          setSingleServiceRequest({
                            ...singleServiceRequest,
                            details1: e.target.value,
                          })
                        }
                      />
                    </div>
                    {singleServiceRequest.requestType === "Flowers" && (
                      <div className="my-5">
                        <h2 className=" text-lg">Size of Bouquet</h2>

                        <RadioGroup
                          row
                          defaultValue="oral"
                          name="route"
                          value={singleServiceRequest.details2}
                          onChange={(e) =>
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              details2: e.target.value as string,
                            })
                          }
                        >
                          <FormControlLabel
                            value="Small"
                            control={<Radio />}
                            label="Small"
                          />
                          <FormControlLabel
                            value="Medium"
                            control={<Radio />}
                            label="Medium"
                          />
                          <FormControlLabel
                            value="Large"
                            control={<Radio />}
                            label="Large"
                          />
                        </RadioGroup>
                        <h4 className="flex justify-end text-xs text-gray-200">
                          Made By Lauren Harrison & Zihan Li
                        </h4>
                      </div>
                    )}
                    {singleServiceRequest.requestType === "Gifts" && (
                      <div className="flex flex-col mt-3">
                        <div className="flex items-center">
                          <input
                            id="gifts-checkbox"
                            type="checkbox"
                            value={singleServiceRequest.details3}
                            onChange={(e) =>
                              setSingleServiceRequest({
                                ...singleServiceRequest,
                                details3:
                                  "" + e.target.checked ? "true" : "false",
                              })
                            }
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="gifts-checkbox" className="ms-2">
                            Wrapped
                          </label>
                        </div>
                        <h4 className="flex justify-end text-xs text-gray-200">
                          Made by Artem Frenk and Arjun Venat
                        </h4>
                      </div>
                    )}

                    {singleServiceRequest.requestType === "Maintenance" && (
                      <div className="my-5">
                        <h2 className="mb-2  text-lg">Type of maintenance</h2>
                        <FormControl fullWidth>
                          <InputLabel id="type-maintenance-label">
                            Type of maintenance
                          </InputLabel>
                          <Select
                            labelId="type-maintenance-label"
                            label="Type of maintenance"
                            value={singleServiceRequest.details2}
                            onChange={(e) =>
                              setSingleServiceRequest({
                                ...singleServiceRequest,
                                details2: e.target.value as string,
                              })
                            }
                          >
                            <MenuItem value="spill">Spill</MenuItem>
                            <MenuItem value="down elevator">
                              Down elevator
                            </MenuItem>
                            <MenuItem value="electricity issue">
                              Electricity issue
                            </MenuItem>
                            <MenuItem value="bathroom">Bathroom</MenuItem>
                          </Select>

                          <div className="flex items-center mt-3">
                            <input
                              id="link-checkbox"
                              type="checkbox"
                              value={singleServiceRequest.details3}
                              onChange={(e) =>
                                setSingleServiceRequest({
                                  ...singleServiceRequest,
                                  details3: "" + e.target.checked,
                                })
                              }
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor="link-checkbox" className="ms-2 ">
                              Hazardous Material
                            </label>
                          </div>

                          <h4 className="flex justify-end text-xs text-gray-200">
                            Made By Jessie Hart & Hubert Liu
                          </h4>
                        </FormControl>
                      </div>
                    )}
                    {singleServiceRequest.requestType === "Medicine" && (
                      <div className="my-5">
                        <form className="w-2/3">
                          <label htmlFor="dosage" className="mb-2 text-lg">
                            Dosage
                          </label>
                          <div className="flex mb:flex-row">
                            <input
                              type="number"
                              id="dosage"
                              min = "0"
                              className="flex-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                              placeholder="Dosage"
                              // value={dosage}
                              // onChange={(e) =>
                              //   setDosage(e.target.value.toString())
                              // }
                              value={singleServiceRequest.details2}
                              onChange={(e) =>
                                setSingleServiceRequest({
                                  ...singleServiceRequest,
                                  details2: e.target.value as string,
                                })
                              }
                              required
                            />

                            <Select
                              className="flex-1 border border-gray-300 text-gray-900 text-sm rounded-r-lg bg-white focus:ring-blue-500"
                              // value={unit}
                              // onChange={(e) =>
                              //   setUnit(e.target.value.toString())
                              // }
                            >
                              <MenuItem value="grams">grams</MenuItem>
                              <MenuItem value="milligrams">milligrams</MenuItem>
                              <MenuItem value="micrograms">micrograms</MenuItem>
                              <MenuItem value="liters">liters</MenuItem>
                            </Select>
                          </div>
                        </form>

                        <h2 className="text-lg mt-3">Route</h2>
                        <RadioGroup
                          defaultValue="oral"
                          name="route"
                          value={singleServiceRequest.details3}
                          onChange={(e) =>
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              details3: e.target.value as string,
                            })
                          }
                        >
                          <FormControlLabel
                            value="oral"
                            control={<Radio />}
                            label="Oral"
                          />
                          <FormControlLabel
                            value="injected"
                            control={<Radio />}
                            label="Injected"
                          />
                          <FormControlLabel
                            value="topical"
                            control={<Radio />}
                            label="Topical"
                          />
                        </RadioGroup>
                        <h4 className="flex justify-end text-xs text-gray-200">
                          Made by Brannon Henson and Alexander Stoyanov
                        </h4>
                      </div>
                    )}
                    {singleServiceRequest.requestType ===
                      "Medical Equipment" && (
                      <div className="my-5">
                        <form className="max-w-sm w-1/4 ">
                          <label htmlFor="Quantity" className="mb-2 text-lg">
                            Quantity
                          </label>
                          <input
                            type="number"
                            id="dosage"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Quantity"
                            value={singleServiceRequest.details2}
                            onChange={(e) =>
                              setSingleServiceRequest({
                                ...singleServiceRequest,
                                details2: e.target.value as string,
                              })
                            }
                            required
                          />
                        </form>

                        <h2 className="text-lg mt-3">Requires Supervision</h2>
                        <FormGroup
                          onChange={(e) =>
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              details3: (e.target as HTMLInputElement)
                                .value as string,
                            })
                          }
                        >
                          <FormControlLabel
                            value="Complex setup"
                            control={<Checkbox />}
                            label="Complex setup"
                          />
                          <FormControlLabel
                            value="Risk of injury"
                            control={<Checkbox />}
                            label="Risk of injury"
                          />
                          <FormControlLabel
                            value="Patient assistance"
                            control={<Checkbox />}
                            label="Patient assistance"
                          />
                        </FormGroup>
                        <h4 className="flex justify-end text-xs text-gray-200">
                          Made By Javier DeLeon & Nicholas Golparvar{" "}
                        </h4>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-item flex justify-end mt-4">
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
    // </LocalizationProvider>
  );
}

export default ServiceRequestLog;
