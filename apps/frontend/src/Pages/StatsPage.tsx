import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import swoosh from "../assets/swoosh.png";
import SideBar from "../components/SideBar";

type TypeLengths = {
  Flowers: number;
  Gifts: number;
  Maintenance: number;
  Medicine: number;
  "Medical Equipment": number;
  Entertainment: number;
};

const St4t5Page = () => {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();
  const [typeLengths, setTypeLengths] = useState<TypeLengths>({
    Flowers: 0,
    Gifts: 0,
    Maintenance: 0,
    Medicine: 0,
    "Medical Equipment": 0,
    Entertainment: 0,
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
        "Entertainment",
      ];

      const newTypeLengths: Partial<TypeLengths> = {};
      const token = await getAccessTokenSilently();

      for (const type of types) {
        const length = await getTypeLength(type, token);
        newTypeLengths[type as keyof TypeLengths] = length;
      }

      setTypeLengths((prevTypeLengths) => ({
        ...prevTypeLengths,
        ...newTypeLengths,
      }));
    };

    updateTypeLengths();
  }, [getAccessTokenSilently]);

  async function getTypeLength(type: string, token: string) {
    try {
      const res = await axios.get<{ length: number }>(
        "/api/service/create?typeFilter=" + type,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
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
      <div className="top-0 pt-8 bg-primary flex justify-center items-center w-full">
        <Box
          className="w-full h-full overflow-y-auto flex-grow justify-center items-center  bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `url(${swoosh})`,
          }}
        >
          <main className="flex content-center justify-center leading-none relative">
            <Box
              className="backdrop-blur-md rounded-lg p-10 text-center"
              textAlign="center"
              color="#000000"
              bgcolor="rgb(103,124,143, 0.6)"
              padding="10px"
              borderRadius="10px"
            >
              <Box display="flex" justifyContent="center">
                <Box
                  textAlign="center"
                  margin="0 20px"
                  padding="20px"
                  borderRadius="10px"
                >
                  <Typography variant="h3" gutterBottom color="white">
                    Request Type Statistics
                  </Typography>
                  <BarChart
                    series={[
                      {
                        data: Object.values(typeLengths),
                        color: "#FFC107", // Deep Yellow
                      },
                    ]}
                    height={500} // Increased height
                    width={800} // Increased width
                    xAxis={[
                      {
                        data: Object.keys(typeLengths),
                        scaleType: "band",
                      },
                    ]}
                    margin={{ top: 30, bottom: 30, left: 40, right: 10 }}
                    grid={{ vertical: true, horizontal: true }}
                  />
                  <Typography variant="body1" gutterBottom>
                    Number of Requests by Type
                  </Typography>
                </Box>
              </Box>
            </Box>
          </main>
        </Box>
      </div>
    </Box>
  );
};

export default St4t5Page;
