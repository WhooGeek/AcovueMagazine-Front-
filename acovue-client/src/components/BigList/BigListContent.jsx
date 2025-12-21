import {formatTime} from"../Util/FormatTime";
import {Link} from "react-router-dom";
import "./BigListContent.css";

export default function BigListContent({post}){
    return(
        <Link to ={`/${post.post_category}/${post.postSeq}`} className="big-list-item-link">
            <article className="big-list-item">

                {/*이미지*/}
                <div className="big-list-item-image-container">
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
                <div className="big-list-item-title-container">
                    <span className="big-list-item-category">
                        {post.post_category}
                    </span>
                    <div className="big-list-item-title">
                        {post.postTitle}
                    </div>
                    {/*item meta 영역*/}
                    <div className="big-list-item-meta-container">
                        <div className="big-list-item-meta-Nickname">{post.memberNickname}</div>
                        <div className="big-list-item-meta-regdate">{formatTime(post.regDate)}</div>
                    </div>
                </div>

                

            </article>
        </Link>
    )
}