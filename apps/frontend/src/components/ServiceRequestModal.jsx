// ServiceRequestModal.jsx

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, Card, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ServiceRequestLog from "../components/FullServiceRequest.tsx";

const ServiceRequestModal = ({ open, onClose, typeOfService }) => {
  const expandShrink = {
    hidden: {
      // Initial state when the element is hidden
      opacity: 0, // Start with opacity 0
      scale: 0, // Start with scale 0 (collapsed)
    },
    visible: {
      // State when the element is visible (opening animation)
      opacity: 1, // Fade in
      scale: 1, // Expand to full size
      transition: {
        // Animation transition properties
        type: "spring", // Spring animation type
        stiffness: 200, // Stiffness of the spring
        damping: 20, // Damping of the spring
      },
    },
    exit: {
      // State when the element is exiting (closing animation)
      opacity: 0, // Fade out
      scale: 0, // Shrink to scale 0 (collapse)
      transition: {
        // Animation transition properties
        duration: 0.3, // Duration of the animation
      },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-open"
          variants={expandShrink}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Modal open={open} onClose={onClose}>
            <div className="flex justify-center items-center h-[100vh]">
              <Card
                className="w-1/2 shadow-md rounded-lg p-10 mx-auto mt-5 h-[90vh]"
                style={{
                  backgroundColor: "white",
                  border: "10px solid #012D5A",
                }}
              >
                <div className="flex flex-row justify-start mb-8 ">
                  <Typography
                    sx={{
                      color: "#012d5a",
                      fontSize: "2rem",
                      fontWeight: "semi-bold",
                    }}
                  >
                    {typeOfService} Request
                  </Typography>
                  <CancelIcon
                    sx={{
                      color: "#012D5A",
                      fontSize: "3rem",
                      marginLeft: "auto",
                    }}
                    onClick={onClose}
                  />
                </div>
                <div className="flex items-center justify-center h-full">
                  <ServiceRequestLog typeOfService={typeOfService} />
                </div>
              </Card>
            </div>
          </Modal>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceRequestModal;
