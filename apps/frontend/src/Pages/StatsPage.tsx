import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import blueback from "../assets/blueback.png";
import SideBar from "../components/SideBar";

type TypeLengths = {
  Flowers: number;
  Gifts: number;
  Maintenance: number;
  Medicine: number;
  "Medical Equipment": number;
};

const St4t5Page = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [typeLengths, setTypeLengths] = useState<TypeLengths>({
    Flowers: 0,
    Gifts: 0,
    Maintenance: 0,
    Medicine: 0,
    "Medical Equipment": 0,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: {
          returnTo: location.pathname,
        },
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  useEffect(() => {
    const updateTypeLengths = async () => {
      const types = [
        "Flowers",
        "Gifts",
        "Maintenance",
        "Medicine",
        "Medical Equipment",
      ];

      const newTypeLengths: Partial<TypeLengths> = {};

      for (const type of types) {
        const length = await getTypeLength(type);
        newTypeLengths[type as keyof TypeLengths] = length;
      }

      setTypeLengths((prevTypeLengths) => ({
        ...prevTypeLengths,
        ...newTypeLengths,
      }));
    };

    updateTypeLengths();
  }, []);

  async function getTypeLength(type: string) {
    try {
      const res = await axios.get<{ length: number }>(
        "/api/service/create?typeFilter=" + type,
      );
      return res.data.length;
    } catch (error) {
      console.error("Error fetching type length:", error);
      return 0;
    }
  }

  return (
    <Box display="flex">
      <SideBar />
      <Box
        className="overflow-y-auto h-screen flex-grow justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${blueback})`,
          width: "100vw",
          height: "100vh",
        }}
      >
        <main className="flex content-center justify-center leading-none relative">
          <Box textAlign="center" color="#000000">
            <Typography variant="h1" component="h1" gutterBottom>
              Service Requests Overview
            </Typography>
            <Box display="flex" justifyContent="center">
              <Box
                textAlign="center"
                margin="0 20px"
                bgcolor="#FFFFFF"
                padding="20px"
                borderRadius="10px"
              >
                <BarChart
                  series={[
                    {
                      data: Object.values(typeLengths),
                      color: "#FFC107", // Deep Yellow
                    },
                  ]}
                  height={330} // Increased height to prevent top of bars from being cut off
                  xAxis={[
                    {
                      data: Object.keys(typeLengths),
                      scaleType: "band",
                    },
                  ]}
                  margin={{ top: 30, bottom: 30, left: 40, right: 10 }} // Increased top margin
                  grid={{ vertical: true, horizontal: true }}
                />
                <Typography variant="body1" gutterBottom>
                  Bar Chart - Number of Requests by Type
                </Typography>
              </Box>
              <Box
                textAlign="center"
                margin="0 20px"
                bgcolor="#FFFFFF"
                padding="20px"
                borderRadius="10px"
              >
                <LineChart
                  series={[
                    {
                      data: [2, 5.5, 2, 8.5, 1.5, 5],
                      color: "#FFC107", // Deep Yellow
                    },
                  ]}
                  xAxis={[
                    {
                      data: [1, 2, 3, 5, 8, 10],
                    },
                  ]}
                  width={500}
                  height={300}
                  grid={{ vertical: true, horizontal: true }}
                />
                <Typography variant="body1" gutterBottom>
                  Line Chart - Requests Over Time
                </Typography>
              </Box>
            </Box>
          </Box>
        </main>
      </Box>
    </Box>
  );
};

export default St4t5Page;
