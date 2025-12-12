import ArticleCard from "./ArticleCard.jsx";
import "./ArticleList.css";

export default function ArticleList({ title, items }) {
  return (
    <div className="article-container">
      <h2 className="article-title">{title}</h2>
      <div className="article-image" >
        {items.map((item) => (
          <ArticleCard key={item.postSeq} data={item} />
        ))}
      </div>
    </div>
  );
}
