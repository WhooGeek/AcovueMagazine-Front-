import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostActionButton.css";
import { deletePost } from "../../api/Post.api";
import { getApiErrorMessage } from "../../api/ApiError";
import AppModal from "./AppModal";
import { useToast } from "./ToastProvider";

const PostActionButton = ({ postId, postCategory}) => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const getCategoryPath = (category) => {
        if (category === "CONCERT_NEWS") return "concert-news";
        return category.toLowerCase();
    };

    const handleEdit = () => {
        const categoryPath = getCategoryPath(postCategory);
        const updatePath = `/${categoryPath}/${postId}/update`;
        navigate(updatePath);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deletePost(postId);

            const categoryPath = getCategoryPath(postCategory);
            navigate(`/${categoryPath}?page=1&limit=5&type=${postCategory}`);
        } catch (error) {
            showToast(
                getApiErrorMessage(error, "게시물 삭제 중 오류가 발생했습니다. 다시 시도해주세요."),
                "error"
            );
        } finally {
            setDeleteModalOpen(false);
        }
    };

    return(
        <>
            <div className="post-action-button-container">
                <button className="post-action-button edit-button" onClick={handleEdit}>Edit</button>
                <button className="post-action-button delete-button" onClick={() => setDeleteModalOpen(true)}>Delete</button>
            </div>

            <AppModal
                open={deleteModalOpen}
                title="게시물 삭제"
                message="해당 게시물을 삭제하시겠습니까?"
                confirmText="삭제"
                cancelText="취소"
                showCancel={true}
                danger={true}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteModalOpen(false)}
            />
        </>
    );
}

export default PostActionButton;
