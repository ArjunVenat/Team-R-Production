// ServiceRequestModal.jsx

import React from "react";
import { motion } from "framer-motion";
import { Modal, Card, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ServiceRequestLog from "../components/FullServiceRequest.tsx";

const ServiceRequestModal = ({ open, onClose, typeOfService }) => {
  const expandShrink = {
    hidden: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1, // Fade in
      scale: 1, // Expand to full size
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      // scale: 0,
      transition: {
        duration: 0.01,
      },
    },
  };

  return (
    <Modal open={open} onClose={onClose}>
      <motion.div
        key="modal-open"
        variants={expandShrink}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex justify-center items-center h-[100vh]">
          <Card
            className="w-1/2 shadow-md rounded-lg p-10 mx-auto mt-5 h-[90vh] mb-4"
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
                  fontWeight: "bold",
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
      </motion.div>
    </Modal>
  );
};

export default ServiceRequestModal;
