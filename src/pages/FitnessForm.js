import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Grid,
  Modal,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  FitnessCenter as FitnessIcon,
  DirectionsRun as ActivityIcon,
  EmojiEvents as GoalIcon,
  AccessTime as TimelineIcon,
  LocalHospital as MedicalIcon,
  Home as SettingIcon,
  Bedtime as SleepIcon,
  Mood as StressIcon,
  TextSnippet as RecommendationIcon, //Added for recommendation Text
} from "@mui/icons-material";

const FitnessForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    weight: "",
    height: "",
    fitness_level: "beginner",
    activity_level: "moderately_active",
    goal: "maintenance",
    specific_area: "",
    target_timeline: "6_months",
    medical_conditions: "",
    injuries_or_physical_limitation: "",
    exercise_setting: "gym",
    sleep_pattern: "6_to_8",
    stress_level: 5,
  });

  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRecommendation(null);
    setOpenModal(false);

    try {
      const response = await axios.post("http://127.0.0.1:8000/fitness/", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setRecommendation(response.data);
    } catch (err) {
      setError("Failed to get recommendations. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (key, value) => {
    setSelectedPlan({ key, value });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Styled Components for enhanced readability and maintainability
  const StyledPaper = styled(Paper)(({ theme }) => ({
    width: "80%",
    maxWidth: "1200px",
    textAlign: "center",
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: 5,
  }));

  const RecommendationCard = styled(Card)(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: 3,
    borderRadius: "12px",
    backgroundColor: "#fff",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: 6,
    },
  }));

  const RecommendationCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(3),
  }));

  const RecommendationTitle = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    color: "#4a0066",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
  }));

  const BmiText = styled(Typography)(({ theme }) => ({
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
  }));

  const SeePlanButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#4a0066",
    borderRadius: "0 0 12px 12px",
    width: "100%",
    padding: "12px",
    fontWeight: "bold",
    color: "#fff", //Added this line
    "&:hover": {
      backgroundColor: "#3a0050",
    },
  }));

  const ModalBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "900px",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "12px",
    padding: theme.spacing(4),
    maxHeight: "90vh",
    overflowY: "auto",
  }));

  //Form Style
  const commonStyles = {
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#4a0066",
      },
      "&:hover fieldset": {
        borderColor: "#4a0066",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4a0066",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#4a0066",
      fontWeight: "bold",
    },
    "& .MuiInputBase-input": {
      textAlign: "left",
    },
  };

  //Icons
  const getIconForTitle = (title) => {
    switch (title) {
      case "fitness_level":
        return <FitnessIcon sx={{ fontSize: 40, color: "#4a0066" }} />;
      case "activity_level":
        return <ActivityIcon sx={{ fontSize: 40, color: "#4a0066" }} />;
      case "goal":
        return <GoalIcon sx={{ fontSize: 40, color: "#4a0066" }} />;
      case "target_timeline":
        return <TimelineIcon sx={{ fontSize: 40, color: "#4a0066" }} />;
      case "medical_conditions":
        return <MedicalIcon sx={{ fontSize: 40, color: "#4a0066" }} />;
      case "exercise_setting":
        return <SettingIcon sx={{ fontSize: 40, color: "#4a0066" }} />;
      case "sleep_pattern":
        return <SleepIcon sx={{ fontSize: 40, color: "#4a0066" }} />;
      case "stress_level":
        return <StressIcon sx={{ fontSize: 40, color: "#4a0066" }} />;
      case "recommendation_text":
        return <RecommendationIcon sx={{ fontSize: 40, color: "#4a0066" }} />; //Fixed Icon
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        padding: "20px",
      }}
    >
      <StyledPaper>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            color: "#4a0066",
            fontWeight: "bold",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Get Your Personalized Fitness Plan
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {Object.keys(formData).map((key) => (
              <Grid item xs={12} sm={6} key={key}>
                {key === "gender" ||
                key === "fitness_level" ||
                key === "activity_level" ||
                key === "goal" ||
                key === "target_timeline" ||
                key === "exercise_setting" ||
                key === "sleep_pattern" ? (
                  <FormControl fullWidth sx={commonStyles}>
                    <InputLabel>{key.replace(/_/g, " ").toUpperCase()}</InputLabel>
                    <Select
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      sx={{
                        "& .MuiSelect-select": {
                          textAlign: "left",
                        },
                      }}
                    >
                      {key === "gender" && ["male", "female"].map((option) => (
                        <MenuItem key={option} value={option} sx={{ textAlign: "left" }}>
                          {option}
                        </MenuItem>
                      ))}
                      {key === "fitness_level" && ["beginner", "intermediate", "advanced"].map((option) => (
                        <MenuItem key={option} value={option} sx={{ textAlign: "left" }}>
                          {option}
                        </MenuItem>
                      ))}
                      {key === "activity_level" && ["sedentary", "lightly_active", "moderately_active", "very_active"].map((option) => (
                        <MenuItem key={option} value={option} sx={{ textAlign: "left" }}>
                          {option.replace(/_/g, " ")}
                        </MenuItem>
                      ))}
                      {key === "goal" && ["weight_loss", "muscle_gain", "maintenance", "improve_endurance"].map((option) => (
                        <MenuItem key={option} value={option} sx={{ textAlign: "left" }}>
                          {option.replace(/_/g, " ")}
                        </MenuItem>
                      ))}
                      {key === "target_timeline" && ["1_month", "3_months", "6_months", "1_year"].map((option) => (
                        <MenuItem key={option} value={option} sx={{ textAlign: "left" }}>
                          {option.replace(/_/g, " ")}
                        </MenuItem>
                      ))}
                      {key === "exercise_setting" && ["home", "gym", "outdoor"].map((option) => (
                        <MenuItem key={option} value={option} sx={{ textAlign: "left" }}>
                          {option}
                        </MenuItem>
                      ))}
                      {key === "sleep_pattern" && ["less_than_6", "6_to_8", "more_than_8"].map((option) => (
                        <MenuItem key={option} value={option} sx={{ textAlign: "left" }}>
                          {option.replace(/_/g, " ")}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    label={key.replace(/_/g, " ").toUpperCase()}
                    name={key}
                    type={key === "age" || key === "weight" || key === "height" || key === "stress_level" ? "number" : "text"}
                    value={formData[key]}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={commonStyles}
                  />
                )}
              </Grid>
            ))}
          </Grid>

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 4,
              backgroundColor: "#4a0066",
              padding: "12px 30px",
              borderRadius: "8px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#3a0050",
              },
            }}
          >
            Get Recommendation
          </Button>
        </form>

        {loading && <CircularProgress sx={{ mt: 3, color: "#4a0066" }} />}
        {error && (
          <Typography color="error" sx={{ mt: 2, fontWeight: "bold" }}>
            {error}
          </Typography>
        )}

        {recommendation && (
          <Box sx={{ mt: 5 }}>
            <Typography
              variant="h5"
              sx={{ mb: 4, fontWeight: "bold", color: "#4a0066", fontFamily: "'Poppins', sans-serif" }}
            >
              Your Personalized Fitness Plan
            </Typography>
            <Grid container spacing={3}>
              {Object.entries(recommendation)
                .map(([key, value], index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <RecommendationCard>
                      <RecommendationCardContent>
                        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                          {getIconForTitle(key)}
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            color: "#4a0066",
                            textAlign: "center",
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          {key === "recommendation_text" ? "Recommended Plan" : key.replace(/_/g, " ")}
                        </Typography>
                      </RecommendationCardContent>
                      <SeePlanButton onClick={() => handleOpenModal(key, value)}>See Plan</SeePlanButton>
                    </RecommendationCard>
                  </Grid>
                ))}
            </Grid>
          </Box>
        )}

        {/* Modal for displaying plan details */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="plan-details-modal"
          aria-describedby="plan-details-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: "900px",
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: "12px",
              p: 4,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <Typography
              variant="h5"
              sx={{ mb: 3, fontWeight: "bold", color: "#4a0066", fontFamily: "'Poppins', sans-serif" }}
            >
              {selectedPlan?.key === "recommendation_text" ? "Recommended Plan" : selectedPlan?.key.replace(/_/g, " ")}
            </Typography>
            <Box sx={{ overflowX: "auto" }}>
              <Typography sx={{ whiteSpace: "pre-line", fontFamily: "Roboto, sans-serif", fontSize: "1.1rem", lineHeight: 1.7, color: "#333" }}>
                {selectedPlan?.value}
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#4a0066",
                borderRadius: "8px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#3a0050",
                },
              }}
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </StyledPaper>
    </Box>
  );
};

export default FitnessForm;