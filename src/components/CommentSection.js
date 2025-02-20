import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";

const CommentSection = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("access_token");

    // Fetch comments
    useEffect(() => {
        if (!token) {
            alert("You need to be logged in to view comments.");
            return;
        }

        const fetchComments = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `http://localhost:8000/api/community/posts/${postId}/comments/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error.response?.data || error.message);
                setError("Failed to fetch comments.");
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId, token]);

    // Handle adding a new comment
    const handleAddComment = async () => {
        if (!newComment.trim()) {
            alert("Comment cannot be empty!");
            return;
        }

        if (!token) {
            alert("You need to be logged in to add a comment.");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:8000/api/community/posts/${postId}/comments/`,
                { text: newComment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setComments([...comments, response.data]);
            setNewComment("");
        } catch (error) {
            console.error("Error adding comment:", error.response?.data || error.message);
            alert("Failed to add comment.");
        }
    };

    return (
        <Box sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
            <Typography variant="h6">Comments</Typography>
            {loading && <p>Loading comments...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <Box key={comment.id} sx={{ mt: 1, p: 1, borderBottom: "1px solid #eee" }}>
                        <Typography variant="subtitle2">@{comment.user.username}</Typography>
                        <Typography variant="body2">{comment.text}</Typography>
                    </Box>
                ))
            ) : (
                <Typography variant="body2" sx={{ color: "#888" }}>No comments yet.</Typography>
            )}

            <TextField
                fullWidth
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                multiline
                rows={2}
                sx={{ mt: 2 }}
            />
            <Button onClick={handleAddComment} variant="contained" color="primary" sx={{ mt: 1 }}>
                Add Comment
            </Button>
        </Box>
    );
};

export default CommentSection;
