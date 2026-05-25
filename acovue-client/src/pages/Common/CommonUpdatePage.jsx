import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostDetail, putUpdatePost } from "../../api/Post.api";
import { getApiErrorMessage } from "../../api/ApiError";
import PostEditor from "../../components/PostDetail/PostEditor.jsx";

const extractFirstImageUrl = (htmlContent) => {
    // <img ... src="주소"> 형태를 찾는 정규식
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/i;
    const match = htmlContent.match(imgRegex);
    
    // 사진이 있으면 첫 번째 괄호에 해당하는 주소를 반환, 없으면 null
    return match ? match[1] : null; 
};

const CommonUpdatePage = ({ category, boardTitle, prevPath }) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    // ⭐️ 1. 이미지 URL들을 담을 State 추가 (이게 없어서 에러가 났음!)
    const [imageUrls, setImageUrls] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);

    
    
    useEffect(() => {
        getPostDetail(postId).then(res => {
            const post = res.data.data;
            setPostTitle(post.postTitle);
            setPostContent(post.postContent);
            setIsLoading(false);
        }).catch(err => {
            console.error("Failed to fetch post details:", err);
            navigate(prevPath);
        });
    }, [postId, navigate, prevPath]);

    

    const handleUpdate = async () => {
        if(!postTitle || !postContent){
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }

        // ⭐️ 2. 본문(HTML)에서 첫 번째 이미지 주소 추출하기 (정규식 사용)
        // 새로 업로드한 사진이든, 원래 있던 사진이든 상관없이 에디터 안의 첫 번째 사진을 썸네일로 잡음!
        const thumbnailUrl = extractFirstImageUrl(postContent);

        try {
            const updateData = {
                post_title: postTitle,
                post_content: postContent,
                // ⭐️ 3. 백엔드 DTO에 맞게 이미지 URL 전송 (백엔드가 image_url을 원한다면 아래처럼)
                thumbnail_url: thumbnailUrl 
            };

            await putUpdatePost(postId, updateData);

            alert("게시물이 성공적으로 수정되었습니다.");
            navigate(prevPath);
        }catch (error) {
            console.error("Failed to update post:", error);
            alert(getApiErrorMessage(error, "게시물 수정에 실패했습니다. 다시 시도해주세요."));
        }
    };

    if (isLoading){
        return <div>Loading...</div>;
    }

    return(
        <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '20px' }}>{boardTitle}</h1>
            
            <input 
                type="text" 
                value={postTitle} 
                onChange={(e) => setPostTitle(e.target.value)} 
                placeholder="제목을 입력하세요"
                style={{ 
                    width: '100%', padding: '12px', fontSize: '18px', marginBottom: '20px',
                    border: '1px solid #ddd', borderRadius: '5px'
                }} 
            />
            
            {/* ⭐️ 4. setImageUrls 프롭스 전달! (이제 this.setImageUrls is not a function 에러 안 남) */}
            <PostEditor 
                content={postContent} 
                setContent={setPostContent} 
                setImageUrls={setImageUrls} 
            />
            
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

export default CommonUpdatePage;
