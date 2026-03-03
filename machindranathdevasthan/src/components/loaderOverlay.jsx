import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoaderOverlay = ({ isLoading = false }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-live="polite"
      aria-busy="true"
    >
      <CircularProgress />
    </div>
  );
};

export default LoaderOverlay;
