import "./ArticleCard.css";

export default function ArticleCard({ data }) {
  return (
    <div className="article-card">
      <img className="article-image" src={data.imageUrl} alt={data.postTitle} />
      <h4>{data.postTitle}</h4>
    </div>
  );
}
