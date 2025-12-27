import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostDetail, putUpdatePost } from "../../api/Post.api";
import PostEditor from "../../components/PostDetail/PostEditor.jsx";

const CommonUpdatePage = ({ category, boardTitle, prevPath }) => {
    const { postId } = useParams(); // URL 파라미터에서 postId 추출
    const navigate = useNavigate();
    
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
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

        try {
            const updateData = {
                post_title: postTitle,
                post_content: postContent,
            };

            await putUpdatePost(postId, updateData);

            alert("게시물이 성공적으로 수정되었습니다.");
            navigate(prevPath);
        }catch (error) {
            console.error("Failed to update post:", error);
            alert("게시물 수정에 실패했습니다. 다시 시도해주세요.");
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
            
            <PostEditor content={postContent} setContent={setPostContent} />
            
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
