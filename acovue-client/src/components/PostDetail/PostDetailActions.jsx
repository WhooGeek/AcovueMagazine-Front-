import "./PostDetailActions.css"
import LikesImage from "../../assets/Likes.png";
import CommentImage from "../../assets/Comment.png";

export default function PostDetailActions({ postLikes, commentCount }) {
  return (
    <div className="post-actions">
      <span className="action-item">
        <img src={LikesImage} alt="좋아요" className="likesImage"/>
            <a className="like-text">좋아요</a> 
            <a className="like-count">{postLikes}</a>
      </span>

      <span className="action-item">
        <img src={CommentImage} alt="댓글" className="commentImage" />
            <a className="comment-text">댓글</a>
            <a>
                {commentCount}
            </a>
      </span>
    </div>
  );
}
