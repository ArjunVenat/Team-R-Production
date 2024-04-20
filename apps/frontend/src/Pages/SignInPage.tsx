import React from "react";
import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import Carousel from "react-material-ui-carousel";
import blurHall from "../assets/hero/blurHall.png";
import bwhoutside from "../assets/hero/bwhoutside.png";
import hall from "../assets/hero/hall.png";
import outsidebwh from "../assets/hero/outsidebwh.png";
import ViewMap from "../assets/hero/ViewMap.png";
// import { Button } from "@mui/material";
import { useState } from "react";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const UserTypeButton = motion.button;
const images: string[] = [blurHall, bwhoutside, hall, outsidebwh];

function SignInPage() {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [showWarning, setWarning] = useState<boolean>(true);

  return (
    <main className="h-screen w-screen">
      <Carousel
        stopAutoPlayOnHover={false}
        interval={5000}
        navButtonsAlwaysInvisible={true}
        indicators={false}
        duration={1000}
        className="carousel -z-10 h-full w-full"
      >
        {images.map((image) => (
          <img
            src={image}
            alt={image}
            className="h-screen w-screen object-cover"
          />
        ))}
      </Carousel>
      {showWarning && (
        <div className="fixed top-0 bg-red-600 w-2/3 flex justify-between items-center">
          <div className="flex items-center m-4">
            {" "}
            {/* Container for h1 and icon */}
            <h1 className="text-white text-2xl">
              This website is a term project exercise for WPI CS 3733 Software
              Engineering (Prof. Wong) and is not to be confused with the actual
              Brigham & Women’s Hospital website.
            </h1>
            <HighlightOffOutlinedIcon
              sx={{ color: "white", fontSize: "3rem", marginLeft: "1rem" }}
              onClick={() => {
                setWarning(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className="absolute top-0 right-0
                        flex flex-col items-center gap-6 justify-between
                        bg-primary bg-opacity-45 backdrop-blur-sm
                        min-w-min w-1/3 px-6 py-8 h-full overflow-y-scroll
                        *:text-center *:text-secondary"
      >
        <div id="spacer" className="h-10" />
        <div
          className="*:font-Garamond
                        flex flex-col flex-grow-2 gap-6
                        justify-center justify-self-center"
        >
          <h1 className="text-6xl font-bold">Welcome</h1>
          <h2 className="text-4xl font-bold">Brigham And Women's Hospital</h2>
          <p className="text-3xl">
            Helping our patients and their families get back to what matters
            most.
          </p>
        </div>

        <UserTypeButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            navigate("/home");
          }}
          className="flex flex-col
                           w-80
                           bg-primary rounded-lg
                           text-xl font-bold"
        >
          <img
            className="block w-full rounded-t-lg"
            src={ViewMap}
            alt="ViewMap"
          />
          <p className="p-3 w-full">View Map</p>
        </UserTypeButton>

        <UserTypeButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() =>
            loginWithRedirect({
              appState: { returnTo: "/home" },
            })
          }
          className="self-end justify-self-end
                        p-4 px-8 rounded-lg
                        bg-primary
                        font-semibold"
        >
          Staff? Sign in Here
        </UserTypeButton>
      </aside>
    </main>
  );
}

export default SignInPage;
