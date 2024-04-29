import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Box, Typography } from "@mui/material";
// import ServiceRequestLog from "../components/FullServiceRequest.tsx";
import ServiceRequestModal from "../components/ServiceRequestModal";
// import CancelIcon from "@mui/icons-material/Cancel";

// import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
// import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
// import BuildIcon from "@mui/icons-material/Build";
// import VaccinesIcon from "@mui/icons-material/Vaccines";
// import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
// import CasinoIcon from "@mui/icons-material/Casino";
import swoosh from "../assets/swoosh.png";

import flowers from "../assets/flowers.jpg";
import gift from "../assets/gifts.jpg";
import game from "../assets/game.jpg";
import maintenance from "../assets/maintenance.jpg";
import medicine from "../assets/medicine.jpg";
import eqipment from "../assets/med-device.jpg";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
            backgroundImage: `url(${swoosh})`,
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
                className="h-72 w-80 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl bg-cover bg-center bg-no-repeat relative"
                sx={{
                  backgroundImage: `url(${flowers})`,
                  border: 2,
                  borderColor: "#009ca6",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(1,45, 90, 0.5)", // Semi-transparent blue color
                    zIndex: 0,
                  },
                  "&:hover::after": {
                    backgroundColor: "transparent", // Remove blue tint on hover
                  },
                }}
                onClick={() => handleOpen("Flowers")}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  margin={2}
                >
                  <Typography
                    className="w-full h-full"
                    sx={{
                      position: "absolute",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      zIndex: 1,
                      display: "flex", // Center vertically using Flexbox
                      justifyContent: "center", // Center horizontally using Flexbox
                      alignItems: "center", // Center vertically using Flexbox

                      "&:hover": {
                        fontWeight: "extra-bold",
                        fontSize: "1.7rem",
                        textShadow: "3px 3px 0 #012d5a",
                      },
                    }}
                  >
                    {t("Flowers")}
                  </Typography>
                </Box>
              </Button>
              <Button
                className="h-72 w-80 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl bg-cover bg-center bg-no-repeat relative"
                sx={{
                  backgroundImage: `url(${gift})`,
                  border: 2,
                  borderColor: "#009ca6",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(1,45, 90, 0.5)", // Semi-transparent blue color
                    zIndex: 0,
                  },
                  "&:hover::after": {
                    backgroundColor: "transparent", // Remove blue tint on hover
                  },
                }}
                onClick={() => handleOpen("Gifts")}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  margin={2}
                >
                  <Typography
                    className="w-full h-full"
                    sx={{
                      position: "absolute",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      zIndex: 1,
                      display: "flex", // Center vertically using Flexbox
                      justifyContent: "center", // Center horizontally using Flexbox
                      alignItems: "center", // Center vertically using Flexbox

                      "&:hover": {
                        fontWeight: "extra-bold",
                        fontSize: "1.7rem",
                        textShadow: "3px 3px 0 #012d5a",
                      },
                    }}
                  >
                    {t("Gifts")}
                  </Typography>
                </Box>
              </Button>
              <Button
                className="h-72 w-80 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl bg-cover bg-center bg-no-repeat relative"
                sx={{
                  backgroundImage: `url(${game})`,
                  border: 2,
                  borderColor: "#009ca6",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(1,45, 90, 0.5)", // Semi-transparent blue color
                    zIndex: 0,
                  },
                  "&:hover::after": {
                    backgroundColor: "transparent", // Remove blue tint on hover
                  },
                }}
                onClick={() => handleOpen("Entertainment")}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  margin={2}
                >
                  <Typography
                    className="w-full h-full"
                    sx={{
                      position: "absolute",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      zIndex: 1,
                      display: "flex", // Center vertically using Flexbox
                      justifyContent: "center", // Center horizontally using Flexbox
                      alignItems: "center", // Center vertically using Flexbox

                      "&:hover": {
                        fontWeight: "extra-bold",
                        fontSize: "1.7rem",
                        textShadow: "3px 3px 0 #012d5a",
                      },
                    }}
                  >
                    {t("Entertainment")}
                  </Typography>
                </Box>
              </Button>
              <Button
                className="h-72 w-80 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl bg-cover bg-center bg-no-repeat relative"
                sx={{
                  backgroundImage: `url(${maintenance})`,
                  border: 2,
                  borderColor: "#009ca6",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(1,45, 90, 0.5)", // Semi-transparent blue color
                    zIndex: 0,
                  },
                  "&:hover::after": {
                    backgroundColor: "transparent", // Remove blue tint on hover
                  },
                }}
                onClick={() => handleOpen("Maintenance")}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  margin={2}
                >
                  <Typography
                    className="w-full h-full"
                    sx={{
                      position: "absolute",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      zIndex: 1,
                      display: "flex", // Center vertically using Flexbox
                      justifyContent: "center", // Center horizontally using Flexbox
                      alignItems: "center", // Center vertically using Flexbox

                      "&:hover": {
                        fontWeight: "extra-bold",
                        fontSize: "1.7rem",
                        textShadow: "3px 3px 0 #012d5a",
                      },
                    }}
                  >
                    {t("Maintenance")}
                  </Typography>
                </Box>
              </Button>
              <Button
                className="h-72 w-80 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl bg-cover bg-center bg-no-repeat relative"
                sx={{
                  backgroundImage: `url(${medicine})`,
                  border: 2,
                  borderColor: "#009ca6",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(1,45, 90, 0.5)", // Semi-transparent blue color
                    zIndex: 0,
                  },
                  "&:hover::after": {
                    backgroundColor: "transparent", // Remove blue tint on hover
                  },
                }}
                onClick={() => handleOpen("Medicine")}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  margin={2}
                >
                  <Typography
                    className="w-full h-full"
                    sx={{
                      position: "absolute",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      zIndex: 1,
                      display: "flex", // Center vertically using Flexbox
                      justifyContent: "center", // Center horizontally using Flexbox
                      alignItems: "center", // Center vertically using Flexbox

                      "&:hover": {
                        fontWeight: "extra-bold",
                        fontSize: "1.7rem",
                        textShadow: "3px 3px 0 #012d5a",
                      },
                    }}
                  >
                    {t("Medicine")}
                  </Typography>
                </Box>
              </Button>
              <Button
                className="h-72 w-80 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl bg-cover bg-center bg-no-repeat relative"
                sx={{
                  backgroundImage: `url(${eqipment})`,
                  border: 2,
                  borderColor: "#009ca6",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(1,45, 90, 0.5)", // Semi-transparent blue color
                    zIndex: 0,
                  },
                  "&:hover::after": {
                    backgroundColor: "transparent", // Remove blue tint on hover
                  },
                }}
                onClick={() => handleOpen("Medical Equipment")}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  margin={2}
                >
                  <Typography
                    className="w-full h-full"
                    sx={{
                      position: "absolute",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      zIndex: 1,
                      display: "flex", // Center vertically using Flexbox
                      justifyContent: "center", // Center horizontally using Flexbox
                      alignItems: "center", // Center vertically using Flexbox

                      "&:hover": {
                        fontWeight: "extra-bold",
                        fontSize: "1.7rem",
                        textShadow: "3px 3px 0 #012d5a",
                      },
                    }}
                  >
                    {t("Medical Equipment")}
                  </Typography>
                </Box>
              </Button>

              {/*<Modal open={open}>*/}
              {/*  <div className="flex justify-center items-center h-screen">*/}
              {/*    <Card*/}
              {/*      className=" w-1/2 shadow-md rounded-lg p-10 mx-auto mt-5 h-[90vh] "*/}
              {/*      style={{*/}
              {/*        backgroundColor: "white",*/}
              {/*        border: "10px solid #012D5A",*/}
              {/*      }}*/}
              {/*    >*/}
              {/*      <div className="flex flex-row justify-start mb-8 ">*/}
              {/*        <Typography*/}
              {/*          sx={{*/}
              {/*            color: "#012d5a",*/}
              {/*            fontSize: "2rem",*/}
              {/*            fontWeight: "semi-bold",*/}
              {/*          }}*/}
              {/*        >*/}
              {/*          {typeOfService} Request*/}
              {/*        </Typography>*/}

              {/*        <CancelIcon*/}
              {/*          sx={{*/}
              {/*            color: "#012D5A",*/}
              {/*            fontSize: "3rem",*/}
              {/*            marginLeft: "auto",*/}
              {/*          }}*/}
              {/*          onClick={() => setOpen(false)}*/}
              {/*        />*/}
              {/*      </div>*/}
              {/*      <div className="flex items-center justify-center h-full">*/}
              {/*        <ServiceRequestLog typeOfService={typeOfService} />*/}
              {/*      </div>*/}
              {/*    </Card>*/}
              {/*  </div>*/}
              {/*</Modal>*/}

              <AnimatePresence initial={false}>
                {open && (
                  <ServiceRequestModal
                    open={open}
                    onClose={() => setOpen(false)}
                    typeOfService={typeOfService}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </Box>
  );
}
