import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
// import { Box, Typography } from "@mui/material";
// import swoosh from "../assets/swoosh.png";
// import { useTranslation } from "react-i18next";
import { Chart } from "react-google-charts";
import swoosh from "../assets/swoosh.png";
import { GetColorblindColors } from "../components/colorblind.ts";
import { Box } from "@mui/material";

type TypeLengths = {
  Flowers: number;
  Gifts: number;
  Maintenance: number;
  Medicine: number;
  "Medical Equipment": number;
  Entertainment: number;
};

export default function St4t5Page() {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();

  // const { t } = useTranslation();

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

  const bardata = [
    ["Type", "Length", { role: "style" }],
    ["Flowers", typeLengths.Flowers, "#FFC107"],
    ["Gifts", typeLengths.Gifts, "#2196F3"],
    ["Maintenance", typeLengths.Maintenance, "#4CAF50"],
    ["Medicine", typeLengths.Medicine, "#FF5722"],
    ["Medical Equipment", typeLengths["Medical Equipment"], "#9C27B0"],
    ["Entertainment", typeLengths.Entertainment, "#607D8B"],
  ];

  const piedata = [
    ["Type", "Length"],
    ["Artem", typeLengths.Flowers],
    ["Nick", typeLengths.Gifts],
    ["Arjun", typeLengths.Maintenance],
    ["Jessie", typeLengths.Medicine],
    ["Javier", typeLengths["Medical Equipment"]],
    ["Brannon", typeLengths.Entertainment],
  ];

  // const glazedata = [
  //     ["Phrases"],
  //     ["BWH is a hospital"],
  //     ["BWH can solve all of your problems"],
  //     ["BWH is a great place"],
  //     ["BWH is staffed by friendly people"],
  //     ["BWH can treat your illness"],
  //     ["BWH Sponsors!"],
  //     ["BWH is a great place to work"],
  //     ["BWH is a great place to visit"],
  //     ["BWH is a great place to get sick"],
  // ];
  // const wordoptions = {
  //         wordtree: {
  //             format: "implicit",
  //             word: "BWH",
  //         },
  //     };
  const coloptions = {
    title: "Service Requests By Type",
    chartArea: { width: "80%" },

    hAxis: {
      title: "Service Request Type",
      minValue: 0,
    },
    vAxis: {
      title: "Number of Requests",
    },
    legend: "none",
    backgroundColor: "transparent",
  };
  const pieoptions = {
    title: "Top Employees by Service Request Associated",
    is3D: true,
    backgroundColor: "transparent",
  };
  return (
    <Box display="flex" height="100vh">
      <div
        className="
        overflow-y-auto h-full w-full
        bg-cover bg-center bg-no-repeat
        relative flex flex-col justify-between"
        style={{
          backgroundImage: `url(${swoosh})`,
        }}
      >
        <div className=" top-0 min-w-full pt-8 bg-primary">
          <Box
            sx={{
              backgroundColor: GetColorblindColors().color2,
              borderColor: "white",
              display: "flex",
              justifyContent: "center",
              height: "10vh",
              alignItems: "center",
            }}
          >
            <h1 className="text-4xl text-white">Statistics</h1>
          </Box>
        </div>

        <div className="flex justify-center items-center h-full w-full">
          <div
            className="flex justify-center items-center
                        h-[90%] w-[90%] bg-[rgba(103,124,143,0.3)]
                        backdrop-blur-sm rounded-lg"
          >
            <div className="flex flex-col justify-center items-center w-[90%] h-[90%]">
              <Chart
                chartType="ColumnChart"
                width="800px"
                height="400px"
                data={bardata}
                options={coloptions}
                legendToggle
              />
              <Chart
                chartType="PieChart"
                width="800px"
                height="300px"
                data={piedata}
                options={pieoptions}
              />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
