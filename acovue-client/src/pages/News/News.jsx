import { useEffect, useState } from "react";
import ArticleList from "../../components/Article/ArticleList.jsx";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/post/find/all?type=NEWS&limit=1")
      .then((res) => res.json())
      .then((data) => setNews(data.data));
  }, []);

  return (
    <ArticleList title="NEWS" items={news} />
  );
}
