import "./PostDetailHeader.css"
import {formatTime} from "../../components/Util/FormatTime.jsx";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PostActionButtons from "../Common/PostActionButton.jsx";

export default function PostDetailHeader({ post }) {

  const [canEdit, setCanEdit] = useState(false); // 버튼 노출 상태 관리

  useEffect(() => {
    const checkPermission = () => {
      const token = localStorage.getItem("accessToken");
      if(!token) return;

      try {
        const decoded = jwtDecode(token);

        const currentUserSeq = decoded.memberSeq;
        const currentUserRole = decoded.auth;

        // 타입 다를수도 있어서 느슨한 비교
        if(String(currentUserSeq) === String(post.memberSeq) || currentUserRole === "ADMIN"){
          setCanEdit(true);
        }
      } catch (error){
        console.error("Token decoding error:", error);
      }
    };

    if(post){
      checkPermission();
    }
  }, [post]);

  if (!post) return null;

  return (
    <div className="post-header">
      <div className="post-title">{post.postTitle}</div>
      <div className="post-under-title">
        <div className="post-under-title-text">
          <div className="post-nickname">작성자 : {post.memberNickname}</div>
          <div className="post-regdate">작성일 : {formatTime(post.regDate)}</div>
        </div>
        {canEdit && (
            <PostActionButtons 
                postId={post.postSeq}
                postCategory={post.post_category}
            />
        )}
        

      </div>
      
    </div>
  );
}
