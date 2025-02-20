import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "", // Use username instead of email
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError({ username: "", password: "" });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Start loading state

    try {
      // Adjusted URL based on your API path: /users/login/
      const response = await axios.post("http://127.0.0.1:8000/api/users/login/", {
        username: formData.username, // Send username instead of email
        password: formData.password,
      });

      console.log("Login Response: ", response.data);

      // Store the token and username in localStorage for authentication
      localStorage.setItem("access_token", response.data.access); // Store JWT access token
      localStorage.setItem("refresh_token", response.data.refresh); // Store refresh token
      localStorage.setItem("username", formData.username); // Store the username

      alert("Login Successful!");
      navigate("/"); // Redirect to the homepage or dashboard
    } catch (err) {
      setIsLoading(false); // Stop loading state on error
      console.error("Login Error:", err.response?.data);
      setError({
        username: err.response?.data?.username || "",
        password: err.response?.data?.password || "Invalid credentials",
      });
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          filter: "blur(5px)", // Apply blur effect
        }}
      >
        <source src="/fitnessworkout.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 2,
          padding: 4,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 2 }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Username field */}
          <TextField
            fullWidth
            name="username" // Use username here
            label="Username"
            variant="outlined"
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            error={!!error.username}
            helperText={error.username}
          />
          {/* Password field */}
          <TextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={!!error.password}
            helperText={error.password}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.rememberMe}
                onChange={handleChange}
                name="rememberMe"
                color="primary"
              />
            }
            label="Remember Me"
            sx={{ mt: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#D32F2F", color: "white", "&:hover": { backgroundColor: "#B71C1C" } }}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
          </Box>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link
            onClick={() => navigate("/signup")}
            sx={{
              cursor: "pointer",
              color: "#D32F2F",
              fontWeight: "bold",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Sign-Up
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Login;