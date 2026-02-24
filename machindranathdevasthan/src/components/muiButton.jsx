import { Button } from "@mui/material";

export default function GradientButton({ children, ...props }) {
  return (
    <Button
      variant="contained"
      {...props}
      sx={{
        background: "linear-gradient(90deg, #FF7700 0%, #994700 100%)",
        color: "#fff",
        fontWeight: "bold",
        borderRadius: "30px",
        px: 4,
        py: 1.5,
        boxShadow: "0 6px 15px rgba(153, 71, 0, 0.4)",
        transition: "0.3s",
        "&:hover": {
          background: "linear-gradient(90deg, #ff8c1a 0%, #7a3600 100%)",
          boxShadow: "0 10px 20px rgba(153, 71, 0, 0.6)",
          transform: "translateY(-2px)"
        }
      }}
    >
      {children}
    </Button>
  );
}