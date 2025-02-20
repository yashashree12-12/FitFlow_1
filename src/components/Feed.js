import React from "react";
import Post from "./Post";

const Feed = ({ posts, loading, error, onLikePost }) => {
    // Display loading state
    if (loading) {
        return <p>Loading posts...</p>;
    }

    // Display error message
    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    // Display message if no posts are available
    if (posts.length === 0) {
        return <p>No posts available. Be the first to create one!</p>;
    }

    return (
        <div>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    post={post}
                    onLikePost={onLikePost}  // Pass like handler to Post component
                />
            ))}
        </div>
    );
};

export default Feed;
