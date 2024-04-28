// import MapIcon from '@mui/icons-material/Map';
// import LoginIcon from '@mui/icons-material/Login';
import { SubmitUserDB } from "../backendreference/addUserToDB.ts";
import { Logout, Login } from "@mui/icons-material";
// import RoomServiceIcon from '@mui/icons-material/RoomService';
// import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from "@mui/icons-material/FirstPage";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import { ReactNode, useState, useEffect } from "react";
import { BsBellFill } from "react-icons/bs";
import { RiHome3Fill } from "react-icons/ri";
import TableViewIcon from "@mui/icons-material/TableView";
import Herald from "../assets/image/Herald.jpg";

// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useNavigate, useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth0 } from "@auth0/auth0-react";
// import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import BarChartIcon from "@mui/icons-material/BarChart";
import InfoIcon from "@mui/icons-material/Info";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
// import {IconType} from "react-icons";
// import {SvgIconComponent} from "@mui/icons-material";
// import {Collapse} from "@mui/material";

// interface SidebarProps {
//     handleOpenServiceRequestModal: () => void;
//     handleOpenNavigationScreenModal: () => void;
// }
import BWHLogo from "../assets/brigLogo.png";
interface Menu {
  title: string;
  icon: ReactNode;
  onlyDisplayLoggedIn: boolean;
}

