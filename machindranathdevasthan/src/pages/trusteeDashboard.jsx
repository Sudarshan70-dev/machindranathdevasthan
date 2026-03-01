import React from "react";
import "../style.css";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import VerticalMenu from "../components/verticalMenu";

const TrusteeDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex" style={{ backgroundColor: "#F5E9DA" ,marginTop:"20px"}}>
        <div className="w25">
          <VerticalMenu></VerticalMenu>
        </div>
        <div className="w75">
          <Outlet />
        </div>
      </div>
    </motion.div>
  );
};

export default TrusteeDashboard;
