import React, {useState, useEffect} from "react";
import "./PostDetailActions.css"
import { postPostLikeToggle } from "../../api/Like.api"
import { Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "../../api/ApiError";
import AppModal from "../Common/AppModal";
import { useToast } from "../Common/ToastProvider";

export default function PostDetailActions({ 
  post, 
  postLikes, 
  commentCount, 
  isLiked = false,
  isLoggedIn = false}) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [likeCount, setLikeCount] = useState(postLikes);
  const [liked, setLiked] = useState(isLiked);
  const [showLoginModal, setShowLoginModal] = useState(false);
  

  // props가 변경되면 state도 업데이트 (데이터 로딩 시점 차이 해결)
  useEffect(() => {
    setLikeCount(postLikes);
    setLiked(isLiked);
  }, [postLikes, isLiked]);

  const handleLikeToggle = async () => {
    if(!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    try {

      await postPostLikeToggle(post.postSeq);

      if (liked) {
        setLikeCount((prev) => prev - 1); 
        setLiked(false);
      } else {
        setLikeCount((prev) => prev + 1);
        setLiked(true);
      }
    } catch (error) {
      console.error("좋아요 토글 중 오류 발생:", error);
      showToast(getApiErrorMessage(error, "좋아요 처리 중 오류가 발생했습니다. 다시 시도해주세요."), "error");
    }
  };

  return (
    <>
      <div className="post-actions">
        <span className="action-item" onClick={handleLikeToggle}>
          <Heart className={`icon-heart ${liked ? "active" : ""}`} />
              <a className="like-text">좋아요</a> 
              <a className="like-count">{likeCount}</a>
        </span>

        <span className="action-item">
          <MessageCircle className="icon-comment" />
              <a className="comment-text">댓글</a>
              <a>
                  {commentCount}
              </a>
        </span>
      </div>

      <AppModal
        open={showLoginModal}
        title="로그인 필요"
        message="로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
        confirmText="이동"
        cancelText="취소"
        showCancel={true}
        onConfirm={() => {
          setShowLoginModal(false);
          navigate("/login");
        }}
        onCancel={() => setShowLoginModal(false)}
      />
    </>
  );
}
