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
        "& .MuiInputBase-input": {
          fontFamily: '"Josefin Sans", sans-serif',
        },
        "& .MuiInputLabel-root": {
          fontFamily: '"Josefin Sans", sans-serif',
        },
      }}
      {...props}
    />
  );
};

export default MuiTextField;
