import React from "react";
import { Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";

const SearchBar = (props) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: "40px",
        padding: "6px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        maxWidth: 500,
      }}
    >
      <input
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        style={{
          border: "none",
          outline: "none",
          flex: 1,
          padding: "10px 15px",
          fontSize: "14px",
          borderRadius: "40px",
        }}
      />

      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={props.onClick}
        sx={{
          borderRadius: "30px",
          textTransform: "none",
          padding: "8px 20px",
        }}
      >
        {t("search")}
      </Button>
    </Box>
  );
};

export default SearchBar;
