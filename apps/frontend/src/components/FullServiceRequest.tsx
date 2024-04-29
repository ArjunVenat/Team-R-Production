import { ChangeEvent, useContext, useEffect, useState } from "react";
import React from "react";
import { ServiceRequest } from "../Interfaces/ServiceRequest.ts";
import { Employee } from "../Interfaces/Employee.ts";
import { submitRequestDB } from "../backendreference/SubmitRequest.tsx";
import {
  Button,
  // Stack,
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

// import SideBar from "./SideBar.tsx";
import { RequestContext } from "../App.tsx";
import Autocomplete from "@mui/material/Autocomplete";
import { Nodes } from "database";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../styles/SwiperStyle.css";
import { useTranslation } from "react-i18next";

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

// This function logs service requests and requires a list of available services as input.
function ServiceRequestLog(props: { typeOfService: string }) {
  // Use the Auth0 React hook to handle authentication.
  const {
    getAccessTokenSilently,
    isLoading,
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  // Check if authentication is not in progress and the user is not authenticated.
  if (!isLoading && !isAuthenticated) {
    // Redirect user to login page with return state to the current location.
    loginWithRedirect({
      appState: {
        returnTo: location.pathname,
      },
    }).then();
  }

  /*DefaultServiceRequest is the default state of the Service Request object, where everything is empty*/
  const defaultServiceRequest: ServiceRequest = {
    requesterName: "",
    requestType: "",
    priority: "",
    locationNodeID: "",
    employeeID: "",
    details1: "",
    details2: "",
    details3: "",
    deliveryDate: "",
    status: "Unassigned",
  };

  const [nodes, setNodes] = useState<Nodes[]>();
  const [employees, setEmployees] = useState<Employee[]>();

  // Create an array of location names from the nodes array if it exists, otherwise initialize an empty array.
  const Locations = nodes?.map((node: Nodes) => node.LongName) || [];
  const Nicknames: string[] =
    employees?.map((employee: Employee) => employee.nickname) || [];

  // Sort the location names alphabetically
  Locations.sort((longname1, longname2) => {
    if (longname1 > longname2) {
      return 1;
    } else if (longname1 < longname2) {
      return -1;
    } else {
      return 0;
    }
  });

  const { t } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      // Get all node data not including hallways from backend
      const nodeRes = await axios.get("/api/admin/allnodes/NoHall");
      const allNodes = nodeRes.data;
      setNodes(allNodes); //Populate nodes array with data from backend

      //Get all employees
      const token = await getAccessTokenSilently();
      const empRes = await axios.get("/api/admin/allEmployees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allEmployees = empRes.data;
      setEmployees(allEmployees);

      console.log("successfully got data from get request");
    }

    fetchData().then();
  }, [getAccessTokenSilently]);

  /*useState for a single service request, where any changes update the specific key-value pair*/
  const [singleServiceRequest, setSingleServiceRequest] =
    useState<ServiceRequest>(defaultServiceRequest);

  //set service type
  useEffect(() => {
    if (props.typeOfService) {
      setSingleServiceRequest((prevState) => ({
        ...prevState,
        requestType: props.typeOfService,
      }));
    }
  }, [props.typeOfService]);

  /*requests handles the list of service requests, which is used for the list on the side of the page*/
  const { requests, setRequests } = useContext(RequestContext);
  //sets the contents on the page based on what the service request is
  let contentComponent: JSX.Element | null = null;
  //Function to test if my request updates when submit an order

  //ToDo: Can delete once combine with actual submitRequest
  //ToDo: check for item having been selected
  const switchService = (service: string) => {
    switch (
      service //Changes service request page inputs based on the service selected
    ) {
      case "Flowers":
        contentComponent = (
          <>
            <div className="">
              <h2 className="text-lg">{t("Select Bouquet")}</h2>
              <div className="flex justify-center items-center w-full">
                <Swiper
                  style={{ width: "80%" }}
                  pagination={true}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  spaceBetween={10}
                  slidesPerView={3}
                >
                  <SwiperSlide>
                    <div className="">
                      <div
                        className={`aspect-square ${singleServiceRequest.details1 === "Daffodil" ? "border-4 border-primary rounded-md" : ""}`}
                      >
                        <img
                          className="w-full h-full"
                          src={Flower1}
                          onClick={() =>
                            //Populates the details1 variable for singleServiceRequest object based on image clicked
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              details1: "Daffodil",
                            })
                          }
                          alt="Flowers"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="">
                      <div
                        className={`aspect-square ${singleServiceRequest.details1 === "Carnation" ? "border-4 border-primary rounded-md" : ""}`}
                      >
                        <img
                          className="w-full h-full "
                          src={Flower2}
                          onClick={() =>
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              details1: "Carnation",
                            })
                          }
                          alt="Flowers"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="">
                      <div
                        className={`aspect-square ${singleServiceRequest.details1 === "Rose" ? "border-4 border-primary rounded-md" : ""}`}
                      >
                        <img
                          className="w-full h-full "
                          src={Flower3}
                          onClick={() =>
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              details1: "Rose",
                            })
                          }
                          alt="Flowers"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="">
                      <div
                        className={`aspect-square ${singleServiceRequest.details1 === "Lily" ? "border-4 border-primary rounded-md" : ""}`}
                      >
                        <img
                          className="w-full h-full "
                          src={Flower4}
                          onClick={() =>
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              details1: "Lily",
                            })
                          }
                          alt="Flowers "
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </>
        );
        break;
      case "Gifts":
        contentComponent = (
          <>
            <div className="">
              <h2 className="text-lg">{t("Select Gift")}</h2>
              <div className="flex justify-center items-center w-full">
                <Swiper
                  style={{ width: "80%" }}
                  pagination={true}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  spaceBetween={10}
                  slidesPerView={3}
                >
                  <SwiperSlide>
                    <div className="">
                      <div
                        className={`aspect-square ${singleServiceRequest.details1 === "Balloons" ? "border-4 border-primary rounded-md" : ""}`}
                      >
                        <img
                          className="w-full h-full"
                          src={BalloonBasket}
                          onClick={() =>
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              details1: "Balloons",
                            })
                          }
                          alt="Gifts"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="">
                      <div
                        className={`aspect-square ${singleServiceRequest.details1 === "Comfort Basket" ? "border-4 border-primary rounded-md" : ""}`}
                      >
                        <img
                          className="w-full h-full"
                          src={Comfort}
                          onClick={() =>
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              details1: "Comfort Basket",
                            })
                          }
                          alt="Gifts"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="">
                      <div
                        className={`aspect-square ${singleServiceRequest.details1 === "Fruit Basket" ? "border-4 border-primary rounded-md" : ""}`}
                      >
                        <img
                          className="w-full h-full"
                          src={FruitBasket}
                          onClick={() =>
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              details1: "Fruit Basket",
                            })
                          }
                          alt="Gifts"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="">
                      <div
                        className={`aspect-square ${singleServiceRequest.details1 === "Gift Set" ? "border-4 border-primary rounded-md" : ""}`}
                      >
                        <img
                          className="w-full h-full"
                          src={GiftSet}
                          onClick={() =>
                            setSingleServiceRequest({
                              ...singleServiceRequest,
                              details1: "Gift Set",
                            })
                          }
                          alt="Gifts "
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
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

  const submitRequest = async () => {
    console.log("submitting");
    const token = await getAccessTokenSilently();

    if (
      singleServiceRequest.requesterName &&
      singleServiceRequest.locationNodeID &&
      singleServiceRequest.deliveryDate &&
      singleServiceRequest.employeeID
    ) {
      setRequests([...requests, singleServiceRequest]);
      console.log(singleServiceRequest);
      submitRequestDB(singleServiceRequest, token).then();
      clearForm();
    } else {
      setOpenFail(true);
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
  const [openFailMessage, setOpenFail] = useState(false);

  //return here :}
  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="flex justify-center items-center-start overflow-y-auto h-[80vh] w-full">
      {/*<div className="inline-block flex-none">*/}
      {/*  <SideBar />*/}
      {/*</div>*/}

      <div className="overflow-y-auto bg-transparent">
        <div className=" justify-center ">
          <div className="">
            <div className="my-2">
              <h2 className="font-bold text-lg">{t("Priority")}</h2>

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
                    label={t("Low")}
                  />
                  <FormControlLabel
                    value="Medium"
                    control={<Radio />}
                    label={t("Medium")}
                  />
                  <FormControlLabel
                    value="High"
                    control={<Radio />}
                    label={t("High")}
                  />
                  <FormControlLabel
                    value="Emergency"
                    control={<Radio />}
                    label={t("Emergency")}
                  />
                </RadioGroup>
              </div>
            </div>

            <div className="content" id="content">
              <div className="max-h-full mb-20">
                <div className="rounded-lg ">
                  <h2 className="mb-2 font-bold text-lg">
                    {t("Service Request Form")}
                  </h2>
                  <div className="space-y-2">
                    <div className="form-item flex flex-col">
                      <div className="flex mb:flex-row w-full">
                        <div className="flex-1 mb-3 mr-2">
                          <TextField
                            className="w-full"
                            type="text"
                            id="name"
                            label={t("Name")}
                            variant="outlined"
                            value={singleServiceRequest.requesterName}
                            onChange={(e) =>
                              setSingleServiceRequest({
                                ...singleServiceRequest,
                                requesterName: e.target.value,
                              })
                            }
                            style={{
                              backgroundColor: "transparent",
                            }}
                          />
                        </div>

                        <div className="flex-1 mb-3 w-full">
                          <div className="flex flex-col">
                            <input
                              className=" rounded-sm px-2 py-4 border border-black border-opacity-25"
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
                                backgroundColor: "transparent",
                                outline: "none",
                              }}
                              onFocus={(e) => {
                                e.currentTarget.style.border =
                                  "2px solid rgb(25, 118, 210)";
                              }}
                              onBlur={(e) => {
                                e.currentTarget.style.border =
                                  "1px solid black";
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex mb:flex-row">
                        <div className="flex-1 mb-3 mr-2">
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
                              <TextField {...params} label={t("Room Name")} />
                            )}
                          />
                        </div>
                        <div className="flex-1 mb-3">
                          <Autocomplete
                            value={
                              employees?.filter(
                                (employee) =>
                                  employee.userID ===
                                  singleServiceRequest.employeeID,
                              )[0]?.nickname || null
                            }
                            onChange={(
                              e: ChangeEvent<unknown>,
                              getEmployee: string | null,
                            ) =>
                              setSingleServiceRequest({
                                ...singleServiceRequest,
                                employeeID: employees!.filter(
                                  (employee) =>
                                    employee.nickname === getEmployee,
                                )[0].userID!,
                              })
                            }
                            disablePortal
                            id="combo-box-end"
                            options={Nicknames}
                            renderInput={(params) => (
                              <TextField {...params} label={t("Employee")} />
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-item">
                      <TextField
                        className="w-full "
                        id="details"
                        label={t("Details")}
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
                      <div className="w-[45rem]">
                        <div className="">
                          {switchService(singleServiceRequest.requestType)}
                        </div>
                        <div className="">
                          <h2 className="mt-2 text-lg">
                            {t("Size of Bouquet")}
                          </h2>
                          <RadioGroup
                            row
                            defaultValue="low"
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
                              label={t("Small")}
                            />
                            <FormControlLabel
                              value="Medium"
                              control={<Radio />}
                              label={t("Medium")}
                            />
                            <FormControlLabel
                              value="Large"
                              control={<Radio />}
                              label={t("Large")}
                            />
                          </RadioGroup>
                          <h4 className="flex justify-end text-xs text-gray-200">
                            {t("Made By", {
                              names: "Lauren Harrison & Zihan Li",
                            })}
                          </h4>
                        </div>
                      </div>
                    )}
                    {singleServiceRequest.requestType === "Gifts" && (
                      <div className=" w-[45rem] ">
                        <div className="">
                          {switchService(singleServiceRequest.requestType)}
                        </div>
                        <div className="flex items-center pt-4">
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
                            {t("Wrapped")}
                          </label>
                        </div>
                        <h4 className="flex justify-end text-xs text-gray-200">
                          {t("Made By", {
                            names: "Artem Frenk and Arjun Venat",
                          })}
                        </h4>
                      </div>
                    )}

                    {singleServiceRequest.requestType === "Entertainment" && (
                      <div className="flex flex-col w-[45rem]">
                        <FormControl>
                          <InputLabel id="type-Entertainment-label">
                            {t("Type of Entertainment")}
                          </InputLabel>
                          <Select
                            className=""
                            labelId="type-Entertainment-label"
                            label={t("Type of Entertainment")}
                            value={singleServiceRequest.details2}
                            onChange={(e) =>
                              setSingleServiceRequest({
                                ...singleServiceRequest,
                                details2: e.target.value as string,
                              })
                            }
                          >
                            <MenuItem value="Movies">{t("Movies")}</MenuItem>
                            <MenuItem value="Gaming">{t("Gaming")}</MenuItem>
                            <MenuItem value="Board Games">
                              {t("Board Games")}
                            </MenuItem>
                            <MenuItem value="books">{t("Books")}</MenuItem>
                            <MenuItem value="arts and crafts">
                              {t("Arts and Crafts")}
                            </MenuItem>
                          </Select>

                          <div className="flex items-center pt-4">
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
                            <label htmlFor="link-checkbox" className="ms-2  ">
                              13+
                            </label>
                          </div>

                          <h4 className="flex justify-end text-xs text-gray-200">
                            {t("Made By", {
                              names: "Lauren Harrison & Zihan Li",
                            })}
                          </h4>
                        </FormControl>
                      </div>
                    )}

                    {singleServiceRequest.requestType === "Maintenance" && (
                      <div className="flex flex-col w-[45rem]">
                        <FormControl>
                          <InputLabel id="type-maintenance-label">
                            {t("Type of maintenance")}
                          </InputLabel>
                          <Select
                            className=""
                            labelId="type-maintenance-label"
                            label={t("Type of maintenance")}
                            value={singleServiceRequest.details2}
                            onChange={(e) =>
                              setSingleServiceRequest({
                                ...singleServiceRequest,
                                details2: e.target.value as string,
                              })
                            }
                          >
                            <MenuItem value="spill">{t("Spill")}</MenuItem>
                            <MenuItem value="down elevator">
                              {t("Down elevator")}
                            </MenuItem>
                            <MenuItem value="electricity issue">
                              {t("Electricity issue")}
                            </MenuItem>
                            <MenuItem value="bathroom">
                              {t("Bathroom")}
                            </MenuItem>
                          </Select>

                          <div className="flex items-center pt-4">
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
                            <label htmlFor="link-checkbox" className="ms-2  ">
                              {t("Hazardous Material")}
                            </label>
                          </div>

                          <h4 className="flex justify-end text-xs text-gray-200">
                            {t("Made By", {
                              names: "Jessie Hart & Hubert Liu",
                            })}
                          </h4>
                        </FormControl>
                      </div>
                    )}
                    {singleServiceRequest.requestType === "Medicine" && (
                      <div className="w-[45rem]">
                        <form className="">
                          <div className="flex mb:flex-row space-x-2">
                            <input
                              type="number"
                              id="dosage"
                              min="0"
                              className="w-1/2 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                              placeholder={t("Dosage")}
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
                              className="w-32 text-sm rounded-r-lg focus:ring-blue-500"
                              displayEmpty
                              defaultValue=""
                              inputProps={{ "aria-label": "units" }}
                            >
                              <MenuItem value="" disabled>
                                <em>{t("Units")}</em>
                              </MenuItem>
                              <MenuItem value="grams">{t("grams")}</MenuItem>
                              <MenuItem value="milligrams">
                                {t("milligrams")}
                              </MenuItem>
                              <MenuItem value="micrograms">
                                {t("micrograms")}
                              </MenuItem>
                              <MenuItem value="liters">{t("liters")}</MenuItem>
                            </Select>
                          </div>
                        </form>

                        <h2 className="text-lg mt-3">{t("Route")}</h2>
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
                            label={t("Oral")}
                          />
                          <FormControlLabel
                            value="injected"
                            control={<Radio />}
                            label={t("Injected")}
                          />
                          <FormControlLabel
                            value="topical"
                            control={<Radio />}
                            label={t("Topical")}
                          />
                        </RadioGroup>
                        <h4 className="flex justify-end text-xs text-gray-200">
                          {t("Made By", {
                            names: "Brannon Henson and Alexander Stoyanov",
                          })}
                        </h4>
                      </div>
                    )}
                    {singleServiceRequest.requestType ===
                      "Medical Equipment" && (
                      <div className="w-[45rem]">
                        <form className="max-w-sm w-1/2">
                          <label htmlFor="Quantity" className="mb-2 text-lg">
                            {t("Quantity")}
                          </label>
                          <input
                            type="number"
                            id="dosage"
                            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder={t("Quantity")}
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

                        <h2 className="text-lg mt-3">
                          {t("Requires Supervision")}
                        </h2>
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
                    style={{
                      backgroundColor: "#012D5A",
                      color: "white",
                    }}
                    // Calls submit request function which sends information to the backend
                    onClick={() => {
                      submitRequest();
                    }}
                  >
                    {t("Submit Request")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for success message */}
      <Modal open={openSuccessMessage}>
        <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  shadow-md rounded-lg p-10">
          <h1
            id="successMessage"
            className="text-center text-green-600 text-xl mb-4"
          >
            {t("Submit Request Success")}
          </h1>
          <Button onClick={() => clearRequests()}>{t("Close")}</Button>
        </Card>
      </Modal>
      <Modal open={openFailMessage}>
        <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md rounded-lg p-10">
          <h1
            id="failMessage"
            className="text-center text-red-600 text-xl mb-4"
          >
            {t("Submit Request Error")}
          </h1>
          <Button onClick={() => setOpenFail(false)}>{t("Close")}</Button>
        </Card>
      </Modal>
    </div>
    // </LocalizationProvider>
  );
}

export default ServiceRequestLog;
