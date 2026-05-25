import React, {useState, useEffect} from "react";
import "./PostDetailActions.css"
import { postPostLikeToggle } from "../../api/Like.api"
import { Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "../../api/ApiError";
import LoginRequiredModal from "../Common/LoginRequiredModal";

export default function PostDetailActions({ 
  post, 
  postLikes, 
  commentCount, 
  isLiked = false,
  isLoggedIn = false}) {
  const navigate = useNavigate();

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
      alert(getApiErrorMessage(error, "좋아요 처리 중 오류가 발생했습니다. 다시 시도해주세요."));
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

      <LoginRequiredModal
        open={showLoginModal}
        title="로그인이 필요합니다!"
        description="좋아요 기능은 로그인 후 사용할 수 있습니다."
        cancelText="닫기"
        confirmText="로그인하러 가기"
        onCancel={() => setShowLoginModal(false)}
        onConfirm={() => {
          setShowLoginModal(false);
          navigate("/login");
        }}
      />
    </>
  );
}
