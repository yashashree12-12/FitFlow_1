import React, { useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Collapse,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, ExpandLess, ExpandMore } from "@mui/icons-material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function MyGoals() {
  const primaryColor = "#673ab7";
  const [goals, setGoals] = useState([
    { id: 1, text: "Run 5k in under 30 minutes", progress: 0.6, status: "Active", weight: 70 },
    { id: 2, text: "Bench press your body weight", progress: 0.3, status: "Active", weight: 80 },
    { id: 3, text: "Lose 10 pounds", progress: 1, status: "Completed", weight: 65 },
  ]);
  const [newGoal, setNewGoal] = useState("");
  const [expandedGoal, setExpandedGoal] = useState(null);
  const [achievementOpen, setAchievementOpen] = useState(false);
  const [completedGoal, setCompletedGoal] = useState(null);

  const handleAddGoal = () => {
    if (newGoal.trim() !== "") {
      const newGoalItem = {
        id: Date.now(),
        text: newGoal,
        progress: 0,
        status: "Active",
        weight: ""
      };
      setGoals([...goals, newGoalItem]);
      setNewGoal("");
    }
  };

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const handleToggleExpand = (id) => {
    setExpandedGoal(expandedGoal === id ? null : id);
  };

  const handleProgressChange = (id, newProgress) => {
    const parsedProgress = Math.min(1, Math.max(0, parseFloat(newProgress)));
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const updatedGoal = { ...goal, progress: parsedProgress };
        if (parsedProgress === 1 && goal.status !== "Completed") {
          setCompletedGoal(updatedGoal);
          setAchievementOpen(true);
          return { ...updatedGoal, status: "Completed" };
        }
        return updatedGoal;
      }
      return goal;
    }));
  };

  const handleWeightChange = (id, newWeight) => {
    setGoals(goals.map(goal => goal.id === id ? { ...goal, weight: newWeight } : goal));
  };

  const handleCloseAchievement = () => {
    setAchievementOpen(false);
    setCompletedGoal(null);
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f8f8ff", minHeight: "100vh", borderRadius: "12px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, color: primaryColor, textAlign: "center" }}>
        My Fitness Goals
      </Typography>
      <Box sx={{ display: "flex", mb: 3, gap: 2 }}>
        <TextField
          label="Add a new goal"
          variant="outlined"
          fullWidth
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
        />
        <Button variant="contained" sx={{ bgcolor: primaryColor, color: "white" }} onClick={handleAddGoal}>
          Add Goal
        </Button>
      </Box>
      <List>
        {goals.map((goal) => (
          <Card key={goal.id} sx={{ mb: 2, borderRadius: "12px" }}>
            <ListItem button onClick={() => handleToggleExpand(goal.id)}>
              <ListItemText
                primary={goal.text}
                secondary={<>
                  <Typography variant="body2">Status: {goal.status}</Typography>
                  <Typography variant="body2">Weight: {goal.weight} kg</Typography>
                  <LinearProgress variant="determinate" value={goal.progress * 100} />
                </>}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleDeleteGoal(goal.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => handleToggleExpand(goal.id)}>
                  {expandedGoal === goal.id ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={expandedGoal === goal.id} timeout="auto" unmountOnExit>
              <CardContent>
                <TextField
                  label="Weight (kg)"
                  type="number"
                  value={goal.weight}
                  onChange={(e) => handleWeightChange(goal.id, e.target.value)}
                />
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </List>
      <Dialog open={achievementOpen} onClose={handleCloseAchievement}>
        <DialogTitle>
          <EmojiEventsIcon /> Achievement Unlocked!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Congratulations! You've completed the goal: {completedGoal?.text}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAchievement}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MyGoals;