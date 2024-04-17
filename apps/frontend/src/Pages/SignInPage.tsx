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
import "../styles/Carousel.css";

const UserTypeButton = motion.button;

function SignInPage() {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  return (
    <main>
      <Carousel
        stopAutoPlayOnHover={false}
        interval={5000}
        navButtonsAlwaysInvisible={true}
        indicators={false}
        duration={1000}
        className="carousel -z-10 w-screen h-screen overflow-hidden"
      >
        <img src={blurHall} alt="blurHall" />
        <img src={bwhoutside} alt="bwhoutside" />
        <img src={hall} alt="hall" />
        <img src={outsidebwh} alt="outsidebwh" />
      </Carousel>

      {/* Sidebar */}
      <aside
        className="absolute top-0 right-0
                        flex flex-col items-center gap-10 justify-between
                        bg-primary bg-opacity-45 backdrop-blur-sm
                        min-w-min w-1/3 px-5 py-10 h-full
                        *:text-center *:text-secondary"
      >
        <div className="*:font-Garamond flex flex-col gap-10">
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
          <p className="p-3">View Map</p>
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
