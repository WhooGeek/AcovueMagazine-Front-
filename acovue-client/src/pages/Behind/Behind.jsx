import { useEffect, useState } from "react";
import ArticleList from "../../components/Article/ArticleList.jsx";

export default function Behind(){
    const [behinds, setBehind] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:8080/api/post/find/all?type=BEHIND&limit=1")
        .then((res) => res.json())
        .then((data) => setBehind(data.data));
    }, [])

    return(
        <ArticleList title="BEHIND" items={behinds} />
    )
}