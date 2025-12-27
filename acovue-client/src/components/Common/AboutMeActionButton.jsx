import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PostActionButton.css";

const AboutMeActionButton = ({}) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        const updatePath = `/aboutme/update`;
        console.log("Navigating to:", updatePath);
        navigate(updatePath);
    };

    return(
        <div className="post-action-button-container">
            <button className="post-action-button edit-button" onClick={handleEdit}>Edit</button>
        </div>
    );
}

export default AboutMeActionButton;