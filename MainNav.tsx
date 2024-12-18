import { useEffect } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(() => {
    const path = window.location.pathname;
    if (path === "/movies") return 1;
    if (path === "/search") return 2;
    return 0;
  });

  useEffect(() => {
    if (value === 0) navigate("/");
    else if (value === 1) navigate("/movies");
    else if (value === 2) navigate("/search");
  }, [value, navigate]);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 100,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => setValue(newValue)} 
        sx={{
          backgroundColor: "#39445a",
        }}
      >
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Movies"
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Search"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
