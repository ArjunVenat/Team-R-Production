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
import { useTranslation } from "react-i18next";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import { Box, Button, IconButton, Popover } from "@mui/material";

const UserTypeButton = motion.button;
const images: string[] = [blurHall, bwhoutside, hall, outsidebwh];

function SignInPage() {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [showWarning, setWarning] = useState<boolean>(true);
  const { t, i18n, ready } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & Element) | null
  >(null);

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "language-popover" : undefined;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

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
            <h1 className="text-white text-2xl">{t("declaration")}</h1>
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
        {ready && (
          <Box sx={{ width: "100%" }} display="flex" justifyContent="flex-end">
            <IconButton
              sx={{ color: "white" }}
              onClick={(event: React.MouseEvent) => handleClick(event)}
            >
              <LanguageIcon />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box display="flex" flexDirection="column" minWidth={80}>
                <Button
                  style={{ textTransform: "none" }}
                  onClick={() => changeLanguage("en")}
                >
                  {t("English")}
                </Button>
                <Button
                  style={{ textTransform: "none" }}
                  onClick={() => changeLanguage("zh")}
                >
                  {t("Chinese")}
                </Button>
              </Box>
            </Popover>
          </Box>
        )}
        <div
          className="*:font-Garamond
                        flex flex-col flex-grow-2 gap-6
                        justify-center justify-self-center"
        >
          <h1 className="text-6xl font-bold">{t("welcome")}</h1>
          <h2 className="text-4xl font-bold"> {t("title")}</h2>
          <p className="text-3xl">{t("description")}</p>
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
          <p className="p-3 w-full">{t("View Map")}</p>
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
          {t("Staff ? Sign in Here")}
        </UserTypeButton>
      </aside>
    </main>
  );
}

export default SignInPage;
