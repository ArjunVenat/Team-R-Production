// import MapIcon from '@mui/icons-material/Map';
// import LoginIcon from '@mui/icons-material/Login';
import { Logout } from "@mui/icons-material";
// import RoomServiceIcon from '@mui/icons-material/RoomService';
// import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from "@mui/icons-material/FirstPage";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import { ReactNode, useState } from "react";
import { BsBellFill } from "react-icons/bs";
import { RiHome3Fill } from "react-icons/ri";
import TableViewIcon from "@mui/icons-material/TableView";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useNavigate, useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
// import {IconType} from "react-icons";
// import {SvgIconComponent} from "@mui/icons-material";
// import {Collapse} from "@mui/material";

// interface SidebarProps {
//     handleOpenServiceRequestModal: () => void;
//     handleOpenNavigationScreenModal: () => void;
// }
interface Menu {
  title: string;
  icon: ReactNode;
}

export default function Sidebar() {
  const home: Menu = { title: "Home", icon: <RiHome3Fill /> };
  const serviceRequest: Menu = {
    title: "Service Request",
    icon: <BsBellFill />,
  };
  const serviceRequestTable: Menu = {
    title: "Service Request Table",
    icon: <TableViewIcon />,
  };
  const editmap: Menu = { title: "Edit Map", icon: <EditIcon /> };

  const logout: Menu = { title: "Logout", icon: <Logout /> };
  const nodes_edges: Menu = {
    title: "Node/Edge Table",
    icon: <AccessibleForwardIcon />,
  };
  // const uploadCSV: Menu = { title: "Upload CSV", icon: <UploadFile /> };
  const downloadCSV: Menu = {
    title: "Upload/Download CSV",
    icon: <CloudDownloadIcon />,
  };
  const Menus: Menu[] = [
    home,
    editmap,
    serviceRequest,
    serviceRequestTable,
    nodes_edges,
    // uploadCSV,
    downloadCSV,
    logout,
  ];

  const location = useLocation();
  const currentURL = location.pathname;

  let menuHighlight: string = "";
  console.log({ currentURL });

  switch (currentURL) {
    case "/servicerequest":
      menuHighlight = "Service Request";
      break;
    case "/":
      menuHighlight = "Login";
      break;
    case "/home":
      menuHighlight = "Home";
      break;
    case "/editmap":
      menuHighlight = "Edit Map";
      break;
    case "/service-request-table":
      menuHighlight = "Service Request Table";
      break;
    case "/node-edge-table":
      menuHighlight = "Node/Edge Table";
      break;
    case "/upload-download-csv":
      menuHighlight = "Upload/Download CSV";
      break;
    // case "/download-csv":
    //   menuHighlight = "Download CSV";
    //   break;
    case "/logout":
      menuHighlight = "Logout";
      break;
    default:
      menuHighlight = "Home";
  }

  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string>(menuHighlight);

  const collapse = { title: "Collapse", icon: <FirstPageIcon /> };

  const navigate = useNavigate();
  const routeChange = (path: string) => {
    const newPath = `/${path}`;
    navigate(newPath);
  };

  const handleMenuClick = (title: string) => {
    setActiveMenu(title);
    if (title === "Logout") {
      routeChange("");
    }
    if (title === "Service Request") {
      routeChange("servicerequest");
    }
    if (title === "Service Request Table") {
      routeChange("service-request-table");
    }
    if (title === "Edit Map") {
      routeChange("editmap");
    }
    if (title === "Node/Edge Table") {
      routeChange("node-edge-table");
    }
    if (title === "Home") {
      routeChange("home");
    }
    if (title === "Upload/Download CSV") {
      routeChange("upload-download-csv");
    }
    // if (title === "Download CSV") {
    //   routeChange("download-csv");
    // }
  };

  return (
    <div className="flex h-screen">
      <div
        className={`bg-primary h-full p-5 pt-9 flex flex-col drop-shadow-2xl justify-between rounded-r-xl ${
          open ? "w-72" : "w-20"
        } duration-300 relative`}
      >
        {/*bg-primary sets color to be primary, which we defined in tailwind.config.js*/}
        {/*h-screen sets the nav-bar to be the height of the entire screen*/}
        {/*p-5 sets the padding to 1.25rem from all sides, pt-9 sets the top padding to be 2.25rem */}
        {/*p-5 sets the padding to 1.25rem from all sides, pt-9 sets the top padding to be 2.25rem */}
        {/*flex allows for a flexbox layout for the children and flex-col means to arrange the children vertically*/}
        {/*justify-between aligns the children along the vertical axis with the first child at the top, last child at the bottom, and space distributed evenly*/}
        {/*Clicking arrow changes the open useState, so it sets the width from 72 (18rem) to 20 (5rem). This is done in duration-300ms */}

        {/*Above are styling for the arrow, background is white, text is the primary color in tailwind.config.js*/}
        {/*Size of text is 4xl, where font size is 2.25 rem and line height is 2.5rem*/}
        {/*Rounded full makes the arrow be in a circle*/}
        {/*-right-4 and top-9 control the position relative to the container*/}

        <div className="inline-flex">
          <img
            className="w-10 rounded cursor-pointer block float-left mr-2"
            src="/src/assets/Brigham_and_Womens_Hospital_logo.svg.png"
            alt={""}
            onClick={() => handleMenuClick(home.title)}
          ></img>
          <h1
            className={`text-white pl-5 origin-left font-medium text-2xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            Welcome
          </h1>
        </div>

        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`text-white text-2xl flex items-center gap-x-10 cursor-pointer p-2 rounded-md mt-2 hover:border-r-4 hover:border-secondary${
                activeMenu === menu.title
                  ? "border-r-4 border-tertiary bg-tertiary/25"
                  : "hover:bg-blue-300 hover:bg-secondary/25"
              }`}
              style={{ height: "3.5rem" }}
              onClick={() => handleMenuClick(menu.title)}
            >
              <span
                className={`${
                  activeMenu === menu.title ? "text-tertiary" : "text-secondary"
                }`}
              >
                {menu.icon}
              </span>
              <span
                className={`text-base font-medium flex-1 duration-300 ${!open && "scale-0"} ${
                  activeMenu === menu.title ? "text-tertiary" : "text-white"
                }`}
              >
                {menu.title}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex-grow"></div>

        <div className="pb-2">
          <li
            className="text-white text-2xl flex items-center gap-x-8 cursor-pointer p-2 hover:bg-blue-300 hover:bg-secondary/25 hover:border-r-4 rounded-md mt-2"
            onClick={() => setOpen(!open)}
          >
            <span>
              <FirstPageIcon
                className={`text-white cursor-pointer ${!open && "rotate-180"} duration-1000`}
              />
            </span>
            <span
              className={`text-base font-medium flex-1 duration-300 ${!open && "scale-0"}`}
            >
              {collapse.title}
            </span>
          </li>
        </div>
      </div>
    </div>
  );
}
