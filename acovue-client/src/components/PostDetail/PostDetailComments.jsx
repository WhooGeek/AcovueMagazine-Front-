import "./PostDetailComments.css";
import CommentItem from "./PostDetailCommentItem"; 

export default function PostDetailComments({ comments, post, currentUser, onRefresh }) {

  return (
    <div className="comment-container">
      {comments.length === 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
        comments.map((parentComment) => (
          <div key={parentComment.commentSeq} className="comment-group">
            
            {/* 부모 댓글 렌더링 */}
            <CommentItem 
              comment={parentComment}
              postId={post.postSeq}
              currentUser={currentUser}
              onRefresh={onRefresh}
              isReply={false} 
            />

            {/* 대댓글 렌더링 */}
            {parentComment.children && parentComment.children.length > 0 && (
              parentComment.children.map((childComment) => (
                <CommentItem 
                  key={childComment.commentSeq} 
                  comment={childComment}
                  postId={post.postSeq}
                  currentUser={currentUser}
                  onRefresh={onRefresh}
                  isReply={true} 
                  parentSeqForReply={parentComment.commentSeq} 
                />
              ))
            )}
            
          </div>
        ))
      )}
    </div>
  );
}