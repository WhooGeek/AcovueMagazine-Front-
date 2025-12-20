import PostListItem from "./PostListItem"
import "./PostListView.css"

export default function PostListView({
    postList
}){
    return(
        <div className="post-list-container">
            {/* 상단 게시글 리스트 영역 */}
            {postList?.map((post) => (
                <PostListItem key={post.postSeq} post={post} />
            ))}
            

        </div>
    )
}