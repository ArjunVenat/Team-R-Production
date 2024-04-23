import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Box, Modal, Card } from "@mui/material";
import Sidebar from "../components/SideBar.tsx";
import ServiceRequestLog from "../components/FullServiceRequest.tsx";

import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import BuildIcon from "@mui/icons-material/Build";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
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
      <Sidebar />
      <div className="flex flex-col flex-grow pt-8 bg-primary h-screen">
        <main
          className="flex flex-col flex-grow bg-cover bg-no-repeat overflow-y-hidden"
          style={{
            backgroundImage: `url(${swoosh})`,
            width: "100%",
            height: "100%",
          }}
        >
          <h1
            className="text-center text-white p-10 font-bold text-4xl w-full"
            style={{
              backgroundColor: "#009ca6",
            }}
          >
            Service Request Menu
          </h1>
          <div className="flex justify-center items-center flex-grow">
            <div
              className="w-fit grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2
                        justify-items-center justify-center gap-y-20 gap-x-14"
            >
              <Button
                className="h-32 w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: "white",
                }}
                onClick={() => handleOpen("Flowers")}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <LocalFloristIcon
                    style={{ color: "#012D5A", fontSize: "3rem" }}
                  />
                  <span
                    style={{
                      color: "#012D5A",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    Flowers
                  </span>
                </Box>
              </Button>
              <Button
                className="h-32  w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: "white",
                }}
                onClick={() => handleOpen("Gifts")}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <CardGiftcardIcon
                    style={{ color: "#012D5A", fontSize: "3rem" }}
                  />
                  <span
                    style={{
                      color: "#012D5A",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    Gifts
                  </span>
                </Box>
              </Button>
              <Button
                className="h-32 w-72 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: "white",
                }}
                onClick={() => handleOpen("Maintenance")}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <BuildIcon style={{ color: "#012D5A", fontSize: "3rem" }} />
                  <span
                    style={{
                      color: "#012D5A",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    Maintenance
                  </span>
                </Box>
              </Button>
              <Button
                className="h-32 w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: "white",
                }}
                onClick={() => handleOpen("Medicine")}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <VaccinesIcon
                    style={{ color: "#012D5A", fontSize: "3rem" }}
                  />
                  <span
                    style={{
                      color: "#012D5A",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    Medicine
                  </span>
                </Box>
              </Button>
              <Button
                className="h-32 w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: "white",
                }}
                onClick={() => handleOpen("Medical Equipment")}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <MonitorHeartIcon
                    style={{ color: "#012D5A", fontSize: "3rem" }}
                  />
                  <span
                    style={{
                      color: "#012D5A",
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
                  <Card className=" w-1/2 bg-white shadow-md rounded-lg p-10 mx-auto mt-5 h-[90vh] ">
                    <Button onClick={() => setOpen(false)}>Back</Button>
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
