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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
} from "@mui/material";
import {
  Restaurant as MealPlanIcon,
  Assessment as NutritionalAnalysisIcon,
  LocalDining as FoodRecommendationsIcon,
  ListAlt as PreparationGuidelinesIcon,
  LocalDrink as HydrationIcon,
  FitnessCenter as ProgressMonitoringIcon,
  Info as SpecialInstructionsIcon,
} from "@mui/icons-material";

const NutritionForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "Male",
    weight: "",
    height: "",
    veg_or_nonveg: "Veg",
    goal: "Gain muscles",
    disease: "",
    country: "India",
    state: "Maharashtra",
    allergics: "",
    food_type: "Veg",
    Target_timeline: "3 months",
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
      const response = await axios.post("http://127.0.0.1:8000/nutrition/", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setRecommendation(response.data.data.recommendation);
    } catch (err) {
      setError("Failed to get recommendations. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  const renderNestedData = (data) => {
    if (Array.isArray(data)) {
      return (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{typeof item === "object" ? renderNestedData(item) : item}</li>
          ))}
        </ul>
      );
    } else if (typeof data === "object" && data !== null) {
      return (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: "8px" }}>
          <Table size="small"> {/* Make table smaller */}
            <TableBody>
              {Object.entries(data).map(([key, value], index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "#4a0066", width: '40%' }}> {/* Adjust width for readability */}
                    {key.replace(/_/g, " ")}
                  </TableCell>
                  <TableCell sx={{ width: '60%' }}> {/* Adjust width for readability */}
                    {typeof value === "object" ? renderNestedData(value) : value.toString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } else {
      return <span>{data}</span>;
    }
  };

  const handleOpenModal = (key, value) => {
    setSelectedPlan({ key, value });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Map card titles to icons
  const getIconForTitle = (title) => {
    switch (title) {
      case "meal_plan":
        return <MealPlanIcon sx={{ fontSize: 40, color: "#4a0066" }} />;
      case "nutritional_analysis":
        return <NutritionalAnalysisIcon sx={{ fontSize: 40, color: "#4a0066" }} />;
      case "food_recommendations":
        return <FoodRecommendationsIcon sx={{ fontSize: 40, color: "#4a0066" }} />;
      case "preparation_guidelines":
        return <PreparationGuidelinesIcon sx={{ fontSize: 40, color: "#4a0066" }} />;
      case "hydration_and_supplements":
        return <HydrationIcon sx={{ fontSize: 40, color: "#4a0066" }} />;
      case "progress_monitoring":
        return <ProgressMonitoringIcon sx={{ fontSize: 40, color: "#4a0066" }} />;
      case "special_instructions":
        return <SpecialInstructionsIcon sx={{ fontSize: 40, color: "#4a0066" }} />;
      default:
        return null;
    }
  };

  // Common styling for text fields and dropdowns
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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          width: "80%",
          maxWidth: "1200px",
          textAlign: "center",
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: 5,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            color: "#4a0066",
            fontWeight: "bold",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Get Your Personalized Nutrition Plan
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {Object.keys(formData).map((key) => (
              <Grid item xs={12} sm={6} key={key}>
                {key === "gender" || key === "veg_or_nonveg" || key === "goal" || key === "food_type" || key === "Target_timeline" ? (
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
                      {key === "gender" && ["Male", "Female"].map((option) => (
                        <MenuItem key={option} value={option} sx={{ textAlign: "left" }}>
                          {option}
                        </MenuItem>
                      ))}
                      {key === "veg_or_nonveg" && ["Veg", "Non-Veg", "Veg & Non-Veg"].map((option) => (
                        <MenuItem key={option} value={option} sx={{ textAlign: "left" }}>
                          {option}
                        </MenuItem>
                      ))}
                      {key === "goal" && ["Gain muscles", "Lose weight", "Maintain physique"].map((option) => (
                        <MenuItem key={option} value={option} sx={{ textAlign: "left" }}>
                          {option}
                        </MenuItem>
                      ))}
                      {key === "food_type" && ["Veg", "Non-Veg"].map((option) => (
                        <MenuItem key={option} value={option} sx={{ textAlign: "left" }}>
                          {option}
                        </MenuItem>
                      ))}
                      {key === "Target_timeline" && ["1 month", "3 months", "6 months", "1 year"].map((option) => (
                        <MenuItem key={option} value={option} sx={{ textAlign: "left" }}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    label={key.replace(/_/g, " ").toUpperCase()}
                    name={key}
                    type={key === "age" || key === "weight" || key === "height" ? "number" : "text"}
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
              Your Personalized Nutrition Plan
            </Typography>
            <Grid container spacing={3}>
              {Object.entries(recommendation).map(([key, value], index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
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
                    }}
                  >
                    <CardContent>
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
                        {key.replace(/_/g, " ")}
                      </Typography>
                    </CardContent>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#4a0066",
                        borderRadius: "0 0 12px 12px",
                        width: "100%",
                        padding: "12px",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#3a0050",
                        },
                      }}
                      onClick={() => handleOpenModal(key, value)}
                    >
                      See Plan
                    </Button>
                  </Card>
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
              width: "90%", // Wider modal
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
              {selectedPlan?.key.replace(/_/g, " ")}
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>{selectedPlan && renderNestedData(selectedPlan.value)}</Box> {/* Added horizontal scrolling here for content overflow */}
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
      </Box>
    </Box>
  );
};

export default NutritionForm;