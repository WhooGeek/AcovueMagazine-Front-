import "./BigListHeader.css"
import PostWriteButton from "../Common/PostWriteButton";

export default function BigListHeader(){
    return(
        <div className="community-header-container">
            <div className="community-header-title">
                Community
            </div>
            <PostWriteButton/>
        </div>
    )
}