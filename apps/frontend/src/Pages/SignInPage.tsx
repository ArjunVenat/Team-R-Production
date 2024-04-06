import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import bwh from "../assets/bwh.jpeg";
import { useAuth0 } from "@auth0/auth0-react";

const UserTypeList = motion.div;
const UserTypeButton = motion.button;

function SignInPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <div
        className="flex justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bwh})`,
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          className="grid place-items-center bg-white bg-opacity-75 rounded-xl border-solid border-4 border-gray-300"
          style={{ height: "50vh", width: "40vw" }}
        >
          <AnimatePresence>
            {
              <UserTypeList
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
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
                  className="m-10 p-4 w-48 bg-primary text-white font-bold rounded-lg hover:bg-[#012d5a]"
                >
                  Log In
                </UserTypeButton>
              </UserTypeList>
            }
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
