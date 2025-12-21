import { useSearchParams } from "react-router-dom";
import { useEffect,useState } from "react";
import BigListView from "../../components/BigList/BigListView";
import { getPostList } from "../../api/Post.api"


export default function CommunityListPage(){
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

    return(
        <BigListView
            postList={postList}
        />
    )

}