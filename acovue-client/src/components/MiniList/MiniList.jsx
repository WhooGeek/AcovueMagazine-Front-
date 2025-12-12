import {formatTime} from "../../components/Util/FormatTime.jsx";
import "./MiniList.css";

export default function MiniList({ title, items }) {
    return(
        <div className="list-container">
            <h2 className="list-title">{title}</h2>
            <div className="content-container">
                {items.map((item) =>(
                    <div className="content-box" key={item.postSeq}>
                        <div>{item.postTitle}</div>                
                        <div>{formatTime(item.regDate)}</div>
                    </div>
                    
                ))}
            </div>
        </div>
    );
}