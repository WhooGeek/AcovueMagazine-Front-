import React, { useState } from 'react';
import PostEditor from '../../components/PostDetail/PostEditor';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { postCreatePost } from '../../api/Post.api';
import "./BehindCreatePage.css"

const BehindCreatePage = () => {
   
    const [title, setTitle] = useState(""); 
    const [content, setContent] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = async () => {
        // 유효성 검사 (제목이나 내용이 비었는지 확인)
        if (!title || !content) {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }

        try {
            // 백엔드로 보낼 데이터 준비
            const postData = {
                post_title: title,    // 여기서 state의 title을 사용
                post_content: content, // 여기서 state의 content(HTML)를 사용
                post_category: "BEHIND"     // 게시판 타입 (필요시 수정)
            };

            await postCreatePost(postData);
            
            alert("글이 등록되었습니다!");
            navigate('/behind?page=1&limit=5&type=BEHIND');

        } catch (error) {
            console.error("글 등록 실패:", error);
            alert("글 등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="create-page-container">
            <h1>Behind 작성</h1>
            
            {/* 제목 입력 칸 */}
            <div className="create-page-title-input-container">
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="제목을 입력하세요"
                    className="create-page-title-input"
                />
            </div>
            
            {/* CKEditor 컴포넌트 */}
            <PostEditor 
                content={content} 
                setContent={setContent} 
            />
            
            {/* 등록 버튼 */}
            <div className="common-write-btn-wrapper">
                <button 
                    onClick={handleSubmit}
                    className="common-write-btn"
                >
                    등록하기
                </button>
            </div>
        </div>
    );
};

export default BehindCreatePage;