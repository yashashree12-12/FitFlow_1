import React from "react";
import { List, ListItem, ListItemButton, ListItemText, Button } from "@mui/material";

const categories = [
    { id: "all", name: "All Posts" },
    { id: "fitness", name: "Fitness" },
    { id: "nutrition", name: "Nutrition" },
    { id: "yoga", name: "Yoga" },
    { id: "mental_health", name: "Mental Health" },
    { id: "qna", name: "Q&A" },
];

const Sidebar = ({ onCategorySelect, onCreatePost }) => {
    return (
        <List>
            {categories.map((category) => (
                <ListItem key={category.id} disablePadding>
                    <ListItemButton onClick={() => onCategorySelect(category.id)}>
                        <ListItemText primary={category.name} />
                    </ListItemButton>
                </ListItem>
            ))}
            <Button onClick={onCreatePost} variant="contained" color="primary" style={{ margin: "10px" }}>
                Create Post
            </Button>
        </List>
    );
};

export default Sidebar;
