import { ButtonGroup, Button } from "@mui/material";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { buttonStyle } from "../styles/muiStyles";
import { floors } from "./mapElements.ts";

export function MapControls(props: {
  zoomOut: () => void;
  resetTransform: () => void;
  zoomIn: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div id="zoom-and-algorithm" className="absolute top-1 left-1 flex gap-1">
      <ButtonGroup variant="contained">
        <Button
          onClick={() => props.zoomOut()}
          children={<ZoomOutIcon />}
          className="p-1"
        />
        <Button onClick={() => props.resetTransform()} children={"Reset"} />
        <Button
          onClick={() => props.zoomIn()}
          children={<ZoomInIcon />}
          className="p-1"
        />
      </ButtonGroup>
      {props.children}
    </div>
  );
}

export function FloorSelect(props: { setMap: (newMap: string) => void }) {
  return (
    <ButtonGroup
      orientation="vertical"
      variant="contained"
      sx={[
        {
          position: "absolute",
          bottom: "0.25rem",
          left: "0.25rem",
        },
        { ...buttonStyle },
      ]}
    >
      {floors.map((floor, index) => (
        <Button key={index} onClick={() => props.setMap(floor.map)}>
          {floor.level}
        </Button>
      ))}
    </ButtonGroup>
  );
}
