import React from "react";
import { useNavigate } from "react-router-dom";
import "./PostActionButton.css";
import { deletePost } from "../../api/Post.api";
import { getApiErrorMessage } from "../../api/ApiError";

const PostActionButton = ({ postId, postCategory}) => {
    const navigate = useNavigate();

    const getCategoryPath = (category) => {
        if (category === "CONCERT_NEWS") return "concert-news";
        return category.toLowerCase();
    };

    const handleEdit = () => {
        const categoryPath = getCategoryPath(postCategory);
        const updatePath = `/${categoryPath}/${postId}/update`;
        navigate(updatePath);
    };

    const handleDelete = async () => {
        if(window.confirm("정말로 이 게시물을 삭제하시겠습니까?")){
            try {
                await deletePost(postId);

                const categoryPath = getCategoryPath(postCategory);
                navigate(`/${categoryPath}?page=1&limit=5&type=${postCategory}`);
            } catch (error) {
                console.error("게시물 삭제 중 오류 발생:", error);
                alert(getApiErrorMessage(error, "게시물 삭제 중 오류가 발생했습니다. 다시 시도해주세요."));
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
