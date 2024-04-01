// Import necessary libraries and components
import { useState } from "react";
//import { Alert, Snackbar} from "@mui/material";

// // Define styled components for modal
// const Anim = styled(motion.div)({
//     backgroundColor: "#fff",
//     padding: "1em 2em",
//     borderRadius: "10px",
// });
//
// // Define styled components for user type selection
// const UserTypeList = styled(motion(Box))({
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     color: "#003a96",
//     fontWeight: "bold",
//     letterSpacing: "normal",
// });
//
// // Define styled components for user type buttons
// const UserTypeButton = styled(motion.button)({
//     margin: "10px",
//     borderRadius: "15px",
//     padding: "10px",
//     width: "200px",
//     color: "#ffffff",
//     fontWeight: "bold",
//     letterSpacing: "normal",
//     backgroundColor: "#34587a",
//     "&:hover": {
//         backgroundColor: "#34587a",
//     },
// });
//
// // Define styled components for login form labels
// const LoginFormLabel = styled("label")({
//     margin: "10px",
//     color: "#003a96",
//     fontWeight: "bold",
//     letterSpacing: "normal",
//     "& input": {
//         backgroundColor: "#ffffff",
//         color: "#000000",
//     },
// });
//
// // Define styled components for login form button
// const LoginFormButton = styled(motion.button)({
//     margin: "10px",
//     borderRadius: "15px",
//     padding: "10px",
//     width: "200px",
//     color: "#ffffff",
//     fontWeight: "bold",
//     letterSpacing: "normal",
//     backgroundColor: "#34587a",
//     "&:hover": {
//         backgroundColor: "#34587a",
//     },
// });
//
// // Define styled components for login form fields
// const LoginFormFields = styled(Box)({
//     display: "flex",
//     flexDirection: "column",
//     backgroundColor: "#d3d3d3",
//     borderRadius: "15px",
//     padding: "10px",
//     marginBottom: "10px",
// });

// Define SignInPage component
function SignInPage(props) {
    // Define state variables
    const [selectedUserType, setSelectedUserType] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showLoginForm, setShowLoginForm] = useState(false);

    // Define function to handle user type (guest, staff, admin) selection
    const handleUserTypeSelection = (userType: string) => {
        setSelectedUserType(userType);
        setShowLoginForm(true);
    };

    // Define function to handle sign in
    const handleSignIn = () => {
        if (selectedUserType === 'Admin') {
            if (username === 'admin' && password === 'admin') {
                props.setSnackBar({
                    open: true,
                    severity: 'success',
                    message: 'Admin login successful!'
                });
            } else {
                props.setSnackBar({
                    open: true,
                    severity: 'error',
                    message: 'Invalid username or password'
                });
            }
        }
        setShowLoginForm(false);
    };

    // Define function to handle cancel
    const handleCancel = () => {
        setUsername("");
        setPassword("");
        setSelectedUserType("");
        setShowLoginForm(false);
    };

    // Render SignInPage component
    return (
        <div className="flex flex-col items-center h-full justify-center">
            {!showLoginForm && (
                <div className="flex flex-col items-center border border-black rounded-lg p-6 lg:p-8">
                    <h1 className="text-6xl font-bold my-4 text-blue-800">Welcome</h1>
                    <div className="w-full pb-2">
                        <div className="mb-4">
                            <button
                                className="bg-blue-700 hover:bg-blue-800 text-white text-2xl font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => handleUserTypeSelection('Guest')}
                            >
                                Guest
                            </button>
                        </div>
                        <div className="mb-4">
                            <button
                                className="bg-blue-700 hover:bg-blue-800 text-white text-2xl font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => handleUserTypeSelection('Staff')}
                            >
                                Staff
                            </button>
                        </div>
                        <div className="mb-4">
                            <button
                                className="bg-blue-700 hover:bg-blue-800 text-white text-2xl font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => handleUserTypeSelection('Admin')}
                            >
                                Admin
                            </button>
                        </div>
                    </div>
                    {username && <p>Username: {username}</p>}
                    {password && <p>Password: {password}</p>}
                    {selectedUserType && <p>User Type: {selectedUserType}</p>}
                </div>
            )}

            {showLoginForm && (
                <div className="border border-black rounded-lg p-6 lg:p-10">
                    <h1 className="text-5xl text-blue-800 font-bold mb-4 text-left">{selectedUserType}</h1>
                    <div className="flex flex-col bg-gray-300 px-20 py-8 rounded-lg">
                        <label className="mt-4">
                            Username:
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-2 py-1 ml-4"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <label className="mt-4">
                            Password:
                            <input
                                type="password"
                                className="border border-gray-300 rounded-md px-2 py-1 ml-4"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <button
                            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-6 mr-4"
                            onClick={handleSignIn}
                        >
                            Sign in
                        </button>
                        <button
                            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-6"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default SignInPage;
