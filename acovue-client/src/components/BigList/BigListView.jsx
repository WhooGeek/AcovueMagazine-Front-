import BigListHeader from "./BigListHeader";
import BigListContent from "./BigListContent";
import "./BigListView.css";

export default function BigListView({
    postList
}){
    return(
        <div className="big-list-container">
            {/* 리스트 헤더 영역 */}
            <BigListHeader/>
            {/* 리스트 바디(컨텐츠) 영역 */}

            {postList?.map((post) => (
                <BigListContent key={post.postSeq} post={post}/>
            ))}
            
        </div>
    )
}