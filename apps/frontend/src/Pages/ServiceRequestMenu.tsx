import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Box, Modal, Card } from "@mui/material";
import ServiceRequestLog from "../components/FullServiceRequest.tsx";

import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import BuildIcon from "@mui/icons-material/Build";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import CasinoIcon from "@mui/icons-material/Casino";
import swoosh from "../assets/swoosh.png";

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
            backgroundImage: `url(${swoosh})`,
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
                        justify-items-center justify-center gap-y-20 gap-x-14"
            >
              <Button
                className="h-48 w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: "#009ca6",
                }}
                onClick={() => handleOpen("Flowers")}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <LocalFloristIcon
                    style={{ color: "white", fontSize: "3rem" }}
                  />
                  <span
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    Flowers
                  </span>
                </Box>
              </Button>
              <Button
                className="h-48  w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: "#009ca6",
                }}
                onClick={() => handleOpen("Gifts")}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <CardGiftcardIcon
                    style={{ color: "white", fontSize: "3rem" }}
                  />
                  <span
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    Gifts
                  </span>
                </Box>
              </Button>
              <Button
                className="h-48 w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: "#009ca6",
                }}
                onClick={() => handleOpen("Entertainment")}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <CasinoIcon style={{ color: "white", fontSize: "3rem" }} />
                  <span
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    Entertainment
                  </span>
                </Box>
              </Button>

              <Button
                className="h-48 w-72 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: "#009ca6",
                }}
                onClick={() => handleOpen("Maintenance")}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <BuildIcon style={{ color: "white", fontSize: "3rem" }} />
                  <span
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    Maintenance
                  </span>
                </Box>
              </Button>
              <Button
                className="h-48 w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: "#009ca6",
                }}
                onClick={() => handleOpen("Medicine")}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <VaccinesIcon style={{ color: "white", fontSize: "3rem" }} />
                  <span
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    Medicine
                  </span>
                </Box>
              </Button>
              <Button
                className="h-48 w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: "#009ca6",
                }}
                onClick={() => handleOpen("Medical Equipment")}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <MonitorHeartIcon
                    style={{ color: "white", fontSize: "3rem" }}
                  />
                  <span
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    Medical Equipment
                  </span>
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
                    <div className="flex justify-start ">
                      <Button
                        style={{
                          backgroundColor: "#012D5A",
                          color: "white",
                          marginLeft: "auto",
                        }}
                        onClick={() => setOpen(false)}
                      >
                        Back
                      </Button>
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
