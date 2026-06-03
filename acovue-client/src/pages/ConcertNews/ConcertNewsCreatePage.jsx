import React, { useState } from 'react';
import PostEditor from '../../components/PostDetail/PostEditor';
import { useNavigate } from 'react-router-dom';
import { postCreatePost } from '../../api/Post.api';
import { getApiErrorMessage } from "../../api/ApiError";
import { useToast } from "../../components/Common/ToastProvider";
import "./ConcertNewsCreatePage.css";

const extractFirstImageUrl = (htmlContent) => {
    // <img ... src="주소"> 형태를 찾는 정규식
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/i;
    const match = htmlContent.match(imgRegex);
    
    // 사진이 있으면 첫 번째 괄호에 해당하는 주소를 반환, 없으면 null
    return match ? match[1] : null; 
};

const ConcertNewsCreatePage = () => {
    const { showToast } = useToast();
   
    const [title, setTitle] = useState(""); 
    const [content, setContent] = useState("");
    const [imageUrls, setImageUrls] = useState([]); 
    
    const navigate = useNavigate();

    

    const handleSubmit = async () => {
        // 유효성 검사 (제목이나 내용이 비었는지 확인)
        if (!title || !content) {
            showToast("제목과 내용을 모두 입력해주세요.", "info");
            return;
        }

        const thumbnailUrl = extractFirstImageUrl(content); 

        try {
            // 백엔드로 보낼 데이터 준비
            const postData = {
                post_title: title,    // 여기서 state의 title을 사용
                post_content: content, // 여기서 state의 content(HTML)를 사용
                post_category: "CONCERT_NEWS",     // 게시판 타입 (필요시 수정)
                imageUrls: imageUrls, // 이미지 URL 배열 (이미지 업로드 기능 구현 시 사용)
                thumbnail_url: thumbnailUrl // 썸네일 URL 추가
            };

            await postCreatePost(postData);
            
            showToast("글이 등록되었습니다!", "success");
            navigate('/concert-news?page=1&limit=5&type=CONCERT_NEWS');

        } catch (error) {
            console.error("글 등록 실패:", error);
            showToast(getApiErrorMessage(error, "글 등록 중 오류가 발생했습니다."), "error");
        }
    };

    return (
        <div className="create-page-container">
            <h1>공연 소식 작성</h1>
            
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
                imageUrls={imageUrls}
                setImageUrls={setImageUrls}
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

export default ConcertNewsCreatePage;
