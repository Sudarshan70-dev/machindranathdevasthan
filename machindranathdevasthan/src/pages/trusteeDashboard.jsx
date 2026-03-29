import React, { useEffect, useState } from "react";
import "../style.css";
import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import VerticalMenu from "../components/verticalMenu";

const TrusteeDashboard = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="trusteeDashboardLayout">
        <div className="trusteeDashboardMobileBar">
          <button
            type="button"
            className="trusteeDashboardMenuButton"
            aria-label={isMobileMenuOpen ? "Close admin menu" : "Open admin menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="trustee-dashboard-menu"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? (
              <CloseRoundedIcon fontSize="small" />
            ) : (
              <MenuRoundedIcon fontSize="small" />
            )}
          </button>
        </div>

        <button
          type="button"
          className={`trusteeDashboardBackdrop ${isMobileMenuOpen ? "open" : ""}`}
          aria-label="Close admin menu overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          id="trustee-dashboard-menu"
          className={`trusteeDashboardSidebar ${isMobileMenuOpen ? "mobileOpen" : ""}`}
        >
          <VerticalMenu onSelect={() => setIsMobileMenuOpen(false)}></VerticalMenu>
        </div>
        <div className="trusteeDashboardContent">
          <Outlet />
        </div>
      </div>
    </motion.div>
  );
};

export default TrusteeDashboard;
