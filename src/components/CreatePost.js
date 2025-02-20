import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, IconButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { PhotoCamera, Videocam } from "@mui/icons-material";
import axios from "axios";

const CreatePost = ({ open, onClose, onCreate }) => {
    const [text, setText] = useState("");
    const [category, setCategory] = useState("fitness");
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("text", text);
        formData.append("category", category);
        if (image) formData.append("image", image);
        if (video) formData.append("video", video);

        try {
            await axios.post("http://localhost:8000/api/community/posts/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Fixed: Use backticks
                },
            });
            alert("Post created successfully!");
            onCreate(); // Refresh the feed
            onClose(); // Close the modal
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setVideo(null); // Clear video if an image is uploaded
        }
    };

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);
            setImage(null); // Clear image if a video is uploaded
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    maxHeight: "90vh", // Limit the height to avoid overflow
                    overflow: "auto",  // Allow scrolling if content exceeds height
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Create a New Post
                </Typography>
                <TextField
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your post..."
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                />

                {/* Category dropdown */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        label="Category"
                    >
                        <MenuItem value="fitness">Fitness</MenuItem>
                        <MenuItem value="nutrition">Nutrition</MenuItem>
                        <MenuItem value="yoga">Yoga</MenuItem>
                        <MenuItem value="mental_health">Mental Health</MenuItem>
                        <MenuItem value="recipes">Recipes</MenuItem>
                        <MenuItem value="motivation">Motivation</MenuItem>
                        <MenuItem value="qna">Q&A</MenuItem>
                        <MenuItem value="challenges">Challenges</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <IconButton
                        component="label"
                        sx={{
                            "&:hover": { backgroundColor: "#f0f0f0" },
                            position: "relative",
                        }}
                        title="Add Image"
                    >
                        <PhotoCamera />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: "none" }}
                        />
                    </IconButton>
                    <IconButton
                        component="label"
                        sx={{
                            "&:hover": { backgroundColor: "#f0f0f0" },
                            position: "relative",
                        }}
                        title="Add Video"
                    >
                        <Videocam />
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            style={{ display: "none" }}
                        />
                    </IconButton>
                </Box>

                {image && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2">Image Preview:</Typography>
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Uploaded"
                            style={{
                                maxWidth: "100%",
                                borderRadius: 4,
                                maxHeight: "200px", // Limit the image size
                                objectFit: "contain", // Prevent image distortion
                            }}
                        />
                    </Box>
                )}
                {video && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2">Video Preview:</Typography>
                        <video
                            controls
                            src={URL.createObjectURL(video)}
                            style={{ maxWidth: "100%", borderRadius: 4 }}
                        />
                    </Box>
                )}

                <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between", mt: 2 }}>
                    {/* Cancel Button */}
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        color="secondary"
                        sx={{ flex: 1 }}
                    >
                        Cancel
                    </Button>

                    {/* Create Post Button */}
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        sx={{ flex: 1 }}
                    >
                        Create Post
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CreatePost;