import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";

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
      //new partial tech just dropped

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
    <BarChart
      series={[
        {
          data: Object.values(typeLengths),
          color: "#000080",
        },
      ]}
      height={290}
      xAxis={[
        {
          data: Object.keys(typeLengths),
          scaleType: "band",
        },
      ]}
      margin={{ top: 1, bottom: 30, left: 40, right: 10 }}
    />
  );
};

export default St4t5Page;
