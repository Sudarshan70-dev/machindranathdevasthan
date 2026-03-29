import React from "react";
import {
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";

const MuiDropdown = (props) => {
  return (
    <FormControl fullWidth>
      
      <InputLabel
        id={`${props.id}-label`}
        sx={{
          fontFamily: '"Josefin Sans", sans-serif',
        }}
      >
        {props.label}
      </InputLabel>

      <Select
        labelId={`${props.id}-label`}
        id={props.id}
        value={props.value}
        label={props.label}
        onChange={props.handleChange}
        required
        sx={{
          fontFamily: '"Josefin Sans", sans-serif',
          borderRadius: "18px",
          backgroundColor: "rgba(255,255,255,0.85)",
          "& .MuiSelect-select": {
            padding: "14px 16px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(127, 29, 29, 0.22)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ff7700",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ff7700",
            borderWidth: "2px",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              fontFamily: '"Josefin Sans", sans-serif',
              borderRadius: "18px",
              mt: 1,
            },
          },
        }}
      >
        {props.options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              fontFamily: '"Josefin Sans", sans-serif',
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>

    </FormControl>
  );
};

export default MuiDropdown;
