import React, { useState } from "react";
import {
  Typography,
  Box,
  IconButton,
  Card,
  CardContent,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Avatar,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FitnessCenter as FitnessCenterIcon,
  Restaurant as RestaurantIcon,
  DirectionsRun as DirectionsRunIcon,
  SelfImprovement as SelfImprovementIcon,
  Spa as SpaIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Edit as EditIcon,
  Assessment as AssessmentIcon,
  Event as EventIcon,
  EmojiEvents as EmojiEventsIcon,
  People as CommunityIcon, // New icon for Community
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import FitnessForm from "./FitnessForm";
import NutritionForm from "./NutritionForm";

const data = [
  { name: "Week 1", Exercises: 4000, Meals: 2400 },
  { name: "Week 2", Exercises: 3000, Meals: 1398 },
  { name: "Week 3", Exercises: 2000, Meals: 9800 },
  { name: "Week 4", Exercises: 2780, Meals: 3908 },
];

const drawerWidth = 280;
const cardWidth = 300;
const cardHeight = 150;

const paperStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "1200px",
  bgcolor: "white",
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  p: 4,
  borderRadius: "8px",
};

const modalContentStyle = {
  maxHeight: "90vh",
  overflowY: "auto",
  padding: "16px",
};

function Services() {
  const primaryColor = "#1976D2";
  const secondaryColor = "#42A5F5";
  const backgroundColor = "#f5f5f5";

  const [showFitnessForm, setShowNutritionForm] = useState(false);
  const [fitnessOutput, setFitnessOutput] = useState(null);
  const [nutritionOutput, setNutritionOutput] = useState(null);
  const [isFitnessModalOpen, setIsFitnessModalOpen] = useState(false);
  const [isNutritionModalOpen, setIsNutritionModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "Richard Jones",
    gender: "Male",
    age: 28,
    height: 185,
    weight: 76,
  });
  const [editProfile, setEditProfile] = useState({ ...profile });

  const navigate = useNavigate();
  const location = useLocation();

  const handleEditProfileOpen = () => {
    setEditProfile({ ...profile });
    setIsEditProfileModalOpen(true);
  };

  const handleEditProfileClose = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleEditProfileChange = (e) => {
    const { name, value } = e.target;
    setEditProfile({ ...editProfile, [name]: value });
  };

  const handleEditProfileSubmit = () => {
    setProfile({ ...editProfile });
    setIsEditProfileModalOpen(false);
  };

  const services = [
    {
      title: "Fitness",
      icon: <FitnessCenterIcon sx={{ fontSize: 50, color: "#fff" }} />,
      description: "Personalized workout routines.",
      bgColor: "#66bb6a",
      count: 5,
      total: 10,
      formType: "fitness",
    },
    {
      title: "Nutrition",
      icon: <RestaurantIcon sx={{ fontSize: 50, color: "#fff" }} />,
      description: "Balanced meal plans for optimal health.",
      bgColor: "#ef5350",
      count: 4,
      total: 6,
      formType: "nutrition",
    },
    {
      title: "Yoga",
      icon: <SelfImprovementIcon sx={{ fontSize: 50, color: "#fff" }} />,
      description: "Strengthen your body and calm mind.",
      bgColor: "#ab47bc",
      count: 2,
      total: 5,
    },
    {
      title: "Meditation",
      icon: <SpaIcon sx={{ fontSize: 50, color: "#fff" }} />,
      description: "Reduce stress and improve focus.",
      bgColor: "#ffa726",
      count: 6,
      total: 8,
    },
  ];

  const handleOpenModal = (formType) => {
    if (formType === "fitness") {
      setIsFitnessModalOpen(true);
    } else if (formType === "nutrition") {
      setIsNutritionModalOpen(true);
    }
  };

  const handleCloseModal = (formType) => {
    if (formType === "fitness") {
      setIsFitnessModalOpen(false);
    } else if (formType === "nutrition") {
      setIsNutritionModalOpen(false);
    }
  };

  const handleFitnessSubmit = (data) => {
    setFitnessOutput(data);
    setIsFitnessModalOpen(false);
  };

  const handleNutritionSubmit = (data) => {
    setNutritionOutput(data);
    setIsNutritionModalOpen(false);
  };

  const sidebarItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "My Goals", icon: <FitnessCenterIcon />, path: "/goals" },
    { text: "Schedule", icon: <EventIcon />, path: "/schedule" },
    { text: "Achievements", icon: <EmojiEventsIcon />, path: "/achievements" },
    { text: "Statistics", icon: <AssessmentIcon />, path: "/statistics" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
    { text: "Community", icon: <CommunityIcon />, path: "/community" }, // New Community button
  ];

  const formattedFitnessOutput = fitnessOutput
    ? JSON.stringify(fitnessOutput, null, 2)
    : null;
  const formattedNutritionOutput = nutritionOutput
    ? JSON.stringify(nutritionOutput, null, 2)
    : null;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: backgroundColor }}>
      {/* Conditionally Render Sidebar */}
      {location.pathname !== "/" && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              border: "none",
              bgcolor: "#fff",
              color: "#333",
              boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
            },
          }}
        >
          <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: primaryColor }}>
              FitFlow
            </Typography>
          </Toolbar>

          {/* Profile Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 3,
              mb: 2,
              p: 2,
              borderRadius: "12px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              width: "100%",
              maxWidth: "260px",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                alt={profile.name}
                src="/static/images/avatar/1.jpg"
                sx={{ width: 90, height: 90, mb: 1, border: `3px solid ${primaryColor}` }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  color: "#fff",
                  bgcolor: primaryColor,
                  "&:hover": { bgcolor: secondaryColor },
                }}
                onClick={handleEditProfileOpen}
                aria-label="edit profile"
              >
                <EditIcon />
              </IconButton>
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: primaryColor, mt: 1 }}
            >
              {profile.name}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#777" }}>
              {profile.gender}, {profile.age} years
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5, color: "#555" }}>
              Height: {profile.height} cm
            </Typography>
            <Typography variant="body2" sx={{ color: "#555" }}>
              Weight: {profile.weight} kg
            </Typography>
          </Box>

          {/* Navigation List */}
          <List sx={{ mt: 2 }}>
            {sidebarItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "#f0f0f0",
                    "& .MuiListItemText-primary": {
                      color: primaryColor,
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#555" }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    color: "#333",
                    "&:hover": {
                      color: primaryColor,
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#fff",
            color: "black",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            borderRadius: "8px",
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: primaryColor }}>
              FitFlow Dashboard
            </Typography>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: primaryColor }}>
            Today's Focus
          </Typography>

          {/* Service Cards - Horizontal Scroll */}
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              scrollBehavior: "smooth",
              pb: 2,
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none",
              scrollbarWidth: "none",
            }}
          >
            {services.map((service, index) => (
              <Card
                key={service.title}
                sx={{
                  mr: 2,
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  backgroundColor: service.bgColor,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  height: cardHeight,
                  width: cardWidth,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  flexShrink: 0,
                  cursor: "pointer",
                }}
                onClick={() => handleOpenModal(service.formType)}
              >
                <CardContent
                  sx={{
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Box sx={{ textAlign: "left", width: "70%" }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                      {service.description}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1, fontSize: "0.8rem" }}>
                      {service.count} / {service.total} Completed
                    </Typography>
                  </Box>
                  <Box sx={{ width: "30%", textAlign: "right" }}>
                    <IconButton sx={{ color: "white", padding: "8px" }}>
                      {service.icon}
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Fitness Modal */}
        <Modal
          open={isFitnessModalOpen}
          onClose={() => handleCloseModal("fitness")}
          aria-labelledby="fitness-modal-title"
          aria-describedby="fitness-modal-description"
        >
          <Box sx={paperStyle}>
            <Box sx={modalContentStyle}>
              <Typography id="fitness-modal-title" variant="h6" component="h2" sx={{ color: primaryColor, fontWeight: "bold", mb: 2 }}>
                Fitness Form
              </Typography>
              <FitnessForm onSubmit={handleFitnessSubmit} />
            </Box>
          </Box>
        </Modal>

        {/* Nutrition Modal */}
        <Modal
          open={isNutritionModalOpen}
          onClose={() => handleCloseModal("nutrition")}
          aria-labelledby="nutrition-modal-title"
          aria-describedby="nutrition-modal-description"
        >
          <Box sx={paperStyle}>
            <Box sx={modalContentStyle}>
              <Typography id="nutrition-modal-title" variant="h6" component="h2" sx={{ color: primaryColor, fontWeight: "bold", mb: 2 }}>
                Nutrition Form
              </Typography>
              <NutritionForm onSubmit={handleNutritionSubmit} />
            </Box>
          </Box>
        </Modal>

        {/* Edit Profile Modal */}
        <Modal open={isEditProfileModalOpen} onClose={handleEditProfileClose}>
          <Box sx={paperStyle}>
            <Box sx={modalContentStyle}>
              <Typography variant="h6" component="h2" sx={{ color: primaryColor, fontWeight: "bold", mb: 2 }}>
                Edit Profile
              </Typography>
              <TextField
                label="Name"
                name="name"
                value={editProfile.name}
                onChange={handleEditProfileChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Gender"
                name="gender"
                value={editProfile.gender}
                onChange={handleEditProfileChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Age"
                name="age"
                type="number"
                value={editProfile.age}
                onChange={handleEditProfileChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Height (cm)"
                name="height"
                type="number"
                value={editProfile.height}
                onChange={handleEditProfileChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Weight (kg)"
                name="weight"
                type="number"
                value={editProfile.weight}
                onChange={handleEditProfileChange}
                fullWidth
                margin="normal"
              />
              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={handleEditProfileClose} sx={{ mr: 1 }}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleEditProfileSubmit}>
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>

        {/* Display Output (Fitness and Nutrition) */}
        <Box sx={{ mt: 4 }}>
          {formattedFitnessOutput && (
            <Card sx={{ mb: 2, p: 2, borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              <Typography variant="h6" sx={{ color: primaryColor, fontWeight: "bold", mb: 1 }}>Fitness Recommendation:</Typography>
              <Box sx={{ maxHeight: "500px", overflow: "auto", }}>
                <pre style={{ whiteSpace: 'pre-wrap' }}>{formattedFitnessOutput}</pre>
              </Box>
            </Card>
          )}

          {formattedNutritionOutput && (
            <Card sx={{ p: 2, borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              <Typography variant="h6" sx={{ color: primaryColor, fontWeight: "bold", mb: 1 }}>Nutrition Recommendation:</Typography>
              <Box sx={{ maxHeight: "500px", overflow: "auto", }}>
                <pre style={{ whiteSpace: 'pre-wrap' }}>{formattedNutritionOutput}</pre>
              </Box>
            </Card>
          )}
        </Box>

        {/* Statistics Section */}
                {/* Statistics Section */}
                <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: primaryColor }}>
              Last Month's Progress
            </Typography>
            <LineChart width={730} height={300} data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 12 }} />
              <YAxis tick={{ fill: "#555", fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "4px" }}
                labelStyle={{ fontWeight: "bold", color: "#333" }} itemStyle={{ color: "#555" }} />
              <Legend iconType="circle" wrapperStyle={{ top: 0, right: 0 }} />
              <Line type="monotone" dataKey="Exercises" stroke="#ADD8E6" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="Meals" stroke="#FF4136" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Services;