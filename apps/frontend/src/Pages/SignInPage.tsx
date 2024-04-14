import React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import bwh from "../assets/bwh.jpeg";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import blurHall from "../assets/hero/blurHall.png";
import bwhoutside from "../assets/hero/bwhoutside.png";
import hall from "../assets/hero/hall.png";
import outsidebwh from "../assets/hero/outsidebwh.png";

const UserTypeList = motion.div;
const UserTypeButton = motion.button;

function SignInPage() {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide % 4) + 1);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Carousel */}
      <div
        id="default-carousel"
        className="bg-transparent absolute top-0 left-0 w-full h-full"
        data-carousel="slide"
      >
        <AnimatePresence>
          <div className="relative h-full overflow-hidden rounded-lg transition-transform">
            {currentSlide === 1 && (
              <motion.img
                key={blurHall}
                src={blurHall}
                className="absolute inset-0 w-full h-full object-cover ease-in-out"
                alt="..."
                animate={{
                  opacity: 1,
                }}
              />
            )}
            {currentSlide === 2 && (
              <motion.img
                key={bwhoutside}
                src={bwhoutside}
                className="absolute inset-0 w-full h-full object-cover ease-in-out"
                alt="..."
                animate={{
                  opacity: 1,
                }}
              />
            )}
            {currentSlide === 3 && (
              <motion.img
                key={hall}
                src={hall}
                className="absolute inset-0 w-full h-full object-cover ease-in-out"
                alt="..."
                animate={{
                  opacity: 1,
                }}
              />
            )}
            {currentSlide === 4 && (
              <motion.img
                key={outsidebwh}
                src={outsidebwh}
                className="absolute inset-0 w-full h-full object-cover ease-in-out"
                alt="..."
                animate={{
                  opacity: 1,
                }}
              />
            )}
          </div>
        </AnimatePresence>
      </div>

      {/* Sign-in Content */}
      <div className="flex justify-center items-center min-h-screen">
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
