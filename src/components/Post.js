import axios from "axios";
import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    IconButton,
    TextField,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { ThumbUp, ThumbUpOutlined, Comment, Edit, Delete } from "@mui/icons-material";

const Post = ({ post }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(post.text);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [likes, setLikes] = useState(post.total_likes || 0);
    const [liked, setLiked] = useState(post.is_liked);
    const [showComments, setShowComments] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const storedToken = localStorage.getItem("access_token");
    const loggedInUser = localStorage.getItem("username");

    useEffect(() => {
        if (showComments) {
            const fetchComments = async () => {
                setLoading(true);
                setError(null);

                try {
                    const response = await axios.get(
                        `http://localhost:8000/api/community/posts/${post.id}/comments/`,
                        {
                            headers: { Authorization: `Bearer ${storedToken}` },
                        }
                    );
                    setComments(response.data);
                } catch (error) {
                    console.error("Error fetching comments:", error);
                    setError("Failed to fetch comments.");
                } finally {
                    setLoading(false);
                }
            };
            fetchComments();
        }
    }, [showComments, post.id, storedToken]);

    const handleCommentClick = () => {
        setShowComments(!showComments);
    };

    const handleLike = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `http://localhost:8000/api/community/posts/${post.id}/like/`,
                {},
                { headers: { Authorization: `Bearer ${storedToken}` } }
            );

            setLiked(response.data.liked);
            setLikes(response.data.total_likes);
        } catch (error) {
            console.error("Error liking post:", error);
            setError("Failed to like/unlike post.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async () => {
        setLoading(true);
        setError(null);

        try {
            await axios.put(
                `http://localhost:8000/api/community/posts/${post.id}/`,
                { text: editedText },
                { headers: { Authorization: `Bearer ${storedToken}` } }
            );
            setIsEditing(false);
        } catch (error) {
            console.error("Error editing post:", error);
            setError("Failed to edit post.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        setError(null);

        try {
            await axios.delete(
                `http://localhost:8000/api/community/posts/${post.id}/`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            );
            alert("Post deleted successfully!");
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error("Error deleting post:", error);
            setError("Failed to delete post.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return alert("Comment cannot be empty!");

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `http://localhost:8000/api/community/posts/${post.id}/comments/`,
                { text: newComment },
                { headers: { Authorization: `Bearer ${storedToken}` } }
            );
            setComments([...comments, response.data]);
            setNewComment("");
        } catch (error) {
            console.error("Error adding comment:", error);
            setError("Failed to add comment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card sx={{ marginBottom: "20px", padding: "10px" }}>
            <CardContent>
                <Typography variant="h6">@{post.user.username}</Typography>

                {isEditing ? (
                    <TextField
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        fullWidth
                    />
                ) : (
                    <Typography>{post.text}</Typography>
                )}

                {post.image && (
                    <img
                        src={post.image}
                        alt="Post"
                        style={{ maxWidth: "100%", borderRadius: "4px" }}
                    />
                )}
                {post.video && (
                    <video controls style={{ maxWidth: "100%", borderRadius: "4px" }}>
                        <source src={post.video} type="video/mp4" />
                    </video>
                )}

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <Box>
                        <IconButton onClick={handleLike} color={liked ? "primary" : "default"}>
                            {liked ? <ThumbUp /> : <ThumbUpOutlined />}
                        </IconButton>
                        <Typography variant="body2" sx={{ display: "inline", ml: 1 }}>
                            {likes} Likes
                        </Typography>

                        <IconButton onClick={handleCommentClick}>
                            <Comment />
                        </IconButton>
                        <Typography variant="body2" sx={{ display: "inline", ml: 1 }}>
                            {comments.length} Comments
                        </Typography>
                    </Box>

                    {post.user.username === loggedInUser && (
                        <Box>
                            <IconButton onClick={() => setIsEditing(!isEditing)}>
                                <Edit />
                            </IconButton>
                            <IconButton onClick={() => setDeleteDialogOpen(true)} color="error">
                                <Delete />
                            </IconButton>
                        </Box>
                    )}
                </Box>

                {showComments && (
                    <Box sx={{ mt: 2 }}>
                        {loading && <Typography>Loading comments...</Typography>}
                        {error && (
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        )}
                        {comments.map((comment) => (
                            <Box key={comment.id} sx={{ mt: 1, p: 1, borderBottom: "1px solid #eee" }}>
                                <Typography variant="subtitle2">@{comment.user.username}</Typography>
                                <Typography variant="body2">{comment.text}</Typography>
                            </Box>
                        ))}
                        <TextField
                            fullWidth
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                            multiline
                            rows={2}
                            sx={{ mt: 2 }}
                        />
                        <Button
                            onClick={handleAddComment}
                            variant="contained"
                            color="primary"
                            sx={{ mt: 1 }}
                        >
                            Add Comment
                        </Button>
                    </Box>
                )}
            </CardContent>

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby="delete-dialog-title"
            >
                <DialogTitle id="delete-dialog-title">Delete Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this post? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default Post;