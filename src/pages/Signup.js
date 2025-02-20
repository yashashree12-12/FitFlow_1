import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",  // Change 'confirmPassword' to 'confirm_password'
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",  // Change 'confirmPassword' to 'confirm_password'
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state to manage button loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[A-Za-z0-9_-]{4,20}$/;
    if (!usernameRegex.test(username)) {
      return "Username must be between 4-20 characters and can only contain letters, digits, underscores, and hyphens.";
    }
    if (!/[A-Z]/.test(username)) {
      return "Username must contain at least one uppercase letter.";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const validatePassword = (password) => {
    password = password.trim(); // Trim whitespace
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    const isValid = passwordRegex.test(password);
    console.log("Password:", password, "Is Valid:", isValid); // Debugging log
    if (!isValid) {
      return "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    }
    return "";
  };

  const validateConfirmPassword = (confirm_password, password) => {
    if (confirm_password !== password) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Form Data:", formData); // Log form data before validation
  
    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.confirm_password,
      formData.password
    );
  
    console.log("Validation Errors:", {
      usernameError,
      emailError,
      passwordError,
      confirmPasswordError,
    }); // Log validation errors
  
    if (usernameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        username: usernameError,
        email: emailError,
        password: passwordError,
        confirm_password: confirmPasswordError,
      });
      return; // Stop execution if there are validation errors
    }
  
    setIsLoading(true);
  
    try {
      console.log("Sending request to backend..."); // Log before making the API call
      const response = await axios.post("http://127.0.0.1:8000/api/users/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password,
      });
      console.log("Signup Response: ", response.data); // Log the response from the backend
  
      alert("Signup Successful! Please log in.");
      navigate("/signin");
    } catch (err) {
      setIsLoading(false);
      console.error("Signup Error:", err.response?.data); // Log the error response
      if (err.response) {
        setErrors({
          username: err.response.data.username || "",
          email: err.response.data.email || "",
          password: err.response.data.password || "Signup failed",
          confirm_password: err.response.data.confirmPassword || "",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Video Background with Blur Effect */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          muted
          loop
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            filter: "blur(8px)", // Apply blur effect
          }}
        >
          <source src="/fitnessworkout.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>

      {/* Signup Form */}
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Slight opacity for the form background
          borderRadius: 2,
          padding: 4,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          zIndex: 1,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 2,
              color: "#333",
            }}
          >
            Sign-Up
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: "normal",
              color: "#555",
              fontSize: "1rem",
            }}
          >
            Join us to get started on your Healthy journey!
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="username"
              label="Username"
              variant="outlined"
              margin="normal"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              fullWidth
              name="email"
              label="Email"
              variant="outlined"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              fullWidth
              name="confirm_password"  // Changed to match backend field
              label="Confirm Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={formData.confirm_password}  // Changed to match backend field
              onChange={handleChange}
              error={!!errors.confirm_password}  // Changed to match backend field
              helperText={errors.confirm_password}  // Changed to match backend field
            />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#D32F2F",
                  color: "white",
                  "&:hover": { backgroundColor: "#B71C1C" },
                  width: "100%",
                }}
                disabled={isLoading} // Disable the button while loading
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Signup"}
              </Button>
            </Box>
          </form>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link
              onClick={() => navigate("/signin")}
              sx={{
                cursor: "pointer",
                color: "#D32F2F",
                fontWeight: "bold",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
