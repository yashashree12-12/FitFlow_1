import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import CreatePost from "../components/CreatePost";

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState("all");
    const [createPostOpen, setCreatePostOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch posts based on selected category
    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem("access_token");  // Get the access token from localStorage

            if (!token) {
                alert("You need to be logged in to view posts.");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const url =
                    category === "all"
                        ? `http://localhost:8000/api/community/posts/`
                        : `http://localhost:8000/api/community/posts/?category=${category}`;

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Corrected Authorization format
                    },
                });

                setPosts(response.data);  // Update posts state with fetched data
            } catch (error) {
                console.error("Error fetching posts:", error.response?.data || error.message);
                setError("Failed to fetch posts. Please check your login status.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [category]);  // Re-run when category changes

    // Handle creating a new post
    const handleCreatePost = () => {
        setCreatePostOpen(true);
    };

    // Close the create post modal
    const handleCloseCreatePost = () => {
        setCreatePostOpen(false);
    };

    // Refresh the feed after creating a post
    const handlePostCreated = () => {
        const fetchPosts = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                alert("You need to be logged in to view posts.");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`http://localhost:8000/api/community/posts/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Corrected Authorization format
                    },
                });
                setPosts(response.data);  // Refresh posts
            } catch (error) {
                console.error("Error fetching posts:", error.response?.data || error.message);
                setError("Failed to fetch posts.");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    };

    // Handle liking/unliking a post
    const handleLikePost = async (postId) => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            alert("You need to be logged in to like/unlike posts.");
            return;
        }

        try {
            await axios.post(
                `http://localhost:8000/api/community/posts/${postId}/like/`,  // Fixed template string
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Fixed string formatting
                    },
                }
            );

            // Refresh the posts to update the like count
            const updatedPosts = posts.map((post) =>
                post.id === postId
                    ? {
                          ...post,
                          likes: post.likes.includes(postId)
                              ? post.likes.filter((id) => id !== postId)
                              : [...post.likes, postId],
                      }
                    : post
            );
            setPosts(updatedPosts);
        } catch (error) {
            console.error("Error liking/unliking post:", error.response?.data || error.message);
            alert("Failed to like/unlike post.");
        }
    };

    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: "20%", padding: "10px" }}>
                <Sidebar onCategorySelect={setCategory} onCreatePost={handleCreatePost} />
            </div>
            <div style={{ width: "80%", padding: "10px" }}>
                {loading && <p>Loading posts...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Feed posts={posts} onLikePost={handleLikePost} />
            </div>
            <CreatePost
                open={createPostOpen}
                onClose={handleCloseCreatePost}
                onCreate={handlePostCreated}
            />
        </div>
    );
};

export default Community;
