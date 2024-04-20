import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BarChart } from "@mui/x-charts/BarChart";
const ArtemPage = () => {
  //Use auth0 react hook
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  if (!isLoading && !isAuthenticated) {
    loginWithRedirect({
      appState: {
        returnTo: location.pathname,
      },
    }).then();
  }

  return (
    <BarChart
      series={[{ data: [35, 44, 24, 34, 44], color: "#000080" }]}
      height={290}
      xAxis={[
        {
          data: [
            "Flowers",
            "Gifts",
            "Medicine",
            "Maintenance",
            "Medical Equipment",
          ],
          scaleType: "band",
        },
      ]}
      margin={{ top: 1, bottom: 30, left: 40, right: 10 }}
    />
  );
};

export default ArtemPage;