export default function Sidebar() {
  // Use the Auth0 React hook to handle authentication.
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
    logout,
    user,
  } = useAuth0();

  const home: Menu = {
    title: "Home",
    icon: <RiHome3Fill />,
    onlyDisplayLoggedIn: false,
  };
  const serviceRequest: Menu = {
    title: "Service Request",
    icon: <BsBellFill />,
    onlyDisplayLoggedIn: true,
  };
  const serviceRequestTable: Menu = {
    title: "Service Request Table",
    icon: <TableViewIcon />,
    onlyDisplayLoggedIn: true,
  };
  const editmap: Menu = {
    title: "Edit Map",
    icon: <EditIcon />,
    onlyDisplayLoggedIn: true,
  };

  const pdmOption: Menu = {
    title: "Find a Doctor",
    icon: <MedicalServicesIcon />,
    onlyDisplayLoggedIn: false,
  };

  const logoutOption: Menu = {
    title: "Logout",
    icon: <Logout />,
    onlyDisplayLoggedIn: false,
  };
  const nodes_edges: Menu = {
    title: "CSV Data",
    icon: <AccessibleForwardIcon />,
    onlyDisplayLoggedIn: true,
  };
  // const uploadCSV: Menu = { title: "Upload CSV", icon: <UploadFile /> };
  // const downloadCSV: Menu = {
  //   title: "Upload/Download CSV",
  //   icon: <CloudDownloadIcon />,
  //   onlyDisplayLoggedIn: true,
  // };
  const stats: Menu = {
    title: "Stats",
    icon: <BarChartIcon />,
    onlyDisplayLoggedIn: true,
  };

  // const creditsPage: Menu = {
  //   title: "Credits Page",
  //   icon: <ImportContactsIcon />,
  //   onlyDisplayLoggedIn: false,
  // };
  const aboutPage: Menu = {
    title: "About and Credits",
    icon: <InfoIcon />,
    onlyDisplayLoggedIn: false,
  };
  const chat: Menu = {
    title: "Chat with Herald AI",
    icon: (
      <img
        src={Herald}
        alt="Herald"
        style={{ height: "28px", width: "28px" }}
      />
    ),
    onlyDisplayLoggedIn: false,
  };
  const login: Menu = {
    title: "Staff Login",
    icon: <Login />,
    onlyDisplayLoggedIn: false,
  };

  // const Menus: Menu[] = [
  //   home,
  //   editmap,
  //   serviceRequest,
  //   serviceRequestTable,
  //   nodes_edges,
  //   // uploadCSV,
  //   downloadCSV,
  //   logoutOption,
  //   login,
  // ];
  const [Menus, setMenus] = useState<Menu[]>([
    home,
    editmap,
    pdmOption,
    serviceRequest,
    serviceRequestTable,
    nodes_edges,
    aboutPage,
    chat,
    login,
    logoutOption,
  ]);

  useEffect(() => {
    if (isAuthenticated) {
      setMenus([
        home,
        pdmOption,
        editmap,
        serviceRequest,
        serviceRequestTable,
        nodes_edges,
        stats,
        aboutPage,
        chat,
        logoutOption,
      ]);
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const location = useLocation();
  const currentURL = location.pathname;

  // This useEffect hook is responsible for refreshing the access token when necessary.
  useEffect(
    () => {
      // Define an asynchronous function to refresh the access token.
      const refreshToken = async () => {
        try {
          const token: string = await getAccessTokenSilently(); //If the user is logged in and we can get their user...
          try {
            //Try to add them to the database...
            await SubmitUserDB(user!, token);
          } catch (error) {
            //If they already exist within the database...
            console.log(
              "could not add user to employee databse! This user likely already exists within the database",
            );
          }
        } catch (error) {
          // If an error occurs during token refresh, redirect the user to the login page.
          await loginWithRedirect({
            appState: {
              returnTo: location.pathname,
            },
          });
        }
      };

      // Check if authentication is not in progress and the user is authenticated.
      if (!isLoading && isAuthenticated) {
        refreshToken().then();
      }
    },
    // Dependencies array to re-run the effect when any of these values change.
    [
      getAccessTokenSilently, // Auth0 hook for getting access token.
      loginWithRedirect, // Auth0 hook for redirecting to login page.
      location.pathname, // Pathname of the current location.
      isLoading, // Boolean indicating whether authentication is in progress.
      isAuthenticated, // Boolean indicating whether the user is authenticated.
      user, // auth0 user
    ],
  );

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
    case "/doctor-match":
      menuHighlight = "Find a Doctor";
      break;
    case "/editmap":
      menuHighlight = "Edit Map";
      break;
    case "/service-request-table":
      menuHighlight = "Service Request Table";
      break;
    case "/node-edge-table":
      menuHighlight = "CSV Data";
      break;
    // case "/upload-download-csv":
    //   menuHighlight = "Upload/Download CSV";
    //   break;
    // case "/download-csv":
    //   menuHighlight = "Download CSV";
    //   break;
    case "/stats":
      menuHighlight = "Stats";
      break;
    case "chat":
      menuHighlight = "Chat";
      break;
    // case "/credits":
    //   menuHighlight = "Credits Page";
    //   break;
    case "/about":
      menuHighlight = "About and Credits";
      break;
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

  // Define a function to change the route/navigation within the application.
  const routeChange = (path: string) => {
    const newPath = `/${path}`;
    navigate(newPath); //  Navigate to new path within the application
  };

  // Define a function to handle clicks on the menu items.
  const handleMenuClick = (title: string) => {
    // Set the active menu to the clicked menu item's title.
    setActiveMenu(title);

    // Handle different menu item clicks.
    if (title === "Logout") {
      // If the user clicks Logout and is authenticated and not loading,
      // initiate logout process and redirect to the home page after logout.
      if (isAuthenticated && !isLoading) {
        logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        }).then();
      } else {
        // If the user is not authenticated or is still loading,
        // call routeChange function to the home page.
        routeChange("");
      }
    } else if (title === "Service Request") {
      // Redirect to the service request page.
      routeChange("servicerequest");
    } else if (title === "Service Request Table") {
      // Redirect to the service request table page.
      routeChange("service-request-table");
    } else if (title === "Edit Map") {
      // Redirect to the edit map page.
      routeChange("editmap");
    } else if (title === "CSV Data") {
      // Redirect to the node/edge table page.
      routeChange("node-edge-table");
    } else if (title === "Home") {
      // Redirect to the home page.
      routeChange("home");
      // } else if (title === "Upload/Download CSV") {
      //   // Redirect to the upload/download CSV page.
      //   routeChange("upload-download-csv");
    } else if (title === "Staff Login") {
      loginWithRedirect({
        appState: { returnTo: "/home" },
      });
    } else if (title === "Stats") {
      //redirect to stats page
      routeChange("stats");
      // } else if (title === "Credits Page") {
      //   routeChange("credits");
    } else if (title === "About and Credits") {
      routeChange("about");
    } else if (title === "Find a Doctor") {
      routeChange("doctor-match");
    } else if (title === "Chat with Herald AI") {
      routeChange("chat");
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className={`bg-primary h-full p-5 pt-5 flex flex-col drop-shadow-2xl justify-between ${
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

        <div className="inline-flex items-center">
          <img
            className="w-10 rounded cursor-pointer block float-left mr-2"
            src={BWHLogo}
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
          {Menus.filter(
            // Filter the menu items based on whether the user is authenticated
            // or what menu items should be displayed even when the user is not logged in,
            // and ensure that the loading state is false.
            (menu: Menu) =>
              (isAuthenticated || !menu.onlyDisplayLoggedIn) && !isLoading,
          ).map((menu, index) => (
            <li
              key={index}
              className={`text-white h-[3.5rem] text-2xl flex items-center gap-x-5 cursor-pointer p-2 rounded-md mt-2 hover:border-r-4 hover:border-secondary${
                activeMenu === menu.title
                  ? "border-r-4 border-tertiary bg-tertiary/25"
                  : "hover:bg-blue-300 hover:bg-secondary/25"
              }`}
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
