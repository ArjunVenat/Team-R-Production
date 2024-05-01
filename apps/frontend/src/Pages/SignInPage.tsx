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
import { useState } from "react";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import { Box, Button, IconButton, Popover } from "@mui/material";

const UserTypeButton = motion.button;
const images: string[] = [blurHall, bwhoutside, hall, outsidebwh];

const useCurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return currentDateTime;
};

interface WeatherData {
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
  };
}

const useCurrentWeather = (): WeatherData | null => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Make API call to fetch weather data for Boston
        const response = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather?q=Boston&appid=76efc8a02dba849d1c43fc1e8758373a&units=metric`,
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeather();
  }, []);

  return weather;
};

const formatDateTime = (dateTime: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(dateTime);
};
const formatTime = (dateTime: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return dateTime.toLocaleTimeString("en-US", options);
};

console.log(useCurrentDateTime);
console.log(useCurrentWeather);

function SignInPage() {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [showWarning, setWarning] = useState<boolean>(true);
  const currentDateTime = useCurrentDateTime();
  const weather = useCurrentWeather();
  const { t, i18n, ready } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & Element) | null
  >(null);

  if (!weather) {
    return <p>Loading weather data...</p>;
  }
  const iconCode = weather.weather[0].icon; // Assuming the icon code is provided in the weather data
  // Construct the URL for the weather icon
  const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

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
      <div
        className="absolute bottom-0 left-0 p-4 text-white Arial font-semibold text-2xl
                        bg-primary bg-opacity-45 backdrop-blur-sm rounded-lg"
      >
        <p style={{ marginBottom: "5px" }}>{formatDateTime(currentDateTime)}</p>
        <p style={{ marginBottom: "5px" }}>{formatTime(currentDateTime)}</p>
        <p style={{ marginBottom: "5px" }}>
          Temperature: {weather.main.temp}°C
        </p>
        <img
          src={iconUrl}
          alt="Weather icon"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
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
                <Button
                  style={{ textTransform: "none" }}
                  onClick={() => changeLanguage("ru")}
                >
                  Russian
                </Button>
              </Box>
            </Popover>
          </Box>
        )}
        <div id="spacer" className="h-10" />
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
          {t("Staff? Sign in Here")}
        </UserTypeButton>
      </aside>
    </main>
  );
}

export default SignInPage;
