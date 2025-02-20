import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Services from "./pages/Services";
import MyGoals from "./pages/MyGoals";
import Schedule from "./pages/Schedule";
import Achievements from "./pages/Achievements";
import Statistics from "./pages/Statistics";
import FitnessForm from "./pages/FitnessForm";
import NutritionForm from "./pages/NutritionForm";
import Community from "./pages/Community";

import PostDetail from "./pages/PostDetail";
import CreatePost from "./components/CreatePost";
import ProfileView from "./pages/ProfileView";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <Router>
      <DataProvider> {/* Wrap the entire app with DataProvider */}
        <div>
          <TopBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/services" element={<Services />} />
            <Route path="/goals" element={<MyGoals />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/fitness" element={<FitnessForm />} />
            <Route path="/nutrition" element={<NutritionForm />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </div>
      </DataProvider>
    </Router>
  );
}

export default App;
