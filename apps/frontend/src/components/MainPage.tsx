//This is the main page with the map, staff sign in, etc on the first slide in Figma.

import SideBar from "./SideBar";
import { useState } from 'react';
import { TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import "./MainPage.css";
import firstFloorMap from './maps/00_thelowerlevel1.png';
import {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Box, Card, Modal, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography
} from "@mui/material";
import DirectionsIcon from '@mui/icons-material/Directions';
import LoginIcon from '@mui/icons-material/Login';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import SignInPage from "./SignInPage.tsx";
import FullServiceRequest from "./FullServiceRequest.tsx";
// import NavigationScreen from "./NavigationScreen.tsx";

//actions for speed dial
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // const [openNavigationScreenModal, setOpenNavigationScreenModal] = useState(false);
    // const handleCloseNavigationScreenModal = () => setOpenNavigationScreenModal(false);
    // const handleOpenNavigationScreenModal = () => setOpenNavigationScreenModal(true);

    //determine which button was pressed
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            // case "Get Directions": {
            //     handleOpenNavigationScreenModal();
            //     break;
            // }
        }
    };

    return (
        <div id="MainPage" className="flex flex-row">
            <SideBar handleOpenServiceRequestModal={handleOpenServiceRequestModal} />
                     {/*handleOpenNavigationScreenModal={handleOpenNavigationScreenModal}*/}

            {/*This tag only holds the map itself and adds zooming and panning*/}
            <main className="flex content-center justify-center leading-none">
                <div id={"map"} className="max-w-full">
                    <TransformWrapper alignmentAnimation={{ sizeX: 0, sizeY: 0 }}>
                        <TransformComponent>
                            <img src={firstFloorMap} alt={"Fist floor map"} className="w-screen max-h-screen"/>
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

            {/*<Modal*/}
            {/*    open={openNavigationScreenModal}*/}
            {/*    onClose={handleCloseNavigationScreenModal}*/}
            {/*>*/}
            {/*    <Card*/}
            {/*        sx={modalStyle}*/}
            {/*    >*/}
            {/*        <NavigationScreen/>*/}

            {/*    </Card>*/}
            {/*</Modal>*/}


        </div>
    );
}

export default MainPage;
