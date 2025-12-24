import "./BigListHeader.css"
import CommonWriteButton from "../Common/CommonWriteButton";

export default function BigListHeader(){
    return(
        <div className="community-header-container">
            <div className="community-header-title">
                Community
            </div>
            <CommonWriteButton/>
        </div>
    )
}