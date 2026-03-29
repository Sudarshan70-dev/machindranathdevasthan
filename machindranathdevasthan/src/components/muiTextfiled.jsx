import React from "react";
import TextField from "@mui/material/TextField";

const MuiTextField = (props) => {
  const require = props.required === false ? false : true;
  return (
    <TextField
      id={props.id}
      label={props.label}
      variant="outlined"
      type={props.type || "text"}
      value={props.value}
      onChange={props.onChange}
      required = {require}
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-root": {
          borderRadius: "18px",
          backgroundColor: "rgba(255,255,255,0.85)",
        },
        "& .MuiInputBase-input": {
          fontFamily: '"Josefin Sans", sans-serif',
          padding: "14px 16px",
        },
        "& .MuiInputLabel-root": {
          fontFamily: '"Josefin Sans", sans-serif',
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(127, 29, 29, 0.22)",
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ff7700",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ff7700",
          borderWidth: "2px",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#ff7700",
        },
      }}
      {...props}
    />
  );
};

export default MuiTextField;
