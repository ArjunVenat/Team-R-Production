// import { Button, ButtonGroup, Select } from "@mui/material";
// import {resetTransform, zoomIn, zoomOut} from "react-zoom-pan-pinch/dist/src/core/handlers/handlers.logic";
// import ZoomOutIcon from "@mui/icons-material/ZoomOut";
// import ZoomInIcon from "@mui/icons-material/ZoomIn";
//
// interface mapControlProps{
//
//     zoomIn: () => any;
//     ZoomOut: () => any;
//     resetTransform: () => any;
//
//
// }
// export default function MapControls(props: mapControlProps) {
//
//     return(
//     <div id="controls">
//         <ButtonGroup
//             variant="contained"
//         >
//             <Button
//                 onClick={() => zoomOut()}
//                 children={<ZoomOutIcon/>}
//                 className="p-1"
//                 sx={{borderTopLeftRadius: "0.75rem", borderBottomLeftRadius: "0.75rem"}}
//             />
//             <Button
//                 onClick={() => resetTransform()}
//                 children={"Reset"}
//             />
//             <Button
//                 onClick={() => zoomIn()}
//                 children={<ZoomInIcon/>}
//                 className="p-1"
//                 sx={{borderTopRightRadius: "0.75rem", borderBottomRightRadius: "0.75rem"}}
//             />
//         </ButtonGroup>
//         <Select
//             value={currentMap}
//             onChange={(event) => setCurrentMap(event.target.value)}
//             sx={{
//                 backgroundColor: "primary.main",
//                 color: "white",
//                 "&:hover": {
//                     backgroundColor: "primary.dark",
//                 },
//                 "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "white",
//                 },
//             }}
//         >
//             {floors.map((floor, index) => (
//                 <MenuItem key={index} value={floor.map}>
//                     {floor.name}
//                 </MenuItem>
//             ))}
//         </Select>
//     </div>
//     );
// }
