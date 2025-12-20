import "./PostDetailComments.css"

export default function PostDetailComments({ comments }) {
  return (
    <div className="comment-container">

      {comments.length === 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
        comments.map((comment) => (
          <div className="comment-box" key={comment.commentSeq}>
            <h4 className="comment-name">{comment.userName}</h4>
            <div className="comment-content">{comment.commentContent}</div>
          </div>
        ))
      )}
    </div>
  );
}
