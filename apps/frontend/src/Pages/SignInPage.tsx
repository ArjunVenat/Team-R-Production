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

const UserTypeList = motion.div;
const UserTypeButton = motion.button;

function SignInPage() {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Carousel */}
      <Carousel
        stopAutoPlayOnHover={false}
        interval={5000}
        navButtonsAlwaysInvisible={true}
        indicators={false}
        duration={1000}
      >
        <img className="w-screen h-screen" src={blurHall} alt="blurHall" />
        <img className="w-screen h-screen" src={bwhoutside} alt="bwhoutside" />
        <img className="w-screen h-screen" src={hall} alt="hall" />
        <img className="w-screen h-screen" src={outsidebwh} alt="outsidebwh" />
      </Carousel>

      {/* Sign-in Content */}
      <div className="absolute top-0 right-0 bottom-0 flex w-full justify-end">
        <div className="grid place-items-center w-1/3 bg-primary bg-opacity-45 backdrop-blur-sm z-20">
          <div>
            <UserTypeList className="flex flex-col items-center h-screen justify-start">
              <h1
                id="sign_in_h1"
                className="mt-8  text-6xl text-secondary font-Garamond font-bold"
              >
                Welcome
              </h1>
              <h2
                id="sign_in_h2"
                className="mt-8  text-4xl text-secondary font-Garamond font-bold"
              >
                Brigham And Women's Hospital
              </h2>
              <p className="mt-10 text-3xl text-center text-gray-200 font-Garamond">
                Helping our patients and their families get back to what matters
                most.
              </p>

              <div className="flex flex-col items-center mt-36">
                <UserTypeButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    navigate("/home");
                  }}
                  className="w-80 h-72 bg-primary rounded-lg text-white text-xl font-bold hover:bg-[#012d5a]"
                >
                  <div className="flex justify-center items-start w-full rounded-t-lg">
                    <img
                      className="block w-full mb-[0.5rem] rounded-t-lg"
                      src={ViewMap}
                      alt="ViewMap"
                    />
                  </div>
                  <div className="flex justify-center items-center h-16 pb-1.5">
                    View Map
                  </div>
                </UserTypeButton>
              </div>

              <div className="flex justify-end w-full mt-auto">
                <UserTypeButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    loginWithRedirect({
                      appState: { returnTo: "/home" },
                    })
                  }
                  className="m-5 p-4 w-48 bg-primary text-white font-semibold rounded-lg hover:bg-[#012d5a]"
                >
                  Staff? Sign in Here
                </UserTypeButton>
              </div>
            </UserTypeList>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
