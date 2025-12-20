import {formatTime} from"../Util/FormatTime";
import { Link } from "react-router-dom";
import "./PostListItem.css";

export default function PostListContent({post}){

    return(
        <Link to ={`/${post.post_category}/${post.postSeq}`} className="post-item-link">
            <article className="post-item">

                    {/*이미지*/}
                    <div className="post-item-image-container">
                        {post.thumnailUrl? (
                            /*이미지 있을 때*/ 
                            <img src={post.thumnailUrl} alt={post.postTitle}/>
                        ) : (
                            /* 이미지가 없을 때 */
                            <div className="no-image-placeholder">
                                <span> no image </span>
                            </div>
                        )}
                    </div>

                    {/*title 영역*/}
                    <div className="post-item-title-container">
                        <span className="post-item-category">
                            {post.post_category}
                        </span>
                        <div className="post-item-title">
                            {post.postTitle}
                        </div>
                    </div>

                    {/*item meta 영역*/}
                    <div className="post-item-meta-container">
                        <div className="post-item-meta-Nickname">{post.memberNickname}</div>
                        <div className="post-item-meta-regdate">{formatTime(post.regDate)}</div>
                    </div>

            </article>
       </Link>
    )
}