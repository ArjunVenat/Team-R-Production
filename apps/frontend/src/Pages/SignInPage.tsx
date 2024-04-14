import React from "react";
import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import Carousel from "react-material-ui-carousel";
import blurHall from "../assets/hero/blurHall.png";
import bwhoutside from "../assets/hero/bwhoutside.png";
import hall from "../assets/hero/hall.png";
import outsidebwh from "../assets/hero/outsidebwh.png";

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
      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="grid place-items-center bg-white bg-opacity-75 rounded-xl border-solid border-4 border-gray-300 z-20">
          <div>
            <UserTypeList className="flex flex-col items-center">
              <h1 id="sign_in_h1" className="text-4xl">
                Welcome
              </h1>
              <UserTypeButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  loginWithRedirect({
                    appState: { returnTo: "/home" },
                  })
                }
                className="m-5 p-4 w-48 bg-primary text-white font-bold rounded-lg hover:bg-[#012d5a]"
              >
                Log In
              </UserTypeButton>
              <UserTypeButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  navigate("/home");
                }}
                className="m-5 p-4 w-48 bg-primary text-white font-bold rounded-lg hover:bg-[#012d5a]"
              >
                Log In As Guest
              </UserTypeButton>
            </UserTypeList>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
