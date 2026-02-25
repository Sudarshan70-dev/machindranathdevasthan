import React from "react";
import {
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";

const MuiDropdown = (props) => {
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      
      <InputLabel
        id={`${props.id}-label`}
        sx={{
          fontFamily: '"Josefin Sans", sans-serif',
        }}
      >
        {props.label}
      </InputLabel>

      <Select
        labelId={`${props.id}Label`}
        id={props.id}
        value={props.value}
        label={props.label}
        onChange={props.handleChange}
        required
        sx={{
          fontFamily: '"Josefin Sans", sans-serif',
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              fontFamily: '"Josefin Sans", sans-serif',
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