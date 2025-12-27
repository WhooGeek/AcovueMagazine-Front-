import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import PostListView from "../../components/PostList/PostListView"
import { getPostList } from "../../api/Post.api"
import PostWriteButton from "../../components/Common/PostWriteButton";
import "./BehindListPage.css";

export default function BehindListPage(){
    const [searchParams] = useSearchParams();

    const limit = searchParams.get('limit')
    const page = searchParams.get('page')
    const type = searchParams.get('type')
    
    const [postList, setPostList] = useState(null);

    useEffect(() => {
        getPostList(limit, page, type).then(res =>
            setPostList(res.data.data)
        );
    }, [limit, page, type]);

    if (!postList) <div>loading...</div>

    return(
        <div>
            <div className="behind-header">
                <div className="behind-listpage-title">BEHIND</div> 
                <PostWriteButton/>
            </div>
            <PostListView
                postList={postList}
            />
        </div>
    )

}