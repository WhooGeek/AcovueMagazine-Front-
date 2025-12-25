import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PostWriteButton.css";

const CommonWriteButton = () => {
    const navigate = useNavigate();
    const location = useLocation(); // 현재 URL 정보 확인

    // 로그인 체크
    const isLoggedIn = !!localStorage.getItem("accessToken");
    if(!isLoggedIn){
        return null;
    }

    // URL 별 랜딩 페이지 URL 설정
    const handleWriteClick = () => {
        const currentPath = location.pathname;

        if(currentPath.includes('/news')){
            navigate('/news/create');
        } else if (currentPath.includes('/community')){
            navigate('/community/create');
        } else if (currentPath.includes('/behind')){
            navigate('/behind/create');
        } else {
            alert("글 작성이 불가능한 페이지입니다.");
        }
    };

    return (
        <div className="common-write-btn-wrapper">
            <button className="common-write-btn" onClick={handleWriteClick}>
                🖊️ 글쓰기
            </button>
        </div>
    );
};

export default CommonWriteButton;