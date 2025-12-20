// src/components/PostDetail/PostDetailView.jsx
import "./PostDetailView.css";
import PostDetailHeader from "./PostDetailHeader"
import PostDetailContent from "./PostDetailContent"
import PostDetailActions from "./PostDetailActions.jsx"
import PostDetailComments from "./PostDetailComments"
import PostDetailCommentsInput from "./PostDetailCommentInput"
import PostDetailNavigation from "./PostDetailNavigation"

export default function PostDetailView({
  post,
  comments,
  postLikes,
  commentLikes,
}) {
  return (
    <article className="post-detail">
      {/* 상단 게시글 영역 */}
      <PostDetailHeader post={post} />

      {/* 본문 */}
      <PostDetailContent post={post} />

      {/* 액션 영역 */}
      <PostDetailActions postLikes={postLikes} commentCount={comments.length} />

      {/* 댓글 목록 */}
      <PostDetailComments comments={comments} commentLikes={commentLikes} />

      {/* 댓글 입력 */}
      <PostDetailCommentsInput />

      {/* 하단 네비 */}
      <PostDetailNavigation />
    </article>
  );
}
