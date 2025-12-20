import { useState } from "react";
import "./PostDetailCommentInput.css";


export default function PostDetailCommentInput({isLoggedIn}){

    const [content, setContent] = useState("");
    const [error, setError] = useState(false);

    const handleFocus = () => {
        if(!isLoggedIn){
            setError(true);
        }
    };

    const handleSubmit = () => {
        if(!isLoggedIn){
            alert("로그인이 필요합니다.");
            return;
        }

        if(!content.trim()){
            setError(true);
            return;
        }

        // 나중에 API 연결
        console.log("댓글 등록: ", content);

        setContent("");
        setError(false);
    };


    return(
        <div className={`comment-input ${error? "error" : ""}`}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={handleFocus}
                placeholder={
                    isLoggedIn
                    ? "댓글을 입력해주세요"
                    : "로그인이 필요합니다."
                }
            />

            <button onClick={handleSubmit}>작성</button>
        </div>
    )
}