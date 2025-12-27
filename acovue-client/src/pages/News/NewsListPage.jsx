import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import PostListView from "../../components/PostList/PostListView"
import { getPostList } from "../../api/Post.api"
import PostWriteButton from "../../components/Common/PostWriteButton";
import "./NewsListPage.css";


export default function NewsListPage(){
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
            <div className="news-header">
                <div className="news-listpage-title">NEWS</div> 
                <PostWriteButton/>
            </div>
            <PostListView postList={postList} title="NEWS"/>
        </div>
    );

}