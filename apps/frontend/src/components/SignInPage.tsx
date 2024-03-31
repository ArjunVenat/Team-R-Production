// Import necessary libraries and components
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, styled } from "@mui/material";

// Define styled components for modal
const Anim = styled(motion.div)({
    backgroundColor: "#fff",
    padding: "1em 2em",
    borderRadius: "10px",
});

// Define styled components for user type selection
const UserTypeList = styled(motion(Box))({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#003a96",
    fontWeight: "bold",
    letterSpacing: "normal",
});

// Define styled components for user type buttons
const UserTypeButton = styled(motion.button)({
    margin: "10px",
    borderRadius: "15px",
    padding: "10px",
    width: "200px",
    color: "#ffffff",
    fontWeight: "bold",
    letterSpacing: "normal",
    backgroundColor: "#34587a",
    "&:hover": {
        backgroundColor: "#34587a",
    },
});

// Define styled components for login form labels
const LoginFormLabel = styled("label")({
    margin: "10px",
    color: "#003a96",
    fontWeight: "bold",
    letterSpacing: "normal",
    "& input": {
        backgroundColor: "#ffffff",
        color: "#000000",
    },
});

// Define styled components for login form button
const LoginFormButton = styled(motion.button)({
    margin: "10px",
    borderRadius: "15px",
    padding: "10px",
    width: "200px",
    color: "#ffffff",
    fontWeight: "bold",
    letterSpacing: "normal",
    backgroundColor: "#34587a",
    "&:hover": {
        backgroundColor: "#34587a",
    },
});

// Define styled components for login form fields
const LoginFormFields = styled(Box)({
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#d3d3d3",
    borderRadius: "15px",
    padding: "10px",
    marginBottom: "10px",
});

// Define SignInPage component
function SignInPage() {
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
        <AnimatePresence>
            {!showLoginForm && (
                <UserTypeList
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 id={"sign_in_h1"}>Welcome</h1>
                    <UserTypeButton
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleUserTypeSelection("Guest")}
                    >
                        Guest
                    </UserTypeButton>
                    <UserTypeButton
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleUserTypeSelection("Staff")}
                    >
                        Staff
                    </UserTypeButton>
                    <UserTypeButton
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleUserTypeSelection("Admin")}
                    >
                        Admin
                    </UserTypeButton>
                    {username && <p>Username: {username}</p>}
                    {password && <p>Password: {password}</p>}
                    {selectedUserType && <p>User Type: {selectedUserType}</p>}
                </UserTypeList>
            )}
            {showLoginForm && (
                <Anim
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 id={"sign_in_h1"}>{selectedUserType}</h1>
                    <LoginFormFields>
                        <LoginFormLabel>
                            Username:
                            <input
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </LoginFormLabel>
                        <LoginFormLabel>
                            Password:
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </LoginFormLabel>
                    </LoginFormFields>
                    <LoginFormButton
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleSignIn}
                    >
                        Sign in
                    </LoginFormButton>
                    <LoginFormButton
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleCancel}
                    >
                        Cancel
                    </LoginFormButton>
                </Anim>
            )}
        </AnimatePresence>
    );
}

// Export SignInPage component
export default SignInPage;
