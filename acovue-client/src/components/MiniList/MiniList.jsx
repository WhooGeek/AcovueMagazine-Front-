import {formatTime} from "../../components/Util/FormatTime.jsx";

export default function MiniList({ title, items }) {
    return(
        <div>
            <h2>{title}</h2>
            <div>
                {items.map((item) =>(
                    <div key={item.postSeq}>
                        <div>{item.postTitle}</div>                
                        <div>{formatTime(item.regDate)}</div>
                    </div>
                    
                ))}
            </div>
        </div>
    );
}