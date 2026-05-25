import { getApiErrorMessage } from "../../api/ApiError";
import { useState } from "react";
import { postComment } from "../../api/Comment.api";
import "./PostDetailCommentInput.css";


export default function PostDetailCommentInput({isLoggedIn, post, onCommentSubmit}){

    const [content, setContent] = useState("");
    const [error, setError] = useState(false);

    const handleFocus = () => {
        if(!isLoggedIn){
            setError(true);
        }
    };

    const handleSubmit = async () => {
        if(!isLoggedIn){
            alert("로그인이 필요합니다.");
            return;
        }

        if(!content.trim()){
            setError(true);
            return;
        }

        try{
            const data = { commentContent: content };
            
            await postComment(post.postSeq, data);

            setContent(""); 
            setError(false);

            if (onCommentSubmit) {
                onCommentSubmit();
            }

        } catch (error) {
            console.error("댓글 등록 중 오류 발생:", error);
            alert(getApiErrorMessage(error, "댓글 등록 중 오류가 발생했습니다. 다시 시도해주세요."));
        }
    };


    return(
        <div className={`comment-input ${error? "error" : ""}`}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={handleFocus}
                readOnly={!isLoggedIn} 
                placeholder={
                    isLoggedIn
                    ? "댓글을 입력해주세요"
                    : "댓글을 작성하려면 로그인이 필요합니다."
                }
            />

            <button onClick={handleSubmit}>작성</button>
        </div>
    )
}