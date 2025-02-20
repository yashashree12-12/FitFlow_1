import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, Button, Card, CardMedia } from "@mui/material"; // Import Card and CardMedia
import Services from "./Services"; // Import the Services component
import Footer from './footer'; // Correctly import Footer component
import WhatWeOffer from "./WhatWeOffer"; // Import WhatWeOffer component

const Dashboard = () => {
  const servicesRef = useRef(null);
  const whatWeOfferRef = useRef(null); // Ref for WhatWeOffer section
  const [hasVisitedBefore, setHasVisitedBefore] = useState(false); // Track if user has visited before

  // Check if the user has visited before (using localStorage)
  useEffect(() => {
    const visited = localStorage.getItem("hasVisitedBefore");
    if (!visited) {
      // Set the flag to true for future visits
      localStorage.setItem("hasVisitedBefore", "true");
    } else {
      setHasVisitedBefore(true); // User has visited before
    }
  }, []);

  return (
    <>
      {/* Home Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh", // Full viewport height
          overflow: "hidden",
          background: "linear-gradient(90deg, #2e003e, #000000)", // Dark purple to black gradient
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)", // Shadow effect for depth
        }}
      >
        {/* Blended Video Card on the Right */}
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            right: "10%", // Move the card slightly left from the right edge
            width: "30%", // Adjust size of the video to take up a smaller portion
            height: "50%", // Adjust video height
            transform: "translateY(-50%)", // Centering the card vertically
            zIndex: 1,
            borderRadius: "8px", // Slight rounding for the card
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Apply shadow to the card for depth
            overflow: "hidden", // Ensuring no overflow from the card
            opacity: 0.9, // Make the card semi-transparent
          }}
        >
          <CardMedia
            component="video"
            autoPlay
            loop
            muted
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Ensures the video fits the card nicely
            }}
          >
            <source
              src="fitnessworkout.mp4" // Replace with your video file URL
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </CardMedia>
        </Card>

        {/* Gradient Overlay to Blend the Line */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: "50%",
            width: "50%",
            height: "100%",
            background: "linear-gradient(to left, rgba(1, 3, 20, 0), rgba(46, 0, 62, 0.9))", // Dark purple to transparent gradient effect
            zIndex: 0,
          }}
        />

        {/* Overlay Content */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "10%", // Adjusting for left side alignment
            transform: "translateY(-50%)", // Centering vertically
            textAlign: "left", // Align text to the left
            color: "#fff",
            zIndex: 2,
            maxWidth: "600px", // Limit the width for better layout
          }}
        >
          {/* Welcome to FitFlow Animation */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              animation: "slideInLeft 2s ease-out",
              color: "#fff",
              "@keyframes slideInLeft": {
                "0%": { transform: "translateX(-100%)", opacity: 0 },
                "100%": { transform: "translateX(0)", opacity: 1 },
              },
            }}
          >
            Welcome to FitFlow
          </Typography>

          {/* Subtitle Animation */}
          <Typography
            variant="h5"
            sx={{
              mt: 2,
              animation: "slideInRight 2s ease-out",
              animationDelay: "0.5s",
              color: "#fff",
              "@keyframes slideInRight": {
                "0%": { transform: "translateX(100%)", opacity: 0 },
                "100%": { transform: "translateX(0)", opacity: 1 },
              },
            }}
          >
            Your journey to fitness and nutrition starts here!
          </Typography>

          {/* Scroll Button with Hover Animation */}
          <Button
            variant="contained"
            onClick={() => servicesRef.current?.scrollIntoView({ behavior: "smooth" })}
            sx={{
              mt: 4,
              backgroundColor: "#4a0066",
              "&:hover": {
                backgroundColor: "#6a0080",
                transform: "scale(1.1)",
                transition: "transform 0.3s ease",
              },
              transition: "background-color 0.3s ease",
            }}
          >
            Explore Our Services
          </Button>
        </Box>
      </Box>

      {/* Services Section */}
      <Box
        id="services-section"
        ref={servicesRef}
        sx={{
          animation: "fadeInUp 1s ease-out", // Smooth fade-in and slide-up animation
          "@keyframes fadeInUp": {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Services />
      </Box>

      {/* What We Offer Section */}
      <Box
        id="what-we-offer-section"
        ref={whatWeOfferRef}
        sx={{
          animation: "fadeInUp 1s ease-out", // Smooth fade-in and slide-up animation
          "@keyframes fadeInUp": {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <WhatWeOffer /> {/* Render the WhatWeOffer component */}
      </Box>

      {/* Footer Section */}
      <Footer /> {/* This is where you should render the Footer component */}
    </>
  );
};

export default Dashboard;
