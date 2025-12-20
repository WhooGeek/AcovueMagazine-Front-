import "./PostDetailHeader.css"
import {formatTime} from "../../components/Util/FormatTime.jsx";

export default function PostDetailHeader({ post }) {
  if (!post) return null;

  return (
    <div className="post-header">
      <div className="post-title">{post.postTitle}</div>
      <div className="post-under-title">
        <div className="post-nickname">작성자 : {post.memberNickname}</div>
        <div className="post-regdate">작성일 : {formatTime(post.regDate)}</div>
      </div>
      
    </div>
  );
}
