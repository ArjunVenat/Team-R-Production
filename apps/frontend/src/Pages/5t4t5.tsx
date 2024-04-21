import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#FFFFFF", // White background
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center", color: "#000000" }}>
        <h1>Service Requests Overview</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ textAlign: "center", margin: "0 20px" }}>
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
            <p>Bar Chart - Number of Requests by Type</p>
          </div>
          <div style={{ textAlign: "center", margin: "0 20px" }}>
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
            <p>Line Chart - Requests Over Time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default St4t5Page;
