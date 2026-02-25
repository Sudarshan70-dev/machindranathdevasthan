import React from "react";
import TextField from "@mui/material/TextField";

const MuiTextField = (props) => {
  return (
    <TextField
      id={props.id}
      label={props.label}
      variant="outlined"
      type={props.type || "text"}
      value={props.value}
      onChange={props.onChange}
      required
      sx={{
        width: "100%",
        "& .MuiInputBase-input": {
          fontFamily: '"Josefin Sans", sans-serif',
        },
        "& .MuiInputLabel-root": {
          fontFamily: '"Josefin Sans", sans-serif',
        },
      }}
    />
  );
};

export default MuiTextField;
