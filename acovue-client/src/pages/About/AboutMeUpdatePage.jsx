import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAboutMeContent, putAboutMeContent } from "../../api/AboutMe.api";
import { getApiErrorMessage } from "../../api/ApiError";
import { useToast } from "../../components/Common/ToastProvider";
import PostEditor from "../../components/PostDetail/PostEditor.jsx";

const AboutMeUpdatePage = ({ prevPath }) => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    
    const [aboutMeContent, setAboutMeContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [imageUrls, setImageUrls] = useState([]);
    
    useEffect(() => {
        getAboutMeContent().then(res => {
            const aboutMe = res.data.data;
            setAboutMeContent(aboutMe.about_me_content);
            setIsLoading(false);
        }).catch(err => {
            console.error("Failed to fetch post details:", err);
            navigate(prevPath);
        });
    }, [navigate, prevPath]);

    const handleUpdate = async () => {
        

        if(!aboutMeContent){
            showToast("내용을 입력해주세요.", "info");
            return;
        }

        try {
            const updateData = {
                about_me_content: aboutMeContent,
            };

            await putAboutMeContent(updateData);

            showToast("게시물이 성공적으로 수정되었습니다.", "success");
            navigate(prevPath);
        }catch (error) {
            console.error("Failed to update post:", error);
            showToast(getApiErrorMessage(error, "게시물 수정에 실패했습니다. 다시 시도해주세요."), "error");
        }
    };

    if (isLoading){
        return <div>Loading...</div>;
    }

    return(
        <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '20px' }}>About Me 수정</h1>

            <PostEditor content={aboutMeContent} setContent={setAboutMeContent} setImageUrls={setImageUrls}/>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button 
                    onClick={() => navigate(-1)} 
                    style={{ padding: '10px 20px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', borderRadius: '4px' }}
                >
                    취소
                </button>
                <button 
                    onClick={handleUpdate}
                    style={{
                        padding: '10px 20px', backgroundColor: '#333', color: 'white',
                        border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
                    }}
                >
                    수정 완료
                </button>
            </div>
        </div>
    );
};

export default AboutMeUpdatePage;
