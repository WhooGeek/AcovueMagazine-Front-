import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostDetailView from "../../components/PostDetail/PostDetailView"
import{
    getPostDetail,
    getCommentDetail,
    getLikePost,
} from "../../api/Post.api"

export default function BehindDetailPage() {
    const { postId } = useParams();
    
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [postLikes, setPostLikes] = useState(0);


    useEffect(() => {
        getPostDetail(postId).then(res =>
            setPost(res.data.data)
        );

        getCommentDetail(postId).then(res =>
            setComments(res.data.data)
        );

        getLikePost(postId).then(res =>
            setPostLikes(res.data.data.postLikeCount)
        );
    }, [postId]);

    if (!post) return <div>loading...</div>;

    return(
        <PostDetailView
            post={post}
            comments={comments}
            postLikes={postLikes}
        />
    );
}