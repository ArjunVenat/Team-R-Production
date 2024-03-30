//This is the main page with the map, staff sign in, etc on the first slide in Figma.

import { useState } from 'react';
import { TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import "./MainPage.css";
import firstFloorMap from './maps/00_thelowerlevel1.png';
import {
    Box, Card, Modal,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Typography
} from "@mui/material";
import DirectionsIcon from '@mui/icons-material/Directions';
import LoginIcon from '@mui/icons-material/Login';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import SignInPage from "./SignInPage.tsx";
import FullServiceRequest from "./FullServiceRequest.tsx";

//actions for speed dial
const actions = [
    { icon: <LoginIcon />, name: 'Sign In' },
    { icon: <RoomServiceIcon />, name: 'Service Request' },
    { icon: <DirectionsIcon />, name: 'Get Directions' },
];

//need to export eventually to another file to generalize as a component
const modalStyle = {
    position:'absolute',
    top: '50%',
    left:'50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius:10,
    padding:"50px",
    width: "fit-content",
    height: "fit-content"

};


function MainPage() {
    const guestOptions: string[] = ["Flowers", "Religious", "Food", "other"]; //options for service requests

    //speed dial state
    const [speedDialOpen, setSpeedDialOpen] = useState(true);

    //sign in modal state handlers
    const [openSignInModal, setOpenSignInModal] = useState(false);
    const handleCloseSignInModal = () => setOpenSignInModal(false);
    const handleOpenSignInModal = () => setOpenSignInModal(true);


    //service request modal state handlers
    const [openServiceRequestModal, setOpenServiceRequestModal] = useState(false);
    const handleCloseServiceRequestModal = () => setOpenServiceRequestModal(false);
    const handleOpenServiceRequestModal = () => setOpenServiceRequestModal(true);

    //placeholder for handle directions
    const handleDirections = () => <p>placeholder</p>;

    //determine which button was pressed
    const handleMenuButton = (name:string) => {
        switch (name){
            case "Sign In":{
                handleOpenSignInModal();
                break;
            }
            case "Service Request": {
                handleOpenServiceRequestModal();
                break;
            }
            case "Get Directions": {
                handleDirections();
                break;
            }
        }
    };

    return (
        <div id="MainPage">
            <SpeedDial //this is a speed dial. It's an expandable floating action button menu.
                ariaLabel="Navigation Menu"
                sx={{position: 'absolute', top: 16, left: 16}} //styling property for mui components
                icon={<SpeedDialIcon/>}
                direction={'down'}
                FabProps={{
                    sx: [{
                        backgroundColor: "#34587A",
                        "&:hover": {backgroundColor: "#d6d8d5", color: "#34587A"}
                    }]
                }} //need to export to a theme eventually
                onClick={() => setSpeedDialOpen(!speedDialOpen)} //toggle open speed dial only on click. Necessary for not opening on hover
                open={!speedDialOpen} //open state
            >
                {actions.map((action) => ( //create the speed dial options from the list declared at the top of the file
                    <SpeedDialAction
                        key={action.name}
                        icon={
                            <SpeedDialIcon //this mess is necessary to make the menu options into buttons with text instead of just icons
                                icon={
                                    <Box sx={{display: "flex"}}>
                                        {action.icon}
                                        <Typography sx={{marginLeft: '0.5em'}}>{action.name}</Typography>
                                    </Box>
                                }
                            />}
                        FabProps={{ //this sets the properties for the buttons in the menu
                            variant: 'extended',
                            size: 'medium',
                            sx: [{backgroundColor: "#34587A", color: "white", "&:hover": {color: "#34587A"}}]
                        }}
                        onClick={() => handleMenuButton(action.name)}
                    />
                ))}
            </SpeedDial>

            {/*This tag only holds the map itself and adds zooming and panning*/}
            <main className="flex content-center justify-center leading-none">
                <div id={"map"} className="max-w-full">
                    <TransformWrapper>
                        <TransformComponent>
                            <img src={firstFloorMap} alt={"Fist floor map"} className="w-auto max-h-screen"/>
                        </TransformComponent>
                    </TransformWrapper>
                </div>
            </main>

            <Modal // These are the modals that I am planning on turning into separate components eventually
                open={openSignInModal}
                onClose={handleCloseSignInModal}
            >
                <Card
                    sx={modalStyle}
                >
                    <SignInPage/>
                </Card>
            </Modal>

            <Modal
                open={openServiceRequestModal}
                onClose={handleCloseServiceRequestModal}
            >
                <Card
                    sx={modalStyle}
                >
                    <FullServiceRequest availableServices={guestOptions}/>


                </Card>
            </Modal>


        </div>
    );
}

export default MainPage;
