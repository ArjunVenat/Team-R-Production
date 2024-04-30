import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
// import { Box, Typography } from "@mui/material";
// import swoosh from "../assets/swoosh.png";
// import { useTranslation } from "react-i18next";
import { Chart } from "react-google-charts";

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
  const coloptions = {
    title: "Service Requests By Type",
    chartArea: { width: "50%" },

    hAxis: {
      title: "Service Request Type",
      minValue: 0,
    },
    vAxis: {
      title: "Number of Requests",
    },
    legend: "none",
  };
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
  const pieoptions = {
    title: "Top Employees by Service Request Associated",
  };
  return (
    <div>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="200px"
        data={bardata}
        options={coloptions}
        legendToggle
      />
      <Chart
        chartType="PieChart"
        width="100%"
        height="200px"
        data={piedata}
        options={pieoptions}
      />
    </div>
  );
};

export default St4t5Page;
