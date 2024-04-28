import { useContext } from "react";
import { ColorblindContext } from "../App.tsx";

//Type and constants for colorblindness types
export type colorblindType = {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
  color8: string;
  color9: string;
  color10: string;
};
const none: colorblindType = {
  color1: "#003da6",
  color2: "#009CA6",
  color3: "#f6bd39",
  color4: "#012D5A",
  color5: "#3ECF04",
  color6: "stroke-teal",
  color7: "blue",
  color8: "red",
  color9: "orange",
  color10: "green",
};
const protanopia: colorblindType = {
  //!!!
  color1: "#003da6",
  color2: "#009CA6",
  color3: "#f6bd39",
  color4: "#012D5A",
  color5: "#3ECF04",
  color6: "stroke-teal",
  color7: "blue",
  color8: "red",
  color9: "orange",
  color10: "green",
};
const deuteranopia: colorblindType = {
  //!!!
  color1: "#003da6",
  color2: "#009CA6",
  color3: "#f6bd39",
  color4: "#012D5A",
  color5: "#3ECF04",
  color6: "stroke-teal",
  color7: "blue",
  color8: "red",
  color9: "orange",
  color10: "green",
};
const tritanopia: colorblindType = {
  //!!!
  color1: "#003da6",
  color2: "#009CA6",
  color3: "#f6bd39",
  color4: "#012D5A",
  color5: "#3ECF04",
  color6: "stroke-teal",
  color7: "blue",
  color8: "red",
  color9: "orange",
  color10: "green",
};

//Function for returning the colorblind type with corresponding colors
export const GetColorblindColors = (): colorblindType => {
  //Use react hook for accessibility options
  const { colorblind } = useContext(ColorblindContext);

  //Return the correct color
  if (colorblind == "protanopia") {
    return protanopia;
  } else if (colorblind == "deuteranopia") {
    return deuteranopia;
  } else if (colorblind == "tritanopia") {
    return tritanopia;
  } else {
    return none;
  }
};
