import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PostActionButton.css";
import { deletePost } from "../../api/Post.api";

const PostActionButton = ({ postId, postCategory}) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        const updatePath = `/${postCategory.toLowerCase()}/${postId}/update`;
        console.log("Navigating to:", updatePath);
        navigate(updatePath);
    };

    const handleDelete = async () => {
        if(window.confirm("정말로 이 게시물을 삭제하시겠습니까?")){
            try {
                await deletePost(postId);
                navigate(`/${postCategory.toLowerCase()}?page=1&limit=5&type=${postCategory.toUpperCase()}`);
            } catch (error) {
                console.error("게시물 삭제 중 오류 발생:", error);
            }
        }
    };

    return(
        <div className="post-action-button-container">
            <button className="post-action-button edit-button" onClick={handleEdit}>Edit</button>
            <button className="post-action-button delete-button" onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default PostActionButton;