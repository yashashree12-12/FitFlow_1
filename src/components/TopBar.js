import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to right, #010314, #010314)", // Keeping black as the background color
        boxShadow: "none", // Remove shadow for a cleaner look
        borderBottom: "4px solid #6a0080", // Purple border line separating the top bar
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            textDecoration: "none",
            color: "#d3a0f3", // Light purple for FitFlow text color
            fontSize: "24px", // Adjust the font size for a modern look
          }}
        >
          FitFlow
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              "&:hover": { 
                backgroundColor: "#6a0080", // Darker purple for hover effect
                transform: "scale(1.2)", // Scaling the button
                transition: "all 0.3s ease", // Smooth transition for scaling and background color
              },
              textTransform: "none", // Remove uppercase transformation
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/services"
            sx={{
              "&:hover": { 
                backgroundColor: "#6a0080", 
                transform: "scale(1.2)", 
                transition: "all 0.3s ease",
              },
              textTransform: "none",
            }}
          >
            Services
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/signup"
            sx={{
              "&:hover": { 
                backgroundColor: "#6a0080", 
                transform: "scale(1.2)", 
                transition: "all 0.3s ease",
              },
              textTransform: "none",
            }}
          >
            Signup
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/signin"
            sx={{
              "&:hover": { 
                backgroundColor: "#6a0080", 
                transform: "scale(1.2)", 
                transition: "all 0.3s ease",
              },
              textTransform: "none",
            }}
          >
            Login
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/profile"
            sx={{
              "&:hover": { 
                backgroundColor: "#6a0080", 
                transform: "scale(1.2)", 
                transition: "all 0.3s ease",
              },
              textTransform: "none",
            }}
          >
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
