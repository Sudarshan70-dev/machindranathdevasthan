import { Button } from "@mui/material";

export default function GradientButton({ children, ...props }) {
  return (
    <Button
      variant="contained"
      {...props}
      sx={{
        background: "linear-gradient(135deg, #ff7a18 0%, #b44a00 100%)",
        color: "#fff",
        fontFamily: '"Josefin Sans", sans-serif',
        fontWeight: 700,
        textTransform: "none",
        borderRadius: "999px",
        px: 3.5,
        py: 1.4,
        minHeight: "48px",
        boxShadow: "0 10px 24px rgba(180, 74, 0, 0.28)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease",
        "&:hover": {
          background: "linear-gradient(135deg, #ff8f33 0%, #8d3a00 100%)",
          boxShadow: "0 16px 28px rgba(180, 74, 0, 0.34)",
          transform: "translateY(-2px)",
          filter: "brightness(1.02)",
        },
        "&.Mui-disabled": {
          color: "rgba(255,255,255,0.8)",
          background: "linear-gradient(135deg, #d9a06c 0%, #b5794a 100%)",
        },
      }}
    >
      {children}
    </Button>
  );
}
