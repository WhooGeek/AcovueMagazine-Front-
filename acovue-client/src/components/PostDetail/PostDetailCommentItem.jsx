import { useState } from "react";
import { putComment, deleteComment, postComment } from "../../api/Comment.api";
import { getApiErrorMessage } from "../../api/ApiError";
import "./PostDetailComments.css"; 
import AppModal from "../Common/AppModal";
import { useToast } from "../Common/ToastProvider";

export default function CommentItem({ comment, postId, currentUser, onRefresh, isReply, parentSeqForReply }) {
  const { showToast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editContent, setEditContent] = useState(comment.commentContent);
  const [replyContent, setReplyContent] = useState("");

  const isMyComment = currentUser && comment.userSeq && (currentUser.memberSeq === comment.userSeq);
  
  const handleUpdate = async () => {
    if (!editContent.trim()) {
      showToast("내용을 입력하세요.", "info");
      return;
    }
    try {
      await putComment(postId, comment.commentSeq, { commentContent: editContent });
      setIsEditing(false);
      onRefresh(); 
    } catch (error) {
      showToast(getApiErrorMessage(error, "댓글 수정 중 오류가 발생했습니다. 다시 시도해주세요."), "error");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteComment(postId, comment.commentSeq);
      onRefresh();
    } catch (error) {
      showToast(getApiErrorMessage(error, "댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요."), "error");
    } finally {
      setDeleteModalOpen(false);
    }
  };

  // 대댓글 등록
  const handleReplySubmit = async () => {
    if (!replyContent.trim()) {
      showToast("내용을 입력하세요.", "info");
      return;
    }
    try {
      const targetParentSeq = isReply ? parentSeqForReply : comment.commentSeq;
      
      await postComment(postId, { commentContent: replyContent, parentSeq: targetParentSeq });
      
      setReplyContent("");
      setIsReplying(false);
      onRefresh();
    } catch (error) {
      showToast(getApiErrorMessage(error, "답글 등록 중 오류가 발생했습니다. 다시 시도해주세요."), "error");
    }
  };

  return (
    <>
      <div 
        className={`comment-box ${isReply ? "is-reply" : ""}`}
      >
        
        {/* 헤더 (이름 + 뱃지) */}
        <div className="comment-header">
          <span className="comment-name">{comment.userName}</span>
          {isReply && <span className="reply-badge">답글</span>}
        </div>

        {/* 본문 or 수정폼 */}
        {isEditing ? (
          <div className="edit-area">
            <textarea 
              className="comment-textarea"
              value={editContent} 
              onChange={(e) => setEditContent(e.target.value)} 
            />
            <div className="btn-group">
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>취소</button>
              <button className="submit-btn" onClick={handleUpdate}>저장</button>
            </div>
          </div>
        ) : (
          <div className="comment-content">{comment.commentContent}</div>
        )}

        {/* 버튼 액션 (답글/수정/삭제) */}
        <div className="comment-actions">
          {/* 로그인 함 + 수정중 아님 + 대댓글 아님 -> 답글 버튼 노출 */}
          {currentUser && !isEditing && !isReply && (
            <button className="action-btn" onClick={() => setIsReplying(!isReplying)}>
              {isReplying ? "취소" : "답글 달기"}
            </button>
          )}

          {/* 내 댓글 + 수정중 아님 -> 수정/삭제 버튼 노출 */}
          {isMyComment && !isEditing && (
            <>
              <button className="action-btn" onClick={() => setIsEditing(true)}>수정</button>
              <button className="action-btn delete" onClick={() => setDeleteModalOpen(true)}>삭제</button>
            </>
          )}
        </div>

        {/* 대댓글 입력창 (답글 버튼 클릭 시) */}
        {isReplying && (
          <div className="reply-input-box">
            <textarea 
              className="comment-textarea"
              placeholder="답글을 남겨보세요..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <div className="btn-group">
              <button className="submit-btn" onClick={handleReplySubmit}>등록</button>
            </div>
          </div>
        )}
      </div>

      <AppModal
        open={deleteModalOpen}
        title="댓글 삭제"
        message="해당 댓글을 삭제하시겠습니까?"
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
