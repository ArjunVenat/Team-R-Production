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
  //can only see shades of blue, yellow, and brown
  color1: "#003da6",
  color2: "#009CA6",
  color3: "#f6bd39",
  color4: "#012D5A",
  color5: "#1f3fa1",
  color6: "stroke-brown",
  color7: "blue",
  color8: "orange",
  color9: "orange",
  color10: "cyan",
};
const deuteranopia: colorblindType = {
  //same as protanopia, but with lighter shades of brown
  color1: "#003da6",
  color2: "#009CA6",
  color3: "#b0754c",
  color4: "#012D5A",
  color5: "#1f3fa1",
  color6: "stroke-lightbrown",
  color7: "blue",
  color8: "orange",
  color9: "orange",
  color10: "cyan",
};
const tritanopia: colorblindType = {
  //Can only see shades of blue and light red/pink
  color1: "#418791",
  color2: "#9c3232",
  color3: "#c25b5b",
  color4: "#012D5A",
  color5: "#75d7e6",
  color6: "stroke-lightred",
  color7: "blue",
  color8: "red",
  color9: "red",
  color10: "cyan",
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
