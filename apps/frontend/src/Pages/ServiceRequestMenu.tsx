import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Box, Modal, Card, Typography } from "@mui/material";
import ServiceRequestLog from "../components/FullServiceRequest.tsx";

import CancelIcon from "@mui/icons-material/Cancel";

// import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
// import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
// import BuildIcon from "@mui/icons-material/Build";
// import VaccinesIcon from "@mui/icons-material/Vaccines";
// import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
// import CasinoIcon from "@mui/icons-material/Casino";
// import swoosh from "../assets/swoosh.png";

import flowers from "../assets/flowers.jpg";
import gift from "../assets/gifts.jpg";
import game from "../assets/game.jpg";
import maintenance from "../assets/maintenance.jpg";
import medicine from "../assets/medicine.jpg";
import eqipment from "../assets/med-device.jpg";

export function ServiceRequestMenu() {
  // Use the Auth0 React hook to handle authentication.
  const {
    //getAccessTokenSilently,
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

  const [typeOfService, setTypeOfService] = useState("");
  const [open, setOpen] = useState(false);

  // const handleButtonClick = (serviceType: string) => {
  //     setTypeOfService(serviceType);
  // };

  const handleOpen = (serviceType: string) => {
    setTypeOfService(serviceType);
    setOpen(true);
  };

  return (
    <Box display="flex" className="max-w-screen h-screen">
      <div className=" top-0 pt-8 bg-primary flex justify-center items-center w-full">
        <main
          className="flex w-full h-full overflow-y-auto flex-grow justify-center items-center  bg-cover bg-center bg-no-repeat relative"
          style={{
            // backgroundImage: `url(${swoosh})`,
            backgroundColor: "white",
            width: "100%",
            height: "100%",
          }}
        >
          {/*<h1*/}
          {/*  className="text-center text-white p-10 font-bold text-4xl w-full"*/}
          {/*  style={{*/}
          {/*    backgroundColor: "#009ca6",*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Service Request Menu*/}
          {/*</h1>*/}
          <div className="flex justify-center items-center flex-grow">
            <div
              className="w-fit grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2
                        justify-items-center justify-center gap-y-10 gap-x-14"
            >
              <Button
                className="h-72 w-80 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                sx={{
                  border: 8,
                  borderColor: "#009ca6",
                }}
                onClick={() => handleOpen("Flowers")}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  margin={2}
                >
                  <span
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    Flowers
                  </span>
                  <img
                    className="overflow-hidden w-52 h-52 border-black border-2 "
                    src={flowers}
                    alt={"flowers"}
                  />
                </Box>
              </Button>
              <Button
                className="h-72 w-80 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                sx={{
                  border: 8,
                  borderColor: "#009ca6",
                }}
                onClick={() => handleOpen("Gifts")}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  margin={2}
                >
                  <span
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    Gifts
                  </span>
                  <img
                    className="overflow-hidden w-52 h-52 border-black border-2 "
                    src={gift}
                    alt={"gifts"}
                  />
                </Box>
              </Button>
              <Button
                className="h-72 w-80 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                sx={{
                  border: 8,
                  borderColor: "#009ca6",
                }}
                onClick={() => handleOpen("Entertainment")}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  margin={2}
                >
                  <span
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    Entertainment
                  </span>
                  <img
                    className="overflow-hidden w-52 h-52 border-black border-2 "
                    src={game}
                    alt={"chess"}
                  />
                </Box>
              </Button>
              <Button
                className="h-72 w-80 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                sx={{
                  border: 8,
                  borderColor: "#009ca6",
                }}
                onClick={() => handleOpen("Maintenance")}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  margin={2}
                >
                  <span
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    Maintenance
                  </span>
                  <img
                    className="overflow-hidden w-52 h-52 border-black border-2 "
                    src={maintenance}
                    alt={"chess"}
                  />
                </Box>
              </Button>
              <Button
                className="h-72 w-80 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                sx={{
                  border: 8,
                  borderColor: "#009ca6",
                }}
                onClick={() => handleOpen("Medicine")}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  margin={2}
                >
                  <span
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    Medicine
                  </span>
                  <img
                    className="overflow-hidden w-52 h-52 border-black border-2 "
                    src={medicine}
                    alt={"chess"}
                  />
                </Box>
              </Button>
              <Button
                className="h-72 w-80 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                sx={{
                  border: 8,
                  borderColor: "#009ca6",
                }}
                onClick={() => handleOpen("Medical Equipment")}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  margin={2}
                >
                  <span
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    Medical Equipment
                  </span>
                  <img
                    className="overflow-hidden w-52 h-52 border-black border-2 "
                    src={eqipment}
                    alt={"chess"}
                  />
                </Box>
              </Button>

              <Modal open={open}>
                <div className="flex justify-center items-center h-screen">
                  <Card
                    className=" w-1/2 shadow-md rounded-lg p-10 mx-auto mt-5 h-[90vh] "
                    style={{
                      backgroundColor: "white",
                      border: "10px solid #012D5A",
                    }}
                  >
                    <div className="flex flex-row justify-start mb-8 ">
                      <Typography
                        sx={{
                          color: "#012d5a",
                          fontSize: "2rem",
                          fontWeight: "semi-bold",
                        }}
                      >
                        {typeOfService} Request
                      </Typography>

                      <CancelIcon
                        sx={{
                          color: "#012D5A",
                          fontSize: "3rem",
                          marginLeft: "auto",
                        }}
                        onClick={() => setOpen(false)}
                      />
                      {/*<Button*/}
                      {/*  style={{*/}
                      {/*    backgroundColor: "#012D5A",*/}
                      {/*    color: "white",*/}
                      {/*    marginLeft: "auto",*/}
                      {/*  }}*/}
                      {/*  onClick={() => setOpen(false)}*/}
                      {/*>*/}
                      {/*  Back*/}
                      {/*</Button>*/}
                    </div>
                    <div className="flex items-center justify-center h-full">
                      <ServiceRequestLog typeOfService={typeOfService} />
                    </div>
                  </Card>
                </div>
              </Modal>
            </div>
          </div>
        </main>
      </div>
    </Box>
  );
}
